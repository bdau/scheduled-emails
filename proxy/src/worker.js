// Read-only proxy that serves files from a PRIVATE GitHub repo to Claude cloud
// scheduled tasks, which can only do plain GETs (no auth header) via web_fetch.
//
// Request shape:  GET https://<worker>/f/<ACCESS_SECRET>/<path-in-repo>
//   e.g.          /f/<secret>/shared/format.md
//                 /f/<secret>/emails/daily-market-update/brief.md
// Optional:       ?ref=<branch|tag|sha>   (defaults to env.REF)
//
// Secrets (wrangler secret put ...):
//   GITHUB_TOKEN  - fine-grained PAT, Contents: read-only, scoped to this repo
//   ACCESS_SECRET - long random string that gates access to this worker
// Vars (wrangler.toml [vars]):
//   GITHUB_OWNER, GITHUB_REPO, REF

const ALLOWED_PREFIXES = ["shared/", "emails/"];

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET") return new Response("Method Not Allowed", { status: 405 });

    const url = new URL(request.url);
    // Expect /f/<secret>/<repo-path...>
    const m = url.pathname.match(/^\/f\/([^/]+)\/(.+)$/);
    if (!m) return new Response("Not found", { status: 404 });

    const [, secret, rawPath] = m;
    if (!env.ACCESS_SECRET || !timingSafeEqual(secret, env.ACCESS_SECRET)) {
      return new Response("Forbidden", { status: 403 });
    }

    // Normalise and guard the path (no traversal, must be an allowed area of the repo).
    const path = decodeURIComponent(rawPath);
    if (path.includes("..") || !ALLOWED_PREFIXES.some((p) => path.startsWith(p))) {
      return new Response("Forbidden path", { status: 403 });
    }

    const ref = url.searchParams.get("ref") || env.REF || "main";
    const api =
      `https://api.github.com/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}` +
      `/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${encodeURIComponent(ref)}`;

    const ghResp = await fetch(api, {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.raw",
        "User-Agent": "scheduled-emails-proxy",
      },
      // small edge cache; content only changes when the pinned ref moves
      cf: { cacheTtl: 60, cacheEverything: true },
    });

    if (!ghResp.ok) {
      return new Response(`Upstream ${ghResp.status}`, { status: ghResp.status === 404 ? 404 : 502 });
    }

    const body = await ghResp.text();
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  },
};
