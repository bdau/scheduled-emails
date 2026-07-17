# Claude Global Instructions Review - content brief

The what-to-say layer for this email. The house look (shell, section headers, source links) comes from `skills/email-format`; delivery comes from `skills/email-send`; run-time settings come from `config.yaml` in this folder. This file owns the research spec, the market-specific components, and the body layout.

## Objective
Review my Claude.ai global profile instructions (Settings > Profile) against current best practices from reputable sources, and produce specific, actionable recommendations for improvement. Do not rewrite my instructions in full — give targeted recommendations I can choose to apply myself, manually, via Settings > Profile.

## Scope
IN SCOPE: my global profile instructions as currently active in this conversation (the content injected via Settings > Profile).
OUT OF SCOPE: general prompting technique for one-off tasks, other AI platforms' custom instruction features, project-specific instructions, per-conversation preferences, Claude's separate memory system.

## Steps
### Step 1 — State current instructions

Before doing anything else, state the full text of my current global profile instructions verbatim, exactly as they appear to you in this session. If you cannot detect any, stop and tell me rather than guessing or proceeding.

### Step 2 — Research
Search for current, reputable guidance specifically on writing global/custom instructions for Claude.ai, in this priority order:

- Anthropic's own documentation: docs.claude.com and support.claude.com. Look specifically for pages on Settings > Profile, custom instructions, user preferences, and the general prompt engineering guide.
- Anthropic's public blog or engineering posts, if relevant.
- Other reputable sources (established prompt engineering references, credible practitioner writeups) — only if they add something Anthropic's own docs don't cover. Label anything from this tier explicitly as "practitioner opinion, not Anthropic-verified."

Do not pull in generic advice written for ChatGPT or other platforms' custom instruction features. Run as many searches as the topic needs (expect roughly 5–15) and prioritize anything published or updated recently, since this feature is still evolving. If you have access to the output of a previous run of this same review, note what's changed since then; otherwise treat this as a fresh review.

### Step 3 — Analyze
Cross-reference my current instructions against what you found. Identify:

Ambiguity — any rule you personally have to interpret or guess at when applying it to a real request
Redundancy — rules that overlap or restate each other
Conflicts — rules that pull in different directions
Gaps — best practices you found that my instructions don't address at all
Misfires — rules that, based on how the system actually parses instructions (e.g. handling of "always," behavioral vs. contextual preference rules, conflicts between stated style and stated preferences), may not do what I intend

### Step 4 — Recommend
For each recommendation, give: what to change, why, which finding/source it's based on (confidence level: Anthropic-documented / practitioner opinion / your own inference from how you apply the rule), and any tradeoff. Group into: Keep as-is / Modify / Remove / Add. Lead with the highest-impact items first. Do not produce a full rewritten version of my instructions unless I ask for one separately in a follow-up.

## Output rules
Apply my standing voice and honesty preferences: direct, no flattery, lead with the answer/recommendation, cite sources, flag anything you're unsure about, use the full range of criticism rather than softening it.

Each recommendation is in a single card as defined below.

## Citation requirements
Summary: end each recommendation with its source list in {{SUMMARY_SOURCES}}, each source a site-name hyperlink built with the email-format source_link component, separated by a single space. Each card's sources are site-name source_link hyperlinks; any in-body prose link uses the email-format link component. Every &lt;a&gt; must carry the inline style from its template.

# HTML formatting

## Recomendation card
```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 14px 0;border:1px solid #1e2733;border-radius:3px;overflow:hidden;background:#0f141c;">
  <tr><td bgcolor="#0c1a15" style="background:#0c1a15;border-left:4px solid #b5c716;padding:12px 16px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:23px;font-weight:700;color:#d5dce6;">&nbsp;&nbsp;{{RECOMMENDATION_TITLE}}</td></tr>
  <tr><td valign="top" style="padding:14px 16px 16px 16px;border-left:4px solid #1e2733;">
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:21px;line-height:1.6;color:#d5dce6;">{{BODY}}</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;color:#7c8794;margin-top:8px;">Sources: {{RECOMMENDATION_SOURCES}}</div>
  </td></tr>
</table>
```

## Body layout ({{BODY_CONTENT}} for the email-format shell)
Assemble this block and pass it as {{BODY_CONTENT}} to the email-format shell. Placeholders to fill: {{RECOMMENDATION_CARDS}}. The section headers here are the email-format section_header component.

```html
  <!-- RECOMMENDATION CARDS -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:20px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d5dce6;padding:0 0 10px 0;border-bottom:2px solid #1e2733;margin:0 0 18px 0;"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#16c784;margin-right:8px;vertical-align:middle;"></span>Positive</div>
    {{RECOMMENDATIONS}}
  </td></tr>
```

## Execution notes
- {{DATE}} is today's date, formatted like "9 July 2026" (bash: `date +"%-d %B %Y"`).