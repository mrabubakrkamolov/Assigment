# Week 12-2 — React Effects & useEffect

Week 12 (Friday) demos, exercises and homework, structured like the course reference page.

## Files

| File | Description |
| --- | --- |
| `index.html` | Samples (mount, change, cleanup, localStorage) + exercises (title sync, GitHub lookup, derived value) with **View code** disclosures |
| `weather.html` | Homework: **Weather Dashboard** using the free Open-Meteo API |
| `styles.css` | Shared styling |

## Samples

- `[]` — run once after mount
- `[name]` — run when a value changes
- Timer cleanup — clear the interval on unmount
- `localStorage` — persist across refreshes with a lazy state initializer

## Exercises

- **E1** Sync `document.title` with an unread-message count
- **E2** Fetch and display a GitHub user with loading, error and `AbortController` cleanup
- **E3** Derive `fullName` while rendering instead of storing it in state/effect

## Homework — Weather Dashboard

- City search via Open-Meteo **geocoding** (with alternative matches)
- Direct **latitude / longitude** input with validation
- Bonus: **`navigator.geolocation`** with permission-error handling
- Shows **temperature, weather description and wind speed** (plus humidity and update time)
- Refetch on place change; **abort** the previous request to avoid out-of-order responses
- Loading spinner and errors for no results, bad coords, network failure and rate limit (429)
- `document.title` sync + `localStorage` persistence

## Links

- Demos: `https://mrabubakrkamolov.github.io/Assigment/week12-2/`
- Weather: `https://mrabubakrkamolov.github.io/Assigment/week12-2/weather.html`
