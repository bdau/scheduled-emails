# scheduled-emails

Source of truth for scheduled research emails. Each email runs as a Claude cloud scheduled task that fetches these files at run time and sends via Resend. Nothing is copied into the tasks, so this repo is the one place to edit.

## How it runs

Each scheduled task carries a short prompt (see `TASK-PROMPT-TEMPLATE.md`) that fetches the shared files plus one email's files from this repo's raw URLs, does the research, assembles the HTML, and sends. Tasks are created with no folder attached, which is what makes them run in the cloud rather than on the laptop.

Layered so the shared look and delivery live once and each email owns only its content:

```
scheduled-emails/
  shared/
    format.md          the HTML shell, design tokens, universal components
    send.md            delivery instructions (Resend, recipients/audience)
    house-style.md     voice and tone common to all emails
  emails/
    daily-market-update/
      brief.md         research spec, email-specific components, body layout
      config.yaml      title, brand, subject, from, to/audience, schedule, footer
    _template/         copy this to start a new email
  TASK-PROMPTS/
    TASK-PROMPT-xxx.md the prompt to be pasted into the scheduled task in Claude
  README.md
```

## Publishing with tags

Point the tasks at a pinned tag (e.g. `.../scheduled-emails/v1/...`) rather than `main`. Edit on `main`, and when a change is ready to go live, move the tag:

```
git tag -f v1 && git push -f origin v1
```

That gives you an explicit publish step so a work-in-progress commit never hits a 5am run. If you prefer latest-always, point the tasks at `main` and just push complete changes.

## Runbooks

Change the house look (affects every email): edit `shared/format.md`, commit, publish. Every email picks it up on its next run.

Change one email: edit files under `emails/<name>/`, commit, publish. Only that email changes.

Add an email: copy `emails/_template/` to `emails/<name>/`, fill `brief.md` and `config.yaml`, commit, publish. Then create one cloud scheduled task from `TASK-PROMPT-xxx.md` with the new name and no folder attached. Click Run now once to test and pre-approve tools.

Change a schedule or pause a task: edit the task's cron time or enabled state in the Cowork scheduled-tasks view (or ask Claude to update it). The `schedule` field in `config.yaml` is a human-readable mirror; the task is the source of truth.

## Notes

- Keep nothing secret in this repo. Recipient lists live in Resend as audiences (referenced by `audience_id`), not here. The from-address is not a secret. This lets the repo be public, which keeps fetching simple.
- Everything a run needs is cloud-available: web fetch, web search, the market-tile endpoint (public URL), and Resend (a connector).
- After creating or repointing a task, Run now once so it pre-approves web search, web fetch, market-tile, and Resend; otherwise a scheduled run can stall on a permission prompt.
