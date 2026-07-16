# Scheduled-task prompt: daily-ai-ecosystem-news

This is the thin orchestration prompt for the scheduled task. Once you've verified the framework reproduces the current email, this replaces the body of the live task's SKILL.md. It stays deliberately short: the substance lives in the framework files it points to.

---

Produce and send Ben's daily AI ecosystem briefing email using the email framework. Each run starts fresh with no memory, so read the files below every time.

1. Read the config: `.../emails/daily-ai-ecosystem-news/config.yaml`.
2. Read the content brief: `.../emails/daily-ai-ecosystem-news/brief.md`. Do the research and build the section content exactly as it specifies.
3. Read the shared look-and-feel: `.../skills/email-format/SKILL.md`. Assemble the section content into the brief's body layout, then drop that into the email-format shell. Fill {{EMAIL_TITLE}}, {{BRAND}}, {{DATE}}, {{FOOTER_TEXT}} from config.
4. Read the delivery skill: `.../skills/email-send/SKILL.md`. Send per config (from / to / subject).

Before sending, confirm no `{{` placeholders remain in the assembled HTML.

Note: if any of the four files above cannot be read, stop and do not send a partial email.
