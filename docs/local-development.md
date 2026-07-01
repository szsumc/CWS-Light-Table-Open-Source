# Local Development

## Requirements

- Node.js
- npm

## Install

```bash
npm install
```

## Rebuild The Standalone Runtime

`src/core/standalone-template.js` is a generated source file used when saving
standalone `CWS HTML` output.

Rebuild it after changing:

- `src/main.js`
- `src/styles.css`
- any file under `src/core/`

Command:

```bash
npm run build
```

## Run The Local Server

```bash
npm run dev
```

Default URL:

```text
http://127.0.0.1:4173/
```

## Development Notes

- this public repository snapshot does not include the original internal test
  and fixture directories
- if you add new user-facing runtime behavior, keep standalone save behavior in
  sync with the localhost editor

