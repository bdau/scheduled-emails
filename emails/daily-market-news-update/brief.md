# Daily Market Update - content brief

The what-to-say layer for this email. The house look (shell, section headers, source links) comes from `skills/email-format`; delivery comes from `skills/email-send`; run-time settings come from `config.yaml` in this folder. This file owns the research spec, the market-specific components, and the body layout.

## Objective
A daily market briefing to inform an investment professional interested in the major market-moving news, general sentiment in markets, emerging risks, geopolitical and policy decisions that impact markets, broad themes affecting markets and sentiment, and indications of major market moves.

## Lookback Window
Daily email. Include only things mentioned in articles from the last 36 hours (see `lookback_hours` in config).

## Sources
WSJ.com, FT.com, Bloomberg.com, CNBC.com, Reuters.com, ZeroHedge.com, MarketWatch.com, ft.com/alphaville, economist.com, nikkei.com, sell-side research, central bank releases, company filings, regulatory filings.

## Credibility Criteria
Use only established financial media like those listed above. Exclude blogs, unverified social media, and aggregators that don't cite a primary source.

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
A short summary of the content below for a quick read. Populate {{SUMMARY_BODY}} with the prose and {{SUMMARY_SOURCES}} with the source list (each source a site-name link built with the email-format source_link component).

Split into paragraphs to make it easy to read if required. For example, if one sentence relates to equity markets and the next relates to another asset class or economic news, split it into a new paragraph.

#### Example
Soft June US inflation is setting the tone for markets with headline CPI falling 0.4% on the month (the biggest monthly drop in over six years), pulling annual inflation to 3.5% (down from 4.2% and beating the 3.8% consensus). Core inflation was flat at 2.6% YoY. Markets have now reduced the odds of a July Fed hike to about 17% from 42%. On the back of this, Treasury yields fell and the dollar weakened.

US equities rose on 14 July (S&P 500 +0.4%, Nasdaq Composite +0.9%), helped along by earnings beats from Goldman Sachs, JPMorgan, Bank of America and Wells Fargo and by a rebound in semiconductors after recent weakness. Asia extended the move into 15 July, with Korea's Kospi surging at the open (SK Hynix +10%, Samsung +6%) and mainland China up 2.15% after June exports grew at their fastest pace since 2021.

The main offsetting factor is the US-Iran conflict escalation with the US striking  about 90 targets overnight, a reinstated shipping "blockade" on the Strait of Hormuz and Hormuz traffic down about 52% week on week. This kept Brent near $85 and WTI 
near $80.

### Section - Market Tiles and Yield Tiles
The market-performance grid is should display tiles for each ticker listed below in the order provided using the market-tile skill and yield-tile skill (for bonds and interest rates). The tickers are listed below in sections. For each section, include a title and then show the market tiles for that section. Build one tile_img per instrument and lay them out in {{MARKET_AND_YIELD_TILES}} using the tile_grid component, MAXIMUM three tiles per row. If a number is listed in brackets after the ticker and label, this is the number of decimal level to be shown, and this should be used by the market-tile skill to pass to the market-tile API.

Equities:
  GSPC.INDX S&P500 (0)
  STOXX50E.INDX Euro Stoxx 50 (0)
  BUK100P.INDX FTSE 100 (0)

  N225.INDX Nikkei 225 (0)
  000001.SHG SSE Composite (0)
  AXJO.INDX S&P/ASX200 (0)

  NDX.INDX Nasdaq 100 (0)
  IXIC.INDX.INDX Nasdaq Composite (0)

Themes:
  SOX.INDX SOX (0)
  MAGS.US MAG7 (2)
  
Volatiity:
  VIX.INDX VIX (1)
  SKEW.INDX SKEW (1)

FX
  DXY.INDX DXY (2)
  EURUSD.FOREX EUR (2)
  USDJPY.FOREX JPY (2)

  GBPUSD.FOREX GBP (2)
  AUDUSD.FOREX AUD (2)

Crypto:
  BTC-USD.CC Bitcoin (0)
  ETH-USD.CC Ethereum (0)

Commodities:
  GC.COMM Gold (0)
  SI.COMM Silver (2)
  HG.COMM Copper (2)

  CL.COMM WTI Crude (2)
  BZ.COMM Brent Crude (2)

Yields:
  US10Y.GBOND US 10Y (2)
  UK10Y.GBOND UK 10Y (2)
  DE10Y.GBOND Germany 10Y (2)
  JP10Y.GBOND Japan 10Y (2)
  AU10Y.GBOND Australia 10Y (2)

### Section - Positive News
Select the key topics with positive market sentiment and summarise each. For each topic, produce ONE card using the positive_item component: a 30-60 word body in {{BODY}}, a short headline in {{HEADLINE}}, and site-name source links in {{ITEM_SOURCES}} (email-format source_link). Identify EVERY instrument the topic mentions (each company/stock, asset class, commodity, currency, cryptocurrency) and resolve each to an EODHD SYMBOL.EXCHANGE ticker with the market-tile skill (use the relevant index tile for a sector or broad asset class). Build one tile_img per instrument and lay them out in {{ITEM_TILES}} using the tile_grid component, MAXIMUM three tiles per row. If the topic mentions no tradable instrument, leave {{ITEM_TILES}} empty. Concatenate all cards into {{POSITIVE_ITEMS}}.

#### Example
Headline CPI fell 0.4% MoM in June to a 3.5% annual rate (from 4.2%), beating the 3.8% consensus, while core was flat m/m at a 2.6% annual rate, down from 2.9%. This is unusual because the Fed under new Chair Kevin Warsh had been leaning hawkish and flirting with a hike, not a cut, due to an Iran-conflict energy price shock, with funds still parked at 3.50-3.75%.

CME FedWatch odds for a July 29 hike dropped from 42% to 17% on the print (other trackers showed roughly 8-14%). September hike odds stayed near 60%.

Yields, the dollar, and risk assets all reacted as you'd expect: the 10-year fell about 2bp to 4.583%, the 2-year fell about 7bp to 4.185%, the dollar index eased 0.1%, gold rose 0.46% to $4,058.78, and equity futures rose with small caps leading.

The catch is that the ceasefire behind the energy relief has already broken down, oil spiked back above $86, and July hike odds were at 46.5% just a day before this print, so the move could reverse fast.

### Section - Negative News
Same as Positive, but for topics with negative market sentiment. Use the negative_item component for each card and concatenate into {{NEGATIVE_ITEMS}}.
</section>

## Citation requirements
Summary: end each section with its source list in {{SUMMARY_SOURCES}}, each source a site-name hyperlink built with the email-format source_link component, separated by a single space. Positive and Negative: each card's sources are site-name source_link hyperlinks; any in-body prose link uses the email-format link component. Every &lt;a&gt; must carry the inline style from its template.

## Market-specific components
Repeat these once per row / item / tile. Substitute only the {{...}} placeholders; leave every style attribute exactly as written. (These live here, not in email-format, because only this email currently uses them. Promote to email-format if a second email needs them.)

# HTML formatting

## Positive News items
```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 14px 0;border:1px solid #1e2733;border-radius:3px;overflow:hidden;background:#0f141c;">
  <tr><td bgcolor="#0c1a15" style="background:#0c1a15;border-left:4px solid #16c784;padding:12px 16px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:23px;font-weight:700;color:#d5dce6;"><span style="color:#16c784;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:18px;font-weight:700;">&#9650;</span>&nbsp;&nbsp;{{HEADLINE}}</td></tr>
  <tr><td valign="top" style="padding:14px 16px 16px 16px;border-left:4px solid #1e2733;">
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:21px;line-height:1.6;color:#d5dce6;">{{BODY}}</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;color:#7c8794;margin-top:8px;">Sources: {{ITEM_SOURCES}}</div>
    <div style="margin-top:12px;">{{ITEM_TILES}}</div>
  </td></tr>
</table>
```


## Negative News items
```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:0 0 14px 0;border:1px solid #1e2733;border-radius:3px;overflow:hidden;background:#0f141c;">
  <tr><td bgcolor="#1a0f12" style="background:#1a0f12;border-left:4px solid #ea3943;padding:12px 16px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:23px;font-weight:700;color:#d5dce6;"><span style="color:#ea3943;font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:18px;font-weight:700;">&#9660;</span>&nbsp;&nbsp;{{HEADLINE}}</td></tr>
  <tr><td valign="top" style="padding:14px 16px 16px 16px;border-left:4px solid #1e2733;">
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:21px;line-height:1.6;color:#d5dce6;">{{BODY}}</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;color:#7c8794;margin-top:8px;">Sources: {{ITEM_SOURCES}}</div>
    <div style="margin-top:12px;">{{ITEM_TILES}}</div>
  </td></tr>
</table>
```

## Market tile and Yield tile image
One &lt;img&gt; per instrument tile. Width 168 so three tiles fit across a card row. Build the &lt;img&gt; from the resolved tile URL (leave the URL's size=390 parameter as-is for a sharp image); do NOT paste the skill's default width=390 markup.
```html
<img src="{{TILE_URL}}" width="168" alt="{{LABEL}}" style="display:block;width:168px;max-width:168px;height:auto;border:0;border-radius:3px;">
```

## Market tile and Yield tile grid
Wraps a card's tiles, MAXIMUM three per row. Up to three tile_img blocks, each in its own &lt;td&gt;, inside one &lt;tr&gt;; start a new &lt;tr&gt; after every third. Drop unused &lt;td&gt; cells in the final row. The whole table is the value of {{ITEM_TILES}}.
```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td align="center" valign="top" style="padding:4px;">{{TILE_1}}</td>
    <td align="center" valign="top" style="padding:4px;">{{TILE_2}}</td>
    <td align="center" valign="top" style="padding:4px;">{{TILE_3}}</td>
  </tr>
</table>
```

## Body layout ({{BODY_CONTENT}} for the email-format shell)
Assemble this block and pass it as {{BODY_CONTENT}} to the email-format shell. Placeholders to fill: {{SUMMARY_BODY}}, {{SUMMARY_SOURCES}}, {{POSITIVE_ITEMS}}, {{NEGATIVE_ITEMS}}. The market-performance grid is fixed; do not edit it. The section headers here are the email-format section_header component (Positive/Negative carry the status-dot span).

```html
  <!-- SUMMARY -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:20px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d5dce6;padding:0 0 10px 0;border-bottom:2px solid #1e2733;margin:0 0 18px 0;">Summary</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:21px;line-height:1.65;color:#d5dce6;">{{SUMMARY_BODY}}</div>
    <div style="font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;line-height:1.5;color:#7c8794;margin-top:10px;">{{SUMMARY_SOURCES}}</div>
  </td></tr>

  <!-- MARKET PERFORMANCE (grid is fixed; do not edit) -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:20px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d5dce6;padding:0 0 10px 0;border-bottom:2px solid #1e2733;margin:0 0 18px 0;">Market Performance</div>
    {{MARKET_AND_YIELD_TILES}}
  </td></tr>

  <!-- POSITIVE -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:20px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d5dce6;padding:0 0 10px 0;border-bottom:2px solid #1e2733;margin:0 0 18px 0;"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#16c784;margin-right:8px;vertical-align:middle;"></span>Positive</div>
    {{POSITIVE_ITEMS}}
  </td></tr>

  <!-- NEGATIVE -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <div style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:20px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#d5dce6;padding:0 0 10px 0;border-bottom:2px solid #1e2733;margin:0 0 18px 0;"><span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:#ea3943;margin-right:8px;vertical-align:middle;"></span>Negative</div>
    {{NEGATIVE_ITEMS}}
  </td></tr>
```

## Execution notes
- {{DATE}} is today's date, formatted like "9 July 2026" (bash: `date +"%-d %B %Y"`).
- The 13-tile grid is embedded above and is fixed. Use the market-tile skill or yield-tile skill (for bonds and interest rates) only for the dynamic tiles inside Positive/Negative cards: resolve the instrument to SYMBOL.EXCHANGE, decide if a market tile or yield tile is appropriate and then wrap the resulting tile URL in the tile_img component.

