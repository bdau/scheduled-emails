# Daily AI ecosystem news - content brief

The what-to-say layer for this email. The house look (shell, section headers, source links) comes from `skills/email-format`; delivery comes from `skills/email-send`; run-time settings come from `config.yaml` in this folder. This file owns the research spec, the market-specific components, and the body layout.

## Objective
A daily briefing of key news in the AI and LLM ecosystem to inform on significant changes in the AI world, evolutions in approaches and new features emerging in the key models (Claude, ChatGPT, Copilot, Gemini, Deepseek etc.).

## Lookback Window
Daily email. Include only things mentioned in articles from the last 36 hours (see `lookback_hours` in config).

## Sources
Sources to scan:
WSJ.com
FT.com
Bloomberg.com
CNBC.com
Reuters.com
ZeroHedge.com
MarketWatch.com
www.artificialintelligence-news.com
techcrunch.com

Additional reddit sources to scan:
reddit.com/r/artificial/
reddit.com/r/claude/
reddit.com/r/ClaudeAI
reddit.com/r/ClaudeCode
reddit.com/r/ClaudeHomies
reddit.com/r/OpenAI
reddit.com/r/ChatGPT
reddit.com/r/ChatGPTPro
reddit.com/r/ChatGPTCoding
reddit.com/r/GeminiAI
reddit.com/r/Bard
reddit.com/r/GoogleGeminiAI
reddit.com/r/artificial
reddit.com/r/singularity
reddit.com/r/MachineLearning
reddit.com/r/LLMDevs
reddit.com/r/agi
reddit.com/r/AI_Agents
reddit.com/r/AgentsOfAI
reddit.com/r/LLMDevs
reddit.com/r/LocalLLaMA
reddit.com/r/LocalLLM
reddit.com/r/PromptEngineering
reddit.com/r/PromptDesign

## Research Instructions
- Stay within each section's research focus; do not let findings bleed across sections.
- Note the publication date of every fact used.
- Flag conflicting information between sources rather than silently picking one.
- Do not fabricate figures, quotes, or attributions.
- If a section has no material developments in the lookback window, say so explicitly rather than padding with old news.
- Research with the WebSearch and web_fetch tools, restricted to the listed sources and the last 36 hours.
- Tone: neutral, analytical, no hype language.

## Sections (in order)
Each section is one section_wrapper row from email-format, containing a section_header plus the content described below. The five section headers already appear pre-built in the body layout at the end of this file.

### Section - Summary
A short summary of the content below for a quick read. Populate {{SUMMARY_BODY}} with the prose and {{SUMMARY_SOURCES}} with the source list (each source a site-name link built with the email-format source_link component).

Split into paragraphs to make it easy to read if required. For example, if one sentence relates to one topic and the next relates to completely different topic, split it into a new paragraph.

#### Example

### Section - Major AI News
Select the major news stories about the AI world including the companies at the forefront, regulatory developments, market reactions etc. and summarise each. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - Models
Select the key updates on LLM models (for example, new models variants, changes in pricing, new features) and summarise each. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - Services, APIs, and MCP Servers
Select the key updates on new services, APIs, MCP servers etc. that are made available for use in AI agents or have upgraded features made available and summarise each. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - AI Agent Use Cases
Identify mentions of novel AI agent use cases and share summarised examples of how these are being used and deployed. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).

### Section - Personal Assistant Agents
Identify mentions any new approaches to using AI as a personal assistant with examples of practical use cases summarised. For each topic, produce ONE card: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link).


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