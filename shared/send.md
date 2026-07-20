# Shared delivery (send)

Delivery layer, fetched at run time. Follow this last, once the HTML is fully assembled per the email's brief and the shell in `shared/format.md`.

<inputs>
Read these from the sending email's `config.yaml`:
- `subject` - the email subject line.
- `from` - sender address (framework default: claude@updates.dunn.fm).
- `to` - one or more recipient addresses, OR
- `audience_id` - a Resend audience ID to send to instead of an inline `to` list.
Exactly one of `to` / `audience_id` should be set. If both are present, prefer `audience_id`.
</inputs>

<procedure>
1. Confirm the HTML is complete: every {{...}} placeholder from the shell and the email's components has been substituted. If any `{{` remains in the body, stop and fix it before sending - never send a template with unfilled placeholders.
2. Send using the resend MCP server or if not available, use the resend.com API using curl with a direct POST https://api.resend.com/emails using the RESEND_API_KEY from the environment:
   - Inline recipients (`to`): call `mcp__resend__send-email` with `from`, `to`, `subject`, and `html` = the assembled document.
   - Audience (`audience_id`): the distribution list is managed in Resend, not in these files. Resolve the audience's contacts and send. For a single shared list this is a batch send via `mcp__resend__send-batch-emails`; for a true newsletter-style blast, a Resend broadcast to the audience is the cleaner path. Pick based on the email's config and note which you used.
3. Do not modify the HTML during sending. Formatting decisions belong to `shared/format.md` and the email's brief, not here.
</procedure>

<why_audiences_live_in_resend>
Distribution lists are kept in Resend (audiences/segments), referenced by `audience_id`, rather than hardcoded in each email's config. That way a recipient is added or removed in one place and every email that targets that audience picks up the change, with no email addresses duplicated across these files.
</why_audiences_live_in_resend>

<defaults>
from: claude@updates.dunn.fm
</defaults>
