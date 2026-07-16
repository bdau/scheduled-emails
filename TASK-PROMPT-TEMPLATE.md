# Scheduled-task prompt template

This is the prompt you paste into a Claude cloud scheduled task. It is identical for every email except the email name and the raw base URL. Create the task with NO folder attached so it runs in the cloud.

Set two values before using:
- RAW_BASE = the raw base URL of your repo at a pinned ref, e.g.
  https://raw.githubusercontent.com/<owner>/scheduled-emails/v1
  (use a tag like `v1` so a half-finished push never hits a live run; move the tag to publish)
- EMAIL = the folder name under emails/, e.g. daily-market-update

---

## Template (replace RAW_BASE and EMAIL)

```
Run the "EMAIL" scheduled email. Each run starts fresh with no memory, so fetch and follow these files every time (use web_fetch):

  RAW_BASE/shared/format.md
  RAW_BASE/shared/house-style.md
  RAW_BASE/shared/send.md
  RAW_BASE/emails/EMAIL/brief.md
  RAW_BASE/emails/EMAIL/config.yaml

Steps:
1. Read config.yaml for title, brand, subject, from, to (or audience_id), footer_text, and any content parameters.
2. Do the research and build the section content exactly as brief.md specifies.
3. Assemble the sections into brief.md's body layout, then drop that into the shell in format.md. Fill {{EMAIL_TITLE}} (=title), {{BRAND}} (=brand), {{DATE}} (today, like "9 July 2026"), {{FOOTER_TEXT}} (=footer_text).
4. Send per send.md and config.yaml (via mcp__resend__send-email).

Before sending, confirm NO {{ }} placeholders remain in the assembled HTML. If any fetch fails, STOP and do not send a partial email.
```

## Filled example: daily-market-update

```
Run the "daily-market-update" scheduled email. Each run starts fresh with no memory, so fetch and follow these files every time (use web_fetch):

  https://raw.githubusercontent.com/<owner>/scheduled-emails/v1/shared/format.md
  https://raw.githubusercontent.com/<owner>/scheduled-emails/v1/shared/house-style.md
  https://raw.githubusercontent.com/<owner>/scheduled-emails/v1/shared/send.md
  https://raw.githubusercontent.com/<owner>/scheduled-emails/v1/emails/daily-market-update/brief.md
  https://raw.githubusercontent.com/<owner>/scheduled-emails/v1/emails/daily-market-update/config.yaml

Steps:
1. Read config.yaml for title, brand, subject, from, to, footer_text, lookback_hours.
2. Do the research and build the section content exactly as brief.md specifies (Summary, Sentiment for the 14 markets, Positive and Negative cards with resolved market-tile images). Use WebSearch and web_fetch, restricted to the listed sources and the last 36 hours.
3. Assemble the sections into brief.md's body layout, then drop that into the shell in format.md. Fill {{EMAIL_TITLE}}, {{BRAND}}, {{DATE}}, {{FOOTER_TEXT}} from config. The 13-tile market grid in the body layout is fixed; do not edit it. Use the market-tile skill only for the dynamic Positive/Negative card tiles.
4. Send via mcp__resend__send-email per config (from / to / subject).

Before sending, confirm NO {{ }} placeholders remain. If any fetch fails, STOP and do not send.
```
