# Validation record · 2026-11-09

## Executed successfully

- Node v24.22.1, npm 11.9.0.
- `npm ci`: 62 packages installed successfully with the included lockfile.
- `npm test`: Vitest 3.2.7, 21 tests passed (1 file).
- `npm run build`: TypeScript checking and Vite 6.4.5 production build passed.
- No security audit or freshness claim is made about pinned dependencies.

## Browser verification blocked

`CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e` was attempted. All five cases failed before their assertions could run because Chromium could not initialize its process socket: `socket() failed: Operation not permitted (1)`. Additional execution permission was rejected by the environment policy. This is an execution blocker, not evidence that the UI passed or failed its behavior assertions.

Scenarios provided: error review and focus; correction and downloaded JSON; file input and keyboard activation; oversized upload; mobile overflow. They remain unverified. One textarea assertion was adjusted by code review to use `toHaveValue` rather than text content after the blocked run; it also remains unexecuted.

No real screenshot or video was produced. `VIDEO.md` provides a recording plan only. Screen-reader use, contrast audit, WCAG compliance, Safari/Firefox behavior and Windows execution remain unverified. The workflow is included but has not run on GitHub.

## Evidence

- unit-tests.txt: successful unit run
- build.txt: successful build
- browser-tests.txt: blocked browser attempt (contains local diagnostic paths)

## Reproduce on a machine that permits Chromium

```sh
npm ci
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

On Linux CI, use `npx playwright install --with-deps chromium`. Review actual results before updating any publication text.
