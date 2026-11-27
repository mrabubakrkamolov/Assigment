# Week 13 — Student Profile Editor

Week 13 (Monday) homework: a controlled React form for editing a student profile, styled with a Spider-Man inspired red/blue comic theme.

## Files

| File | Description |
| --- | --- |
| `index.html` | React UMD + Babel standalone single-page Student Profile Editor |
| `styles.css` | Spider-Man themed styling: red/blue comic palette, web motifs, badge and preview card |

## Homework requirements implemented

- Fields: `name`, `studentId` (exactly 10 digits), `major` dropdown, `year` radio (1–4), `bio`, `photo` (file input + preview)
- All fields are required, including the photo
- Student ID validation: exactly 10 digits
- Bio validation: required and under 200 characters
- Live bio counter: `0 / 200` … `199 / 200`, with a progress bar and over-limit state
- On valid submit: a **Profile Preview** card with photo, name, ID, year, major, bio, character count and skills
- Stretch: skills as tags — `Enter` adds, `×` removes

## React patterns used

- `value={state}` + `onChange` for controlled inputs
- One shared `handleChange` using `e.target.name` and the computed key `[name]`
- `select` and `textarea` use `value`; radios use `checked`
- `e.preventDefault()` in `onSubmit`
- An `errors` object; an empty object means the form is valid
- `useRef` for the uncontrolled file input
- Accessibility: `label htmlFor`, `aria-invalid`, `aria-describedby`, visible error messages with `role="alert"`

## Theme notes

- Red/blue comic-book contrast with bold uppercase headings and offset shadows
- CSS-only web lines in the card corners and a faint web grid in the page background
- Comic `Thwip!` burst, spider marker, tag pills and a hero-style preview card
- No external image assets are required

## Local verification

- Empty submit shows all 6 required-field errors and focuses the first invalid field.
- Invalid ID (`123`), a 200-character bio and no photo show exactly 3 errors; no preview is rendered.
- Valid submit (`2024123456`, 77-character bio, image uploaded) renders the Profile Preview card and clears every error.
- The live counter moves from `0 / 200` to `200 / 200` with an over-limit state, then back to `77 / 200`.
- Skills: `Enter` adds tags, `×` removes them, and duplicate names are ignored.
- `Start a new profile` clears all fields, the file input, tags and the preview.
- Browser console: no errors.

## Deployment

The root `index.html` includes a `week13-1` link.

Live URL: `https://mrabubakrkamolov.github.io/Assigment/week13-1/`
