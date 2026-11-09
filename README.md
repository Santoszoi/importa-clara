# Importa Clara

A small React + TypeScript portfolio study by Marcos Solutions: review a product CSV before preparing an import batch. **Fictional data, local processing, no production integration.**

## Business problem

A catalog spreadsheet can contain duplicated product codes, incomplete names, invalid prices or fractional stock quantities. Importing it blindly pushes those problems into a business system. This demo makes each rejected row visible and blocks export until the whole batch is valid.

## Run locally

Use Node.js 24 and npm. In this directory:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173).

```sh
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The lockfile is included. `npm ci` completed successfully in the delivery environment. The workflow in `.github/workflows/checks.yml` is prepared but has not run on GitHub. Optional `CHROMIUM_PATH` selects a local Chromium executable; otherwise Playwright uses its managed browser.

## Demo flow

1. Validate the preloaded fictional sample.
2. Review errors with physical line numbers. Both occurrences of a duplicate SKU are rejected.
3. Return focus to the editor and correct the content, or load **Exemplo corrigido**.
4. Validate again, then export `produtos-validados.json`.
5. Edit the source: the previous review is invalidated immediately.

## Features

- Paste text or load a local CSV; no server upload.
- Explicit 50,000-byte and 200-product limits.
- Exact header, SKU, name, price and stock validation.
- Duplicate detection within the current file, error-only filter and batch counts.
- Labeled native controls, visible focus, keyboard-operable buttons and result focus.
- JSON export only after all rows pass; no partial silent import.
- Responsive CSS layout. Actual browser layout verification is pending.

## Accepted CSV dialect

UTF-8, optional BOM, LF or CRLF, semicolon delimiter. Header: `sku;nome;preco;estoque`. Leading/trailing whitespace in values is trimmed. Trailing blank lines are ignored; interior blank lines are invalid rows. Quoted fields, embedded semicolons and multiline fields are **not supported**. This is a constrained data contract, not a general RFC 4180 parser.

| Field | Contract |
| --- | --- |
| SKU | 2–20 uppercase ASCII letters, digits or hyphens; begins with letter/digit |
| Name | 2–80 characters; cannot begin with =, +, @ or - |
| Price | Positive decimal comma, exactly 2 decimal places, at most 6 integer digits; no thousands separator |
| Stock | Integer 0–999999 |

Samples are in `samples/`. Exported prices are integer cents (`29,90` → `2990`).

## Decisions

- `src/import.ts` contains pure rules independent of React, so boundary cases can be tested directly.
- Counts and export availability are derived from the review, rather than separately stored state. Changing the source clears the review to avoid exporting stale results.
- File-reading requests use a sequence counter, so a delayed read cannot overwrite a newer edit.
- Export JSON instead of spreadsheet output. Rejecting formula-like names is a narrow input rule, **not** a complete spreadsheet-injection security guarantee.
- Keep data only in memory. Refreshing the page restores the sample and discards edits.
- No server is needed for this one-week study. A real importer must validate again on the server, check existing SKUs and apply transactional persistence.

## Structure

- `src/import.ts`: data contract, review and JSON serialization
- `src/main.tsx`: input/review/export workflow
- `src/style.css`: responsive presentation
- `tests/import.test.ts`: 21 rule tests
- `tests/browser/import.spec.ts`: 5 browser scenarios
- `docs/`: validation evidence, LinkedIn draft and five-day study guide

## Validation and limits

On 2026-11-09, 21 unit tests passed and the production build passed. Browser tests were attempted but the environment denied Chromium's process socket creation; the five scenarios did **not** execute successfully. No screenshot or video is claimed. See `docs/VALIDATION.md` and raw logs.

No accessibility certification, screen-reader testing, performance benchmark, dependency security audit, customer usage or business outcome is claimed. No authentication, API, database, XLSX support, cross-file duplicate lookup or persistent import is implemented. Use fictitious data only. Large-scale parsing, Unicode normalization and broad CSV dialect support remain out of scope.

## References

Consulted 2026-11-09:
- [React: choosing state structure](https://react.dev/learn/choosing-the-state-structure)
- [Playwright: assertions](https://playwright.dev/docs/test-assertions)

Portfolio demonstration. Browser verification limitations are documented above.
