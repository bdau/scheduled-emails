# Iran war news - content brief

The what-to-say layer for this email. The house look (shell, section headers, source links) comes from `skills/email-format`; delivery comes from `skills/email-send`; run-time settings come from `config.yaml` in this folder. This file owns the research spec, the market-specific components, and the body layout.

## Objective
A daily briefing of key news relating to the war in Iran, military actions, negotiation progress, impacts of the war in the region, global impacts of the war, international reaction and particularly anything relating to Qatar specifically.

## Lookback Window
Daily email. Include only things mentioned in articles from the last 36 hours (see `lookback_hours` in config).

## Sources
Sources to scan:
- major news outlets including but not only CNN, BBC, Aljazeera, Axios
- local news outlets in the Middle East
- relevant military blogs

## Research Instructions
- Stay within each section's research focus; do not let findings bleed across sections.
- Note the publication date of every fact used.
- Flag conflicting information between sources rather than silently picking one.
- Do not fabricate figures, quotes, or attributions.
- If a section has no material developments in the lookback window, say so explicitly rather than padding with old news.
- Research with the WebSearch and web_fetch tools only, restricted to the listed sources and the last 36 hours. Do not use Claude in Chrome, Playwright, or any other browser-automation tool — no browser tabs should be opened.
- Tone: neutral, analytical, no hype language.

## Sections (in order)
Each section is one section_wrapper row from email-format, containing a section_header plus the content described below. The five section headers already appear pre-built in the body layout at the end of this file.

### Section - Summary
A short 1-paragrapha summary of the content below for a quick read. Populate {{SUMMARY_BODY}} with the prose and {{SUMMARY_SOURCES}} with the source list (each source a site-name link built with the email-format source_link component).

### Section - Military Action
Select the major news stories about military actions, escalations and changes in strategy. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - Negotiations
Select the major news stories relating to the progress of negotiations and summarise each. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - Qatar Specific
Select the major news stories relating to Qatar involvements or impacts on Qatar and summarise each. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - Impacts in the Middle East
Select the major news stories relating to impacts of the war in the Middle East region in terms of economic impacts, business impacts, tourism impacts, impacts on residents etc. and summarise each. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - International Impacts
Select the major news stories relating to impacts of the war on the rest of the world in terms of economic impacts, business impacts, travel impacts etc. and summarise each. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).


## Citation requirements
Summary: end each section with its source list in {{SUMMARY_SOURCES}}, each source a site-name hyperlink built with the email-format source_link component, separated by a single space. Each card's sources are site-name source_link hyperlinks; any in-body prose link uses the email-format link component. Every &lt;a&gt; must carry the inline style from its template.

# HTML formatting

## News items
```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 14px 0;border:1px solid #1e2733;border-radius:3px;overflow:hidden;background:#0f141c;">
  <tr><td bgcolor="#0c1a15" style="background:#0c1a15;border-left:4px solid #b5c716;padding:12px 16px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:23px;font-weight:700;color:#d5dce6;">&nbsp;&nbsp;{{HEADLINE}}</td></tr>
  <tr><td valign="top" style="padding:14px 16px 16px 16px;border-left:4px solid #1e2733;">
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:21px;line-height:1.6;color:#d5dce6;">{{BODY}}</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;color:#7c8794;margin-top:8px;">Sources: {{ITEM_SOURCES}}</div>
    <div style="margin-top:12px;">{{ITEM_TILES}}</div>
  </td></tr>
</table>
```

## Body layout ({{BODY_CONTENT}} for the email-format shell)
Assemble this block and pass it as {{BODY_CONTENT}} to the email-format shell. Placeholders to fill: {{SUMMARY_BODY}}, {{SUMMARY_SOURCES}}, {{NEWS_ITEMS}}. The section headers here are the email-format section_header component.

```html
  <!-- SUMMARY -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:20px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d5dce6;padding:0 0 10px 0;border-bottom:2px solid #1e2733;margin:0 0 18px 0;">Summary</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:21px;line-height:1.65;color:#d5dce6;">{{SUMMARY_BODY}}</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;line-height:1.5;color:#7c8794;margin-top:10px;">{{SUMMARY_SOURCES}}</div>
  </td></tr>

  <!-- NEWS ITEMS -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:20px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d5dce6;padding:0 0 10px 0;border-bottom:2px solid #1e2733;margin:0 0 18px 0;"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#16c784;margin-right:8px;vertical-align:middle;"></span>Positive</div>
    {{NEWS_ITEMS}}
  </td></tr>
```

## Execution notes
- {{DATE}} is today's date, formatted like "9 July 2026" (bash: `date +"%-d %B %Y"`).