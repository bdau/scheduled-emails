# <Email name> - content brief

The what-to-say layer for this email. House look comes from `shared/format.md`; delivery from `shared/send.md`; run-time settings from `config.yaml` in this folder. This file owns the research spec, any email-specific components, and the body layout.

<objective>
Who this email is for and what it should tell them.
</objective>

<schedule_context>
Cadence and the lookback window for what counts as "new".
</schedule_context>

<sources>
Which sources are allowed. Exclude blogs and aggregators that don't cite a primary source.
</sources>

<research_instructions>
- Note the publication date of every fact.
- Flag conflicting sources rather than silently picking one.
- Do not fabricate figures, quotes, or attributions.
- If a section has nothing material in the window, say so; do not pad.
- Follow shared/house-style.md for voice and tone.
</research_instructions>

## Sections (in order)

Describe each section and the placeholders it fills. Reuse the section_header and source_link components from shared/format.md. Keep any component only this email uses down here; promote to shared/format.md once a second email needs it.

## Body layout ({{BODY_CONTENT}} for the shared/format.md shell)

Assemble the sections into this block and pass it as {{BODY_CONTENT}} to the shell in shared/format.md. Fill the section placeholders you defined above.
```html
  <!-- SECTION ONE -->
  <tr><td style="padding:24px 28px 4px 28px;">
    <!-- section_header from shared/format.md, then this section's content -->
  </td></tr>
```

## Execution notes
- {{DATE}} is today's date, formatted like "9 July 2026" (bash: `date +"%-d %B %Y"`).
