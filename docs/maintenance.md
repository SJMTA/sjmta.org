# Maintenance notes

## Code organization

The homepage was previously assembled from JavaScript string concatenation and numeric navigation IDs. Its complete content now lives in `index.html`, with ordinary links to the existing pages. `src/scripts/home.js` only controls the mobile menu and the header background while scrolling. The homepage remains readable and navigable with JavaScript disabled.

Each detail page retains its content, published URL, section IDs, document links, and individual visual theme. Embedded and inline styles have been moved to `src/styles/pages/`. No document or image was removed or renamed during this refactor.

The unused game-template helpers, XML loader and sample XML, image preloader, old jQuery/jQuery UI libraries, unused page prototype, and superseded stylesheets were removed. They remain recoverable in Git history; the last pre-refactor revision is `2e1a569`. The homepage uses native browser scrolling and ordinary anchor navigation instead of nested scroll containers and inline click handlers.

The Python checker validates local paths, anchors, basic document structure, and CSS asset paths. The browser checker exercises all pages at 1440, 390, and 320 pixels, checks for broken local resources and overflow, and verifies homepage interaction. During refactoring, its optional `CONTENT_BASELINE` input compares rendered text, links, and detail-page IDs against snapshots of the original site.

## Content questions carried forward

These are existing editorial issues, separate from the code refactor. Do not invent replacement information:

- `JPRA.html`: the “Juried Recital Audition and Concert Student Release Form” link points to `Technique_Competition_Required_Repertoire.pdf`. The correct release form has not been supplied. Preserve the existing file; replace the link when the correct form arrives.
- `JPRA.html`: in-person dates were updated from the 2026–2027 calendar, but the older video-submission and recording instructions were not replaced by that document. Confirm those separately.
- The 2026–2027 calendar lists two October board-meeting alternatives. Both were retained as supplied.
- The latest technique-competition document supplies a $25 competition fee, but does not supply updated theory-test fees. The conflicting older fee amounts were removed; confirm any new theory-test fees before publishing them.
- The new Masterclass application supplies the event date, venue, deadline, and application contact, but does not confirm a performance time or guest biography. The previous biography was removed at SJMTA’s request; the old event time was not carried into the new date heading.
- General pages can contain older venue or schedule descriptions (for example, the Contact page refers to Jacobs Music while other pages refer to Cunningham Piano). Confirm with SJMTA before changing their wording.

The October 20 Student Musicale document supersedes the previous fee information: $20 per solo piece and $25 per duet; when a student enters both, it specifies $10 for the solo plus $12.50 for half of the duet. The download points to `Student Musicale information (1).docx`. Do not change this calculation without new instructions.

The October 20 Technique Competition PDF is byte-for-byte identical to the earlier 2027 PDF. The page and download retain the existing URL to avoid creating a redundant public copy.
