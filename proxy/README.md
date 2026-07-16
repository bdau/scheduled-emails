# scheduled-emails-proxy

A read-only Cloudflare Worker that serves files from this PRIVATE repo to Claude cloud scheduled tasks. The tasks can only do plain GETs (no auth header), so this Worker holds the GitHub token and gates access with a secret path segment. The repo stays private; the token never leaves the Worker; your update flow stays `git push` plus (optionally) moving a tag.

## One-time setup

1. Create a GitHub fine-grained personal access token:
   - Resource owner: bdau. Repository access: only `scheduled-emails`.
   - Permissions: Repository → Contents → Read-only. Nothing else.
   - Copy the token.

2. Pick an access secret (this becomes part of the URL the task fetches):
   ```
   openssl rand -hex 24
   ```

3. From this `proxy/` folder:
   ```
   npm install -g wrangler        # if not already installed
   wrangler login
   wrangler secret put GITHUB_TOKEN     # paste the fine-grained PAT
   wrangler secret put ACCESS_SECRET    # paste the openssl secret
   wrangler deploy
   ```
   Deploy prints your URL, e.g. `https://scheduled-emails-proxy.<your-subdomain>.workers.dev`.

4. Test (replace SUBDOMAIN and SECRET):
   ```
   curl -s "https://scheduled-emails-proxy.SUBDOMAIN.workers.dev/f/SECRET/shared/format.md" | head
   ```
   You should see the top of `format.md`. A wrong secret returns 403; an unknown path returns 404.

## Publishing / refs

`REF` in `wrangler.toml` controls which ref the proxy serves. It ships as `main` (latest-always). To use an explicit publish gate instead:
```
git tag v1 && git push origin v1
```
then set `REF = "v1"` in `wrangler.toml` and `wrangler deploy`. To publish later changes, move the tag (`git tag -f v1 && git push -f origin v1`); no redeploy needed because the Worker reads the ref live.

## Task prompt (paste into each Claude cloud scheduled task, no folder attached)

Base = `https://scheduled-emails-proxy.SUBDOMAIN.workers.dev/f/SECRET`

```
Run the "daily-market-update" scheduled email. Each run starts fresh with no memory, so fetch and follow these files every time (use web_fetch):

  BASE/shared/format.md
  BASE/shared/house-style.md
  BASE/shared/send.md
  BASE/emails/daily-market-update/brief.md
  BASE/emails/daily-market-update/config.yaml

Steps:
1. Read config.yaml for title, brand, subject, from, to, footer_text, lookback_hours.
2. Do the research and build the section content exactly as brief.md specifies (Summary, Sentiment for the 14 markets, Positive and Negative cards with resolved market-tile images). Use WebSearch and web_fetch, restricted to the listed sources and the last 36 hours.
3. Assemble the sections into brief.md's body layout, then drop that into the shell in format.md. Fill {{EMAIL_TITLE}}, {{BRAND}}, {{DATE}}, {{FOOTER_TEXT}} from config. The 13-tile market grid in the body layout is fixed; do not edit it. Use the market-tile skill only for the dynamic Positive/Negative card tiles.
4. Send via mcp__resend__send-email per config (from / to / subject).

Before sending, confirm NO {{ }} placeholders remain. If any fetch fails, STOP and do not send.
```

Replace BASE with your real base (Worker URL + `/f/` + secret). The secret is a bearer in the URL, so treat the task prompt as sensitive.

## Security notes

- Token is a fine-grained PAT, read-only Contents, this repo only. Rotate periodically.
- Access is gated by the secret path segment; anyone with the full URL can read the served files. That is proportionate for these template files. If the repo later holds sensitive prompts, add a stronger gate (e.g. Cloudflare Access) rather than relying on the secret path.
- The Worker only serves paths under `shared/` and `emails/`, and rejects `..`.
