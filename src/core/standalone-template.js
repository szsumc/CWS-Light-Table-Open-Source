export const STANDALONE_APP_STYLE = `:root {
  color-scheme: light;
  --bg: #eff4fb;
  --panel: #ffffff;
  --panel-border: #cfd8e6;
  --grid-border: #d8e1ee;
  --grid-header: #f3f6fb;
  --grid-header-strong: #eef3fa;
  --text: #172235;
  --muted: #64748b;
  --accent: #2563eb;
  --accent-strong: #1d4ed8;
  --active-outline: #4f6df5;
  --danger: #b91c1c;
  --shadow: 0 16px 36px rgba(23, 34, 53, 0.08);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Segoe UI", "Yu Gothic UI", sans-serif;
  background:
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.08), transparent 24%),
    linear-gradient(180deg, #f9fbff 0%, var(--bg) 100%);
  color: var(--text);
}

.app-shell {
  padding: 12px;
}

.menu-bar {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 6px;
  min-height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--panel-border);
  border-radius: 14px;
  box-shadow: var(--shadow);
}

.menu-tabs {
  display: flex;
  align-items: stretch;
}

.menu-tab {
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--text);
  padding: 0 14px;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

.menu-tab:hover,
.menu-tab:focus-visible,
.menu-tab.is-active {
  color: var(--accent-strong);
  background: rgba(37, 99, 235, 0.06);
  outline: none;
}

.menu-tab.is-active {
  border-bottom-color: var(--accent);
}

.menu-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 10px;
  z-index: 20;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 220px;
  padding: 8px;
  background: #fff;
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  box-shadow: 0 18px 34px rgba(23, 34, 53, 0.14);
}

.menu-dropdown.hidden {
  display: none;
}

.menu-dropdown-column {
  display: grid;
  min-width: 220px;
}

.menu-dropdown-submenu {
  padding-left: 8px;
  border-left: 1px solid var(--panel-border);
}

.menu-item {
  border: none;
  background: transparent;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 11px 14px;
  border-radius: 10px;
  text-align: left;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

.menu-item:hover,
.menu-item:focus-visible {
  background: #eef4ff;
  color: var(--accent-strong);
  outline: none;
}

.menu-item.is-active {
  background: #eef4ff;
  color: var(--accent-strong);
}

.menu-item.is-disabled {
  color: var(--muted);
  cursor: default;
}

.menu-item.is-disabled:hover,
.menu-item.is-disabled:focus-visible {
  background: transparent;
  color: var(--muted);
}

.menu-item-hint {
  color: #94a3b8;
  font-size: 12px;
  white-space: nowrap;
}

.button {
  border: 1px solid var(--panel-border);
  background: var(--panel);
  color: var(--text);
  border-radius: 12px;
  padding: 10px 15px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
}

.button:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: #aebbd0;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.button-primary {
  border-color: var(--accent);
  background: var(--accent);
  color: #fff;
}

.button-primary:hover:not(:disabled) {
  border-color: var(--accent-strong);
  background: var(--accent-strong);
}

.workspace {
  display: grid;
  gap: 12px;
}

.sheet-picker-bar,
.grid-panel,
.status-bar {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 16px;
  box-shadow: var(--shadow);
}

.sheet-picker-bar,
.status-bar {
  padding: 12px 16px;
}

.status-message,
.document-summary,
.panel-note {
  margin: 0;
  color: var(--muted);
}

.document-summary {
  font-size: 13px;
}

.sheet-picker-bar.hidden {
  display: none;
}

.sheet-picker-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 18px;
}

.sheet-picker-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.sheet-picker-row select {
  min-width: 240px;
  padding: 9px 12px;
  border-radius: 12px;
  border: 1px solid var(--panel-border);
  background: #fff;
  font: inherit;
}

.grid-panel {
  overflow: hidden;
}

.grid-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--panel-border);
  background: linear-gradient(180deg, #fbfcff 0%, #f6f9fd 100%);
}

.name-box {
  min-width: 74px;
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  padding: 6px 10px;
  background: #fff;
  font-family: "Consolas", "SFMono-Regular", monospace;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.formula-bar {
  display: flex;
  align-items: stretch;
  flex: 1;
  min-width: 0;
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
}

.formula-prefix {
  display: grid;
  place-items: center;
  width: 40px;
  flex: 0 0 40px;
  border-right: 1px solid var(--panel-border);
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.formula-input {
  width: 100%;
  min-height: 34px;
  max-height: 100px;
  padding: 7px 10px;
  border: none;
  resize: vertical;
  background: transparent;
  color: var(--text);
  font: inherit;
  line-height: 1.35;
}

.formula-input:focus {
  outline: none;
}

.quick-search {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 260px;
  padding: 4px 6px 4px 10px;
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  background: #fff;
}

.quick-search-label {
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.quick-search-input {
  min-width: 0;
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text);
  font: inherit;
  font-size: 13px;
}

.quick-search-input:focus {
  outline: none;
}

.quick-search-clear {
  border: none;
  background: #edf2fb;
  color: var(--muted);
  padding: 6px 8px;
  border-radius: 8px;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.quick-search-clear:hover,
.quick-search-clear:focus-visible {
  background: #dbe7fb;
  color: var(--accent-strong);
  outline: none;
}

.status-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
}

.grid-wrap {
  overflow: auto;
  max-height: calc(100vh - 170px);
  background: #fff;
}

.print-chrome {
  display: none;
  padding: 8px 14px;
  color: var(--muted);
  font-size: 12px;
  white-space: pre-wrap;
}

.floating-layer {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}

.floating-panel,
.header-menu {
  pointer-events: auto;
  position: fixed;
  min-width: 280px;
  max-width: min(96vw, 420px);
  padding: 14px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid var(--panel-border);
  border-radius: 16px;
  box-shadow: 0 20px 42px rgba(23, 34, 53, 0.18);
}

.floating-panel {
  top: 72px;
  right: 16px;
  display: grid;
  gap: 12px;
}

.floating-panel-wide {
  max-width: min(96vw, 640px);
}

.floating-panel-header,
.floating-panel-actions,
.inline-row,
.page-setup-grid,
.advanced-filter-condition,
.header-menu-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.floating-panel-header {
  justify-content: space-between;
}

.floating-panel-title {
  margin: 0;
  font-size: 15px;
}

.floating-panel-close,
.link-button,
.mini-button {
  border: none;
  background: transparent;
  color: var(--accent-strong);
  padding: 4px 6px;
  border-radius: 8px;
  font: inherit;
  cursor: pointer;
}

.floating-panel-close:hover,
.floating-panel-close:focus-visible,
.link-button:hover,
.link-button:focus-visible,
.mini-button:hover,
.mini-button:focus-visible {
  background: #eef4ff;
  outline: none;
}

.floating-panel label,
.advanced-filter-condition label,
.page-setup-grid label,
.header-menu label {
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
}

.floating-panel input,
.floating-panel select,
.floating-panel textarea,
.header-menu input,
.header-menu select {
  width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid var(--panel-border);
  border-radius: 10px;
  background: #fff;
  color: var(--text);
  font: inherit;
  font-size: 13px;
}

.floating-panel textarea {
  min-height: 72px;
  resize: vertical;
}

.floating-panel-checks {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.floating-panel-checks label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text);
}

.floating-panel-checks input {
  width: auto;
  padding: 0;
}

.floating-panel-actions {
  justify-content: flex-end;
}

.floating-panel-meta,
.floating-panel-example,
.floating-panel-error,
.header-menu-note {
  margin: 0;
  font-size: 12px;
}

.floating-panel-meta,
.floating-panel-example,
.header-menu-note {
  color: var(--muted);
}

.floating-panel-error {
  color: var(--danger);
  font-weight: 700;
}

.help-panel-section {
  display: grid;
  gap: 6px;
}

.help-panel-heading {
  margin: 0;
  font-size: 13px;
}

.help-panel-list {
  margin: 0;
  padding-left: 18px;
  color: var(--text);
  font-size: 13px;
  line-height: 1.45;
}

.help-panel-facts {
  display: grid;
  gap: 8px;
}

.help-panel-fact-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  background: #f8fbff;
}

.help-panel-fact-label {
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
}

.advanced-filter-list {
  display: grid;
  gap: 10px;
}

.advanced-filter-condition {
  align-items: end;
}

.advanced-filter-number {
  min-width: 28px;
  padding-bottom: 10px;
  color: var(--accent-strong);
  font-size: 13px;
  font-weight: 700;
}

.advanced-filter-condition .grow,
.page-setup-grid .grow {
  flex: 1;
  min-width: 120px;
}

.page-setup-basics > label {
  flex: 1 1 140px;
}

.page-setup-margins {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: end;
}

.import-preview {
  display: grid;
  gap: 8px;
}

.import-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.import-preview-table-wrap {
  overflow: auto;
  max-height: 240px;
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  background: #fbfcff;
}

.import-preview-table {
  width: 100%;
  border-collapse: collapse;
}

.text-export-preview {
  margin: 0;
  padding: 10px 12px;
  color: var(--text);
  font: 12px/1.45 "Consolas", "SFMono-Regular", monospace;
  white-space: pre-wrap;
}

.import-preview-table td {
  min-width: 96px;
  padding: 8px 10px;
  border: 1px solid #e3eaf4;
  color: var(--text);
  font-size: 12px;
  white-space: pre-wrap;
  vertical-align: top;
}

.advanced-filter-remove {
  margin-left: auto;
}

.page-setup-grid {
  align-items: end;
}

.header-menu {
  display: grid;
  gap: 10px;
  min-width: 260px;
}

.header-menu-actions {
  justify-content: flex-end;
}

.sheet-grid {
  border-collapse: collapse;
  min-width: max-content;
}

.sheet-grid th,
.sheet-grid td {
  border: 1px solid var(--grid-border);
  width: 84px;
  min-width: 84px;
  height: 22px;
  padding: 2px 8px;
  font-size: 13px;
  line-height: 1.2;
}

.corner-cell,
.column-header,
.row-header {
  position: sticky;
  background: var(--grid-header);
  color: #475569;
  font-weight: 600;
  text-align: center;
}

.corner-cell {
  top: 0;
  left: 0;
  z-index: 4;
  min-width: 36px;
  width: 36px;
  background: var(--grid-header-strong);
}

.column-header {
  top: 0;
  z-index: 3;
  background: var(--grid-header-strong);
}

.row-header {
  left: 0;
  z-index: 2;
  min-width: 36px;
  width: 36px;
  background: var(--grid-header);
}

.grid-cell {
  background: #fff;
  color: var(--text);
  cursor: default;
  vertical-align: middle;
  white-space: pre-wrap;
  position: relative;
}

.sheet-grid tr.is-hidden {
  display: none;
}

.grid-spacer-row,
.grid-spacer-cell {
  border: none;
  padding: 0;
  background: transparent;
  pointer-events: none;
}

.grid-spacer-cell {
  height: 0;
  min-width: 0;
}

.grid-spacer-column {
  border: none;
  padding: 0;
  background: transparent;
  pointer-events: none;
}

.grid-cell.is-hidden,
.row-header.is-hidden {
  display: none;
}

.grid-cell.is-selected {
  background: rgba(37, 99, 235, 0.08);
}

.grid-cell.is-fill-preview {
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.04));
}

.copied-range-outline {
  position: absolute;
  inset: -2px;
  display: block;
  pointer-events: none;
  z-index: 5;
  border: 0 solid transparent;
  box-sizing: border-box;
}

.copied-range-outline.copy-edge-top {
  border-top-width: 2px;
  border-top-style: dashed;
  border-top-color: #0f7b45;
}

.copied-range-outline.copy-edge-right {
  border-right-width: 2px;
  border-right-style: dashed;
  border-right-color: #0f7b45;
}

.copied-range-outline.copy-edge-bottom {
  border-bottom-width: 2px;
  border-bottom-style: dashed;
  border-bottom-color: #0f7b45;
}

.copied-range-outline.copy-edge-left {
  border-left-width: 2px;
  border-left-style: dashed;
  border-left-color: #0f7b45;
}

.grid-cell.is-active {
  box-shadow: inset 0 0 0 2px var(--active-outline);
}

.grid-cell.is-find-hit {
  box-shadow:
    inset 0 0 0 2px var(--active-outline),
    inset 0 0 0 999px rgba(245, 158, 11, 0.15);
}

.grid-cell.is-formal-header {
  background: linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%);
  font-weight: 700;
}

.row-header.is-selected,
.column-header.is-selected {
  background: #e6efff;
  color: var(--accent-strong);
}

.row-header.is-formal-header {
  background: #dfeaff;
  color: var(--accent-strong);
  font-weight: 700;
}

.cell-editor {
  display: block;
  width: calc(100% + 16px);
  min-height: 22px;
  margin: -2px -8px;
  padding: 2px 8px;
  border: none;
  resize: none;
  overflow: hidden;
  background: #fff;
  color: var(--text);
  font: inherit;
  line-height: 1.2;
}

.cell-editor:focus {
  outline: none;
}

.fill-handle {
  position: absolute;
  right: -4px;
  bottom: -4px;
  z-index: 4;
  width: 8px;
  height: 8px;
  padding: 0;
  border: 1px solid #ffffff;
  border-radius: 2px;
  background: var(--accent);
  cursor: crosshair;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.28);
}

.header-tools {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 4;
}

.header-tools-button {
  border: none;
  background: #e7ecf5;
  color: #7a8798;
  width: 18px;
  height: 18px;
  padding: 0;
  border-radius: 6px;
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}

.header-tools-button:hover,
.header-tools-button:focus-visible {
  background: #d9e1ee;
  outline: none;
}

.header-tools-button.is-filtered {
  background: rgba(37, 99, 235, 0.12);
  color: var(--accent-strong);
}

.header-tools-button.is-filtered:hover,
.header-tools-button.is-filtered:focus-visible {
  background: rgba(37, 99, 235, 0.18);
}

@media print {
  body {
    background: #fff;
  }

  .menu-bar,
  .sheet-picker-bar,
  .grid-toolbar,
  .status-bar,
  .floating-layer,
  .fill-handle,
  .header-tools {
    display: none !important;
  }

  .app-shell,
  .workspace,
  .grid-panel,
  .grid-wrap {
    padding: 0;
    margin: 0;
    border: none;
    box-shadow: none;
    background: #fff;
    max-height: none;
    overflow: visible;
  }

  .print-chrome {
    display: block;
    padding: 0 0 8px;
    color: #111827;
  }

  .sheet-grid thead {
    display: none;
  }

  .sheet-grid tbody tr.print-table-header {
    display: table-header-group;
  }

  .sheet-grid tr[data-print-hidden="true"],
  .sheet-grid td[data-print-hidden="true"],
  .sheet-grid th[data-print-hidden="true"] {
    display: none !important;
  }
}

@media (max-width: 900px) {
  .sheet-picker-bar,
  .status-bar,
  .sheet-picker-row,
  .menu-bar,
  .grid-toolbar,
  .quick-search,
  .floating-panel-actions,
  .page-setup-grid,
  .advanced-filter-condition {
    flex-direction: column;
    align-items: stretch;
  }

  .menu-bar {
    padding: 8px;
  }

  .menu-dropdown {
    left: 8px;
    right: 8px;
    min-width: 0;
  }

  .sheet-picker-row select {
    min-width: 0;
    width: 100%;
  }

  .name-box {
    width: 100%;
  }

  .formula-bar {
    width: 100%;
  }

  .quick-search {
    min-width: 0;
    width: 100%;
  }

  .page-setup-margins {
    grid-template-columns: 1fr;
  }

  .floating-panel,
  .header-menu {
    left: 8px !important;
    right: 8px !important;
    top: auto;
    bottom: 8px;
    max-width: none;
  }
}
`;

export const STANDALONE_APP_SHELL = `<div class="app-shell">
      <nav class="menu-bar" aria-label="Application menu">
        <div class="menu-tabs">
          <button
            id="fileMenuButton"
            class="menu-tab"
            type="button"
            data-menu-key="file"
            aria-haspopup="true"
            aria-controls="appMenu"
            aria-expanded="false"
          >
            File
          </button>
          <button
            id="editMenuButton"
            class="menu-tab"
            type="button"
            data-menu-key="edit"
            aria-haspopup="true"
            aria-controls="appMenu"
            aria-expanded="false"
          >
            Edit
          </button>
          <button
            id="searchMenuButton"
            class="menu-tab"
            type="button"
            data-menu-key="search"
            aria-haspopup="true"
            aria-controls="appMenu"
            aria-expanded="false"
          >
            Search
          </button>
          <button
            id="dataMenuButton"
            class="menu-tab"
            type="button"
            data-menu-key="data"
            aria-haspopup="true"
            aria-controls="appMenu"
            aria-expanded="false"
          >
            Data
          </button>
          <button
            id="viewMenuButton"
            class="menu-tab"
            type="button"
            data-menu-key="view"
            aria-haspopup="true"
            aria-controls="appMenu"
            aria-expanded="false"
          >
            View
          </button>
          <button
            id="optionMenuButton"
            class="menu-tab"
            type="button"
            data-menu-key="option"
            aria-haspopup="true"
            aria-controls="appMenu"
            aria-expanded="false"
          >
            Option
          </button>
          <button
            id="helpMenuButton"
            class="menu-tab"
            type="button"
            data-menu-key="help"
            aria-haspopup="true"
            aria-controls="appMenu"
            aria-expanded="false"
          >
            Help
          </button>
        </div>

        <div id="appMenu" class="menu-dropdown hidden" role="menu" aria-labelledby="fileMenuButton">
          <button class="menu-item" type="button" role="menuitem">Open CWS HTML</button>
        </div>

        <input id="openFileInput" type="file" accept=".html,.htm" hidden />
        <input id="importFileInput" type="file" accept=".xlsx,.xlsm,.xls,.csv,.tsv,.txt,.json,.xml" hidden />
      </nav>

      <main class="workspace">
        <section id="sheetPickerPanel" class="sheet-picker-bar hidden">
          <p class="panel-note">This file has multiple sheets. Pick one sheet to load into the lightweight editor.</p>
          <div class="sheet-picker-row">
            <select id="sheetSelect"></select>
            <button id="loadSheetButton" class="button button-primary" type="button">Load Selected Sheet</button>
          </div>
        </section>

        <section class="grid-panel">
          <div class="grid-toolbar">
            <div class="name-box" id="activeCellName">A1</div>
            <label class="formula-bar">
              <span class="formula-prefix">fx</span>
              <textarea
                id="formulaBarInput"
                class="formula-input"
                rows="1"
                spellcheck="false"
                aria-label="Formula bar"
              ></textarea>
            </label>
            <label class="quick-search">
              <span class="quick-search-label">Search</span>
              <input
                id="globalSearchInput"
                class="quick-search-input"
                type="text"
                autocomplete="off"
                spellcheck="false"
                aria-label="Global search"
              />
              <button id="clearGlobalSearchButton" class="quick-search-clear" type="button" aria-label="Clear global search">Clear</button>
            </label>
          </div>
          <div id="printHeader" class="print-chrome" aria-hidden="true"></div>
          <div class="grid-wrap">
            <table id="sheetGrid" class="sheet-grid" aria-label="Spreadsheet grid"></table>
          </div>
          <div id="printFooter" class="print-chrome" aria-hidden="true"></div>
        </section>

        <div id="floatingLayer" class="floating-layer" aria-live="polite"></div>

        <footer class="status-bar">
          <p id="statusMessage" class="status-message">Blank sheet ready. Open a CWS HTML file or save a new empty one.</p>
          <p id="documentSummary" class="document-summary">Unsaved blank sheet | Sheet1 | 0 columns | 0 data rows</p>
        </footer>
      </main>
    </div>`;

export const STANDALONE_APP_SCRIPT = `function standaloneBootstrap() {
  const DEFAULT_GRID_LIMIT_ROW_COUNT = 50;
  const DEFAULT_GRID_LIMIT_COLUMN_COUNT = 30;

  function tableModelCreateEmptyLightTable() {
    return {
      sourceName: "workbook.cws.html",
      sheetName: "Sheet1",
      columns: [],
      leadingRows: [],
      rows: [],
      gridLimits: {
        maxRows: DEFAULT_GRID_LIMIT_ROW_COUNT,
        maxColumns: DEFAULT_GRID_LIMIT_COLUMN_COUNT,
      },
      pageSetup: {
        margins: {},
        paperSize: "",
        orientation: "",
        printArea: null,
        headerFooter: {},
        background: null,
      },
    };
  }

  function tableModelCloneLightTable(table = {}) {
    return {
      sourceName: String(table?.sourceName || "workbook.cws.html"),
      sheetName: String(table?.sheetName || "Sheet1"),
      columns: Array.isArray(table?.columns)
        ? table.columns.map((column, index) => ({
          key: String(column?.key || tableModelColumnKeyForIndex(index + 1)),
          label: String(column?.label ?? ""),
        }))
        : [],
      leadingRows: Array.isArray(table?.leadingRows)
        ? table.leadingRows.map((record) => ({ ...(record || {}) }))
        : [],
      rows: Array.isArray(table?.rows)
        ? table.rows.map((record) => ({ ...(record || {}) }))
        : [],
      gridLimits: normalizeGridLimits(table?.gridLimits),
      pageSetup: table?.pageSetup ? JSON.parse(JSON.stringify(table.pageSetup)) : {},
    };
  }

  function tableModelColumnKeyForIndex(columnIndex) {
    return \`c\${normalizePositiveIndex(columnIndex)}\`;
  }

  function tableModelGetColumnCount(table) {
    return Math.max(0, Array.isArray(table?.columns) ? table.columns.length : 0);
  }

  function tableModelGetLeadingRowCount(table) {
    return Math.max(0, Array.isArray(table?.leadingRows) ? table.leadingRows.length : 0);
  }

  function tableModelGetHeaderRowIndex(table) {
    return tableModelGetLeadingRowCount(table) + 1;
  }

  function tableModelGetSheetRowCount(table) {
    return tableModelGetHeaderRowIndex(table) + Math.max(0, Array.isArray(table?.rows) ? table.rows.length : 0);
  }

  function tableModelGetGridLimits(table) {
    return normalizeGridLimits(table?.gridLimits);
  }

  function tableModelIsLeadingRow(table, rowIndex) {
    return normalizePositiveIndex(rowIndex) < tableModelGetHeaderRowIndex(table);
  }

  function tableModelIsHeaderRow(table, rowIndex) {
    return normalizePositiveIndex(rowIndex) === tableModelGetHeaderRowIndex(table);
  }

  function tableModelIsDataRow(table, rowIndex) {
    return normalizePositiveIndex(rowIndex) > tableModelGetHeaderRowIndex(table);
  }

  function tableModelGetCellValue(table, rowIndex, columnIndex) {
    const rawValue = tableModelGetCellStoredValue(table, rowIndex, columnIndex);
    return String(rawValue ?? "");
  }

  function tableModelGetCellStoredValue(table, rowIndex, columnIndex) {
    const row = normalizePositiveIndex(rowIndex);
    const col = normalizePositiveIndex(columnIndex);
    const key = tableModelColumnKeyForIndex(col);
    const headerRowIndex = tableModelGetHeaderRowIndex(table);

    if (row < headerRowIndex) {
      return table?.leadingRows?.[row - 1]?.[key] ?? "";
    }
    if (row === headerRowIndex) {
      return table?.columns?.[col - 1]?.label ?? "";
    }
    return table?.rows?.[row - headerRowIndex - 1]?.[key] ?? "";
  }

  function tableModelGetRowValues(table, rowIndex, columnCount = tableModelGetColumnCount(table)) {
    const values = [];
    const safeColumnCount = Math.max(0, normalizeNonNegativeInteger(columnCount));
    for (let columnIndex = 1; columnIndex <= safeColumnCount; columnIndex += 1) {
      values.push(tableModelGetCellValue(table, rowIndex, columnIndex));
    }
    return values;
  }

  function tableModelSetCellValue(table, rowIndex, columnIndex, value) {
    const row = normalizePositiveIndex(rowIndex);
    const col = normalizePositiveIndex(columnIndex);
    const nextValue = String(value ?? "");
    const nextTable = tableModelCloneLightTable(table);
    ensureColumnCount(nextTable, col);

    const headerRowIndex = tableModelGetHeaderRowIndex(nextTable);
    const key = tableModelColumnKeyForIndex(col);

    if (row < headerRowIndex) {
      ensureLeadingRowCount(nextTable, row);
      nextTable.leadingRows[row - 1][key] = nextValue;
      return nextTable;
    }

    if (row === headerRowIndex) {
      nextTable.columns[col - 1].label = nextValue;
      return nextTable;
    }

    const dataRowCount = row - headerRowIndex;
    ensureDataRowCount(nextTable, dataRowCount);
    nextTable.rows[dataRowCount - 1][key] = nextValue;
    return nextTable;
  }

  function tableModelSetHeaderRow(table, rowIndex) {
    const nextTable = tableModelCloneLightTable(table);
    const targetHeaderRow = normalizePositiveIndex(rowIndex);
    const columnCount = tableModelGetColumnCount(nextTable);
    const rowCount = Math.max(tableModelGetSheetRowCount(nextTable), targetHeaderRow);

    const leadingRows = [];
    for (let currentRow = 1; currentRow < targetHeaderRow; currentRow += 1) {
      leadingRows.push(buildRowRecord(nextTable, currentRow, columnCount));
    }

    const nextColumns = Array.from({ length: columnCount }, (_, offset) => ({
      key: tableModelColumnKeyForIndex(offset + 1),
      label: tableModelGetCellValue(nextTable, targetHeaderRow, offset + 1),
    }));

    const rows = [];
    for (let currentRow = targetHeaderRow + 1; currentRow <= rowCount; currentRow += 1) {
      rows.push(buildRowRecord(nextTable, currentRow, columnCount));
    }

    nextTable.leadingRows = leadingRows;
    nextTable.columns = nextColumns;
    nextTable.rows = rows;
    return nextTable;
  }

  function tableModelSetGridLimits(table, gridLimits) {
    const nextTable = tableModelCloneLightTable(table);
    const nextLimits = normalizeGridLimits(gridLimits);
    const headerRowIndex = Math.min(tableModelGetHeaderRowIndex(nextTable), nextLimits.maxRows);
    const matrix = buildSheetMatrix(nextTable, nextLimits.maxRows, nextLimits.maxColumns);
    return rebuildTableFromMatrix(nextTable, matrix, headerRowIndex, nextLimits);
  }

  function tableModelExpandGridLimitsToInclude(table, rowIndex, columnIndex) {
    const nextTable = tableModelCloneLightTable(table);
    const nextLimits = normalizeGridLimits({
      maxRows: Math.max(tableModelGetGridLimits(nextTable).maxRows, normalizePositiveIndex(rowIndex)),
      maxColumns: Math.max(tableModelGetGridLimits(nextTable).maxColumns, normalizePositiveIndex(columnIndex)),
    });
    nextTable.gridLimits = nextLimits;
    return nextTable;
  }

  function applyMatrixToLightTable(table, startCell, matrix) {
    const originRow = normalizePositiveIndex(startCell?.row);
    const originCol = normalizePositiveIndex(startCell?.col);
    const safeMatrix = Array.isArray(matrix) ? matrix : [];
    const rowCount = safeMatrix.length;
    const maxColumnSpan = safeMatrix.reduce(
      (max, row) => Math.max(max, Array.isArray(row) ? row.length : 0),
      0,
    );
    const endRow = rowCount ? originRow + rowCount - 1 : originRow;
    const endCol = maxColumnSpan ? originCol + maxColumnSpan - 1 : originCol;

    if (!rowCount || !maxColumnSpan) {
      return {
        table,
        changed: false,
        endRow,
        endCol,
      };
    }

    const nextTable = tableModelCloneLightTable(table);
    let changed = false;
    const previousColumnCount = nextTable.columns.length;
    ensureColumnCount(nextTable, endCol);
    if (nextTable.columns.length !== previousColumnCount) {
      changed = true;
    }

    const previousLimits = tableModelGetGridLimits(nextTable);
    const nextLimits = normalizeGridLimits({
      maxRows: Math.max(previousLimits.maxRows, endRow),
      maxColumns: Math.max(previousLimits.maxColumns, endCol),
    });
    if (nextLimits.maxRows !== previousLimits.maxRows || nextLimits.maxColumns !== previousLimits.maxColumns) {
      changed = true;
    }
    nextTable.gridLimits = nextLimits;

    const headerRowIndex = tableModelGetHeaderRowIndex(nextTable);

    safeMatrix.forEach((row, rowOffset) => {
      if (!Array.isArray(row) || !row.length) return;
      const targetRow = originRow + rowOffset;
      row.forEach((value, columnOffset) => {
        const targetColumn = originCol + columnOffset;
        const nextValue = String(value ?? "");
        const key = tableModelColumnKeyForIndex(targetColumn);

        if (targetRow < headerRowIndex) {
          ensureLeadingRowCount(nextTable, targetRow);
          const record = nextTable.leadingRows[targetRow - 1];
          const previousValue = String(record?.[key] ?? "");
          if (previousValue !== nextValue) {
            changed = true;
          }
          if (nextValue === "") {
            delete record[key];
          } else {
            record[key] = nextValue;
          }
          return;
        }

        if (targetRow === headerRowIndex) {
          const previousValue = String(nextTable.columns[targetColumn - 1]?.label ?? "");
          if (previousValue !== nextValue) {
            changed = true;
          }
          nextTable.columns[targetColumn - 1].label = nextValue;
          return;
        }

        const dataRowCount = targetRow - headerRowIndex;
        ensureDataRowCount(nextTable, dataRowCount);
        const record = nextTable.rows[dataRowCount - 1];
        const previousValue = String(record?.[key] ?? "");
        if (previousValue !== nextValue) {
          changed = true;
        }
        if (nextValue === "") {
          delete record[key];
        } else {
          record[key] = nextValue;
        }
      });
    });

    return {
      table: nextTable,
      changed,
      endRow,
      endCol,
    };
  }

  function tableModelGetLastUsedRowIndex(table) {
    const columnCount = tableModelGetColumnCount(table);
    const rowCount = tableModelGetSheetRowCount(table);
    let lastUsedRow = tableModelGetHeaderRowIndex(table);
    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex += 1) {
      for (let columnIndex = 1; columnIndex <= columnCount; columnIndex += 1) {
        if (tableModelGetCellValue(table, rowIndex, columnIndex) !== "") {
          lastUsedRow = rowIndex;
        }
      }
    }
    return lastUsedRow;
  }

  function tableModelGetLastUsedColumnIndex(table) {
    const columnCount = tableModelGetColumnCount(table);
    const rowCount = tableModelGetSheetRowCount(table);
    let lastUsedColumn = 1;
    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex += 1) {
      for (let columnIndex = 1; columnIndex <= columnCount; columnIndex += 1) {
        if (tableModelGetCellValue(table, rowIndex, columnIndex) !== "") {
          lastUsedColumn = columnIndex;
        }
      }
    }
    return lastUsedColumn;
  }

  function tableModelInsertRows(table, rowIndex, count = 1, placement = "above") {
    const nextTable = tableModelCloneLightTable(table);
    const rowSpan = normalizePositiveIndex(count);
    const anchorRow = normalizePositiveIndex(rowIndex);
    const limits = tableModelGetGridLimits(nextTable);
    const columnCount = Math.max(1, limits.maxColumns, tableModelGetColumnCount(nextTable));
    const rowCount = Math.max(limits.maxRows, tableModelGetSheetRowCount(nextTable), anchorRow);
    const matrix = buildSheetMatrix(nextTable, rowCount, columnCount);
    const insertAt = placement === "below" ? anchorRow : anchorRow - 1;
    const blankRows = Array.from({ length: rowSpan }, () => Array.from({ length: columnCount }, () => ""));
    matrix.splice(insertAt, 0, ...blankRows);
    const nextHeaderRowIndex = insertAt < tableModelGetHeaderRowIndex(nextTable)
      ? tableModelGetHeaderRowIndex(nextTable) + rowSpan
      : tableModelGetHeaderRowIndex(nextTable);
    return rebuildTableFromMatrix(nextTable, matrix, nextHeaderRowIndex, {
      maxRows: Math.max(limits.maxRows, matrix.length),
      maxColumns: Math.max(limits.maxColumns, columnCount),
    });
  }

  function tableModelInsertColumns(table, columnIndex, count = 1, placement = "left") {
    const nextTable = tableModelCloneLightTable(table);
    const columnSpan = normalizePositiveIndex(count);
    const anchorColumn = normalizePositiveIndex(columnIndex);
    const limits = tableModelGetGridLimits(nextTable);
    const columnCount = Math.max(limits.maxColumns, tableModelGetColumnCount(nextTable), anchorColumn);
    const rowCount = Math.max(1, limits.maxRows, tableModelGetSheetRowCount(nextTable));
    const matrix = buildSheetMatrix(nextTable, rowCount, columnCount);
    const insertAt = placement === "right" ? anchorColumn : anchorColumn - 1;
    matrix.forEach((row) => {
      row.splice(insertAt, 0, ...Array.from({ length: columnSpan }, () => ""));
    });
    return rebuildTableFromMatrix(nextTable, matrix, tableModelGetHeaderRowIndex(nextTable), {
      maxRows: Math.max(limits.maxRows, rowCount),
      maxColumns: Math.max(limits.maxColumns, columnCount + columnSpan),
    });
  }

  function deleteRows(table, rowIndex, count = 1) {
    const nextTable = tableModelCloneLightTable(table);
    const rowSpan = normalizePositiveIndex(count);
    const startRow = normalizePositiveIndex(rowIndex);
    const limits = tableModelGetGridLimits(nextTable);
    const columnCount = Math.max(1, limits.maxColumns, tableModelGetColumnCount(nextTable));
    const rowCount = Math.max(1, limits.maxRows, tableModelGetSheetRowCount(nextTable));
    const matrix = buildSheetMatrix(nextTable, rowCount, columnCount);
    const deleteAt = Math.min(startRow - 1, Math.max(0, matrix.length - 1));
    const actualDeletedRowCount = Math.min(rowSpan, matrix.length - deleteAt);

    if (actualDeletedRowCount <= 0) {
      return nextTable;
    }

    matrix.splice(deleteAt, actualDeletedRowCount);
    if (!matrix.length) {
      matrix.push(Array.from({ length: columnCount }, () => ""));
    }

    const headerRowIndex = tableModelGetHeaderRowIndex(nextTable);
    const deletedBeforeHeader = Math.max(0, Math.min(actualDeletedRowCount, headerRowIndex - startRow));
    const nextHeaderRowIndex = Math.max(1, Math.min(
      matrix.length,
      headerRowIndex - deletedBeforeHeader,
    ));

    return rebuildTableFromMatrix(nextTable, matrix, nextHeaderRowIndex, {
      maxRows: Math.max(1, limits.maxRows - actualDeletedRowCount),
      maxColumns: Math.max(limits.maxColumns, columnCount),
    });
  }

  function deleteColumns(table, columnIndex, count = 1) {
    const nextTable = tableModelCloneLightTable(table);
    const columnSpan = normalizePositiveIndex(count);
    const startColumn = normalizePositiveIndex(columnIndex);
    const limits = tableModelGetGridLimits(nextTable);
    const columnCount = Math.max(1, limits.maxColumns, tableModelGetColumnCount(nextTable));
    const rowCount = Math.max(1, limits.maxRows, tableModelGetSheetRowCount(nextTable));
    const matrix = buildSheetMatrix(nextTable, rowCount, columnCount);
    const deleteAt = Math.min(startColumn - 1, Math.max(0, columnCount - 1));
    const actualDeletedColumnCount = Math.min(columnSpan, columnCount - deleteAt);

    if (actualDeletedColumnCount <= 0) {
      return nextTable;
    }

    matrix.forEach((row) => {
      row.splice(deleteAt, actualDeletedColumnCount);
      if (!row.length) {
        row.push("");
      }
    });

    return rebuildTableFromMatrix(nextTable, matrix, tableModelGetHeaderRowIndex(nextTable), {
      maxRows: Math.max(limits.maxRows, rowCount),
      maxColumns: Math.max(1, limits.maxColumns - actualDeletedColumnCount),
    });
  }

  function tableModelInsertCells(table, bounds, direction = "right") {
    const nextTable = tableModelCloneLightTable(table);
    const normalizedBounds = normalizeBounds(bounds);
    const width = normalizedBounds.endCol - normalizedBounds.startCol + 1;
    const height = normalizedBounds.endRow - normalizedBounds.startRow + 1;
    const limits = tableModelGetGridLimits(nextTable);
    const columnCount = Math.max(limits.maxColumns, tableModelGetColumnCount(nextTable), normalizedBounds.endCol);
    const rowCount = Math.max(limits.maxRows, tableModelGetSheetRowCount(nextTable), normalizedBounds.endRow);
    const matrix = buildSheetMatrix(nextTable, rowCount, columnCount);

    if (direction === "down") {
      const shifted = matrix.map((row) => [...row]);
      for (let rowIndex = 0; rowIndex < height; rowIndex += 1) {
        shifted.push(Array.from({ length: columnCount }, () => ""));
      }
      for (let columnIndex = normalizedBounds.startCol; columnIndex <= normalizedBounds.endCol; columnIndex += 1) {
        for (let rowIndex = rowCount; rowIndex >= normalizedBounds.startRow; rowIndex -= 1) {
          shifted[rowIndex - 1 + height][columnIndex - 1] = matrix[rowIndex - 1][columnIndex - 1];
        }
        for (let rowIndex = normalizedBounds.startRow; rowIndex <= normalizedBounds.endRow; rowIndex += 1) {
          shifted[rowIndex - 1][columnIndex - 1] = "";
        }
      }
      return rebuildTableFromMatrix(nextTable, shifted, tableModelGetHeaderRowIndex(nextTable), {
        maxRows: Math.max(limits.maxRows, rowCount + height),
        maxColumns: Math.max(limits.maxColumns, columnCount),
      });
    }

    const shifted = matrix.map((row) => [...row]);
    for (let rowIndex = normalizedBounds.startRow; rowIndex <= normalizedBounds.endRow; rowIndex += 1) {
      shifted[rowIndex - 1].splice(normalizedBounds.startCol - 1, 0, ...Array.from({ length: width }, () => ""));
    }
    return rebuildTableFromMatrix(nextTable, shifted, tableModelGetHeaderRowIndex(nextTable), {
      maxRows: Math.max(limits.maxRows, rowCount),
      maxColumns: Math.max(limits.maxColumns, columnCount + width),
    });
  }

  function tableModelSetPageSetup(table, pageSetup) {
    const nextTable = tableModelCloneLightTable(table);
    nextTable.pageSetup = JSON.parse(JSON.stringify(pageSetup ?? {}));
    return nextTable;
  }

  function buildRowRecord(table, rowIndex, columnCount) {
    const record = {};
    for (let columnIndex = 1; columnIndex <= columnCount; columnIndex += 1) {
      record[tableModelColumnKeyForIndex(columnIndex)] = tableModelGetCellValue(table, rowIndex, columnIndex);
    }
    return record;
  }

  function ensureColumnCount(table, columnCount) {
    while (table.columns.length < columnCount) {
      const nextIndex = table.columns.length + 1;
      table.columns.push({
        key: tableModelColumnKeyForIndex(nextIndex),
        label: "",
      });
    }
  }

  function ensureLeadingRowCount(table, rowCount) {
    while (table.leadingRows.length < rowCount) {
      table.leadingRows.push({});
    }
  }

  function ensureDataRowCount(table, rowCount) {
    while (table.rows.length < rowCount) {
      table.rows.push({});
    }
  }

  function buildSheetMatrix(table, rowCount, columnCount) {
    const rows = [];
    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex += 1) {
      const row = [];
      for (let columnIndex = 1; columnIndex <= columnCount; columnIndex += 1) {
        row.push(tableModelGetCellValue(table, rowIndex, columnIndex));
      }
      rows.push(row);
    }
    return rows;
  }

  function rebuildTableFromMatrix(table, matrix, headerRowIndex, gridLimits) {
    const nextTable = tableModelCloneLightTable(table);
    const safeHeaderRowIndex = Math.max(1, Math.min(matrix.length || 1, normalizePositiveIndex(headerRowIndex)));
    const materializedBounds = findMaterializedBounds(matrix, safeHeaderRowIndex);
    const columnCount = materializedBounds.lastUsedColumn;
    const rowCount = materializedBounds.lastUsedRow;

    nextTable.columns = Array.from({ length: columnCount }, (_, offset) => ({
      key: tableModelColumnKeyForIndex(offset + 1),
      label: String(matrix[safeHeaderRowIndex - 1]?.[offset] ?? ""),
    }));
    nextTable.leadingRows = [];
    for (let rowIndex = 1; rowIndex < safeHeaderRowIndex; rowIndex += 1) {
      nextTable.leadingRows.push(buildRecordFromMatrixRow(matrix[rowIndex - 1], columnCount));
    }
    nextTable.rows = [];
    for (let rowIndex = safeHeaderRowIndex + 1; rowIndex <= rowCount; rowIndex += 1) {
      nextTable.rows.push(buildRecordFromMatrixRow(matrix[rowIndex - 1], columnCount));
    }
    nextTable.gridLimits = normalizeGridLimits({
      maxRows: Math.max(gridLimits?.maxRows ?? DEFAULT_GRID_LIMIT_ROW_COUNT, safeHeaderRowIndex),
      maxColumns: Math.max(gridLimits?.maxColumns ?? DEFAULT_GRID_LIMIT_COLUMN_COUNT, 1),
    });
    return nextTable;
  }

  function buildRecordFromMatrixRow(row, columnCount) {
    const record = {};
    for (let columnIndex = 1; columnIndex <= columnCount; columnIndex += 1) {
      const value = String(row?.[columnIndex - 1] ?? "");
      if (value !== "") {
        record[tableModelColumnKeyForIndex(columnIndex)] = value;
      }
    }
    return record;
  }

  function findMaterializedBounds(matrix, headerRowIndex) {
    let lastUsedRow = Math.max(1, normalizePositiveIndex(headerRowIndex));
    let lastUsedColumn = 1;
    matrix.forEach((row, rowOffset) => {
      row.forEach((value, columnOffset) => {
        if (String(value ?? "") !== "") {
          lastUsedRow = Math.max(lastUsedRow, rowOffset + 1);
          lastUsedColumn = Math.max(lastUsedColumn, columnOffset + 1);
        }
      });
    });
    return {
      lastUsedRow,
      lastUsedColumn,
    };
  }

  function normalizeGridLimits(gridLimits) {
    const maxRows = Math.max(1, Math.trunc(Number(gridLimits?.maxRows) || DEFAULT_GRID_LIMIT_ROW_COUNT));
    const maxColumns = Math.max(1, Math.trunc(Number(gridLimits?.maxColumns) || DEFAULT_GRID_LIMIT_COLUMN_COUNT));
    return { maxRows, maxColumns };
  }

  function normalizeBounds(bounds) {
    const startRow = normalizePositiveIndex(bounds?.startRow);
    const endRow = normalizePositiveIndex(bounds?.endRow ?? startRow);
    const startCol = normalizePositiveIndex(bounds?.startCol);
    const endCol = normalizePositiveIndex(bounds?.endCol ?? startCol);
    return {
      startRow: Math.min(startRow, endRow),
      endRow: Math.max(startRow, endRow),
      startCol: Math.min(startCol, endCol),
      endCol: Math.max(startCol, endCol),
    };
  }

  function normalizePositiveIndex(value) {
    return Math.max(1, Math.trunc(Number(value) || 1));
  }

  function normalizeNonNegativeInteger(value) {
    return Math.max(0, Math.trunc(Number(value) || 0));
  }

  function createEmptyLightTable(...args) { return tableModelCreateEmptyLightTable(...args); }
  function cloneLightTable(...args) { return tableModelCloneLightTable(...args); }
  function columnKeyForIndex(...args) { return tableModelColumnKeyForIndex(...args); }
  function getColumnCount(...args) { return tableModelGetColumnCount(...args); }
  function getLeadingRowCount(...args) { return tableModelGetLeadingRowCount(...args); }
  function getGridLimits(...args) { return tableModelGetGridLimits(...args); }
  function getHeaderRowIndex(...args) { return tableModelGetHeaderRowIndex(...args); }
  function getSheetRowCount(...args) { return tableModelGetSheetRowCount(...args); }
  function isLeadingRow(...args) { return tableModelIsLeadingRow(...args); }
  function isHeaderRow(...args) { return tableModelIsHeaderRow(...args); }
  function isDataRow(...args) { return tableModelIsDataRow(...args); }
  function getCellValue(...args) { return tableModelGetCellValue(...args); }
  function getCellStoredValue(...args) { return tableModelGetCellStoredValue(...args); }
  function getRowValues(...args) { return tableModelGetRowValues(...args); }
  function setCellValue(...args) { return tableModelSetCellValue(...args); }
  function setHeaderRow(...args) { return tableModelSetHeaderRow(...args); }
  function setGridLimits(...args) { return tableModelSetGridLimits(...args); }
  function expandGridLimitsToInclude(...args) { return tableModelExpandGridLimitsToInclude(...args); }
  function getLastUsedRowIndex(...args) { return tableModelGetLastUsedRowIndex(...args); }
  function getLastUsedColumnIndex(...args) { return tableModelGetLastUsedColumnIndex(...args); }
  function insertRows(...args) { return tableModelInsertRows(...args); }
  function insertColumns(...args) { return tableModelInsertColumns(...args); }
  function insertCells(...args) { return tableModelInsertCells(...args); }
  function setPageSetup(...args) { return tableModelSetPageSetup(...args); }

  function createViewportState(overrides = {}) {
    return {
      scrollTop: normalizeNonNegativeNumber(overrides.scrollTop),
      scrollLeft: normalizeNonNegativeNumber(overrides.scrollLeft),
      width: normalizeNonNegativeNumber(overrides.width),
      height: normalizeNonNegativeNumber(overrides.height),
      contentWidth: normalizeNonNegativeNumber(overrides.contentWidth),
      contentHeight: normalizeNonNegativeNumber(overrides.contentHeight),
    };
  }

  function readViewportState(host, overrides = {}) {
    const element = isElement(host) ? host : null;
    return createViewportState({
      scrollTop: element?.scrollTop ?? 0,
      scrollLeft: element?.scrollLeft ?? 0,
      width: element?.clientWidth ?? 0,
      height: element?.clientHeight ?? 0,
      contentWidth: overrides.contentWidth ?? element?.scrollWidth ?? 0,
      contentHeight: overrides.contentHeight ?? element?.scrollHeight ?? 0,
    });
  }

  function updateViewportState(previousState, host, overrides = {}) {
    const current = readViewportState(host, overrides);
    if (!viewportStateChanged(previousState, current)) {
      return previousState;
    }
    return current;
  }

  function viewportStateChanged(previousState, nextState) {
    const previous = createViewportState(previousState);
    const next = createViewportState(nextState);
    return (
      previous.scrollTop !== next.scrollTop ||
      previous.scrollLeft !== next.scrollLeft ||
      previous.width !== next.width ||
      previous.height !== next.height ||
      previous.contentWidth !== next.contentWidth ||
      previous.contentHeight !== next.contentHeight
    );
  }

  function normalizeNonNegativeNumber(value) {
    return Math.max(0, Math.round(Number(value) || 0));
  }

  function isElement(value) {
    return Boolean(value && typeof value === "object");
  }


  const DEFAULT_GRID_COLUMN_WIDTH = 84;
  const DEFAULT_GRID_ROW_HEIGHT = 22;
  const DEFAULT_ROW_HEADER_WIDTH = 36;
  const DEFAULT_COLUMN_HEADER_HEIGHT = 22;

  function buildGridMetrics(table, options = {}) {
    const gridLimits = getGridLimits(table);
    const explicitColumnCount = normalizeOptionalPositiveInteger(options.columnCount);
    const explicitRowCount = normalizeOptionalPositiveInteger(options.rowCount);
    const minColumnCount = normalizePositiveInteger(options.minColumnCount, 1);
    const minRowCount = normalizePositiveInteger(options.minRowCount, 1);
    const columnCount = Math.max(1, explicitColumnCount || 0, minColumnCount, getColumnCount(table), gridLimits.maxColumns);
    const rowCount = Math.max(1, explicitRowCount || 0, minRowCount, getSheetRowCount(table), gridLimits.maxRows);
    const columnWidth = normalizePositiveInteger(options.columnWidth, DEFAULT_GRID_COLUMN_WIDTH);
    const rowHeight = normalizePositiveInteger(options.rowHeight, DEFAULT_GRID_ROW_HEIGHT);
    const rowHeaderWidth = normalizePositiveInteger(options.rowHeaderWidth, DEFAULT_ROW_HEADER_WIDTH);
    const columnHeaderHeight = normalizePositiveInteger(options.columnHeaderHeight, DEFAULT_COLUMN_HEADER_HEIGHT);
    return {
      columnCount,
      rowCount,
      columnWidth,
      rowHeight,
      rowHeaderWidth,
      columnHeaderHeight,
      contentWidth: rowHeaderWidth + columnCount * columnWidth,
      contentHeight: columnHeaderHeight + rowCount * rowHeight,
    };
  }

  function estimateVisibleColumnCount(viewportWidth, metrics) {
    const safeMetrics = buildGridMetrics(null, metrics || {});
    const bodyWidth = Math.max(0, normalizeNonNegativeInteger(viewportWidth) - safeMetrics.rowHeaderWidth);
    return Math.max(1, Math.ceil(bodyWidth / safeMetrics.columnWidth));
  }

  function estimateVisibleRowCount(viewportHeight, metrics) {
    const safeMetrics = buildGridMetrics(null, metrics || {});
    const bodyHeight = Math.max(0, normalizeNonNegativeInteger(viewportHeight) - safeMetrics.columnHeaderHeight);
    return Math.max(1, Math.ceil(bodyHeight / safeMetrics.rowHeight));
  }

  function columnStartPixel(columnIndex, metrics) {
    const safeMetrics = buildGridMetrics(null, metrics || {});
    const column = normalizePositiveInteger(columnIndex, 1);
    return safeMetrics.rowHeaderWidth + (column - 1) * safeMetrics.columnWidth;
  }

  function rowStartPixel(rowIndex, metrics) {
    const safeMetrics = buildGridMetrics(null, metrics || {});
    const row = normalizePositiveInteger(rowIndex, 1);
    return safeMetrics.columnHeaderHeight + (row - 1) * safeMetrics.rowHeight;
  }

  function normalizePositiveInteger(value, fallback) {
    return Math.max(1, Math.round(Number(value) || fallback));
  }

  function normalizeOptionalPositiveInteger(value) {
    const numeric = Math.round(Number(value));
    return Number.isFinite(numeric) && numeric >= 1 ? numeric : 0;
  }

  function normalizeNonNegativeInteger(value) {
    return Math.max(0, Math.round(Number(value) || 0));
  }


  const DEFAULT_VISIBLE_RANGE_OVERSCAN = {
    rows: 6,
    columns: 2,
  };

  function calculateVisibleRange(metrics, viewportState, overscan = {}) {
    const safeMetrics = buildGridMetrics(null, metrics || {});
    const safeViewport = normalizeViewportState(viewportState);
    const safeOverscan = normalizeOverscan(overscan);
    const visibleRowCount = Math.max(1, estimateVisibleRowCount(safeViewport.height, safeMetrics));
    const visibleColumnCount = Math.max(1, estimateVisibleColumnCount(safeViewport.width, safeMetrics));
    const rowWindowSpan = Math.min(safeMetrics.rowCount, visibleRowCount + safeOverscan.rows * 2);
    let startRow = clamp(
      Math.floor(safeViewport.scrollTop / safeMetrics.rowHeight) + 1 - safeOverscan.rows,
      1,
      safeMetrics.rowCount,
    );
    let endRow = clamp(startRow + rowWindowSpan - 1, startRow, safeMetrics.rowCount);
    startRow = clamp(endRow - rowWindowSpan + 1, 1, endRow);
    const columnWindowSpan = Math.min(safeMetrics.columnCount, visibleColumnCount + safeOverscan.columns * 2);
    let startColumn = clamp(
      Math.floor(safeViewport.scrollLeft / safeMetrics.columnWidth) + 1 - safeOverscan.columns,
      1,
      safeMetrics.columnCount,
    );
    let endColumn = clamp(startColumn + columnWindowSpan - 1, startColumn, safeMetrics.columnCount);
    startColumn = clamp(endColumn - columnWindowSpan + 1, 1, endColumn);
    return {
      startRow,
      endRow,
      startColumn,
      endColumn,
      visibleRowCount,
      visibleColumnCount,
      overscanRows: safeOverscan.rows,
      overscanColumns: safeOverscan.columns,
    };
  }

  function visibleRangeSignature(range) {
    const safeRange = range || {};
    return [
      Math.max(1, Math.round(Number(safeRange.startRow) || 1)),
      Math.max(1, Math.round(Number(safeRange.endRow) || 1)),
      Math.max(1, Math.round(Number(safeRange.startColumn) || 1)),
      Math.max(1, Math.round(Number(safeRange.endColumn) || 1)),
    ].join(":");
  }

  function normalizeViewportState(viewportState) {
    return {
      scrollTop: Math.max(0, Math.round(Number(viewportState?.scrollTop) || 0)),
      scrollLeft: Math.max(0, Math.round(Number(viewportState?.scrollLeft) || 0)),
      width: Math.max(0, Math.round(Number(viewportState?.width) || 0)),
      height: Math.max(0, Math.round(Number(viewportState?.height) || 0)),
    };
  }

  function normalizeOverscan(overscan) {
    return {
      rows: Math.max(0, Math.round(Number(overscan?.rows) || DEFAULT_VISIBLE_RANGE_OVERSCAN.rows)),
      columns: Math.max(0, Math.round(Number(overscan?.columns) || DEFAULT_VISIBLE_RANGE_OVERSCAN.columns)),
    };
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }


  const getCellValueFromTableModel = tableModelGetCellValue;
  const setCellValueFromTableModel = tableModelSetCellValue;
  const columnKeyForIndexFromTableModel = tableModelColumnKeyForIndex;
  function getCellValue(table, rowIndex, columnIndex) {
    return getCellValueFromTableModel(table, rowIndex, columnIndex);
  }

  function setCellValue(table, rowIndex, columnIndex, value) {
    return setCellValueFromTableModel(table, rowIndex, columnIndex, value);
  }

  function createCellSelection(cell) {
    const normalized = normalizeCell(cell);
    return {
      mode: "cell",
      anchor: normalized,
      focus: normalized,
    };
  }

  function createRangeSelection(anchor, focus) {
    return {
      mode: "range",
      anchor: normalizeCell(anchor),
      focus: normalizeCell(focus),
    };
  }

  function createRowSelection(rowIndex, columnCount, focusRowIndex = rowIndex) {
    const row = normalizePositiveIndex(rowIndex);
    const focusRow = normalizePositiveIndex(focusRowIndex);
    const endCol = normalizePositiveIndex(columnCount);
    return {
      mode: "row",
      anchor: { row, col: 1 },
      focus: { row: focusRow, col: endCol },
    };
  }

  function createColumnSelection(columnIndex, rowCount, focusColumnIndex = columnIndex) {
    const col = normalizePositiveIndex(columnIndex);
    const focusCol = normalizePositiveIndex(focusColumnIndex);
    const endRow = normalizePositiveIndex(rowCount);
    return {
      mode: "column",
      anchor: { row: 1, col },
      focus: { row: endRow, col: focusCol },
    };
  }

  function getSelectionBounds(selection) {
    const anchor = normalizeCell(selection?.anchor);
    const focus = normalizeCell(selection?.focus);
    return {
      startRow: Math.min(anchor.row, focus.row),
      endRow: Math.max(anchor.row, focus.row),
      startCol: Math.min(anchor.col, focus.col),
      endCol: Math.max(anchor.col, focus.col),
    };
  }

  function isCellSelected(selection, rowIndex, columnIndex) {
    const bounds = getSelectionBounds(selection);
    return (
      rowIndex >= bounds.startRow &&
      rowIndex <= bounds.endRow &&
      columnIndex >= bounds.startCol &&
      columnIndex <= bounds.endCol
    );
  }

  function isRowHeaderSelected(selection, rowIndex) {
    const bounds = getSelectionBounds(selection);
    return rowIndex >= bounds.startRow && rowIndex <= bounds.endRow;
  }

  function isColumnHeaderSelected(selection, columnIndex) {
    const bounds = getSelectionBounds(selection);
    return columnIndex >= bounds.startCol && columnIndex <= bounds.endCol;
  }

  function moveActiveCell(activeCell, direction, limits) {
    const cell = normalizeCell(activeCell);
    const rowCount = normalizePositiveIndex(limits?.rowCount);
    const columnCount = normalizePositiveIndex(limits?.columnCount);
    const deltas = {
      left: { row: 0, col: -1 },
      right: { row: 0, col: 1 },
      up: { row: -1, col: 0 },
      down: { row: 1, col: 0 },
      tab: { row: 0, col: 1 },
      "shift+tab": { row: 0, col: -1 },
      enter: { row: 1, col: 0 },
      "shift+enter": { row: -1, col: 0 },
    };
    const delta = deltas[direction] || { row: 0, col: 0 };
    return {
      row: clampNumber(cell.row + delta.row, 1, rowCount),
      col: clampNumber(cell.col + delta.col, 1, columnCount),
    };
  }

  function normalizeCell(cell) {
    return {
      row: normalizePositiveIndex(cell?.row),
      col: normalizePositiveIndex(cell?.col),
    };
  }

  function columnKeyForIndex(columnIndex) {
    return columnKeyForIndexFromTableModel(columnIndex);
  }

  function getKeyboardEditIntent(eventLike) {
    const key = String(eventLike?.key ?? "");
    if (!key) return null;
    if (eventLike?.ctrlKey || eventLike?.metaKey) return null;
    if (key === "F2") {
      return { type: "edit-current", text: "" };
    }
    if ((key === "Backspace" || key === "Delete") && !eventLike?.altKey) {
      return { type: "replace-all", text: "" };
    }
    if (key === "Enter" && eventLike?.altKey) {
      return { type: "append", text: "\\n" };
    }
    if (key.length === 1 && !eventLike?.altKey) {
      return { type: "replace-all", text: key };
    }
    return null;
  }

  function applyKeyboardEditIntent(currentValue, intent) {
    const value = String(currentValue ?? "");
    if (!intent) return value;
    if (intent.type === "replace-all") {
      return String(intent.text ?? "");
    }
    if (intent.type === "append") {
      return \`\${value}\${String(intent.text ?? "")}\`;
    }
    return value;
  }

  function normalizePositiveIndex(value) {
    return Math.max(1, Math.trunc(Number(value) || 1));
  }

  function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, Math.trunc(Number(value) || min)));
  }


  function createHistoryState() {
    return {
      past: [],
      future: [],
    };
  }

  function canUndo(history) {
    return (history?.past?.length ?? 0) > 0;
  }

  function canRedo(history) {
    return (history?.future?.length ?? 0) > 0;
  }

  function pushHistorySnapshot(history, snapshot) {
    return {
      past: [...(history?.past ?? []), cloneSnapshot(snapshot)],
      future: [],
    };
  }

  function undoHistory(history, currentSnapshot) {
    const past = history?.past ?? [];
    if (!past.length) {
      return {
        history: history ?? createHistoryState(),
        snapshot: null,
      };
    }
    return {
      history: {
        past: past.slice(0, -1),
        future: [cloneSnapshot(currentSnapshot), ...(history?.future ?? [])],
      },
      snapshot: cloneSnapshot(past.at(-1)),
    };
  }

  function redoHistory(history, currentSnapshot) {
    const future = history?.future ?? [];
    if (!future.length) {
      return {
        history: history ?? createHistoryState(),
        snapshot: null,
      };
    }
    return {
      history: {
        past: [...(history?.past ?? []), cloneSnapshot(currentSnapshot)],
        future: future.slice(1),
      },
      snapshot: cloneSnapshot(future[0]),
    };
  }

  function cloneSnapshot(snapshot) {
    return JSON.parse(JSON.stringify(snapshot ?? null));
  }


  function selectionToMatrix(table, selection) {
    const bounds = getSelectionBounds(selection);
    const matrix = [];
    for (let rowIndex = bounds.startRow; rowIndex <= bounds.endRow; rowIndex += 1) {
      const row = [];
      for (let columnIndex = bounds.startCol; columnIndex <= bounds.endCol; columnIndex += 1) {
        row.push(getCellValue(table, rowIndex, columnIndex));
      }
      matrix.push(row);
    }
    return matrix;
  }

  function selectionToDelimitedText(table, selection, options = {}) {
    const delimiter = options.delimiter ?? "\\t";
    const lineEnding = options.lineEnding ?? "\\r\\n";
    return matrixToDelimitedText(selectionToMatrix(table, selection), {
      delimiter,
      lineEnding,
    });
  }

  function matrixToDelimitedText(matrix, options = {}) {
    const delimiter = options.delimiter ?? "\\t";
    const lineEnding = options.lineEnding ?? "\\r\\n";
    return matrix
      .map((row) => row.map((value) => encodeDelimitedCell(value, delimiter)).join(delimiter))
      .join(lineEnding);
  }

  function parseDelimitedText(text, options = {}) {
    const source = String(text ?? "");
    if (source === "") {
      return options.preserveEmptyCell ? [[""]] : [];
    }
    const delimiter = options.delimiter ?? "\\t";
    const rows = [];
    let row = [];
    let cell = "";
    let inQuotes = false;

    for (let index = 0; index < source.length; index += 1) {
      const char = source[index];
      const nextChar = source[index + 1];
      if (inQuotes) {
        if (char === "\\"" && nextChar === "\\"") {
          cell += "\\"";
          index += 1;
        } else if (char === "\\"") {
          inQuotes = false;
        } else {
          cell += char;
        }
        continue;
      }

      if (char === "\\"") {
        inQuotes = true;
        continue;
      }
      if (char === delimiter) {
        row.push(cell);
        cell = "";
        continue;
      }
      if (char === "\\r" || char === "\\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
        if (char === "\\r" && nextChar === "\\n") {
          index += 1;
        }
        continue;
      }
      cell += char;
    }

    row.push(cell);
    rows.push(row);
    return trimTrailingBlankRow(rows, source);
  }

  function applyMatrixToTable(table, startCell, matrix) {
    return applyMatrixToLightTable(table, normalizeCell(startCell), matrix);
  }

  function selectionFromMatrix(startCell, matrix) {
    const origin = normalizeCell(startCell);
    const rowCount = Math.max(1, matrix.length);
    const columnCount = Math.max(1, Math.max(...matrix.map((row) => row.length), 1));
    return createRangeSelection(origin, {
      row: origin.row + rowCount - 1,
      col: origin.col + columnCount - 1,
    });
  }

  function fillSelectionByRepeat(table, selection, targetCell) {
    const sourceBounds = getSelectionBounds(selection);
    const focus = normalizeCell(targetCell);
    const targetBounds = {
      startRow: Math.min(sourceBounds.startRow, focus.row),
      endRow: Math.max(sourceBounds.endRow, focus.row),
      startCol: Math.min(sourceBounds.startCol, focus.col),
      endCol: Math.max(sourceBounds.endCol, focus.col),
    };
    if (boundsEqual(sourceBounds, targetBounds)) {
      return {
        table,
        selection,
      };
    }

    const sourceMatrix = selectionToMatrix(table, selection);
    const sourceRowCount = Math.max(1, sourceMatrix.length);
    const sourceColumnCount = Math.max(1, Math.max(...sourceMatrix.map((row) => row.length), 1));
    let nextTable = table;

    for (let rowIndex = targetBounds.startRow; rowIndex <= targetBounds.endRow; rowIndex += 1) {
      for (let columnIndex = targetBounds.startCol; columnIndex <= targetBounds.endCol; columnIndex += 1) {
        if (isWithinBounds(rowIndex, columnIndex, sourceBounds)) continue;
        const sourceRowOffset = positiveModulo(rowIndex - sourceBounds.startRow, sourceRowCount);
        const sourceColumnOffset = positiveModulo(columnIndex - sourceBounds.startCol, sourceColumnCount);
        const nextValue = sourceMatrix[sourceRowOffset]?.[sourceColumnOffset] ?? "";
        nextTable = setCellValue(nextTable, rowIndex, columnIndex, nextValue);
      }
    }

    return {
      table: nextTable,
      selection: createRangeSelection(
        { row: targetBounds.startRow, col: targetBounds.startCol },
        { row: targetBounds.endRow, col: targetBounds.endCol },
      ),
    };
  }

  function encodeDelimitedCell(value, delimiter) {
    const text = String(value ?? "");
    if (!/["\\r\\n]/.test(text) && !text.includes(delimiter)) {
      return text;
    }
    return \`"\${text.replace(/"/g, "\\"\\"")}"\`;
  }

  function trimTrailingBlankRow(rows, source) {
    if (!rows.length) return [];
    const endsWithLineBreak = /(?:\\r\\n|\\r|\\n)$/.test(source);
    if (!endsWithLineBreak) return rows;
    const lastRow = rows.at(-1) ?? [];
    const isBlank = lastRow.every((cell) => cell === "");
    return isBlank && rows.length > 1 ? rows.slice(0, -1) : rows;
  }

  function boundsEqual(left, right) {
    return left.startRow === right.startRow
      && left.endRow === right.endRow
      && left.startCol === right.startCol
      && left.endCol === right.endCol;
  }

  function isWithinBounds(rowIndex, columnIndex, bounds) {
    return rowIndex >= bounds.startRow
      && rowIndex <= bounds.endRow
      && columnIndex >= bounds.startCol
      && columnIndex <= bounds.endCol;
  }

  function positiveModulo(value, divisor) {
    return ((value % divisor) + divisor) % divisor;
  }


  const createEmptyLightTableModel = tableModelCreateEmptyLightTable;
  const DEFAULT_VIEWPORT_COLUMN_COUNT = DEFAULT_GRID_LIMIT_COLUMN_COUNT;
  const DEFAULT_VIEWPORT_ROW_COUNT = DEFAULT_GRID_LIMIT_ROW_COUNT;

  function columnLabelFromIndex(columnIndex) {
    let index = Math.trunc(Number(columnIndex));
    if (index < 1) {
      throw new Error("Column index must be 1 or greater.");
    }
    let label = "";
    while (index > 0) {
      const remainder = (index - 1) % 26;
      label = String.fromCharCode(65 + remainder) + label;
      index = Math.floor((index - 1) / 26);
    }
    return label;
  }

  function gridCellName(rowIndex, columnIndex) {
    const row = Math.max(1, Math.trunc(Number(rowIndex) || 1));
    return \`\${columnLabelFromIndex(columnIndex)}\${row}\`;
  }

  function createEmptyLightTable() {
    return createEmptyLightTableModel();
  }

  function isViewportPaddingRow(table, rowIndex) {
    const safeTable = isObject(table) ? table : createEmptyLightTable();
    const safeRowIndex = Math.max(1, Math.trunc(Number(rowIndex) || 1));
    return safeRowIndex > getSheetRowCount(safeTable);
  }

  function buildSheetGridView(table, options = {}) {
    const safeTable = isObject(table) ? table : createEmptyLightTable();
    const gridLimits = getGridLimits(safeTable);
    const minColumnCount = normalizeViewportSize(options.minColumnCount, gridLimits.maxColumns);
    const minRowCount = normalizeViewportSize(options.minRowCount, gridLimits.maxRows);
    const dataColumnCount = getColumnCount(safeTable);
    const dataRowCount = getSheetRowCount(safeTable);
    const columnCount = Math.max(1, minColumnCount, dataColumnCount);
    const rowCount = Math.max(1, minRowCount, dataRowCount);
    const renderedColumnIndices = resolveRenderedIndices(options.columnIndices, columnCount);
    const columns = renderedColumnIndices.map((columnIndex) => ({
      index: columnIndex,
      key: \`c\${columnIndex}\`,
      letter: columnLabelFromIndex(columnIndex),
      label: normalizeDisplayText(getCellValue(safeTable, getHeaderRowIndex(safeTable), columnIndex)),
    }));
    const renderedRowIndices = resolveRenderedRowIndices(options.rowIndices, rowCount);
    const rows = renderedRowIndices.map((rowIndex) => {
      const safeRowIndex = Math.max(1, Math.min(rowCount, rowIndex));
      return {
        index: safeRowIndex,
        cells: columns.map((column) => ({
          row: safeRowIndex,
          col: column.index,
          value: normalizeDisplayText(getCellValue(safeTable, safeRowIndex, column.index)),
        })),
      };
    });
    return {
      columnCount,
      rowCount,
      headerRowIndex: getHeaderRowIndex(safeTable),
      columns,
      rows,
    };
  }

  function normalizeViewportSize(value, fallback) {
    return Math.max(1, Math.trunc(Number(value) || fallback));
  }

  function resolveRenderedRowIndices(rowIndices, rowCount) {
    return resolveRenderedIndices(rowIndices, rowCount);
  }

  function resolveRenderedIndices(indices, maxCount) {
    if (!Array.isArray(indices) || !indices.length) {
      return Array.from({ length: maxCount }, (_, offset) => offset + 1);
    }
    const rendered = [];
    const seen = new Set();
    indices.forEach((index) => {
      const normalized = Math.max(1, Math.min(maxCount, Math.trunc(Number(index) || 1)));
      if (seen.has(normalized)) return;
      seen.add(normalized);
      rendered.push(normalized);
    });
    return rendered.length ? rendered : [1];
  }

  function normalizeDisplayText(value) {
    if (value == null) return "";
    return String(value);
  }

  function isObject(value) {
    return Boolean(value && typeof value === "object");
  }


  const TEXT_ENCODINGS = new Map([
    ["UTF-8", "utf-8"],
    ["Shift-JIS", "shift_jis"],
    ["UTF-16LE", "utf-16le"],
  ]);

  function inferImportFileKind(fileName = "") {
    const normalized = String(fileName || "").trim().toLowerCase();
    if (normalized.endsWith(".xlsx")) return "xlsx";
    if (normalized.endsWith(".xlsm")) return "xlsm";
    if (normalized.endsWith(".xls")) return "xls";
    if (normalized.endsWith(".csv")) return "csv";
    if (normalized.endsWith(".tsv")) return "tsv";
    if (normalized.endsWith(".txt")) return "txt";
    if (normalized.endsWith(".json")) return "json";
    if (normalized.endsWith(".xml")) return "xml";
    return "";
  }

  function isExcelImportKind(fileKind) {
    return fileKind === "xlsx" || fileKind === "xlsm" || fileKind === "xls";
  }

  function isTextImportKind(fileKind) {
    return fileKind === "csv"
      || fileKind === "tsv"
      || fileKind === "txt"
      || fileKind === "json"
      || fileKind === "xml";
  }

  function getSupportedTextImportEncodings() {
    return Array.from(TEXT_ENCODINGS.keys());
  }

  function normalizeTextImportEncoding(encoding = "UTF-8") {
    const normalized = String(encoding || "").trim();
    return TEXT_ENCODINGS.get(normalized) || TEXT_ENCODINGS.get("UTF-8");
  }

  function inferDefaultTextImportEncoding(bytes) {
    const source = toUint8Array(bytes);
    if (source[0] === 0xef && source[1] === 0xbb && source[2] === 0xbf) {
      return "UTF-8";
    }
    if (source[0] === 0xff && source[1] === 0xfe) {
      return "UTF-16LE";
    }
    return "UTF-8";
  }

  function inferDefaultDelimiterMode(fileKind) {
    if (fileKind === "csv") return "comma";
    if (fileKind === "tsv") return "tab";
    return "line";
  }

  function decodeTextImportBytes(bytes, encoding = "UTF-8") {
    const source = stripKnownBom(toUint8Array(bytes));
    const decoder = new TextDecoder(normalizeTextImportEncoding(encoding));
    return decoder.decode(source);
  }

  function parseTextImportContent(options) {
    const fileName = String(options?.fileName || "");
    const fileKind = inferImportFileKind(fileName);
    if (!isTextImportKind(fileKind)) {
      throw new Error("The selected file is not a supported text or structured-data import type.");
    }
    const encoding = String(options?.encoding || inferDefaultTextImportEncoding(options?.bytes));
    const text = decodeTextImportBytes(options?.bytes, encoding);
    const delimiterMode = resolveDelimiterMode(fileKind, options?.delimiterMode);
    const matrix = parseTextImportText({
      text,
      fileKind,
      delimiterMode,
    });
    return {
      fileKind,
      encoding,
      delimiterMode,
      text,
      matrix,
    };
  }

  function parseTextImportText(options) {
    const fileKind = String(options?.fileKind || "");
    const text = String(options?.text || "");
    const delimiterMode = resolveDelimiterMode(fileKind, options?.delimiterMode);

    if (fileKind === "json") {
      return jsonValueToMatrix(JSON.parse(text));
    }
    if (fileKind === "xml") {
      return xmlStringToMatrix(text);
    }
    if (delimiterMode === "line") {
      return parseLineBasedText(text);
    }
    return parseDelimitedText(text, {
      delimiter: delimiterMode === "comma" ? "," : "\\t",
    });
  }

  function parseLineBasedText(text) {
    const source = String(text || "");
    if (source === "") return [];
    const rows = source
      .replace(/\\r\\n/g, "\\n")
      .replace(/\\r/g, "\\n")
      .split("\\n")
      .map((line) => [line]);
    if (rows.length > 1 && rows.at(-1)?.[0] === "" && /\\r?\\n$/.test(source)) {
      return rows.slice(0, -1);
    }
    return rows;
  }

  function jsonValueToMatrix(value) {
    const rows = [["Path", "Value"]];
    appendJsonRows("$", value, rows);
    if (rows.length === 1) {
      rows.push(["$", ""]);
    }
    return rows;
  }

  function xmlStringToMatrix(source) {
    const text = String(source || "").replace(/^\\uFEFF/, "");
    const tokenPattern = /<!--[\\s\\S]*?-->|<\\?[\\s\\S]*?\\?>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|<[^>]+>|[^<]+/g;
    const tokens = text.match(tokenPattern) || [];
    const rows = [["Path", "Value"]];
    const stack = [];

    for (const token of tokens) {
      if (!token || /^<\\?/.test(token) || /^<!--/.test(token)) {
        continue;
      }

      if (/^<!\\[CDATA\\[/.test(token)) {
        const value = decodeXmlEntities(token.slice(9, -3));
        if (value.trim() !== "" && stack.length) {
          rows.push([buildXmlPath(stack), value]);
        }
        continue;
      }

      if (token.startsWith("</")) {
        const closingName = token.slice(2, -1).trim();
        const activeNode = stack.at(-1);
        if (!activeNode || activeNode.name !== closingName) {
          throw new Error(\`The XML structure is invalid near </\${closingName}>.\`);
        }
        stack.pop();
        continue;
      }

      if (token.startsWith("<")) {
        const selfClosing = /\\/>$/.test(token);
        const content = token.slice(1, selfClosing ? -2 : -1).trim();
        if (!content) continue;
        const spaceIndex = content.search(/\\s/);
        const name = spaceIndex === -1 ? content : content.slice(0, spaceIndex);
        const attributeText = spaceIndex === -1 ? "" : content.slice(spaceIndex + 1);
        if (!name) {
          throw new Error("The XML structure is invalid.");
        }
        stack.push({ name });
        const path = buildXmlPath(stack);
        const attributes = parseXmlAttributes(attributeText);
        attributes.forEach(([attributeName, attributeValue]) => {
          rows.push([\`\${path}/@\${attributeName}\`, attributeValue]);
        });
        if (selfClosing) {
          if (!attributes.length) {
            rows.push([path, ""]);
          }
          stack.pop();
        }
        continue;
      }

      const value = decodeXmlEntities(token);
      if (value.trim() !== "" && stack.length) {
        rows.push([buildXmlPath(stack), value.trim()]);
      }
    }

    if (stack.length) {
      throw new Error(\`The XML structure is invalid near <\${stack.at(-1)?.name || ""}>.\`);
    }
    if (rows.length === 1) {
      rows.push(["/", ""]);
    }
    return rows;
  }

  function getImportAnchorCell(selection) {
    if (!selection?.anchor && !selection?.focus) {
      return { row: 1, col: 1 };
    }
    const bounds = getSelectionBounds(selection);
    return {
      row: bounds.startRow,
      col: bounds.startCol,
    };
  }

  function listExcelWorkbookSheets(workbook) {
    return Array.from(workbook?.SheetNames || []).map((sheetName, index) => {
      const sheet = workbook?.Sheets?.[sheetName];
      const range = decodeExcelRange(sheet?.["!ref"] || "A1");
      return {
        index,
        name: sheetName,
        rowCount: range.endRow - range.startRow + 1,
        colCount: range.endCol - range.startCol + 1,
      };
    });
  }

  function excelWorkbookToMatrix(workbook, sheetRef = undefined) {
    const sheetName = resolveExcelSheetName(workbook, sheetRef);
    const sheet = workbook?.Sheets?.[sheetName];
    if (!sheet) {
      throw new Error("The Excel workbook does not contain the requested sheet.");
    }
    const range = decodeExcelRange(sheet["!ref"] || "A1");
    const matrix = [];

    for (let rowIndex = range.startRow; rowIndex <= range.endRow; rowIndex += 1) {
      const row = [];
      for (let columnIndex = range.startCol; columnIndex <= range.endCol; columnIndex += 1) {
        row.push(readExcelSheetCell(sheet, rowIndex, columnIndex));
      }
      matrix.push(row);
    }

    return {
      sheetName,
      matrix,
      rowCount: matrix.length,
      colCount: matrix.reduce((max, row) => Math.max(max, row.length), 0),
    };
  }

  function resolveDelimiterMode(fileKind, delimiterMode) {
    const normalized = String(delimiterMode || "").trim();
    if (normalized === "comma" || normalized === "tab" || normalized === "line") {
      return normalized;
    }
    return inferDefaultDelimiterMode(fileKind);
  }

  function stripKnownBom(bytes) {
    if (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
      return bytes.slice(3);
    }
    if (bytes[0] === 0xff && bytes[1] === 0xfe) {
      return bytes.slice(2);
    }
    if (bytes[0] === 0xfe && bytes[1] === 0xff) {
      return bytes.slice(2);
    }
    return bytes;
  }

  function toUint8Array(bytes) {
    if (bytes instanceof Uint8Array) return bytes;
    if (bytes instanceof ArrayBuffer) return new Uint8Array(bytes);
    if (ArrayBuffer.isView(bytes)) return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    return new Uint8Array(0);
  }

  function appendJsonRows(path, value, rows) {
    if (Array.isArray(value)) {
      if (!value.length) {
        rows.push([path, "[]"]);
        return;
      }
      value.forEach((entry, index) => appendJsonRows(\`\${path}[\${index}]\`, entry, rows));
      return;
    }

    if (value && typeof value === "object") {
      const entries = Object.entries(value);
      if (!entries.length) {
        rows.push([path, "{}"]);
        return;
      }
      entries.forEach(([key, entry]) => appendJsonRows(\`\${path}.\${key}\`, entry, rows));
      return;
    }

    rows.push([path, formatPrimitiveValue(value)]);
  }

  function parseXmlAttributes(attributeText) {
    const attributes = [];
    const attributePattern = /([^\\s=]+)\\s*=\\s*("([^"]*)"|'([^']*)')/g;
    let match;
    while ((match = attributePattern.exec(attributeText)) !== null) {
      attributes.push([match[1], decodeXmlEntities(match[3] ?? match[4] ?? "")]);
    }
    return attributes;
  }

  function buildXmlPath(stack) {
    return \`/\${stack.map((entry) => entry.name).join("/")}\`;
  }

  function decodeXmlEntities(value) {
    return String(value || "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "\\"")
      .replace(/&apos;/g, "'")
      .replace(/&amp;/g, "&");
  }

  function resolveExcelSheetName(workbook, sheetRef = undefined) {
    const names = Array.from(workbook?.SheetNames || []);
    if (!names.length) {
      throw new Error("The Excel workbook does not contain any sheets.");
    }
    if (typeof sheetRef === "number" && Number.isInteger(sheetRef)) {
      return names[sheetRef] || names[0];
    }
    if (typeof sheetRef === "string" && sheetRef.trim() !== "" && names.includes(sheetRef)) {
      return sheetRef;
    }
    return names[0];
  }

  function decodeExcelRange(rangeRef) {
    const rangeText = String(rangeRef || "A1");
    const [startRef, endRef] = rangeText.split(":");
    const start = decodeExcelCellAddress(startRef);
    const end = decodeExcelCellAddress(endRef || startRef);
    return {
      startRow: Math.min(start.row, end.row),
      endRow: Math.max(start.row, end.row),
      startCol: Math.min(start.col, end.col),
      endCol: Math.max(start.col, end.col),
    };
  }

  function decodeExcelCellAddress(address) {
    const match = String(address || "A1").trim().match(/^([A-Z]+)(\\d+)$/i);
    if (!match) {
      return { row: 1, col: 1 };
    }
    return {
      col: decodeExcelColumnLabel(match[1]),
      row: Math.max(1, Number(match[2]) || 1),
    };
  }

  function decodeExcelColumnLabel(label) {
    return String(label || "")
      .toUpperCase()
      .split("")
      .reduce((total, char) => (total * 26) + (char.charCodeAt(0) - 64), 0);
  }

  function encodeExcelCellAddress(rowIndex, columnIndex) {
    let col = Math.max(1, Number(columnIndex) || 1);
    let label = "";
    while (col > 0) {
      const remainder = (col - 1) % 26;
      label = String.fromCharCode(65 + remainder) + label;
      col = Math.floor((col - 1) / 26);
    }
    return \`\${label}\${Math.max(1, Number(rowIndex) || 1)}\`;
  }

  function readExcelSheetCell(sheet, rowIndex, columnIndex) {
    const cell = sheet?.[encodeExcelCellAddress(rowIndex, columnIndex)];
    if (!cell) return "";
    if (cell.t === "b") {
      return cell.v ? "true" : "false";
    }
    if (cell.w != null && cell.w !== "") return String(cell.w);
    if (cell.v == null) return "";
    return formatPrimitiveValue(cell.v);
  }

  function formatPrimitiveValue(value) {
    if (value == null) return "";
    return String(value);
  }


  const TEXT_EXPORT_TARGETS = ["csv", "tsv", "txt"];
  const TEXT_EXPORT_ENCODINGS = ["UTF-8", "Shift-JIS", "UTF-16LE", "UTF-16BE", "EUC-JP"];
  const TEXT_EXPORT_ROW_LINE_ENDINGS = ["CR+LF", "LF", "CR"];

  function getSupportedTextExportTargets() {
    return [...TEXT_EXPORT_TARGETS];
  }

  function getSupportedTextExportEncodings() {
    return [...TEXT_EXPORT_ENCODINGS];
  }

  function getSupportedTextExportRowLineEndings() {
    return [...TEXT_EXPORT_ROW_LINE_ENDINGS];
  }

  function createDefaultTextExportSettings(target = "csv") {
    return normalizeTextExportSettings({
      target,
      encoding: "UTF-8",
      rowLineEnding: "CR+LF",
      normalizeCellLineBreaksToLf: false,
      withBom: false,
      quoteAllCells: false,
      includeHiddenData: true,
    });
  }

  function normalizeTextExportSettings(settings = {}) {
    const target = normalizeTextExportTarget(settings.target);
    const encoding = normalizeTextExportEncoding(settings.encoding);
    const rowLineEnding = normalizeTextExportRowLineEnding(settings.rowLineEnding);
    return {
      target,
      encoding,
      rowLineEnding,
      normalizeCellLineBreaksToLf: Boolean(settings.normalizeCellLineBreaksToLf),
      withBom: Boolean(settings.withBom),
      quoteAllCells: target === "csv" && Boolean(settings.quoteAllCells),
      includeHiddenData: settings.includeHiddenData !== false,
    };
  }

  function normalizeTextExportTarget(target = "csv") {
    const normalized = String(target || "").trim().toLowerCase();
    return TEXT_EXPORT_TARGETS.includes(normalized) ? normalized : "csv";
  }

  function normalizeTextExportEncoding(encoding = "UTF-8") {
    const normalized = String(encoding || "").trim().toUpperCase();
    const match = TEXT_EXPORT_ENCODINGS.find((entry) => entry.toUpperCase() === normalized);
    return match || "UTF-8";
  }

  function normalizeTextExportRowLineEnding(rowLineEnding = "CR+LF") {
    const normalized = String(rowLineEnding || "").trim().toUpperCase();
    if (normalized === "LF" || normalized === "CR") {
      return normalized;
    }
    return "CR+LF";
  }

  function shouldEnableBomToggle(encoding = "UTF-8") {
    return ["UTF-8", "UTF-16LE", "UTF-16BE"].includes(normalizeTextExportEncoding(encoding));
  }

  function resolveTextExportDelimiter(target = "csv") {
    const normalizedTarget = normalizeTextExportTarget(target);
    if (normalizedTarget === "csv") return ",";
    return "\\t";
  }

  function resolveTextExportRowLineEndingSequence(rowLineEnding = "CR+LF") {
    const normalized = normalizeTextExportRowLineEnding(rowLineEnding);
    if (normalized === "LF") return "\\n";
    if (normalized === "CR") return "\\r";
    return "\\r\\n";
  }

  function buildTextExportMatrix(table, options = {}) {
    const columnCount = getColumnCount(table);
    const rowCount = getSheetRowCount(table);
    const visibleRowSet = options.visibleRowSet instanceof Set ? options.visibleRowSet : null;
    const includeHiddenData = options.includeHiddenData !== false;
    const matrix = [];

    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex += 1) {
      if (!includeHiddenData && visibleRowSet && !visibleRowSet.has(rowIndex)) {
        continue;
      }
      const row = [];
      for (let columnIndex = 1; columnIndex <= columnCount; columnIndex += 1) {
        row.push(getCellValue(table, rowIndex, columnIndex));
      }
      matrix.push(row);
    }

    return matrix;
  }

  function serializeTextExportMatrix(matrix, options = {}) {
    const settings = normalizeTextExportSettings(options);
    const delimiter = resolveTextExportDelimiter(settings.target);
    const rowLineEnding = resolveTextExportRowLineEndingSequence(settings.rowLineEnding);
    return (Array.isArray(matrix) ? matrix : [])
      .map((row) => {
        const safeRow = Array.isArray(row) ? row : [];
        return safeRow.map((value) => encodeDelimitedExportCell(value, {
          delimiter,
          quoteAllCells: settings.quoteAllCells,
          normalizeCellLineBreaksToLf: settings.normalizeCellLineBreaksToLf,
        })).join(delimiter);
      })
      .join(rowLineEnding);
  }

  function serializeTextExport(table, options = {}) {
    const settings = normalizeTextExportSettings(options);
    const matrix = buildTextExportMatrix(table, settings);
    return {
      matrix,
      text: serializeTextExportMatrix(matrix, settings),
      settings,
    };
  }

  function encodeTextExportBytes(text, options = {}) {
    const settings = normalizeTextExportSettings(options);
    let bytes;

    if (settings.encoding === "UTF-8") {
      bytes = new TextEncoder().encode(text);
    } else if (settings.encoding === "UTF-16LE") {
      bytes = encodeUtf16(text, false);
    } else if (settings.encoding === "UTF-16BE") {
      bytes = encodeUtf16(text, true);
    } else {
      const legacyEncode = typeof options.legacyEncode === "function" ? options.legacyEncode : null;
      if (!legacyEncode) {
        throw new Error(\`This browser build does not have a \${settings.encoding} encoder loaded.\`);
      }
      const encoded = legacyEncode(settings.encoding, text);
      bytes = encoded instanceof Uint8Array ? encoded : Uint8Array.from(encoded || []);
    }

    if (!settings.withBom || !shouldEnableBomToggle(settings.encoding)) {
      return bytes;
    }
    return prependBomBytes(bytes, settings.encoding);
  }

  function formatTextExportSummary(options = {}) {
    const settings = normalizeTextExportSettings(options);
    const parts = [
      settings.target.toUpperCase(),
      settings.encoding,
      settings.rowLineEnding,
      settings.withBom && shouldEnableBomToggle(settings.encoding) ? "BOM on" : "BOM off",
    ];
    if (settings.target === "csv") {
      parts.push(settings.quoteAllCells ? "Quote all" : "Quote minimal");
    }
    parts.push(settings.includeHiddenData ? "Include hidden" : "Visible rows only");
    if (settings.normalizeCellLineBreaksToLf) {
      parts.push("Cell LF");
    }
    return parts.join(" / ");
  }

  function encodeDelimitedExportCell(value, options = {}) {
    let text = String(value ?? "");
    if (options.normalizeCellLineBreaksToLf) {
      text = text.replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n");
    }
    const escaped = text.replace(/"/g, "\\"\\"");
    if (options.quoteAllCells) {
      return \`"\${escaped}"\`;
    }
    if (!/["\\r\\n]/.test(text) && !text.includes(options.delimiter || ",")) {
      return text;
    }
    return \`"\${escaped}"\`;
  }

  function encodeUtf16(text, bigEndian) {
    const source = String(text ?? "");
    const bytes = new Uint8Array(source.length * 2);
    for (let index = 0; index < source.length; index += 1) {
      const codeUnit = source.charCodeAt(index);
      const offset = index * 2;
      if (bigEndian) {
        bytes[offset] = (codeUnit >> 8) & 0xff;
        bytes[offset + 1] = codeUnit & 0xff;
      } else {
        bytes[offset] = codeUnit & 0xff;
        bytes[offset + 1] = (codeUnit >> 8) & 0xff;
      }
    }
    return bytes;
  }

  function prependBomBytes(bytes, encoding) {
    let bom = [];
    if (encoding === "UTF-8") {
      bom = [0xef, 0xbb, 0xbf];
    } else if (encoding === "UTF-16LE") {
      bom = [0xff, 0xfe];
    } else if (encoding === "UTF-16BE") {
      bom = [0xfe, 0xff];
    }
    const prefixed = new Uint8Array(bom.length + bytes.length);
    prefixed.set(bom, 0);
    prefixed.set(bytes, bom.length);
    return prefixed;
  }


  const MAX_ADVANCED_FILTER_CONDITIONS = 20;
  const COLUMN_FILTER_OPERATORS = ["contains", "equals", "is-empty", "is-not-empty"];

  const ADVANCED_OPERATOR_SET = new Set(["contains", "equals", "is-empty", "is-not-empty"]);
  const LOGIC_PRECEDENCE = {
    OR: 1,
    AND: 2,
  };
  const NATURAL_COLLATOR = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  function getSearchScope(table, selection) {
    const bounds = getSelectionBounds(selection);
    const cellCount = (bounds.endRow - bounds.startRow + 1) * (bounds.endCol - bounds.startCol + 1);
    if (cellCount > 1) {
      return bounds;
    }
    return {
      startRow: 1,
      endRow: getSheetRowCount(table),
      startCol: 1,
      endCol: Math.max(1, getColumnCount(table)),
    };
  }

  function findNextMatch(table, selection, startCell, options = {}) {
    const scope = getSearchScope(table, selection);
    const matches = collectMatchesInScope(table, scope, options);
    if (!matches.length) return null;
    const anchor = normalizeCell(startCell);
    const inclusive = Boolean(options.includeCurrent);
    const nextIndex = matches.findIndex((match) => {
      if (match.row > anchor.row) return true;
      if (match.row < anchor.row) return false;
      if (match.col > anchor.col) return true;
      if (match.col < anchor.col) return false;
      return inclusive;
    });
    return nextIndex >= 0 ? matches[nextIndex] : matches[0];
  }

  function replaceAllMatches(table, selection, options = {}) {
    const scope = getSearchScope(table, selection);
    const matches = collectMatchesInScope(table, scope, options);
    if (!matches.length) {
      return {
        table,
        count: 0,
        matches: [],
      };
    }
    let nextTable = table;
    matches.forEach((match) => {
      nextTable = applyMatchReplacement(nextTable, match, options);
    });
    return {
      table: nextTable,
      count: matches.length,
      matches,
    };
  }

  function buildDefaultAdvancedFilterLogic(conditionCount) {
    const count = Math.max(0, Math.min(MAX_ADVANCED_FILTER_CONDITIONS, Math.trunc(Number(conditionCount) || 0)));
    if (count <= 0) return "";
    return Array.from({ length: count }, (_, index) => String(index + 1)).join(" AND ");
  }

  function validateAdvancedFilterDefinition(definition = {}) {
    const conditions = normalizeAdvancedConditions(definition.conditions || []);
    if (!conditions.length) {
      return {
        ok: true,
        errors: [],
        logic: "",
        conditions,
        postfix: [],
      };
    }

    const requiredValueError = findConditionValueError(conditions);
    if (requiredValueError) {
      return {
        ok: false,
        errors: [requiredValueError],
        logic: buildDefaultAdvancedFilterLogic(conditions.length),
        conditions,
        postfix: [],
      };
    }

    const rawLogic = String(definition.logic ?? "").trim();
    const logic = rawLogic || buildDefaultAdvancedFilterLogic(conditions.length);
    const parsed = parseLogicExpression(logic, conditions.length);
    return {
      ok: parsed.ok,
      errors: parsed.errors,
      logic,
      conditions,
      postfix: parsed.postfix,
    };
  }

  function getVisibleRowSet(table, filterState = {}) {
    const rowCount = getSheetRowCount(table);
    const visibleRows = new Set();
    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex += 1) {
      if (isRowVisible(table, rowIndex, filterState)) {
        visibleRows.add(rowIndex);
      }
    }
    return visibleRows;
  }

  function isRowVisible(table, rowIndex, filterState = {}) {
    const row = Math.max(1, Math.trunc(Number(rowIndex) || 1));
    const headerRowIndex = getHeaderRowIndex(table);
    const searchText = String(filterState.globalSearch ?? "").trim();

    if (row === headerRowIndex) {
      return true;
    }

    if (row < headerRowIndex) {
      return searchText === "" ? true : rowMatchesQuery(table, row, searchText);
    }

    if (searchText !== "" && !rowMatchesQuery(table, row, searchText)) {
      return false;
    }
    if (!rowMatchesColumnFilters(table, row, filterState.columnFilters || {})) {
      return false;
    }
    if (!rowMatchesAdvancedFilter(table, row, filterState.advancedFilter || null)) {
      return false;
    }
    return true;
  }

  function sortTableRows(table, sortRules = []) {
    const normalizedRules = normalizeSortRules(sortRules);
    if (!normalizedRules.length) return cloneLightTable(table);
    const nextTable = cloneLightTable(table);
    nextTable.rows = nextTable.rows
      .map((record, index) => ({ record, index }))
      .sort((left, right) => compareSortedRecords(left, right, normalizedRules))
      .map((entry) => entry.record);
    return nextTable;
  }

  function applyPageSetup(table, pageSetup) {
    return setPageSetup(table, normalizePageSetup(pageSetup));
  }

  function resolvePrintAreaBounds(table, selection, pageSetup = {}) {
    const mode = String(pageSetup?.printArea?.mode || "entire-sheet");
    const fullBounds = {
      startRow: 1,
      endRow: getSheetRowCount(table),
      startCol: 1,
      endCol: Math.max(1, getColumnCount(table)),
    };

    if (mode === "selection") {
      return expandBoundsToHeaderRow(table, getSelectionBounds(selection));
    }
    if (mode === "custom") {
      const parsed = parseCellRange(String(pageSetup?.printArea?.range || ""));
      return parsed ? expandBoundsToHeaderRow(table, parsed) : fullBounds;
    }
    return fullBounds;
  }

  function parseCellRange(rangeText) {
    const text = String(rangeText || "").trim().toUpperCase();
    if (!text) return null;
    const parts = text.split(":").map((part) => part.trim()).filter(Boolean);
    if (parts.length < 1 || parts.length > 2) return null;
    const start = parseCellRef(parts[0]);
    const end = parseCellRef(parts[1] || parts[0]);
    if (!start || !end) return null;
    return {
      startRow: Math.min(start.row, end.row),
      endRow: Math.max(start.row, end.row),
      startCol: Math.min(start.col, end.col),
      endCol: Math.max(start.col, end.col),
    };
  }

  function isCellWithinBounds(rowIndex, columnIndex, bounds) {
    if (!bounds) return true;
    return rowIndex >= bounds.startRow
      && rowIndex <= bounds.endRow
      && columnIndex >= bounds.startCol
      && columnIndex <= bounds.endCol;
  }

  function collectMatchesInScope(table, scope, options = {}) {
    const needle = String(options.findText ?? "");
    if (!needle) return [];
    const matches = [];
    for (let rowIndex = scope.startRow; rowIndex <= scope.endRow; rowIndex += 1) {
      for (let columnIndex = scope.startCol; columnIndex <= scope.endCol; columnIndex += 1) {
        const value = getCellValue(table, rowIndex, columnIndex);
        if (cellMatchesSearch(value, needle, options)) {
          matches.push({
            row: rowIndex,
            col: columnIndex,
            value,
          });
        }
      }
    }
    return matches;
  }

  function applyMatchReplacement(table, match, options) {
    const currentValue = getCellValue(table, match.row, match.col);
    const replacement = buildReplacementValue(
      currentValue,
      String(options.findText ?? ""),
      String(options.replaceText ?? ""),
      options,
    );
    return setCellValue(table, match.row, match.col, replacement);
  }

  function cellMatchesSearch(value, needle, options = {}) {
    const haystack = String(value ?? "");
    const searchNeedle = String(needle ?? "");
    if (searchNeedle === "") return false;
    if (options.wholeCell) {
      return compareText(haystack, searchNeedle, options.caseSensitive);
    }
    if (options.caseSensitive) {
      return haystack.includes(searchNeedle);
    }
    return haystack.toLocaleLowerCase().includes(searchNeedle.toLocaleLowerCase());
  }

  function compareText(left, right, caseSensitive) {
    if (caseSensitive) {
      return String(left ?? "") === String(right ?? "");
    }
    return String(left ?? "").toLocaleLowerCase() === String(right ?? "").toLocaleLowerCase();
  }

  function buildReplacementValue(currentValue, findText, replaceText, options) {
    const text = String(currentValue ?? "");
    if (findText === "") return text;
    if (options.wholeCell) {
      return replaceText;
    }
    if (options.caseSensitive) {
      return text.split(findText).join(replaceText);
    }
    const pattern = escapeRegExp(findText);
    return text.replace(new RegExp(pattern, "gi"), replaceText);
  }

  function rowMatchesQuery(table, rowIndex, query) {
    const normalizedQuery = String(query ?? "").trim().toLocaleLowerCase();
    if (!normalizedQuery) return true;
    const values = getRowValues(table, rowIndex, Math.max(1, getColumnCount(table)));
    return values.some((value) => String(value ?? "").toLocaleLowerCase().includes(normalizedQuery));
  }

  function rowMatchesColumnFilters(table, rowIndex, columnFilters) {
    if (!isDataRow(table, rowIndex)) return true;
    return Object.entries(columnFilters || {}).every(([key, filter]) => {
      if (!isValidColumnFilter(filter)) return true;
      const columnIndex = columnIndexFromKey(key);
      if (!columnIndex) return true;
      return cellPassesFilter(getCellValue(table, rowIndex, columnIndex), filter);
    });
  }

  function rowMatchesAdvancedFilter(table, rowIndex, advancedFilter) {
    if (!isDataRow(table, rowIndex)) return true;
    if (!advancedFilter?.enabled) return true;
    const compiled = validateAdvancedFilterDefinition(advancedFilter);
    if (!compiled.ok || !compiled.conditions.length) return true;
    const results = compiled.conditions.map((condition) => {
      const columnIndex = columnIndexFromKey(condition.columnKey);
      const value = getCellValue(table, rowIndex, columnIndex);
      return cellPassesFilter(value, condition);
    });
    return evaluatePostfix(compiled.postfix, results);
  }

  function normalizeAdvancedConditions(conditions) {
    return conditions
      .slice(0, MAX_ADVANCED_FILTER_CONDITIONS)
      .map((condition, index) => ({
        index: index + 1,
        columnKey: String(condition?.columnKey || columnKeyForIndex(1)),
        operator: normalizeFilterOperator(condition?.operator),
        value: String(condition?.value ?? ""),
      }));
  }

  function normalizeSortRules(rules) {
    return (Array.isArray(rules) ? rules : [])
      .map((rule) => ({
        columnKey: String(rule?.columnKey || ""),
        direction: String(rule?.direction || "asc").toLowerCase() === "desc" ? "desc" : "asc",
      }))
      .filter((rule) => columnIndexFromKey(rule.columnKey));
  }

  function compareSortedRecords(left, right, rules) {
    for (const rule of rules) {
      const columnIndex = columnIndexFromKey(rule.columnKey);
      if (!columnIndex) continue;
      const leftValue = String(left.record?.[rule.columnKey] ?? "");
      const rightValue = String(right.record?.[rule.columnKey] ?? "");
      const compared = compareSortableValues(leftValue, rightValue);
      if (compared !== 0) {
        return rule.direction === "desc" ? -compared : compared;
      }
    }
    return left.index - right.index;
  }

  function compareSortableValues(left, right) {
    const leftBlank = left === "";
    const rightBlank = right === "";
    if (leftBlank && rightBlank) return 0;
    if (leftBlank) return 1;
    if (rightBlank) return -1;
    return NATURAL_COLLATOR.compare(left, right);
  }

  function escapeRegExp(text) {
    return String(text ?? "").replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");
  }

  function cellPassesFilter(value, filter) {
    const operator = normalizeFilterOperator(filter?.operator);
    const text = String(value ?? "");
    const needle = String(filter?.value ?? "");
    if (operator === "is-empty") {
      return text === "";
    }
    if (operator === "is-not-empty") {
      return text !== "";
    }
    if (operator === "equals") {
      return compareText(text, needle, false);
    }
    return text.toLocaleLowerCase().includes(needle.toLocaleLowerCase());
  }

  function isValidColumnFilter(filter) {
    if (!filter) return false;
    const operator = normalizeFilterOperator(filter.operator);
    if (operator === "is-empty" || operator === "is-not-empty") {
      return true;
    }
    return String(filter.value ?? "") !== "";
  }

  function normalizeFilterOperator(operator) {
    const normalized = String(operator || "contains").toLowerCase();
    return ADVANCED_OPERATOR_SET.has(normalized) ? normalized : "contains";
  }

  function findConditionValueError(conditions) {
    const missing = conditions.find((condition) => requiresFilterValue(condition.operator) && condition.value === "");
    return missing ? \`Condition \${missing.index} needs a value.\` : "";
  }

  function requiresFilterValue(operator) {
    return normalizeFilterOperator(operator) === "contains" || normalizeFilterOperator(operator) === "equals";
  }

  function parseLogicExpression(expression, conditionCount) {
    const tokens = tokenizeLogicExpression(expression);
    if (!tokens.ok) {
      return {
        ok: false,
        errors: tokens.errors,
        postfix: [],
      };
    }

    const numbers = tokens.tokens.filter((token) => token.type === "number").map((token) => token.value);
    const outOfRange = numbers.find((value) => value < 1 || value > conditionCount);
    if (outOfRange) {
      return {
        ok: false,
        errors: ["Condition number is outside the current range."],
        postfix: [],
      };
    }

    const repeated = findRepeatedNumber(numbers);
    if (repeated) {
      return {
        ok: false,
        errors: [\`Condition \${repeated} is repeated.\`],
        postfix: [],
      };
    }

    const missing = findMissingNumbers(numbers, conditionCount);
    if (missing.length) {
      return {
        ok: false,
        errors: ["Every defined condition number must appear exactly once."],
        postfix: [],
      };
    }

    return buildPostfix(tokens.tokens);
  }

  function tokenizeLogicExpression(expression) {
    const source = String(expression ?? "");
    const tokens = [];
    let index = 0;
    while (index < source.length) {
      const char = source[index];
      if (/\\s/.test(char)) {
        index += 1;
        continue;
      }
      if (char === "(") {
        tokens.push({ type: "lparen" });
        index += 1;
        continue;
      }
      if (char === ")") {
        tokens.push({ type: "rparen" });
        index += 1;
        continue;
      }
      if (/\\d/.test(char)) {
        const match = source.slice(index).match(/^\\d+/);
        tokens.push({ type: "number", value: Number(match?.[0] || 0) });
        index += match?.[0]?.length || 1;
        continue;
      }
      const operatorMatch = source.slice(index).match(/^(AND|OR)\\b/i);
      if (operatorMatch) {
        tokens.push({ type: "operator", value: operatorMatch[1].toUpperCase() });
        index += operatorMatch[0].length;
        continue;
      }
      return {
        ok: false,
        errors: ["The logic expression contains unknown characters."],
        tokens: [],
      };
    }
    return {
      ok: true,
      errors: [],
      tokens,
    };
  }

  function buildPostfix(tokens) {
    const output = [];
    const operators = [];
    let expected = "operand";
    let balance = 0;

    for (const token of tokens) {
      if (expected === "operand") {
        if (token.type === "number") {
          output.push(token);
          expected = "operator";
          continue;
        }
        if (token.type === "lparen") {
          operators.push(token);
          balance += 1;
          continue;
        }
        return {
          ok: false,
          errors: ["The logic expression has invalid operator placement."],
          postfix: [],
        };
      }

      if (token.type === "operator") {
        while (operators.length) {
          const top = operators.at(-1);
          if (top?.type !== "operator") break;
          if (LOGIC_PRECEDENCE[top.value] < LOGIC_PRECEDENCE[token.value]) break;
          output.push(operators.pop());
        }
        operators.push(token);
        expected = "operand";
        continue;
      }

      if (token.type === "rparen") {
        if (balance <= 0) {
          return {
            ok: false,
            errors: ["The logic expression has unbalanced parentheses."],
            postfix: [],
          };
        }
        while (operators.length && operators.at(-1)?.type !== "lparen") {
          output.push(operators.pop());
        }
        operators.pop();
        balance -= 1;
        continue;
      }

      return {
        ok: false,
        errors: ["The logic expression has invalid operator placement."],
        postfix: [],
      };
    }

    if (expected === "operand") {
      return {
        ok: false,
        errors: ["The logic expression has invalid operator placement."],
        postfix: [],
      };
    }

    while (operators.length) {
      const token = operators.pop();
      if (token?.type === "lparen" || token?.type === "rparen" || balance > 0) {
        return {
          ok: false,
          errors: ["The logic expression has unbalanced parentheses."],
          postfix: [],
        };
      }
      output.push(token);
    }

    return {
      ok: true,
      errors: [],
      postfix: output,
    };
  }

  function evaluatePostfix(postfix, conditionResults) {
    const stack = [];
    postfix.forEach((token) => {
      if (token.type === "number") {
        stack.push(Boolean(conditionResults[token.value - 1]));
        return;
      }
      const right = Boolean(stack.pop());
      const left = Boolean(stack.pop());
      stack.push(token.value === "AND" ? left && right : left || right);
    });
    return Boolean(stack.pop());
  }

  function findRepeatedNumber(numbers) {
    const seen = new Set();
    for (const number of numbers) {
      if (seen.has(number)) return number;
      seen.add(number);
    }
    return 0;
  }

  function findMissingNumbers(numbers, conditionCount) {
    const seen = new Set(numbers);
    const missing = [];
    for (let index = 1; index <= conditionCount; index += 1) {
      if (!seen.has(index)) {
        missing.push(index);
      }
    }
    return missing;
  }

  function normalizePageSetup(pageSetup = {}) {
    const margins = pageSetup?.margins && typeof pageSetup.margins === "object" ? pageSetup.margins : {};
    const headerFooter = pageSetup?.headerFooter && typeof pageSetup.headerFooter === "object" ? pageSetup.headerFooter : {};
    const printArea = pageSetup?.printArea && typeof pageSetup.printArea === "object" ? pageSetup.printArea : {};
    return {
      margins: {
        top: normalizeMarginValue(margins.top),
        right: normalizeMarginValue(margins.right),
        bottom: normalizeMarginValue(margins.bottom),
        left: normalizeMarginValue(margins.left),
      },
      paperSize: normalizePaperSize(pageSetup?.paperSize),
      orientation: normalizeOrientation(pageSetup?.orientation),
      printArea: {
        mode: normalizePrintAreaMode(printArea.mode),
        range: String(printArea.range || ""),
      },
      headerFooter: {
        header: String(headerFooter.header || ""),
        footer: String(headerFooter.footer || ""),
      },
      background: pageSetup?.background
        ? {
          mode: String(pageSetup.background.mode || "solid-color"),
          color: String(pageSetup.background.color || ""),
        }
        : null,
    };
  }

  function normalizeMarginValue(value) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : 12;
  }

  function normalizePaperSize(value) {
    const safe = String(value || "A4");
    return ["A4", "A3", "Letter"].includes(safe) ? safe : "A4";
  }

  function normalizeOrientation(value) {
    return String(value || "portrait").toLowerCase() === "landscape" ? "landscape" : "portrait";
  }

  function normalizePrintAreaMode(value) {
    const safe = String(value || "entire-sheet");
    return ["entire-sheet", "selection", "custom"].includes(safe) ? safe : "entire-sheet";
  }

  function expandBoundsToHeaderRow(table, bounds) {
    if (!bounds) return null;
    const headerRowIndex = getHeaderRowIndex(table);
    if (bounds.endRow < headerRowIndex) {
      return bounds;
    }
    return {
      ...bounds,
      startRow: Math.min(bounds.startRow, headerRowIndex),
    };
  }

  function parseCellRef(text) {
    const match = String(text || "").trim().toUpperCase().match(/^([A-Z]+)(\\d+)$/);
    if (!match) return null;
    return {
      col: columnIndexFromLabel(match[1]),
      row: Number(match[2]),
    };
  }

  function columnIndexFromLabel(label) {
    let index = 0;
    for (const char of String(label || "")) {
      const code = char.charCodeAt(0);
      if (code < 65 || code > 90) return 0;
      index = (index * 26) + (code - 64);
    }
    return index;
  }

  function columnIndexFromKey(key) {
    const match = String(key || "").match(/^c(\\d+)$/i);
    return match ? Number(match[1]) : 0;
  }


  const CWS_HTML_FORMAT = "CWS_HTML";
  const CWS_SCHEMA_VERSION = 1;
  const CWS_MODEL_SCRIPT_ID = "websheet-model";

  const DEFAULT_APP_NAME = "CWS Light Table";
  const DEFAULT_APP_SHORT_NAME = "CWS Light Table";
  const DEFAULT_GENERATOR_VERSION = "0.1.1";
  const DEFAULT_GUIDE_URL = "https://szsumc.github.io/CWS-Light-Table/docs/cws-html-guide-v1.json";
  const DEFAULT_SCHEMA_URL = "https://szsumc.github.io/CWS-Light-Table/docs/cws-html-workbook-model-v1.schema.json";

  function looksLikeCwsHtml(source = "") {
    const text = String(source || "");
    const hasCwsFormat =
      /\\bdata-cws-format=["']CWS_HTML["']/i.test(text) ||
      /<meta\\b(?=[^>]*\\bname=["']cws:format["'])(?=[^>]*\\bcontent=["']CWS_HTML["'])/i.test(text);
    return (
      hasCwsFormat &&
      /<script\\b(?=[^>]*\\bid=["']websheet-model["'])(?=[^>]*\\btype=["']application\\/json["'])/i.test(text)
    );
  }

  function parseCwsHtmlWorkbook(source, options = {}) {
    const html = String(source || "");
    if (!looksLikeCwsHtml(html)) {
      throw new Error("The selected file is not recognized as CWS HTML.");
    }
    const payload = extractCwsModelScriptText(html);
    let workbook;
    try {
      workbook = JSON.parse(payload);
    } catch (error) {
      throw new Error(\`The CWS workbook JSON is invalid: \${error.message}\`);
    }
    if (!hasWorkbookSheets(workbook)) {
      throw new Error("The CWS workbook JSON does not contain any sheets.");
    }
    const normalized = cloneJsonLikeValue(workbook);
    normalized.sourceName = sanitizeHtmlFileName(options.fileName || normalized.sourceName || "workbook.cws.html");
    normalized.saveType = "html";
    return normalized;
  }

  function listWorkbookSheets(workbook) {
    return (workbook?.sheets || []).map((sheet, index) => ({
      index,
      name: String(sheet?.name || \`Sheet\${index + 1}\`),
      rowCount: normalizePositiveInteger(sheet?.rowCount, 1),
      colCount: normalizePositiveInteger(sheet?.colCount, 1),
    }));
  }

  function workbookToLightTable(workbook, sheetRef = undefined) {
    const { sheet, sheetIndex } = resolveWorkbookSheet(workbook, sheetRef);
    const usedRange = inferUsedRange(sheet);
    const savedGridLimits = normalizeGridLimitsDefinition(sheet?.cwsLight?.gridLimits, {
      maxRows: sheet?.rowCount,
      maxColumns: sheet?.colCount,
    });
    const colCount = Math.max(1, usedRange.colCount);
    const rowCount = Math.max(1, usedRange.rowCount);
    const savedHeaderRowIndex = normalizeHeaderRowIndex(
      sheet?.cwsLight?.headerRowIndex,
      Math.max(rowCount, savedGridLimits.maxRows),
    );
    const columns = [];
    for (let columnIndex = 1; columnIndex <= colCount; columnIndex += 1) {
      const headerValue = flattenCellValue(sheet.cells?.[cellKey(savedHeaderRowIndex, columnIndex)]);
      columns.push({
        key: columnKeyForIndex(columnIndex),
        label: normalizeColumnLabel(headerValue),
      });
    }
    const leadingRows = [];
    for (let rowIndex = 1; rowIndex < savedHeaderRowIndex; rowIndex += 1) {
      leadingRows.push(buildRecordFromSheetRow(sheet, columns, rowIndex));
    }
    const rows = [];
    for (let rowIndex = savedHeaderRowIndex + 1; rowIndex <= rowCount; rowIndex += 1) {
      rows.push(buildRecordFromSheetRow(sheet, columns, rowIndex));
    }
    return {
      sourceName: sanitizeHtmlFileName(workbook.sourceName || "workbook.cws.html"),
      sheetName: String(sheet.name || \`Sheet\${sheetIndex + 1}\`),
      columns,
      leadingRows,
      rows,
      gridLimits: {
        maxRows: Math.max(savedGridLimits.maxRows, rowCount, savedHeaderRowIndex),
        maxColumns: Math.max(savedGridLimits.maxColumns, colCount),
      },
      pageSetup: normalizePageSetup(sheet.pageLayout),
    };
  }

  function serializeLightTableToCwsHtml(table, options = {}) {
    const workbook = lightTableToWorkbook(table, options);
    const sourceName = sanitizeHtmlFileName(options.fileName || table?.sourceName || workbook.sourceName || "workbook.cws.html");
    const title = escapeHtml(sourceName);
    const payload = safeJson(workbook, 2);
    return \`<!doctype html>
  <html \${cwsHtmlRootAttributes()}>
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  \${cwsHtmlMetaTags()}
  <title>\${title}</title>
  <style>\${STANDALONE_APP_STYLE}</style>
  </head>
  <body data-cws-light-shell="standalone">
  \${STANDALONE_APP_SHELL}
  \${cwsAiNoticeComment()}
  \${cwsModelScriptTag(payload)}
  \${cwsAiInstructionsScript()}
  <script id="cws-light-runtime" data-cws-light-runtime="standalone">\${escapeInlineScript(STANDALONE_APP_SCRIPT)}</script>
  </body>
  </html>\`;
  }

  function lightTableToWorkbook(table, options = {}) {
    const normalizedTable = normalizeLightTable(table);
    const gridLimits = getGridLimits(normalizedTable);
    const colCount = Math.max(1, getColumnCount(normalizedTable), gridLimits.maxColumns);
    const rowCount = Math.max(1, getSheetRowCount(normalizedTable), gridLimits.maxRows);
    const headerRowIndex = getHeaderRowIndex(normalizedTable);
    const cells = {};
    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex += 1) {
      for (let columnIndex = 1; columnIndex <= colCount; columnIndex += 1) {
        const value = normalizePrimitive(getCellStoredValue(normalizedTable, rowIndex, columnIndex));
        if (value === "") continue;
        cells[cellKey(rowIndex, columnIndex)] = {
          row: rowIndex,
          col: columnIndex,
          raw: value,
          display: value == null ? "" : String(value),
        };
      }
    }
    const sourceName = sanitizeHtmlFileName(options.fileName || normalizedTable.sourceName || "workbook.cws.html");
    return {
      version: 8,
      sourceName,
      saveType: "html",
      createdAt: new Date().toISOString(),
      activeSheetIndex: 0,
      showFormulaBar: true,
      definedNames: [],
      relationships: [],
      workbookProperties: {},
      calcProperties: {},
      sheets: [
        {
          name: normalizedSheetName(normalizedTable.sheetName || "Sheet1"),
          state: "visible",
          rowCount,
          colCount,
          defaultColumnWidth: 64,
          defaultRowHeight: 20,
          zoomScale: 100,
          displayScale: 1,
          defaultCellCss: {},
          columns: Array.from({ length: colCount }, () => ({ width: 64, hidden: false })),
          rows: Array.from({ length: rowCount }, () => ({ height: 20, hidden: false })),
          merges: [],
          images: [],
          inkStrokes: [],
          cells,
          autoFilter: null,
          cwsLight: {
            headerRowIndex,
            gridLimits,
          },
          pageLayout: normalizePageSetup(normalizedTable.pageSetup),
        },
      ],
    };
  }

  function cellKey(row, col) {
    return \`\${row}:\${col}\`;
  }

  function cwsHtmlRootAttributes() {
    return [
      \`lang="en"\`,
      \`data-cws-format="\${escapeAttr(CWS_HTML_FORMAT)}"\`,
      \`data-cws-schema-version="\${escapeAttr(CWS_SCHEMA_VERSION)}"\`,
      \`data-cws-app="\${escapeAttr(DEFAULT_APP_SHORT_NAME)}"\`,
    ].join(" ");
  }

  function cwsHtmlMetaTags() {
    return [
      \`<meta name="generator" content="\${escapeAttr(\`\${DEFAULT_APP_NAME} \${DEFAULT_GENERATOR_VERSION}\`)}" />\`,
      \`<meta name="cws:format" content="\${escapeAttr(CWS_HTML_FORMAT)}" />\`,
      \`<meta name="cws:schema-version" content="\${escapeAttr(CWS_SCHEMA_VERSION)}" />\`,
      \`<meta name="cws:guide" content="\${escapeAttr(DEFAULT_GUIDE_URL)}" />\`,
      \`<meta name="cws:schema" content="\${escapeAttr(DEFAULT_SCHEMA_URL)}" />\`,
    ].join("\\n");
  }

  function cwsModelScriptTag(payload) {
    return \`<script id="\${CWS_MODEL_SCRIPT_ID}" type="application/json" data-cws-model="workbook" data-cws-format="\${escapeAttr(CWS_HTML_FORMAT)}" data-cws-schema-version="\${escapeAttr(CWS_SCHEMA_VERSION)}" data-cws-editable="true">\${payload}</script>\`;
  }

  function cwsAiNoticeComment() {
    return \`<!--
  CWS Light Table AI Notice:
  This file is a CWS HTML workbook.
  The actual workbook data is the JSON inside <script id="\${CWS_MODEL_SCRIPT_ID}" type="application/json">.
  Only edit that JSON when changing workbook content.
  -->\`;
  }

  function cwsAiInstructionsScript() {
    return \`<script id="cws-ai-instructions" type="application/json">\${safeJson(cwsAiInstructionsPayload(), 2)}</script>\`;
  }

  function cwsAiInstructionsPayload() {
    return {
      notice: "This file is a CWS HTML workbook. The actual workbook data is the JSON inside script#websheet-model. Only edit that JSON when changing workbook content.",
      format: CWS_HTML_FORMAT,
      appName: DEFAULT_APP_NAME,
      shortName: DEFAULT_APP_SHORT_NAME,
      schemaVersion: CWS_SCHEMA_VERSION,
      modelScriptId: CWS_MODEL_SCRIPT_ID,
      editableRegion: \`script#\${CWS_MODEL_SCRIPT_ID}\`,
      guideUrl: DEFAULT_GUIDE_URL,
      schemaUrl: DEFAULT_SCHEMA_URL,
      rules: [
        "Only edit the workbook JSON inside script#websheet-model.",
        "Keep JSON valid when changing workbook content.",
      ],
    };
  }

  function extractCwsModelScriptText(source) {
    const sanitized = String(source || "").replace(/<!--[\\s\\S]*?-->/g, "");
    const match = sanitized.match(/<script\\b(?=[^>]*\\bid=["']websheet-model["'])(?=[^>]*\\btype=["']application\\/json["'])[^>]*>([\\s\\S]*?)<\\/script>/i);
    if (!match) throw new Error("The CWS workbook model script was not found.");
    return String(match[1] || "").trim();
  }

  function hasWorkbookSheets(workbook) {
    return Boolean(workbook && typeof workbook === "object" && Array.isArray(workbook.sheets) && workbook.sheets.length > 0);
  }

  function resolveWorkbookSheet(workbook, sheetRef = undefined) {
    if (!hasWorkbookSheets(workbook)) {
      throw new Error("The workbook does not contain any sheets.");
    }
    let sheetIndex;
    if (typeof sheetRef === "number" && Number.isInteger(sheetRef)) {
      sheetIndex = sheetRef;
    } else if (typeof sheetRef === "string" && sheetRef.trim() !== "") {
      sheetIndex = workbook.sheets.findIndex((sheet) => String(sheet?.name || "") === sheetRef);
    } else {
      sheetIndex = Number.isInteger(workbook.activeSheetIndex) ? workbook.activeSheetIndex : 0;
    }
    if (sheetIndex < 0 || sheetIndex >= workbook.sheets.length) {
      throw new Error("The requested sheet could not be found.");
    }
    const sheet = workbook.sheets[sheetIndex];
    return { sheet, sheetIndex };
  }

  function inferUsedRange(sheet = {}) {
    let maxRow = 1;
    let maxCol = 1;
    Object.entries(sheet.cells || {}).forEach(([key, cell]) => {
      const parsed = parseCellKey(key);
      if (!parsed) return;
      const value = flattenCellValue(cell);
      if (value === "" && value !== 0 && value !== false) return;
      maxRow = Math.max(maxRow, parsed.row);
      maxCol = Math.max(maxCol, parsed.col);
    });
    return {
      rowCount: maxRow,
      colCount: maxCol,
    };
  }

  function buildRecordFromSheetRow(sheet, columns, rowIndex) {
    const record = {};
    columns.forEach((column, offset) => {
      const cell = sheet.cells?.[cellKey(rowIndex, offset + 1)];
      record[column.key] = flattenCellValue(cell);
    });
    return record;
  }

  function parseCellKey(key) {
    const match = String(key || "").match(/^([1-9]\\d*):([1-9]\\d*)$/);
    if (!match) return null;
    return {
      row: Number(match[1]),
      col: Number(match[2]),
    };
  }

  function flattenCellValue(cell) {
    if (!cell || typeof cell !== "object") return "";
    if (typeof cell.formula === "string" && cell.formula.startsWith("=")) {
      if (cell.display != null) return normalizePrimitive(cell.display);
      if (cell.cached != null) return normalizePrimitive(cell.cached);
      if (cell.raw != null) return normalizePrimitive(cell.raw);
      return "";
    }
    if (cell.raw != null) return normalizePrimitive(cell.raw);
    if (cell.display != null) return normalizePrimitive(cell.display);
    return "";
  }

  function normalizePrimitive(value) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
    return String(value);
  }

  function normalizeColumnLabel(value) {
    if (value == null) return "";
    return String(value);
  }

  function normalizeLightTable(table = {}) {
    const base = cloneLightTable(isPlainObject(table) ? table : createEmptyLightTable());
    const columns = base.columns.map((column, index) => ({
      key: String(column?.key || columnKeyForIndex(index + 1)),
      label: normalizeColumnLabel(column?.label),
    }));
    const normalizeRecordList = (records) => records.map((record) => {
      const output = {};
      columns.forEach((column) => {
        output[column.key] = normalizePrimitive(record?.[column.key]);
      });
      return output;
    });
    return {
      sourceName: sanitizeHtmlFileName(base.sourceName || "workbook.cws.html"),
      sheetName: normalizedSheetName(base.sheetName || "Sheet1"),
      columns,
      leadingRows: normalizeRecordList(base.leadingRows || []),
      rows: normalizeRecordList(base.rows || []),
      gridLimits: normalizeGridLimitsDefinition(base.gridLimits),
      pageSetup: normalizePageSetup(base.pageSetup),
    };
  }

  function normalizedSheetName(value) {
    const text = String(value || "Sheet1").trim() || "Sheet1";
    const stripped = text.replace(/[:\\\\/?*\\[\\]]/g, " ").trim();
    return (stripped || "Sheet1").slice(0, 31);
  }

  function sanitizeHtmlFileName(value) {
    const text = String(value || "workbook.cws.html").trim() || "workbook.cws.html";
    const safe = text.replace(/[\\\\/:*?"<>|]+/g, "-");
    return /\\.html?$/i.test(safe) ? safe : \`\${safe}.html\`;
  }

  function normalizePositiveInteger(value, fallback) {
    const number = Math.max(1, Math.round(Number(value) || fallback));
    return number;
  }

  function normalizePageSetup(pageLayout = {}) {
    const source = pageLayout && typeof pageLayout === "object" ? pageLayout : {};
    return {
      margins: cloneJsonLikeValue(source.margins || {}),
      paperSize: source.paperSize || "",
      orientation: source.orientation || "",
      printArea: cloneJsonLikeValue(source.printArea || null),
      headerFooter: cloneJsonLikeValue(source.headerFooter || {}),
      background: cloneJsonLikeValue(source.background || null),
    };
  }

  function normalizeHeaderRowIndex(value, maxRowCount) {
    const upperBound = Math.max(1, normalizePositiveInteger(maxRowCount, 1));
    return Math.max(1, Math.min(upperBound, normalizePositiveInteger(value, 1)));
  }

  function normalizeGridLimitsDefinition(value, fallback = {}) {
    return {
      maxRows: Math.max(1, normalizePositiveInteger(value?.maxRows, fallback.maxRows || 50)),
      maxColumns: Math.max(1, normalizePositiveInteger(value?.maxColumns, fallback.maxColumns || 30)),
    };
  }

  function isPlainObject(value) {
    return Boolean(value && typeof value === "object");
  }

  function cloneJsonLikeValue(value) {
    return JSON.parse(JSON.stringify(value ?? null));
  }

  function safeJson(value, space = 0) {
    return JSON.stringify(value, null, space)
      .replace(/</g, "\\\\u003c")
      .replace(/\\u2028/g, "\\\\u2028")
      .replace(/\\u2029/g, "\\\\u2029");
  }

  function escapeInlineScript(source) {
    return String(source ?? "")
      .replace(/<\\/script/gi, "<\\\\/script")
      .replace(/<!--/g, "<\\\\!--");
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\\"": "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/\`/g, "&#96;");
  }


  function bootstrapFromEmbeddedWorkbook() {
    const workbook = parseEmbeddedWorkbook();
    if (!workbook) return;
    state.workbook = workbook;
    state.sourceFileName = sanitizeHtmlFileName(workbook.sourceName || state.sourceFileName || inferSourceFileName());
    const sheets = listWorkbookSheets(workbook);
    if (sheets.length > 1) {
      refs.sheetSelect.innerHTML = sheets
        .map((sheet) => \`<option value="\${sheet.index}">\${escapeHtml(sheet.name)} (\${sheet.rowCount}x\${sheet.colCount})</option>\`)
        .join("");
      refs.sheetPickerPanel.classList.remove("hidden");
      state.table = createEmptyLightTable();
      resetGridInteractionState();
      renderWorkspace();
      setStatus(\`Loaded \${state.sourceFileName}. Select one sheet to continue.\`);
      return;
    }
    refs.sheetPickerPanel.classList.add("hidden");
    loadSelectedSheet(sheets[0] ? sheets[0].index : 0);
  }

  function parseEmbeddedWorkbook() {
    const modelScript = document.getElementById(CWS_MODEL_SCRIPT_ID);
    if (!modelScript) return null;
    const payload = String(modelScript.textContent || "").trim();
    if (!payload) return null;
    try {
      const workbook = JSON.parse(payload);
      if (!hasWorkbookSheets(workbook)) return null;
      const normalized = cloneJsonLikeValue(workbook);
      normalized.sourceName = sanitizeHtmlFileName(normalized.sourceName || state.sourceFileName || inferSourceFileName());
      normalized.saveType = "html";
      return normalized;
    } catch (error) {
      setStatus(\`Failed to read the embedded workbook: \${error.message}\`);
      return null;
    }
  }

  function inferSourceFileName() {
    const path = String(window.location.pathname || "").trim();
    const parts = path.split(/[\\\\/]/).filter(Boolean);
    return sanitizeHtmlFileName(parts.at(-1) || "workbook.cws.html");
  }

  const state = {
    workbook: null,
    table: createEmptyLightTable(),
    sourceFileName: inferSourceFileName(),
    activeCell: { row: 1, col: 1 },
    selection: createCellSelection({ row: 1, col: 1 }),
    copiedSelection: null,
    openMenuKey: null,
    openSubmenuKey: "",
    editing: null,
    history: createHistoryState(),
    fillDrag: null,
    selectionDrag: null,
    suppressNextGridClick: false,
    globalSearch: "",
    columnFilters: {},
    advancedFilter: {
      enabled: false,
      conditions: [],
      logic: "",
    },
    findReplace: {
      findText: "",
      replaceText: "",
      caseSensitive: false,
      wholeCell: false,
      currentMatch: null,
    },
    advancedFilterDraft: null,
    sortDraft: null,
    pageSetupDraft: null,
    gridLimitsDraft: null,
    openPanel: null,
    headerMenu: null,
    panelError: "",
    importDraft: null,
    exportDraft: null,
    exportSettings: createDefaultTextExportSettings("csv"),
    importFileMode: "",
    pendingFocusId: "",
    pendingScrollCell: null,
    viewportState: createViewportState(),
    logicalGridMetrics: buildGridMetrics(createEmptyLightTable()),
    gridMetrics: buildGridMetrics(createEmptyLightTable()),
    rowVirtualizationEnabled: false,
    columnVirtualizationEnabled: false,
    visibleRowLayout: createEmptyVisibleRowLayout(),
    rowViewport: createEmptyRowViewport(),
    columnViewport: createEmptyColumnViewport(),
    visibleRowsCache: null,
    visibleRange: calculateVisibleRange(buildGridMetrics(createEmptyLightTable()), createViewportState()),
    visibleRangeSignature: "",
  };

  const MIN_VIRTUALIZED_ROW_COUNT = 200;
  const MIN_VIRTUALIZED_COLUMN_COUNT = 60;

  const MENU_DEFINITIONS = {
    file: [
      { label: "Open CWS HTML", action: "open", hint: "Ctrl+O" },
      { label: "Save CWS HTML", action: "save", hint: "Ctrl+S" },
      { label: "Import", submenuKey: "import" },
      { label: "Export", submenuKey: "export" },
      { label: "Print", action: "print", hint: "Ctrl+P" },
    ],
    import: [
      { label: "Excel", action: "import-excel" },
      { label: "Text / Structured Data", action: "import-text" },
    ],
    export: [
      { label: "CSV", action: "export-csv" },
      { label: "TSV", action: "export-tsv" },
      { label: "TXT", action: "export-txt" },
    ],
    search: [
      { label: "Find / Replace", action: "find-replace", hint: "Ctrl+F / Ctrl+H" },
    ],
    data: [
      { label: "Set Header Row", action: "set-header-row" },
      { label: "Advanced Filter", action: "advanced-filter" },
      { label: "Clear Filters", action: "clear-filters" },
    ],
    view: [
      { label: "Insert Row Above", action: "insert-row-above" },
      { label: "Insert Row Below", action: "insert-row-below" },
      { label: "Insert Column Left", action: "insert-column-left" },
      { label: "Insert Column Right", action: "insert-column-right" },
      { label: "Insert Cells", submenuKey: "insert-cells" },
      { label: "Delete Rows", action: "delete-rows" },
      { label: "Delete Columns", action: "delete-columns" },
    ],
    "insert-cells": [
      { label: "Shift Right", action: "insert-cells-right" },
      { label: "Shift Down", action: "insert-cells-down" },
    ],
    option: [
      { label: "Page Setup", action: "page-setup" },
      { label: "Grid Limits", action: "grid-limits" },
    ],
    help: [
      { label: "Help", action: "help-page" },
      { label: "Version", action: "version-page" },
    ],
  };

  const refs = {
    menuButtons: Array.from(document.querySelectorAll("[data-menu-key]")),
    appMenu: document.getElementById("appMenu"),
    openFileInput: document.getElementById("openFileInput"),
    importFileInput: document.getElementById("importFileInput"),
    statusMessage: document.getElementById("statusMessage"),
    documentSummary: document.getElementById("documentSummary"),
    sheetPickerPanel: document.getElementById("sheetPickerPanel"),
    sheetSelect: document.getElementById("sheetSelect"),
    loadSheetButton: document.getElementById("loadSheetButton"),
    activeCellName: document.getElementById("activeCellName"),
    formulaBarInput: document.getElementById("formulaBarInput"),
    globalSearchInput: document.getElementById("globalSearchInput"),
    clearGlobalSearchButton: document.getElementById("clearGlobalSearchButton"),
    sheetGrid: document.getElementById("sheetGrid"),
    gridWrap: document.querySelector(".grid-wrap"),
    floatingLayer: document.getElementById("floatingLayer"),
    printHeader: document.getElementById("printHeader"),
    printFooter: document.getElementById("printFooter"),
  };

  let currentView = buildSheetGridView(state.table);
  const debugGridEvents = new URLSearchParams(window.location.search).has("debug-grid");
  let xlsxLoadPromise = null;
  let codepageLoadPromise = null;

  refs.menuButtons.forEach((button) => {
    button.addEventListener("click", handleMenuButtonClick);
  });
  refs.appMenu.addEventListener("click", handleMenuActionClick);
  refs.openFileInput.addEventListener("change", handleOpenFileChange);
  refs.importFileInput.addEventListener("change", handleImportFileChange);
  refs.loadSheetButton.addEventListener("click", () => {
    if (!state.workbook) return;
    loadSelectedSheet(Number(refs.sheetSelect.value || 0));
  });
  refs.sheetGrid.addEventListener("mousedown", handleGridMouseDown);
  refs.sheetGrid.addEventListener("mousemove", handleGridPointerMove);
  refs.sheetGrid.addEventListener("mouseover", handleGridMouseOver);
  refs.sheetGrid.addEventListener("click", handleGridClick);
  refs.sheetGrid.addEventListener("dblclick", handleGridDoubleClick);
  refs.sheetGrid.addEventListener("input", handleGridInput);
  refs.sheetGrid.addEventListener("keydown", handleGridEditorKeydown);
  refs.gridWrap?.addEventListener("scroll", handleGridViewportScroll, { passive: true });
  refs.formulaBarInput.addEventListener("focus", handleFormulaBarFocus);
  refs.formulaBarInput.addEventListener("input", handleFormulaBarInput);
  refs.formulaBarInput.addEventListener("keydown", handleFormulaBarKeydown);
  refs.globalSearchInput.addEventListener("input", handleGlobalSearchInput);
  refs.globalSearchInput.addEventListener("keydown", handleGlobalSearchKeydown);
  refs.clearGlobalSearchButton.addEventListener("click", handleGlobalSearchClear);
  refs.floatingLayer.addEventListener("click", handleFloatingLayerClick);
  refs.floatingLayer.addEventListener("input", handleFloatingLayerInput);
  refs.floatingLayer.addEventListener("change", handleFloatingLayerInput);
  refs.floatingLayer.addEventListener("keydown", handleFloatingLayerKeydown);
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("mousemove", handleDocumentMouseMove);
  document.addEventListener("mouseup", handleDocumentMouseUp);
  document.addEventListener("copy", handleDocumentCopy);
  document.addEventListener("paste", handleDocumentPaste);
  document.addEventListener("keydown", handleDocumentKeydown);
  window.addEventListener("keydown", handleGlobalUndoRedoKeydown, { capture: true });
  window.addEventListener("resize", handleGridViewportResize);

  bootstrapFromEmbeddedWorkbook();
  renderWorkspace();

  function handleMenuButtonClick(event) {
    event.stopPropagation();
    const button = event.currentTarget;
    const menuKey = button.dataset.menuKey || "";
    const nextMenuKey = state.openMenuKey === menuKey ? null : menuKey;
    setMenuOpen(nextMenuKey);
  }

  async function handleMenuActionClick(event) {
    event.stopPropagation();
    const item = event.target.closest("[data-menu-action], [data-menu-submenu]");
    if (!item || item.getAttribute("aria-disabled") === "true") return;
    const submenuKey = item.dataset.menuSubmenu || "";
    if (submenuKey) {
      state.openSubmenuKey = state.openSubmenuKey === submenuKey ? "" : submenuKey;
      renderMenu(state.openMenuKey);
      return;
    }
    const action = item.dataset.menuAction || "";
    if (action === "open") {
      refs.openFileInput.click();
    } else if (action === "save") {
      setMenuOpen(null);
      await handleSave();
      return;
    } else if (action === "import-excel") {
      openImportFilePicker("excel");
    } else if (action === "import-text") {
      openImportFilePicker("text");
    } else if (action === "export-csv") {
      openTextExportPanel("csv");
    } else if (action === "export-tsv") {
      openTextExportPanel("tsv");
    } else if (action === "export-txt") {
      openTextExportPanel("txt");
    } else if (action === "page-setup") {
      openPageSetupPanel();
    } else if (action === "grid-limits") {
      openGridLimitsPanel();
    } else if (action === "help-page") {
      openHelpPanel();
    } else if (action === "version-page") {
      openVersionPanel();
    } else if (action === "print") {
      handlePrint();
    } else if (action === "undo") {
      handleUndo();
    } else if (action === "redo") {
      handleRedo();
    } else if (action === "copy") {
      await handleCopyCommand();
    } else if (action === "paste") {
      await handlePasteCommand();
    } else if (action === "find-replace") {
      openFindReplacePanel("find");
    } else if (action === "advanced-filter") {
      openAdvancedFilterPanel();
    } else if (action === "clear-filters") {
      handleClearFilters();
    } else if (action === "set-header-row") {
      handleSetHeaderRow();
    } else if (action === "insert-row-above") {
      handleInsertRows("above");
    } else if (action === "insert-row-below") {
      handleInsertRows("below");
    } else if (action === "insert-column-left") {
      handleInsertColumns("left");
    } else if (action === "insert-column-right") {
      handleInsertColumns("right");
    } else if (action === "insert-cells-right") {
      handleInsertCells("right");
    } else if (action === "insert-cells-down") {
      handleInsertCells("down");
    } else if (action === "delete-rows") {
      handleDeleteRows();
    } else if (action === "delete-columns") {
      handleDeleteColumns();
    } else if (action === "sort") {
      openSortPanel();
    }
    setMenuOpen(null);
  }

  async function handleOpenFileChange(event) {
    const [file] = event.currentTarget.files || [];
    event.currentTarget.value = "";
    if (!file) return;
    setMenuOpen(null);
    setStatus(\`Reading \${file.name}...\`);
    try {
      const source = await file.text();
      const workbook = parseCwsHtmlWorkbook(source, { fileName: file.name });
      state.workbook = workbook;
      state.sourceFileName = file.name;
      const sheets = listWorkbookSheets(workbook);
      if (sheets.length > 1) {
        refs.sheetSelect.innerHTML = sheets
          .map((sheet) => \`<option value="\${sheet.index}">\${escapeHtml(sheet.name)} (\${sheet.rowCount}x\${sheet.colCount})</option>\`)
          .join("");
        refs.sheetPickerPanel.classList.remove("hidden");
        state.table = createEmptyLightTable();
        resetGridInteractionState();
        renderWorkspace();
        setStatus(\`Loaded \${file.name}. Select one sheet to continue.\`);
        return;
      }
      refs.sheetPickerPanel.classList.add("hidden");
      loadSelectedSheet(sheets[0]?.index ?? 0);
    } catch (error) {
      state.workbook = null;
      refs.sheetPickerPanel.classList.add("hidden");
      setStatus(error.message || "Failed to load the selected file.");
    }
  }

  async function handleImportFileChange(event) {
    const [file] = event.currentTarget.files || [];
    event.currentTarget.value = "";
    const importMode = state.importFileMode;
    state.importFileMode = "";
    if (!file || !importMode) return;
    setMenuOpen(null);
    try {
      if (importMode === "excel") {
        await beginExcelImport(file);
        return;
      }
      if (importMode === "text") {
        await beginTextImport(file);
      }
    } catch (error) {
      state.importDraft = null;
      state.openPanel = null;
      state.panelError = "";
      setStatus(error.message || \`Failed to import \${file.name}.\`);
      renderWorkspace();
    }
  }

  function loadSelectedSheet(sheetIndex) {
    try {
      const table = workbookToLightTable(state.workbook, sheetIndex);
      state.table = table;
      resetGridInteractionState();
      refs.sheetPickerPanel.classList.add("hidden");
      renderWorkspace();
      setStatus(\`Loaded \${table.sheetName} from \${state.sourceFileName}. The sheet is now shown in the grid.\`);
    } catch (error) {
      setStatus(error.message || "Failed to load the selected sheet.");
    }
  }

  function renderWorkspace() {
    rebuildGridRenderState({ honorPendingScroll: true });
    state.activeCell = clampActiveCell(state.activeCell, currentView);
    normalizeSelectionState();
    ensureActiveCellIsVisible();
    renderDocumentSummary();
    renderFormulaBar();
    renderGlobalSearch();
    renderPrintChrome();
    renderGrid();
    renderFloatingLayer();
    if (state.openMenuKey) {
      renderMenu(state.openMenuKey);
    }
    syncEditingFocus();
    updateGridViewportDebugData();
  }

  function renderDocumentSummary() {
    const sourceLabel = state.sourceFileName || "Unsaved blank sheet";
    const sheetName = state.table?.sheetName || "Sheet1";
    const columnCount = state.table?.columns?.length || 0;
    const rowCount = state.table?.rows?.length || 0;
    const visibleDataRows = countVisibleDataRows();
    const viewportSummary = debugGridEvents
      ? \` | viewport rows \${state.visibleRange.startRow}-\${state.visibleRange.endRow} | viewport cols \${state.visibleRange.startColumn}-\${state.visibleRange.endColumn}\`
      : "";
    refs.documentSummary.textContent = \`\${sourceLabel} | \${sheetName} | header row \${getHeaderRowIndex(state.table)} | \${visibleDataRows}/\${rowCount} visible data rows | \${columnCount} columns\${viewportSummary}\`;
  }

  function renderFormulaBar() {
    refs.activeCellName.textContent = gridCellName(state.activeCell.row, state.activeCell.col);
    const formulaValue = state.editing ? state.editing.draft : getCellValue(state.table, state.activeCell.row, state.activeCell.col);
    if (refs.formulaBarInput.value !== formulaValue) {
      refs.formulaBarInput.value = formulaValue;
    }
    resizeTextarea(refs.formulaBarInput, 100);
  }

  function renderGlobalSearch() {
    if (refs.globalSearchInput.value !== state.globalSearch) {
      refs.globalSearchInput.value = state.globalSearch;
    }
  }

  function renderPrintChrome() {
    const pageSetup = state.table.pageSetup || {};
    refs.printHeader.textContent = pageSetup.headerFooter?.header || "";
    refs.printFooter.textContent = pageSetup.headerFooter?.footer || "";
    const backgroundColor = pageSetup.background?.mode === "solid-color" && pageSetup.background?.color
      ? pageSetup.background.color
      : "#fff";
    refs.gridWrap.style.background = backgroundColor;
  }

  function renderGrid() {
    const printBounds = resolvePrintAreaBounds(state.table, state.selection, state.table.pageSetup || {});
    const copiedBounds = getCopiedSelectionBounds();
    const headerRowIndex = currentView.headerRowIndex;
    const tableRowCount = getSheetRowCount(state.table);
    const renderedColumnSpan = getRenderedGridColumnSpan();
    const topSpacerRow = renderVirtualSpacerRow(state.rowViewport.topSpacerHeight, renderedColumnSpan);
    const bottomSpacerRow = renderVirtualSpacerRow(state.rowViewport.bottomSpacerHeight, renderedColumnSpan);
    const leftHeaderSpacer = renderVirtualColumnSpacerCell(state.columnViewport.leftSpacerWidth, "th");
    const rightHeaderSpacer = renderVirtualColumnSpacerCell(state.columnViewport.rightSpacerWidth, "th");
    const headCells = currentView.columns
      .map((column) => {
        const isSelected = isColumnHeaderSelected(state.selection, column.index);
        return \`<th scope="col" class="column-header\${isSelected ? " is-selected" : ""}" data-col-header="true" data-col="\${column.index}">\${column.letter}</th>\`;
      })
      .join("");
    const bodyRows = currentView.rows
      .map((row) => renderGridRow(row, printBounds, copiedBounds, headerRowIndex, tableRowCount))
      .join("");
    refs.sheetGrid.innerHTML = \`
      <thead>
        <tr>
          <th class="corner-cell" aria-hidden="true"></th>
          \${leftHeaderSpacer}
          \${headCells}
          \${rightHeaderSpacer}
        </tr>
      </thead>
      <tbody>\${topSpacerRow}\${bodyRows}\${bottomSpacerRow}</tbody>
    \`;
  }

  function renderVirtualSpacerRow(height, columnCount) {
    const safeHeight = Math.max(0, Math.round(Number(height) || 0));
    if (!safeHeight) return "";
    return \`<tr class="grid-spacer-row" data-print-hidden="true" aria-hidden="true"><td class="grid-spacer-cell" colspan="\${Math.max(1, columnCount)}" style="height:\${safeHeight}px"></td></tr>\`;
  }

  function renderVirtualColumnSpacerCell(width, tagName = "td") {
    const safeWidth = Math.max(0, Math.round(Number(width) || 0));
    if (!safeWidth) return "";
    const safeTag = tagName === "th" ? "th" : "td";
    return \`<\${safeTag} class="grid-spacer-column" data-print-hidden="true" aria-hidden="true" style="width:\${safeWidth}px;min-width:\${safeWidth}px"></\${safeTag}>\`;
  }

  function renderGridRow(row, printBounds, copiedBounds, headerRowIndex, tableRowCount) {
    const isViewportPadding = isViewportPaddingRow(state.table, row.index) || row.index > tableRowCount;
    const isFormalHeader = row.index === headerRowIndex;
    const rowSelected = isRowHeaderSelected(state.selection, row.index);
    const printVisible = !isViewportPadding && rowWithinPrintArea(row.index, printBounds);
    const rowClasses = [
      isFormalHeader ? "print-table-header" : "",
    ].filter(Boolean).join(" ");
    const rowHeaderClass = [
      "row-header",
      rowSelected ? "is-selected" : "",
      isFormalHeader ? "is-formal-header" : "",
    ].filter(Boolean).join(" ");
    const leftColumnSpacer = renderVirtualColumnSpacerCell(state.columnViewport.leftSpacerWidth);
    const rightColumnSpacer = renderVirtualColumnSpacerCell(state.columnViewport.rightSpacerWidth);
    const cells = row.cells
      .map((cell) => renderGridCell(cell, isFormalHeader, printBounds, copiedBounds))
      .join("");
    return \`<tr class="\${rowClasses}"\${!printVisible ? ' data-print-hidden="true"' : ""}><th scope="row" class="\${rowHeaderClass}" data-row-header="true" data-row="\${row.index}"\${!printVisible ? ' data-print-hidden="true"' : ""}>\${row.index}</th>\${leftColumnSpacer}\${cells}\${rightColumnSpacer}</tr>\`;
  }

  function renderGridCell(cell, isFormalHeader, printBounds, copiedBounds) {
    const isActive = cell.row === state.activeCell.row && cell.col === state.activeCell.col;
    const isSelected = isCellSelected(state.selection, cell.row, cell.col);
    const isEditingCell = Boolean(state.editing && state.editing.mode === "cell" && isActive);
    const isFillPreview = isFillPreviewCell(cell.row, cell.col);
    const copiedRangeClasses = getCopiedRangeCellClasses(copiedBounds, cell.row, cell.col);
    const copiedRangeOutline = copiedRangeClasses.length
      ? \`<span class="copied-range-outline \${copiedRangeClasses.join(" ")}" aria-hidden="true"></span>\`
      : "";
    const hasFillHandle = shouldRenderFillHandle(cell.row, cell.col);
    const isFindHit = Boolean(state.findReplace.currentMatch && sameCell(state.findReplace.currentMatch, cell));
    const printHidden = !isCellWithinBounds(cell.row, cell.col, printBounds);
    const className = [
      "grid-cell",
      isSelected ? "is-selected" : "",
      isFillPreview ? "is-fill-preview" : "",
      isActive ? "is-active" : "",
      isFindHit ? "is-find-hit" : "",
      isFormalHeader ? "is-formal-header" : "",
      ...copiedRangeClasses,
    ].filter(Boolean).join(" ");
    if (isEditingCell) {
      return \`<td class="\${className}" data-cell="true" data-row="\${cell.row}" data-col="\${cell.col}" aria-selected="\${isSelected ? "true" : "false"}"\${printHidden ? ' data-print-hidden="true"' : ""}>\${copiedRangeOutline}<textarea id="activeCellEditor" class="cell-editor" rows="1" spellcheck="false">\${escapeHtml(state.editing.draft)}</textarea></td>\`;
    }
    const headerTools = isFormalHeader
      ? \`<span class="header-tools"><button class="header-tools-button\${state.columnFilters[columnKeyForIndex(cell.col)] ? " is-filtered" : ""}" type="button" data-header-menu-button="true" aria-label="Open header tools">▼</button></span>\`
      : "";
    return \`<td class="\${className}" data-cell="true" data-row="\${cell.row}" data-col="\${cell.col}" aria-selected="\${isSelected ? "true" : "false"}"\${printHidden ? ' data-print-hidden="true"' : ""}>\${copiedRangeOutline}\${escapeHtml(cell.value)}\${headerTools}\${hasFillHandle ? '<button class="fill-handle" type="button" data-fill-handle="true" aria-label="Fill handle"></button>' : ""}</td>\`;
  }

  function renderFloatingLayer() {
    const panels = [];
    if (state.openPanel === "find-replace") {
      panels.push(renderFindReplacePanel());
    }
    if (state.openPanel === "text-import") {
      panels.push(renderTextImportPanel());
    }
    if (state.openPanel === "text-export") {
      panels.push(renderTextExportPanel());
    }
    if (state.openPanel === "excel-import") {
      panels.push(renderExcelImportPanel());
    }
    if (state.openPanel === "advanced-filter") {
      panels.push(renderAdvancedFilterPanel());
    }
    if (state.openPanel === "sort") {
      panels.push(renderSortPanel());
    }
    if (state.openPanel === "page-setup") {
      panels.push(renderPageSetupPanel());
    }
    if (state.openPanel === "grid-limits") {
      panels.push(renderGridLimitsPanel());
    }
    if (state.openPanel === "help-page") {
      panels.push(renderHelpPanel());
    }
    if (state.openPanel === "version-page") {
      panels.push(renderVersionPanel());
    }
    if (state.headerMenu) {
      panels.push(renderHeaderMenu());
    }
    refs.floatingLayer.innerHTML = panels.join("");
  }

  function renderHelpPanel() {
    return \`
      <section class="floating-panel floating-panel-wide" data-panel-type="help-page" role="dialog" aria-label="Help panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">CWS Light Table Help</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <p class="floating-panel-meta">CWS Light Table is a lightweight single-sheet table editor for CWS HTML.</p>
        <section class="help-panel-section" aria-label="Key features">
          <h3 class="help-panel-heading">Key Features</h3>
          <ul class="help-panel-list">
            <li>Open and save CWS HTML files.</li>
            <li>Import Excel and text or structured data into the grid.</li>
            <li>Edit cells with the formula bar, copy and paste, fill handle, and undo or redo.</li>
            <li>Use find and replace, header rows, filters, print setup, and export tools.</li>
            <li>Adjust grid size and insert rows, columns, or cells.</li>
          </ul>
        </section>
        <section class="help-panel-section" aria-label="Keyboard shortcuts">
          <h3 class="help-panel-heading">Keyboard Shortcuts</h3>
          <ul class="help-panel-list">
            <li>Ctrl+O: Open CWS HTML</li>
            <li>Ctrl+S: Save CWS HTML</li>
            <li>Ctrl+P: Print</li>
            <li>Ctrl+F / Ctrl+H: Find / Replace</li>
            <li>Ctrl+Z / Ctrl+Y: Undo / Redo</li>
            <li>Ctrl+A: Select all cells</li>
          </ul>
        </section>
        <section class="help-panel-section" aria-label="Notes">
          <h3 class="help-panel-heading">Notes</h3>
          <ul class="help-panel-list">
            <li>This editor works with one sheet at a time.</li>
            <li>Saved output stays in CWS HTML format.</li>
            <li>Imported data is flattened to plain visible values.</li>
            <li>Clipboard access can be limited in embedded or restricted browsers.</li>
          </ul>
        </section>
      </section>
    \`;
  }

  function renderVersionPanel() {
    return \`
      <section class="floating-panel" data-panel-type="version-page" role="dialog" aria-label="Version panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">CWS Light Table Version</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <div class="help-panel-facts" aria-label="Version information">
          <div class="help-panel-fact-row">
            <span class="help-panel-fact-label">Product</span>
            <strong>CWS Light Table</strong>
          </div>
          <div class="help-panel-fact-row">
            <span class="help-panel-fact-label">Version</span>
            <strong>0.1.2</strong>
          </div>
          <div class="help-panel-fact-row">
            <span class="help-panel-fact-label">Author</span>
            <strong>Mac Su</strong>
          </div>
        </div>
        <p class="floating-panel-meta">Lightweight CWS HTML single-sheet table editor with import, export, filtering, print, and structural editing tools.</p>
      </section>
    \`;
  }

  function renderTextImportPanel() {
    const draft = state.importDraft;
    if (!draft || draft.kind !== "text") return "";
    const anchor = getImportAnchorCell(state.selection);
    const previewHtml = renderImportPreviewTable(draft.matrix || []);
    const delimiterOptions = draft.fileKind === "csv" || draft.fileKind === "tsv" || draft.fileKind === "txt"
      ? \`
        <label>
          <span>Delimiter</span>
          <select id="textImportDelimiterSelect">
            <option value="comma"\${draft.delimiterMode === "comma" ? " selected" : ""}>Comma</option>
            <option value="tab"\${draft.delimiterMode === "tab" ? " selected" : ""}>Tab</option>
            <option value="line"\${draft.delimiterMode === "line" ? " selected" : ""}>Line-Based</option>
          </select>
        </label>
      \`
      : "";
    return \`
      <section class="floating-panel floating-panel-wide" data-panel-type="text-import" role="dialog" aria-label="Text import panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Import Text / Structured Data</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <div class="page-setup-grid">
          <label class="grow">
            <span>File</span>
            <input type="text" value="\${escapeAttr(draft.fileName)}" readonly />
          </label>
          <label>
            <span>Type</span>
            <input type="text" value="\${escapeAttr(draft.fileKind.toUpperCase())}" readonly />
          </label>
        </div>
        <div class="page-setup-grid">
          <label>
            <span>Encoding</span>
            <select id="textImportEncodingSelect">
              \${getSupportedTextImportEncodings().map((encoding) => \`<option value="\${escapeAttr(encoding)}"\${draft.encoding === encoding ? " selected" : ""}>\${escapeHtml(encoding)}</option>\`).join("")}
            </select>
          </label>
          \${delimiterOptions}
        </div>
        <p class="floating-panel-meta">Import anchor: \${escapeHtml(gridCellName(anchor.row, anchor.col))}. Imported content always starts at the top-left cell of the current selection.</p>
        \${draft.needsReread ? '<p class="floating-panel-meta">Press Re-read to refresh the preview from the original raw bytes using the selected encoding.</p>' : ""}
        \${draft.error ? \`<p class="floating-panel-error">\${escapeHtml(draft.error)}</p>\` : ""}
        <div class="import-preview">
          <div class="import-preview-header">
            <span>Preview</span>
            <span class="menu-item-hint">\${escapeHtml(formatMatrixShape(draft.matrix || []))}</span>
          </div>
          \${previewHtml}
        </div>
        <div class="floating-panel-actions">
          <button class="button" type="button" data-panel-action="text-import-reread">Re-read</button>
          <button class="button button-primary" type="button" data-panel-action="text-import-apply"\${draft.error ? ' aria-disabled="true"' : ""}>Import</button>
        </div>
      </section>
    \`;
  }

  function renderTextExportPanel() {
    const draft = state.exportDraft;
    if (!draft) return "";
    const summary = formatTextExportSummary(draft);
    const bomEnabled = shouldEnableBomToggle(draft.encoding);
    const targetOptions = getSupportedTextExportTargets()
      .map((target) => \`<option value="\${escapeAttr(target)}"\${draft.target === target ? " selected" : ""}>\${escapeHtml(target.toUpperCase())}</option>\`)
      .join("");
    const encodingOptions = getSupportedTextExportEncodings()
      .map((encoding) => \`<option value="\${escapeAttr(encoding)}"\${draft.encoding === encoding ? " selected" : ""}>\${escapeHtml(encoding)}</option>\`)
      .join("");
    const rowLineEndingOptions = getSupportedTextExportRowLineEndings()
      .map((rowLineEnding) => \`<option value="\${escapeAttr(rowLineEnding)}"\${draft.rowLineEnding === rowLineEnding ? " selected" : ""}>\${escapeHtml(rowLineEnding)}</option>\`)
      .join("");
    const previewMatrix = buildTextExportMatrix(state.table, {
      includeHiddenData: draft.includeHiddenData,
      visibleRowSet: getVisibleRowInfo().visibleRowSet,
    }).slice(0, 6);
    const previewText = serializeTextExportMatrix(previewMatrix, draft);
    return \`
      <section class="floating-panel floating-panel-wide" data-panel-type="text-export" role="dialog" aria-label="Text export panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Export Text Data</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <div class="page-setup-grid">
          <label>
            <span>Target</span>
            <select id="textExportTargetSelect">\${targetOptions}</select>
          </label>
          <label>
            <span>Encoding</span>
            <select id="textExportEncodingSelect">\${encodingOptions}</select>
          </label>
          <label>
            <span>Row line ending</span>
            <select id="textExportRowLineEndingSelect">\${rowLineEndingOptions}</select>
          </label>
        </div>
        <div class="floating-panel-checks">
          <label><input id="textExportNormalizeLfInput" type="checkbox"\${draft.normalizeCellLineBreaksToLf ? " checked" : ""} /> Cell line breaks only LF</label>
          <label><input id="textExportBomInput" type="checkbox"\${draft.withBom && bomEnabled ? " checked" : ""}\${bomEnabled ? "" : " disabled"} /> with BOM</label>
          <label><input id="textExportIncludeHiddenInput" type="checkbox"\${draft.includeHiddenData ? " checked" : ""} /> Include hidden data</label>
          \${draft.target === "csv" ? \`<label><input id="textExportQuoteAllInput" type="checkbox"\${draft.quoteAllCells ? " checked" : ""} /> Quote all cells</label>\` : ""}
        </div>
        <p class="floating-panel-meta">Export scope: the whole current sheet. Hidden-row handling is controlled by <strong>Include hidden data</strong>.</p>
        <p class="floating-panel-meta">Summary: \${escapeHtml(summary)}</p>
        \${state.panelError ? \`<p class="floating-panel-error">\${escapeHtml(state.panelError)}</p>\` : ""}
        <div class="import-preview">
          <div class="import-preview-header">
            <span>Preview</span>
            <span class="menu-item-hint">\${escapeHtml(\`\${draft.target.toUpperCase()} / first 6 rows\`)}</span>
          </div>
          <div class="import-preview-table-wrap"><pre class="text-export-preview">\${escapeHtml(previewText)}</pre></div>
        </div>
        <div class="floating-panel-actions">
          <button class="button button-primary" type="button" data-panel-action="text-export-apply">Export</button>
        </div>
      </section>
    \`;
  }

  function renderExcelImportPanel() {
    const draft = state.importDraft;
    if (!draft || draft.kind !== "excel") return "";
    const anchor = getImportAnchorCell(state.selection);
    const selected = draft.sheetOptions.find((entry) => entry.index === draft.selectedSheetIndex) || draft.sheetOptions[0];
    return \`
      <section class="floating-panel" data-panel-type="excel-import" role="dialog" aria-label="Excel import panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Import Excel Sheet</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <label>
          <span>Workbook</span>
          <input type="text" value="\${escapeAttr(draft.fileName)}" readonly />
        </label>
        <label>
          <span>Sheet</span>
          <select id="excelImportSheetSelect">
            \${draft.sheetOptions.map((sheet) => \`<option value="\${sheet.index}"\${sheet.index === draft.selectedSheetIndex ? " selected" : ""}>\${escapeHtml(sheet.name)} (\${sheet.rowCount}x\${sheet.colCount})</option>\`).join("")}
          </select>
        </label>
        <p class="floating-panel-meta">Import anchor: \${escapeHtml(gridCellName(anchor.row, anchor.col))}. Selected sheet data will be written into the current document from that cell.</p>
        \${selected ? \`<p class="floating-panel-meta">Selected sheet size: \${selected.rowCount} rows x \${selected.colCount} columns.</p>\` : ""}
        <div class="floating-panel-actions">
          <button class="button button-primary" type="button" data-panel-action="excel-import-apply">Import Sheet</button>
        </div>
      </section>
    \`;
  }

  function renderFindReplacePanel() {
    const scopeLabel = formatScopeLabel();
    return \`
      <section class="floating-panel" data-panel-type="find-replace" role="dialog" aria-label="Find and replace panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Find / Replace</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <label>
          <span>Find what</span>
          <input id="findTextInput" type="text" value="\${escapeAttr(state.findReplace.findText)}" autocomplete="off" spellcheck="false" />
        </label>
        <label>
          <span>Replace with</span>
          <input id="replaceTextInput" type="text" value="\${escapeAttr(state.findReplace.replaceText)}" autocomplete="off" spellcheck="false" />
        </label>
        <div class="floating-panel-checks">
          <label><input id="findCaseSensitiveInput" type="checkbox"\${state.findReplace.caseSensitive ? " checked" : ""} /> Case Sensitive</label>
          <label><input id="findWholeCellInput" type="checkbox"\${state.findReplace.wholeCell ? " checked" : ""} /> Whole Cell</label>
        </div>
        <p class="floating-panel-meta">Scope: \${escapeHtml(scopeLabel)}</p>
        \${state.panelError ? \`<p class="floating-panel-error">\${escapeHtml(state.panelError)}</p>\` : ""}
        <div class="floating-panel-actions">
          <button class="button" type="button" data-panel-action="find-next">Find Next</button>
          <button class="button" type="button" data-panel-action="replace-one">Replace</button>
          <button class="button button-primary" type="button" data-panel-action="replace-all">Replace All</button>
        </div>
      </section>
    \`;
  }

  function renderAdvancedFilterPanel() {
    const draft = state.advancedFilterDraft || createAdvancedFilterDraft();
    const columnOptions = renderColumnOptions();
    return \`
      <section class="floating-panel" data-panel-type="advanced-filter" role="dialog" aria-label="Advanced filter panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Advanced Filter</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <div class="advanced-filter-list">
          \${draft.conditions.map((condition, index) => \`
            <div class="advanced-filter-condition">
              <div class="advanced-filter-number">\${index + 1}</div>
              <label class="grow">
                <span>Column</span>
                <select data-condition-index="\${index}" data-condition-field="columnKey">
                  \${columnOptions.replace(\`value="\${escapeAttr(condition.columnKey)}"\`, \`value="\${escapeAttr(condition.columnKey)}" selected\`)}
                </select>
              </label>
              <label class="grow">
                <span>Operator</span>
                <select data-condition-index="\${index}" data-condition-field="operator">
                  \${renderOperatorOptions(condition.operator)}
                </select>
              </label>
              <label class="grow">
                <span>Value</span>
                <input type="text" value="\${escapeAttr(condition.value)}" data-condition-index="\${index}" data-condition-field="value" spellcheck="false" />
              </label>
              <button class="link-button advanced-filter-remove" type="button" data-panel-action="advanced-remove-condition" data-condition-index="\${index}"\${draft.conditions.length <= 1 ? " aria-disabled=\\"true\\"" : ""}>Remove</button>
            </div>
          \`).join("")}
        </div>
        <div class="inline-row">
          <button class="link-button" type="button" data-panel-action="advanced-add-condition"\${draft.conditions.length >= 20 ? " aria-disabled=\\"true\\"" : ""}>Add Condition</button>
          <button class="link-button" type="button" data-panel-action="advanced-reset-logic">Reset to default logic</button>
        </div>
        <label>
          <span>Logic expression</span>
          <input id="advancedFilterLogicInput" type="text" value="\${escapeAttr(draft.logic)}" spellcheck="false" />
        </label>
        <p class="floating-panel-example">Example: <code>1 AND (2 OR 3)</code></p>
        \${state.panelError ? \`<p class="floating-panel-error">\${escapeHtml(state.panelError)}</p>\` : ""}
        <div class="floating-panel-actions">
          <button class="button" type="button" data-panel-action="advanced-clear">Clear Advanced Filter</button>
          <button class="button button-primary" type="button" data-panel-action="advanced-apply">Apply</button>
        </div>
      </section>
    \`;
  }

  function renderSortPanel() {
    const draft = state.sortDraft || createSortDraft();
    const columnOptions = \`<option value="">None</option>\${renderColumnOptions()}\`;
    return \`
      <section class="floating-panel" data-panel-type="sort" role="dialog" aria-label="Sort panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Sort</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <div class="page-setup-grid">
          <label class="grow">
            <span>Primary column</span>
            <select id="sortPrimaryColumn">\${columnOptions.replace(\`value="\${escapeAttr(draft.primaryColumn)}"\`, \`value="\${escapeAttr(draft.primaryColumn)}" selected\`)}</select>
          </label>
          <label>
            <span>Direction</span>
            <select id="sortPrimaryDirection">
              <option value="asc"\${draft.primaryDirection === "asc" ? " selected" : ""}>A → Z</option>
              <option value="desc"\${draft.primaryDirection === "desc" ? " selected" : ""}>Z → A</option>
            </select>
          </label>
          <label class="grow">
            <span>Secondary column</span>
            <select id="sortSecondaryColumn">\${columnOptions.replace(\`value="\${escapeAttr(draft.secondaryColumn)}"\`, \`value="\${escapeAttr(draft.secondaryColumn)}" selected\`)}</select>
          </label>
          <label>
            <span>Direction</span>
            <select id="sortSecondaryDirection">
              <option value="asc"\${draft.secondaryDirection === "asc" ? " selected" : ""}>A → Z</option>
              <option value="desc"\${draft.secondaryDirection === "desc" ? " selected" : ""}>Z → A</option>
            </select>
          </label>
        </div>
        \${state.panelError ? \`<p class="floating-panel-error">\${escapeHtml(state.panelError)}</p>\` : ""}
        <div class="floating-panel-actions">
          <button class="button button-primary" type="button" data-panel-action="sort-apply">Apply Sort</button>
        </div>
      </section>
    \`;
  }

  function renderPageSetupPanel() {
    const draft = state.pageSetupDraft || createPageSetupDraft(state.table.pageSetup);
    return \`
      <section class="floating-panel" data-panel-type="page-setup" role="dialog" aria-label="Page setup panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Page Setup</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <div class="page-setup-grid page-setup-basics">
          <label>
            <span>Paper Size</span>
            <select id="pageSetupPaperSize">
              \${renderFixedOptions(["A4", "A3", "Letter"], draft.paperSize)}
            </select>
          </label>
          <label>
            <span>Orientation</span>
            <select id="pageSetupOrientation">
              \${renderFixedOptions(["portrait", "landscape"], draft.orientation)}
            </select>
          </label>
        </div>
        <div class="page-setup-grid page-setup-margins">
          <label>
            <span>Top</span>
            <input id="pageSetupMarginTop" type="number" min="0" step="1" value="\${escapeAttr(draft.margins.top)}" />
          </label>
          <label>
            <span>Right</span>
            <input id="pageSetupMarginRight" type="number" min="0" step="1" value="\${escapeAttr(draft.margins.right)}" />
          </label>
          <label>
            <span>Bottom</span>
            <input id="pageSetupMarginBottom" type="number" min="0" step="1" value="\${escapeAttr(draft.margins.bottom)}" />
          </label>
          <label>
            <span>Left</span>
            <input id="pageSetupMarginLeft" type="number" min="0" step="1" value="\${escapeAttr(draft.margins.left)}" />
          </label>
        </div>
        <label>
          <span>Header</span>
          <input id="pageSetupHeader" type="text" value="\${escapeAttr(draft.headerFooter.header)}" spellcheck="false" />
        </label>
        <label>
          <span>Footer</span>
          <input id="pageSetupFooter" type="text" value="\${escapeAttr(draft.headerFooter.footer)}" spellcheck="false" />
        </label>
        <div class="page-setup-grid">
          <label class="grow">
            <span>Print Area</span>
            <select id="pageSetupPrintAreaMode">
              \${renderFixedOptions(["entire-sheet", "selection", "custom"], draft.printArea.mode)}
            </select>
          </label>
          <label class="grow">
            <span>Custom Range</span>
            <input id="pageSetupPrintAreaRange" type="text" value="\${escapeAttr(draft.printArea.range)}" placeholder="A1:D20" spellcheck="false" />
          </label>
        </div>
        <div class="page-setup-grid">
          <label class="grow">
            <span>Background</span>
            <select id="pageSetupBackgroundMode">
              \${renderFixedOptions(["none", "solid-color"], draft.background?.mode || "none")}
            </select>
          </label>
          <label class="grow">
            <span>Color</span>
            <input id="pageSetupBackgroundColor" type="color" value="\${escapeAttr(draft.background?.color || "#ffffff")}" />
          </label>
        </div>
        \${state.panelError ? \`<p class="floating-panel-error">\${escapeHtml(state.panelError)}</p>\` : ""}
        <div class="floating-panel-actions">
          <button class="button" type="button" data-panel-action="page-setup-apply">Apply</button>
          <button class="button button-primary" type="button" data-panel-action="page-setup-print">Apply And Print</button>
        </div>
      </section>
    \`;
  }

  function renderGridLimitsPanel() {
    const draft = state.gridLimitsDraft || createGridLimitsDraft();
    return \`
      <section class="floating-panel" data-panel-type="grid-limits" role="dialog" aria-label="Grid limits panel">
        <div class="floating-panel-header">
          <h2 class="floating-panel-title">Grid Limits</h2>
          <button class="floating-panel-close" type="button" data-panel-action="close-panel">Close</button>
        </div>
        <div class="page-setup-grid">
          <label>
            <span>Maximum Rows</span>
            <input id="gridLimitsRowsInput" type="number" min="1" step="1" value="\${escapeAttr(draft.maxRows)}" />
          </label>
          <label>
            <span>Maximum Columns</span>
            <input id="gridLimitsColumnsInput" type="number" min="1" step="1" value="\${escapeAttr(draft.maxColumns)}" />
          </label>
        </div>
        <p id="gridLimitsColumnFeedback" class="floating-panel-meta">Column label: \${escapeHtml(formatGridLimitColumnFeedback(draft.maxColumns))}</p>
        <p class="floating-panel-meta">These values define the current editable grid size for this sheet.</p>
        \${state.panelError ? \`<p class="floating-panel-error">\${escapeHtml(state.panelError)}</p>\` : ""}
        <div class="floating-panel-actions">
          <button class="button button-primary" type="button" data-panel-action="grid-limits-apply">Apply</button>
        </div>
      </section>
    \`;
  }

  function renderImportPreviewTable(matrix) {
    if (!matrix.length) {
      return \`<p class="floating-panel-meta">No preview rows are available yet.</p>\`;
    }
    const previewRows = matrix.slice(0, 8);
    const previewColumnCount = Math.max(1, Math.min(6, previewRows.reduce((max, row) => Math.max(max, row.length), 0)));
    const body = previewRows
      .map((row) => \`<tr>\${Array.from({ length: previewColumnCount }, (_, index) => \`<td>\${escapeHtml(String(row[index] ?? ""))}</td>\`).join("")}</tr>\`)
      .join("");
    return \`
      <div class="import-preview-table-wrap">
        <table class="import-preview-table">
          <tbody>\${body}</tbody>
        </table>
      </div>
    \`;
  }

  function renderHeaderMenu() {
    const headerMenu = state.headerMenu;
    const columnLabel = state.table.columns?.[headerMenu.columnIndex - 1]?.label || columnLabelFromIndex(headerMenu.columnIndex);
    return \`
      <section class="header-menu" style="left:\${headerMenu.left}px;top:\${headerMenu.top}px;" role="dialog" aria-label="Header menu">
        <strong>\${escapeHtml(columnLabel)}</strong>
        <div class="header-menu-actions">
          <button class="button" type="button" data-panel-action="header-sort-asc">Sort A → Z</button>
          <button class="button" type="button" data-panel-action="header-sort-desc">Sort Z → A</button>
        </div>
        <label>
          <span>Filter operator</span>
          <select id="headerMenuOperator">
            \${renderOperatorOptions(headerMenu.operator)}
          </select>
        </label>
        <label>
          <span>Filter value</span>
          <input id="headerMenuValue" type="text" value="\${escapeAttr(headerMenu.value)}" spellcheck="false" />
        </label>
        <p class="header-menu-note">Applies only to rows below the formal header row.</p>
        \${headerMenu.error ? \`<p class="floating-panel-error">\${escapeHtml(headerMenu.error)}</p>\` : ""}
        <div class="header-menu-actions">
          <button class="button" type="button" data-panel-action="header-filter-clear">Clear Filter</button>
          <button class="button button-primary" type="button" data-panel-action="header-filter-apply">Apply Filter</button>
        </div>
      </section>
    \`;
  }

  function handleGridClick(event) {
    debugGridLog("grid-click:start", { suppressNextGridClick: state.suppressNextGridClick, target: describeEventTarget(event.target) });
    if (state.suppressNextGridClick) {
      state.suppressNextGridClick = false;
      debugGridLog("grid-click:suppressed", { target: describeEventTarget(event.target) });
      return;
    }
    if (event.target.closest("[data-fill-handle='true']")) return;
    if (event.target.closest("[data-header-menu-button='true']")) {
      const cellElement = event.target.closest("[data-cell='true']");
      const cell = cellFromDataset(cellElement);
      selectSingleCell(cell);
      openHeaderMenu(cell.col, event.target.closest("[data-header-menu-button='true']"));
      return;
    }
    if (event.target.closest("#activeCellEditor")) return;
    const cellElement = event.target.closest("[data-cell='true']");
    const rowHeaderElement = event.target.closest("[data-row-header='true']");
    const columnHeaderElement = event.target.closest("[data-col-header='true']");

    if (cellElement) {
      commitEditing("stay");
      const cell = cellFromDataset(cellElement);
      debugGridLog("grid-click:cell", { cell, shiftKey: event.shiftKey, activeCell: state.activeCell });
      if (event.shiftKey) {
        const anchorCell = state.selection.anchor || state.activeCell;
        state.activeCell = cell;
        state.selection = createRangeSelection(anchorCell, cell);
        state.findReplace.currentMatch = null;
        renderWorkspace();
        return;
      }
      if (sameCell(cell, state.activeCell) && state.selection.mode === "cell" && !state.editing) {
        debugGridLog("grid-click:begin-edit", { cell });
        beginCellEdit();
        return;
      }
      selectSingleCell(cell);
      return;
    }

    if (rowHeaderElement) {
      commitEditing("stay");
      const row = Number(rowHeaderElement.dataset.row || 1);
      const previousActiveCell = { ...state.activeCell };
      debugGridLog("grid-click:row-header", { row, activeCell: state.activeCell, shiftKey: event.shiftKey });
      state.activeCell = clampActiveCell({ row, col: state.activeCell.col }, currentView);
      if (event.shiftKey) {
        const anchorRow = state.selection.mode === "row"
          ? state.selection.anchor?.row || previousActiveCell.row
          : previousActiveCell.row;
        state.selection = createRowSelection(anchorRow, currentView.columnCount, row);
      } else {
        state.selection = createRowSelection(row, currentView.columnCount);
      }
      state.findReplace.currentMatch = null;
      renderWorkspace();
      return;
    }

    if (columnHeaderElement) {
      commitEditing("stay");
      const col = Number(columnHeaderElement.dataset.col || 1);
      const previousActiveCell = { ...state.activeCell };
      debugGridLog("grid-click:col-header", { col, activeCell: state.activeCell, shiftKey: event.shiftKey });
      state.activeCell = clampActiveCell({ row: state.activeCell.row, col }, currentView);
      if (event.shiftKey) {
        const anchorColumn = state.selection.mode === "column"
          ? state.selection.anchor?.col || previousActiveCell.col
          : previousActiveCell.col;
        state.selection = createColumnSelection(anchorColumn, currentView.rowCount, col);
      } else {
        state.selection = createColumnSelection(col, currentView.rowCount);
      }
      state.findReplace.currentMatch = null;
      renderWorkspace();
    }
  }

  function handleGridMouseDown(event) {
    debugGridLog("grid-mousedown:start", { button: event.button, shiftKey: event.shiftKey, target: describeEventTarget(event.target) });
    if (event.button !== 0) return;
    if (event.target.closest("[data-header-menu-button='true']")) return;
    if (event.target.closest("[data-fill-handle='true']")) {
      event.preventDefault();
      event.stopPropagation();
      const sourceBounds = getSelectionBounds(state.selection);
      state.fillDrag = {
        sourceSelection: cloneJsonValue(state.selection),
        previewCell: { row: sourceBounds.endRow, col: sourceBounds.endCol },
      };
      state.selectionDrag = null;
      renderGrid();
      return;
    }
    if (event.target.closest("#activeCellEditor")) return;
    const cellElement = event.target.closest("[data-cell='true']");
    if (!cellElement) return;
    commitEditing("stay");
    const clickedCell = cellFromDataset(cellElement);
    const selectionAnchor = event.shiftKey
      ? (state.selection.anchor || state.activeCell)
      : clickedCell;
    if (!event.shiftKey && !sameCell(clickedCell, state.activeCell)) {
      state.activeCell = clickedCell;
      state.selection = createCellSelection(clickedCell);
      state.findReplace.currentMatch = null;
      renderSelectionState();
    }
    state.selectionDrag = {
      anchor: selectionAnchor,
      focus: clickedCell,
      moved: false,
      extendSelection: event.shiftKey,
      startedOnActiveCell: !event.shiftKey && sameCell(clickedCell, state.activeCell) && state.selection.mode === "cell" && !state.editing,
    };
    debugGridLog("grid-mousedown:selection-drag", { clickedCell, selectionAnchor, activeCell: state.activeCell, selection: state.selection });
  }

  function handleGridMouseOver(event) {
    handleGridPointerMove(event);
  }

  function handleGridPointerMove(event) {
    if (state.fillDrag) {
      const cell = resolvePointerCell(event);
      if (!cell) return;
      if (sameCell(cell, state.fillDrag.previewCell)) return;
      state.fillDrag.previewCell = cell;
      renderGrid();
      return;
    }
    if (!state.selectionDrag) return;
    const cell = resolvePointerCell(event);
    if (!cell) return;
    if (sameCell(cell, state.selectionDrag.focus)) return;
    state.selectionDrag.focus = cell;
    state.selectionDrag.moved = state.selectionDrag.moved || !sameCell(cell, state.selectionDrag.anchor);
    state.activeCell = cell;
    state.selection = createRangeSelection(state.selectionDrag.anchor, cell);
    state.findReplace.currentMatch = null;
    renderSelectionState();
  }

  function handleGridDoubleClick(event) {
    if (event.target.closest("[data-header-menu-button='true']")) return;
    const cellElement = event.target.closest("[data-cell='true']");
    if (!cellElement) return;
    commitEditing("stay");
    const cell = cellFromDataset(cellElement);
    selectSingleCell(cell);
    beginCellEdit();
  }

  function handleGridInput(event) {
    const editor = event.target.closest("#activeCellEditor");
    if (!editor || !state.editing || state.editing.mode !== "cell") return;
    state.editing.draft = editor.value;
    if (refs.formulaBarInput.value !== editor.value) {
      refs.formulaBarInput.value = editor.value;
    }
    resizeTextarea(editor, 180);
    resizeTextarea(refs.formulaBarInput, 100);
  }

  function handleGridEditorKeydown(event) {
    const editor = event.target.closest("#activeCellEditor");
    if (!editor || !state.editing || state.editing.mode !== "cell") return;
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
      return;
    }
    if (event.key === "Enter" && event.altKey) {
      event.preventDefault();
      insertLineBreakAtCursor(editor, "cell");
      return;
    }
    if (event.key === "Enter" && !event.altKey) {
      event.preventDefault();
      commitEditing(event.shiftKey ? "shift+enter" : "enter");
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      commitEditing(event.shiftKey ? "shift+tab" : "tab");
    }
  }

  function handleFormulaBarFocus() {
    if (!state.editing) {
      state.editing = {
        mode: "formula",
        draft: getCellValue(state.table, state.activeCell.row, state.activeCell.col),
      };
      return;
    }
    if (state.editing.mode !== "formula") {
      state.editing.mode = "formula";
      renderWorkspace();
    }
  }

  function handleFormulaBarInput(event) {
    if (!state.editing || state.editing.mode !== "formula") {
      state.editing = {
        mode: "formula",
        draft: event.currentTarget.value,
      };
    } else {
      state.editing.draft = event.currentTarget.value;
    }
    resizeTextarea(refs.formulaBarInput, 100);
  }

  function handleFormulaBarKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
      return;
    }
    if (event.key === "Enter" && event.altKey) {
      event.preventDefault();
      insertLineBreakAtCursor(event.currentTarget, "formula");
      return;
    }
    if (event.key === "Enter" && !event.altKey) {
      event.preventDefault();
      commitEditing(event.shiftKey ? "shift+enter" : "enter");
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      commitEditing(event.shiftKey ? "shift+tab" : "tab");
    }
  }

  function handleGlobalSearchInput(event) {
    state.globalSearch = event.currentTarget.value;
    state.findReplace.currentMatch = null;
    renderWorkspace();
    setStatus(buildVisibleRowStatus(state.globalSearch ? \`Global search filtered by "\${state.globalSearch}".\` : "Global search cleared."));
  }

  function handleGlobalSearchKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      handleGlobalSearchClear();
    }
  }

  function handleGlobalSearchClear() {
    if (!state.globalSearch) return;
    state.globalSearch = "";
    state.findReplace.currentMatch = null;
    renderWorkspace();
    setStatus(buildVisibleRowStatus("Global search cleared."));
  }

  function handleFloatingLayerClick(event) {
    const actionTarget = event.target.closest("[data-panel-action]");
    if (!actionTarget) return;
    const action = actionTarget.dataset.panelAction || "";
    if (actionTarget.getAttribute("aria-disabled") === "true") return;
    if (action === "close-panel") {
      closeOpenPanel();
      return;
    }
    if (action === "text-import-reread") {
      handleTextImportReread();
      return;
    }
    if (action === "text-import-apply") {
      handleApplyTextImport();
      return;
    }
    if (action === "text-export-apply") {
      handleApplyTextExport();
      return;
    }
    if (action === "excel-import-apply") {
      handleApplyExcelImport();
      return;
    }
    if (action === "find-next") {
      runFindNext();
      return;
    }
    if (action === "replace-one") {
      runReplaceOne();
      return;
    }
    if (action === "replace-all") {
      runReplaceAll();
      return;
    }
    if (action === "advanced-add-condition") {
      handleAddAdvancedCondition();
      return;
    }
    if (action === "advanced-remove-condition") {
      handleRemoveAdvancedCondition(Number(actionTarget.dataset.conditionIndex || 0));
      return;
    }
    if (action === "advanced-reset-logic") {
      handleResetAdvancedLogic();
      return;
    }
    if (action === "advanced-apply") {
      handleApplyAdvancedFilter();
      return;
    }
    if (action === "advanced-clear") {
      state.advancedFilter = { enabled: false, conditions: [], logic: "" };
      state.panelError = "";
      closeOpenPanel();
      renderWorkspace();
      setStatus(buildVisibleRowStatus("Advanced filter cleared."));
      return;
    }
    if (action === "sort-apply") {
      handleApplySort();
      return;
    }
    if (action === "page-setup-apply") {
      handleApplyPageSetup(false);
      return;
    }
    if (action === "page-setup-print") {
      handleApplyPageSetup(true);
      return;
    }
    if (action === "grid-limits-apply") {
      handleApplyGridLimits();
      return;
    }
    if (action === "header-filter-apply") {
      handleApplyHeaderFilter();
      return;
    }
    if (action === "header-filter-clear") {
      handleClearHeaderFilter();
      return;
    }
    if (action === "header-sort-asc") {
      handleQuickSort(state.headerMenu?.columnIndex, "asc");
      return;
    }
    if (action === "header-sort-desc") {
      handleQuickSort(state.headerMenu?.columnIndex, "desc");
    }
  }

  function handleFloatingLayerInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) {
      return;
    }

    if (target.id === "findTextInput") {
      state.findReplace.findText = target.value;
      state.findReplace.currentMatch = null;
      state.panelError = "";
      return;
    }
    if (target.id === "textImportEncodingSelect" && state.importDraft?.kind === "text") {
      state.importDraft.encoding = target.value;
      state.importDraft.needsReread = true;
      state.importDraft.error = "";
      renderWorkspace();
      return;
    }
    if (target.id === "gridLimitsRowsInput" && state.gridLimitsDraft) {
      state.gridLimitsDraft.maxRows = target.value;
      state.panelError = "";
      return;
    }
    if (target.id === "gridLimitsColumnsInput" && state.gridLimitsDraft) {
      state.gridLimitsDraft.maxColumns = target.value;
      state.panelError = "";
      const feedback = document.getElementById("gridLimitsColumnFeedback");
      if (feedback) {
        feedback.textContent = \`Column label: \${formatGridLimitColumnFeedback(target.value)}\`;
      }
      return;
    }
    if (target.id === "textExportTargetSelect" && state.exportDraft) {
      state.exportDraft.target = normalizeTextExportTarget(target.value);
      state.exportDraft.quoteAllCells = state.exportDraft.target === "csv" && Boolean(state.exportDraft.quoteAllCells);
      state.panelError = "";
      rememberTextExportSettings();
      renderWorkspace();
      return;
    }
    if (target.id === "textExportEncodingSelect" && state.exportDraft) {
      state.exportDraft.encoding = normalizeTextExportEncoding(target.value);
      if (!shouldEnableBomToggle(state.exportDraft.encoding)) {
        state.exportDraft.withBom = false;
      }
      state.panelError = "";
      rememberTextExportSettings();
      renderWorkspace();
      return;
    }
    if (target.id === "textExportRowLineEndingSelect" && state.exportDraft) {
      state.exportDraft.rowLineEnding = normalizeTextExportRowLineEnding(target.value);
      state.panelError = "";
      rememberTextExportSettings();
      renderWorkspace();
      return;
    }
    if (target.id === "textExportNormalizeLfInput" && state.exportDraft) {
      state.exportDraft.normalizeCellLineBreaksToLf = target.checked;
      state.panelError = "";
      rememberTextExportSettings();
      renderWorkspace();
      return;
    }
    if (target.id === "textExportBomInput" && state.exportDraft) {
      state.exportDraft.withBom = shouldEnableBomToggle(state.exportDraft.encoding) && target.checked;
      state.panelError = "";
      rememberTextExportSettings();
      renderWorkspace();
      return;
    }
    if (target.id === "textExportIncludeHiddenInput" && state.exportDraft) {
      state.exportDraft.includeHiddenData = target.checked;
      state.panelError = "";
      rememberTextExportSettings();
      renderWorkspace();
      return;
    }
    if (target.id === "textExportQuoteAllInput" && state.exportDraft) {
      state.exportDraft.quoteAllCells = state.exportDraft.target === "csv" && target.checked;
      state.panelError = "";
      rememberTextExportSettings();
      renderWorkspace();
      return;
    }
    if (target.id === "textImportDelimiterSelect" && state.importDraft?.kind === "text") {
      state.importDraft.delimiterMode = target.value;
      state.importDraft.error = "";
      if (!state.importDraft.needsReread) {
        refreshTextImportDraft(state.importDraft);
      }
      renderWorkspace();
      return;
    }
    if (target.id === "excelImportSheetSelect" && state.importDraft?.kind === "excel") {
      state.importDraft.selectedSheetIndex = Number(target.value || 0);
      return;
    }
    if (target.id === "replaceTextInput") {
      state.findReplace.replaceText = target.value;
      return;
    }
    if (target.id === "findCaseSensitiveInput") {
      state.findReplace.caseSensitive = target.checked;
      state.findReplace.currentMatch = null;
      return;
    }
    if (target.id === "findWholeCellInput") {
      state.findReplace.wholeCell = target.checked;
      state.findReplace.currentMatch = null;
      return;
    }
    if (target.dataset.conditionField) {
      const index = Number(target.dataset.conditionIndex || 0);
      const field = target.dataset.conditionField;
      if (!state.advancedFilterDraft?.conditions[index]) return;
      state.advancedFilterDraft.conditions[index][field] = target.value;
      state.panelError = "";
      return;
    }
    if (target.id === "advancedFilterLogicInput") {
      if (!state.advancedFilterDraft) return;
      state.advancedFilterDraft.logic = target.value;
      state.panelError = "";
      return;
    }
    if (target.id === "sortPrimaryColumn") {
      state.sortDraft.primaryColumn = target.value;
      return;
    }
    if (target.id === "sortPrimaryDirection") {
      state.sortDraft.primaryDirection = target.value;
      return;
    }
    if (target.id === "sortSecondaryColumn") {
      state.sortDraft.secondaryColumn = target.value;
      return;
    }
    if (target.id === "sortSecondaryDirection") {
      state.sortDraft.secondaryDirection = target.value;
      return;
    }
    if (target.id === "pageSetupPaperSize") {
      state.pageSetupDraft.paperSize = target.value;
      state.panelError = "";
      return;
    }
    if (target.id === "pageSetupOrientation") {
      state.pageSetupDraft.orientation = target.value;
      state.panelError = "";
      return;
    }
    if (target.id === "pageSetupMarginTop") {
      state.pageSetupDraft.margins.top = target.value;
      return;
    }
    if (target.id === "pageSetupMarginRight") {
      state.pageSetupDraft.margins.right = target.value;
      return;
    }
    if (target.id === "pageSetupMarginBottom") {
      state.pageSetupDraft.margins.bottom = target.value;
      return;
    }
    if (target.id === "pageSetupMarginLeft") {
      state.pageSetupDraft.margins.left = target.value;
      return;
    }
    if (target.id === "pageSetupHeader") {
      state.pageSetupDraft.headerFooter.header = target.value;
      return;
    }
    if (target.id === "pageSetupFooter") {
      state.pageSetupDraft.headerFooter.footer = target.value;
      return;
    }
    if (target.id === "pageSetupPrintAreaMode") {
      state.pageSetupDraft.printArea.mode = target.value;
      state.panelError = "";
      return;
    }
    if (target.id === "pageSetupPrintAreaRange") {
      state.pageSetupDraft.printArea.range = target.value;
      state.panelError = "";
      return;
    }
    if (target.id === "pageSetupBackgroundMode") {
      state.pageSetupDraft.background = target.value === "none"
        ? null
        : { mode: "solid-color", color: state.pageSetupDraft.background?.color || "#ffffff" };
      state.panelError = "";
      return;
    }
    if (target.id === "pageSetupBackgroundColor") {
      state.pageSetupDraft.background = {
        mode: "solid-color",
        color: target.value,
      };
      return;
    }
    if (target.id === "headerMenuOperator" && state.headerMenu) {
      state.headerMenu.operator = target.value;
      state.headerMenu.error = "";
      return;
    }
    if (target.id === "headerMenuValue" && state.headerMenu) {
      state.headerMenu.value = target.value;
      state.headerMenu.error = "";
    }
  }

  function handleFloatingLayerKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      if (state.headerMenu) {
        state.headerMenu = null;
        renderFloatingLayer();
        return;
      }
      closeOpenPanel();
      return;
    }
    if (event.key === "Enter" && event.target instanceof HTMLInputElement && event.target.id === "findTextInput") {
      event.preventDefault();
      runFindNext();
    }
  }

  function handleDocumentClick(event) {
    const target = event.target;
    if (refs.appMenu.contains(target) || refs.menuButtons.some((button) => button.contains(target))) {
      return;
    }
    setMenuOpen(null);
    if (state.headerMenu && !target.closest(".header-menu") && !target.closest("[data-header-menu-button='true']")) {
      state.headerMenu = null;
      renderFloatingLayer();
    }
  }

  function handleDocumentMouseMove(event) {
    handleGridPointerMove(event);
  }

  function handleDocumentMouseUp(event) {
    debugGridLog("document-mouseup:start", { target: describeEventTarget(event.target), hasSelectionDrag: Boolean(state.selectionDrag), hasFillDrag: Boolean(state.fillDrag) });
    if (state.fillDrag) {
      const releaseCell = resolvePointerCell(event);
      if (releaseCell) {
        state.fillDrag.previewCell = releaseCell;
      }
      const previewCell = state.fillDrag.previewCell;
      const sourceSelection = state.fillDrag.sourceSelection;
      state.fillDrag = null;
      state.suppressNextGridClick = isPointerOverGrid(event);
      if (!previewCell || !sourceSelection) {
        renderGrid();
        return;
      }
      const beforeSnapshot = captureSnapshot();
      const result = fillSelectionByRepeat(state.table, sourceSelection, previewCell);
      applySnapshot(
        {
          table: result.table,
          activeCell: previewCell,
          selection: result.selection,
        },
        {
          beforeSnapshot,
          recordHistory: hasTableChanged(beforeSnapshot.table, result.table),
          statusMessage: "Fill handle applied as copy-repeat.",
        },
      );
      return;
    }
    if (!state.selectionDrag) return;
    const dragState = state.selectionDrag;
    state.selectionDrag = null;
    if (!dragState.moved) {
      const releaseCell = resolvePointerCell(event) || dragState.focus || dragState.anchor;
      debugGridLog("document-mouseup:no-move", { releaseCell, startedOnActiveCell: dragState.startedOnActiveCell });
      if (releaseCell && dragState.extendSelection) {
        state.activeCell = releaseCell;
        state.selection = createRangeSelection(dragState.anchor, releaseCell);
        state.findReplace.currentMatch = null;
        state.suppressNextGridClick = isPointerOverGrid(event);
        renderSelectionState();
        return;
      }
      if (releaseCell && !dragState.startedOnActiveCell) {
        state.activeCell = releaseCell;
        state.selection = createCellSelection(releaseCell);
        state.findReplace.currentMatch = null;
        state.suppressNextGridClick = isPointerOverGrid(event);
        renderSelectionState();
      }
      return;
    }
    const releaseCell = resolvePointerCell(event) || dragState.focus;
    if (releaseCell) {
      state.activeCell = releaseCell;
      state.selection = createRangeSelection(dragState.anchor, releaseCell);
    }
    state.suppressNextGridClick = isPointerOverGrid(event);
    renderSelectionState();
  }

  function handleDocumentCopy(event) {
    if (isEditingTarget(event.target)) return;
    const text = selectionToDelimitedText(state.table, state.selection);
    if (event.clipboardData) {
      event.preventDefault();
      event.clipboardData.setData("text/plain", text);
    }
    rememberCopiedSelection();
    const bounds = getSelectionBounds(state.selection);
    setStatus(\`Copied \${bounds.endRow - bounds.startRow + 1}x\${bounds.endCol - bounds.startCol + 1} range.\`);
  }

  function handleDocumentPaste(event) {
    if (isEditingTarget(event.target)) return;
    const text = event.clipboardData?.getData("text/plain") ?? "";
    const matrix = parseDelimitedText(text, { preserveEmptyCell: true });
    if (!matrix.length) return;
    event.preventDefault();
    applyClipboardMatrix(matrix, "Pasted clipboard range into the grid.");
  }

  async function handleDocumentKeydown(event) {
    const isPrimaryShortcut = event.ctrlKey || event.metaKey;
    const normalizedKey = String(event.key || "").toLowerCase();
    if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "o") {
      event.preventDefault();
      setMenuOpen(null);
      refs.openFileInput.click();
      return;
    }
    if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "s") {
      event.preventDefault();
      setMenuOpen(null);
      await handleSave();
      return;
    }
    if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "p") {
      event.preventDefault();
      setMenuOpen(null);
      handlePrint();
      return;
    }
    if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "f") {
      event.preventDefault();
      openFindReplacePanel("find");
      return;
    }
    if (isPrimaryShortcut && normalizedKey === "h") {
      event.preventDefault();
      openFindReplacePanel("replace");
      return;
    }
    if (isPrimaryShortcut && !event.shiftKey && normalizedKey === "a") {
      event.preventDefault();
      state.activeCell = { row: 1, col: 1 };
      state.selection = createRangeSelection(
        { row: 1, col: 1 },
        { row: currentView.rowCount, col: currentView.columnCount },
      );
      state.findReplace.currentMatch = null;
      renderWorkspace();
      return;
    }
    if (event.key === "Escape") {
      if (state.headerMenu) {
        state.headerMenu = null;
        renderFloatingLayer();
        return;
      }
      if (state.openPanel) {
        closeOpenPanel();
        return;
      }
      if (state.openMenuKey) {
        setMenuOpen(null);
        return;
      }
      if (clearCopiedSelection({ render: true })) {
        event.preventDefault();
        setStatus("Cleared the copied range highlight.");
        return;
      }
    }
    if (isEditingTarget(event.target)) return;
    const editIntent = getKeyboardEditIntent(event);
    if (editIntent) {
      event.preventDefault();
      beginCellEdit({
        draft: applyKeyboardEditIntent(
          getCellValue(state.table, state.activeCell.row, state.activeCell.col),
          editIntent,
        ),
      });
      return;
    }
    const direction = keyToDirection(event);
    if (!direction) return;
    event.preventDefault();
    moveGridSelection(direction, event.shiftKey);
  }

  function moveGridSelection(direction, extendSelection) {
    const nextCell = moveActiveCell(state.activeCell, direction, {
      rowCount: currentView.rowCount,
      columnCount: currentView.columnCount,
    });
    const anchorCell = state.selection.anchor || state.activeCell;
    state.activeCell = nextCell;
    state.selection = extendSelection
      ? createRangeSelection(anchorCell, nextCell)
      : createCellSelection(nextCell);
    state.findReplace.currentMatch = null;
    renderWorkspace();
  }

  function beginCellEdit(options = {}) {
    state.selection = createCellSelection(state.activeCell);
    state.editing = {
      mode: "cell",
      draft: options.draft ?? getCellValue(state.table, state.activeCell.row, state.activeCell.col),
    };
    renderWorkspace();
  }

  function commitEditing(direction = "stay") {
    if (!state.editing) return;
    const beforeSnapshot = captureSnapshot();
    const nextTable = setCellValue(state.table, state.activeCell.row, state.activeCell.col, state.editing.draft);
    const nextView = buildSheetGridView(nextTable);
    let nextActiveCell = clampActiveCell(state.activeCell, nextView);
    if (direction !== "stay") {
      nextActiveCell = moveActiveCell(nextActiveCell, direction, {
        rowCount: nextView.rowCount,
        columnCount: nextView.columnCount,
      });
    }
    applySnapshot(
      {
        table: nextTable,
        activeCell: nextActiveCell,
        selection: createCellSelection(nextActiveCell),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
      },
    );
  }

  function cancelEditing() {
    state.editing = null;
    renderWorkspace();
  }

  async function handleSave() {
    commitEditing("stay");
    const html = serializeLightTableToCwsHtml(state.table, {
      fileName: state.sourceFileName || state.table.sourceName,
    });
    const fileName = normalizeDownloadName(state.sourceFileName || state.table.sourceName);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    try {
      const savedWithFilePicker = await trySaveWithFilePicker(blob, fileName, [
        {
          description: "CWS HTML",
          accept: {
            "text/html": [".html", ".htm"],
          },
        },
      ]);
      if (savedWithFilePicker) {
        setStatus(\`Saved CWS HTML as \${fileName}.\`);
      } else {
        saveWithDownloadLink(blob, fileName);
        setStatus(\`Started CWS HTML download as \${fileName}. If no download appears, this browser may block file downloads.\`);
      }
    } catch (error) {
      setStatus(formatSaveErrorMessage(error));
    }
  }

  async function trySaveWithFilePicker(blob, fileName, types = []) {
    if (typeof window.showSaveFilePicker !== "function") {
      return false;
    }
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types,
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    } catch (error) {
      if (error?.name === "AbortError") {
        throw new Error("Save canceled.");
      }
      return false;
    }
  }

  function saveWithDownloadLink(blob, fileName) {
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = fileName;
    link.hidden = true;
    document.body.append(link);
    try {
      link.click();
    } finally {
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
    }
  }

  function formatSaveErrorMessage(error) {
    const message = String(error?.message || "");
    if (message === "Save canceled.") {
      return message;
    }
    if (/downloads are not supported/i.test(message)) {
      return "Save failed here because this browser does not support downloads. Open the app in a standard browser to save the CWS HTML file.";
    }
    return message
      ? \`Save failed: \${message}\`
      : "Save failed because this browser blocked the file save.";
  }

  function formatExportErrorMessage(error) {
    const message = String(error?.message || "");
    if (message === "Save canceled.") {
      return "Export canceled.";
    }
    if (/downloads are not supported/i.test(message)) {
      return "Export failed here because this browser does not support downloads. Open the app in a standard browser to export the file.";
    }
    return message
      ? \`Export failed: \${message}\`
      : "Export failed because this browser blocked the download.";
  }

  function handlePrint() {
    commitEditing("stay");
    state.headerMenu = null;
    setMenuOpen(null);
    renderWorkspace();
    window.print();
    setStatus("Opened the browser print dialog.");
  }

  function setStatus(message) {
    refs.statusMessage.textContent = message;
  }

  function setMenuOpen(menuKey) {
    const previousMenuKey = state.openMenuKey;
    state.openMenuKey = getMenuItems(menuKey).length ? menuKey : null;
    state.openSubmenuKey = state.openMenuKey && state.openMenuKey === previousMenuKey
      ? state.openSubmenuKey
      : "";
    refs.menuButtons.forEach((button) => {
      const isOpen = button.dataset.menuKey === state.openMenuKey;
      button.setAttribute("aria-expanded", isOpen ? "true" : "false");
      button.classList.toggle("is-active", isOpen);
    });
    if (!state.openMenuKey) {
      refs.appMenu.classList.add("hidden");
      refs.appMenu.style.left = "";
      refs.appMenu.innerHTML = "";
      return;
    }
    renderMenu(state.openMenuKey);
  }

  function renderMenu(menuKey) {
    const button = refs.menuButtons.find((entry) => entry.dataset.menuKey === menuKey);
    const items = getMenuItems(menuKey);
    const submenuItems = getMenuItems(state.openSubmenuKey);
    refs.appMenu.setAttribute("aria-labelledby", button?.id || "");
    refs.appMenu.innerHTML = \`
      <div class="menu-dropdown-column">
        \${items.map((item) => renderMenuItem(item, state.openSubmenuKey)).join("")}
      </div>
      \${submenuItems.length ? \`<div class="menu-dropdown-column menu-dropdown-submenu">\${submenuItems.map((item) => renderMenuItem(item, "")).join("")}</div>\` : ""}
    \`;
    refs.appMenu.classList.remove("hidden");
    refs.appMenu.style.left = \`\${button?.offsetLeft || 0}px\`;
  }

  function renderMenuItem(item, activeSubmenuKey) {
    const hint = item.submenuKey ? ">" : (item.hint || "");
    const activeClass = item.submenuKey && item.submenuKey === activeSubmenuKey ? " is-active" : "";
    if (item.disabled) {
      return \`<div class="menu-item is-disabled\${activeClass}" role="menuitem" aria-disabled="true"><span>\${escapeHtml(item.label)}</span><span class="menu-item-hint">\${escapeHtml(hint)}</span></div>\`;
    }
    const actionAttr = item.action ? \` data-menu-action="\${escapeHtml(item.action)}"\` : "";
    const submenuAttr = item.submenuKey ? \` data-menu-submenu="\${escapeHtml(item.submenuKey)}" aria-haspopup="true"\` : "";
    return \`<button class="menu-item\${activeClass}" type="button" role="menuitem"\${actionAttr}\${submenuAttr}><span>\${escapeHtml(item.label)}</span><span class="menu-item-hint">\${escapeHtml(hint)}</span></button>\`;
  }

  function getSelectionRowCount() {
    const bounds = getSelectionBounds(state.selection);
    return bounds.endRow - bounds.startRow + 1;
  }

  function getSelectionColumnCount() {
    const bounds = getSelectionBounds(state.selection);
    return bounds.endCol - bounds.startCol + 1;
  }

  function isWholeSheetSelection() {
    const bounds = getSelectionBounds(state.selection);
    return bounds.startRow === 1
      && bounds.startCol === 1
      && bounds.endRow === currentView.rowCount
      && bounds.endCol === currentView.columnCount;
  }

  function shouldDisableInsertCells() {
    return isWholeSheetSelection() || state.selection.mode === "row" || state.selection.mode === "column";
  }

  function resolveRowInsertTarget(placement) {
    const bounds = getSelectionBounds(state.selection);
    if (state.selection.mode === "column") {
      return {
        anchorRow: state.activeCell.row,
        insertStartRow: placement === "above" ? state.activeCell.row : state.activeCell.row + 1,
        count: 1,
      };
    }
    return {
      anchorRow: placement === "above" ? bounds.startRow : bounds.endRow,
      insertStartRow: placement === "above" ? bounds.startRow : bounds.endRow + 1,
      count: getSelectionRowCount(),
    };
  }

  function resolveColumnInsertTarget(placement) {
    const bounds = getSelectionBounds(state.selection);
    if (state.selection.mode === "row") {
      return {
        anchorColumn: state.activeCell.col,
        insertStartColumn: placement === "left" ? state.activeCell.col : state.activeCell.col + 1,
        count: 1,
      };
    }
    return {
      anchorColumn: placement === "left" ? bounds.startCol : bounds.endCol,
      insertStartColumn: placement === "left" ? bounds.startCol : bounds.endCol + 1,
      count: getSelectionColumnCount(),
    };
  }

  function resolveRowDeleteTarget() {
    const bounds = getSelectionBounds(state.selection);
    if (state.selection.mode === "column") {
      return {
        startRow: state.activeCell.row,
        count: 1,
      };
    }
    return {
      startRow: bounds.startRow,
      count: getSelectionRowCount(),
    };
  }

  function resolveColumnDeleteTarget() {
    const bounds = getSelectionBounds(state.selection);
    if (state.selection.mode === "row") {
      return {
        startColumn: state.activeCell.col,
        count: 1,
      };
    }
    return {
      startColumn: bounds.startCol,
      count: getSelectionColumnCount(),
    };
  }

  function normalizeSelectionState() {
    if (!state.selection) {
      state.selection = createCellSelection(state.activeCell);
      return;
    }
    const anchor = clampActiveCell(state.selection.anchor || state.activeCell, currentView);
    const focus = clampActiveCell(state.selection.focus || state.activeCell, currentView);
    state.selection = state.selection.mode === "row"
      ? createRowSelection(anchor.row, currentView.columnCount, focus.row)
      : state.selection.mode === "column"
        ? createColumnSelection(anchor.col, currentView.rowCount, focus.col)
        : state.selection.mode === "range"
          ? createRangeSelection(anchor, focus)
          : createCellSelection(focus);
  }

  function selectSingleCell(cell) {
    state.activeCell = normalizeCell(cell);
    state.selection = createCellSelection(state.activeCell);
    state.editing = null;
    state.findReplace.currentMatch = null;
    renderWorkspace();
  }

  function resetGridInteractionState() {
    state.activeCell = { row: 1, col: 1 };
    state.selection = createCellSelection(state.activeCell);
    state.copiedSelection = null;
    state.editing = null;
    state.history = createHistoryState();
    state.fillDrag = null;
    state.selectionDrag = null;
    state.suppressNextGridClick = false;
    state.globalSearch = "";
    state.columnFilters = {};
    state.advancedFilter = { enabled: false, conditions: [], logic: "" };
    state.findReplace.currentMatch = null;
    state.openPanel = null;
    state.headerMenu = null;
    state.panelError = "";
    state.advancedFilterDraft = null;
    state.sortDraft = null;
    state.pageSetupDraft = createPageSetupDraft(state.table.pageSetup);
    state.gridLimitsDraft = null;
    state.exportDraft = null;
  }

  function clampActiveCell(activeCell, view) {
    const normalized = normalizeCell(activeCell);
    return {
      row: Math.max(1, Math.min(view.rowCount, normalized.row)),
      col: Math.max(1, Math.min(view.columnCount, normalized.col)),
    };
  }

  function ensureActiveCellIsVisible() {
    if (isViewportPaddingRow(state.table, state.activeCell.row)) return;
    const visibleRows = getVisibleRowInfo().visibleRowSet;
    if (visibleRows.has(state.activeCell.row)) return;
    const nextRow = Array.from(visibleRows.values()).sort((left, right) => left - right)[0] || getHeaderRowIndex(state.table);
    state.activeCell = clampActiveCell({ row: nextRow, col: state.activeCell.col }, currentView);
    state.selection = createCellSelection(state.activeCell);
    state.findReplace.currentMatch = null;
  }

  function syncEditingFocus() {
    if (state.editing?.mode === "cell") {
      const editor = document.getElementById("activeCellEditor");
      if (editor) {
        editor.focus();
        editor.selectionStart = editor.value.length;
        editor.selectionEnd = editor.value.length;
        resizeTextarea(editor, 180);
      }
    }
    if (state.pendingFocusId) {
      const target = document.getElementById(state.pendingFocusId);
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
        target.focus();
        if ("select" in target && typeof target.select === "function") {
          target.select();
        }
      }
      state.pendingFocusId = "";
    }
    if (state.pendingScrollCell) {
      const matchElement = refs.sheetGrid.querySelector(\`[data-cell='true'][data-row='\${state.pendingScrollCell.row}'][data-col='\${state.pendingScrollCell.col}']\`);
      matchElement?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
      state.pendingScrollCell = null;
    }
  }

  function keyToDirection(event) {
    if (event.key === "ArrowLeft") return "left";
    if (event.key === "ArrowRight") return "right";
    if (event.key === "ArrowUp") return "up";
    if (event.key === "ArrowDown") return "down";
    if (event.key === "Tab") return event.shiftKey ? "shift+tab" : "tab";
    if (event.key === "Enter") return event.shiftKey ? "shift+enter" : "enter";
    return "";
  }

  function resizeTextarea(element, maxHeight) {
    element.style.height = "0px";
    element.style.height = \`\${Math.min(element.scrollHeight, maxHeight)}px\`;
  }

  function handleGridViewportScroll() {
    const rowWindowChanged = syncGridViewportState();
    if (!rowWindowChanged) return;
    renderGrid();
    syncEditingFocus();
  }

  function handleGridViewportResize() {
    const rowWindowChanged = syncGridViewportState({ recomputeMetrics: true });
    if (!rowWindowChanged) return;
    renderGrid();
    syncEditingFocus();
  }

  function syncGridViewportState(options = {}) {
    if (options.recomputeMetrics) {
      rebuildGridRenderState({ honorPendingScroll: false });
      updateGridViewportDebugData();
      if (debugGridEvents) {
        renderDocumentSummary();
      }
      return true;
    }
    const previousRowWindowSignature = state.rowViewport.signature;
    const previousColumnWindowSignature = state.columnViewport.signature;
    const metrics = state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
    state.viewportState = updateViewportState(state.viewportState, refs.gridWrap, {
      contentWidth: metrics.contentWidth,
      contentHeight: metrics.contentHeight,
    });
    state.visibleRange = calculateVisibleRange(metrics, state.viewportState);
    state.visibleRangeSignature = visibleRangeSignature(state.visibleRange);
    updateRowViewportFromVisibleRange();
    updateColumnViewportFromVisibleRange();
    rebuildCurrentView();
    updateGridViewportDebugData();
    if (debugGridEvents) {
      renderDocumentSummary();
    }
    return state.rowViewport.signature !== previousRowWindowSignature
      || state.columnViewport.signature !== previousColumnWindowSignature;
  }

  function resolveGridMetricOptions() {
    const viewportState = state.viewportState || createViewportState();
    const visibleColumnCount = viewportState.width > 0
      ? estimateVisibleColumnCount(viewportState.width, buildGridMetrics(state.table))
      : undefined;
    const visibleRowCount = viewportState.height > 0
      ? estimateVisibleRowCount(viewportState.height, buildGridMetrics(state.table))
      : undefined;
    return {
      minColumnCount: visibleColumnCount,
      minRowCount: visibleRowCount,
    };
  }

  function updateGridViewportDebugData() {
    if (!refs.gridWrap || !refs.sheetGrid) return;
    refs.gridWrap.dataset.viewportRows = \`\${state.visibleRange.startRow}-\${state.visibleRange.endRow}\`;
    refs.gridWrap.dataset.viewportColumns = \`\${state.visibleRange.startColumn}-\${state.visibleRange.endColumn}\`;
    refs.sheetGrid.dataset.visibleRange = state.visibleRangeSignature;
  }

  function rebuildGridRenderState(options = {}) {
    state.logicalGridMetrics = buildGridMetrics(state.table, resolveGridMetricOptions());
    state.visibleRowLayout = buildVisibleRowLayout(
      state.table,
      getVisibleRowInfo().visibleRowSet,
      state.logicalGridMetrics.rowCount,
    );
    state.rowVirtualizationEnabled = shouldUseRowVirtualization(state.visibleRowLayout.totalVisibleRowCount);
    state.columnVirtualizationEnabled = shouldUseColumnVirtualization(state.logicalGridMetrics.columnCount);
    state.gridMetrics = state.rowVirtualizationEnabled
      ? buildVirtualizedGridMetrics(state.logicalGridMetrics, state.visibleRowLayout.totalVisibleRowCount)
      : state.logicalGridMetrics;
    state.viewportState = updateViewportState(state.viewportState, refs.gridWrap, {
      contentWidth: state.gridMetrics.contentWidth,
      contentHeight: state.gridMetrics.contentHeight,
    });
    state.visibleRange = calculateVisibleRange(state.gridMetrics, state.viewportState);
    if (options.honorPendingScroll) {
      applyPendingScrollCellToViewport();
    }
    state.visibleRangeSignature = visibleRangeSignature(state.visibleRange);
    updateRowViewportFromVisibleRange();
    updateColumnViewportFromVisibleRange();
    rebuildCurrentView();
  }

  function buildVisibleRowLayout(table, visibleRows, fullRowCount) {
    const totalRowCount = Math.max(1, Math.trunc(Number(fullRowCount) || 1));
    const tableRowCount = getSheetRowCount(table);
    const logicalRows = [];
    const rowSlotByIndex = new Map();
    for (let rowIndex = 1; rowIndex <= totalRowCount; rowIndex += 1) {
      if (rowIndex > tableRowCount || visibleRows.has(rowIndex)) {
        logicalRows.push(rowIndex);
        rowSlotByIndex.set(rowIndex, logicalRows.length);
      }
    }
    if (!logicalRows.length) {
      logicalRows.push(1);
      rowSlotByIndex.set(1, 1);
    }
    return {
      fullRowCount: totalRowCount,
      logicalRows,
      rowSlotByIndex,
      totalVisibleRowCount: logicalRows.length,
    };
  }

  function buildVirtualizedGridMetrics(metrics, visibleRowCount) {
    const safeMetrics = metrics || buildGridMetrics(state.table, resolveGridMetricOptions());
    const rowCount = Math.max(1, Math.trunc(Number(visibleRowCount) || 1));
    return {
      ...safeMetrics,
      rowCount,
      contentHeight: safeMetrics.columnHeaderHeight + rowCount * safeMetrics.rowHeight,
    };
  }

  function updateRowViewportFromVisibleRange() {
    const layout = state.visibleRowLayout || createEmptyVisibleRowLayout();
    const metrics = state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
    if (!state.rowVirtualizationEnabled) {
      state.rowViewport = {
        startSlot: 1,
        endSlot: Math.max(1, layout.totalVisibleRowCount || 1),
        renderedRowIndices: [...layout.logicalRows],
        topSpacerHeight: 0,
        bottomSpacerHeight: 0,
        signature: \`full:\${layout.totalVisibleRowCount}\`,
      };
      return;
    }
    const totalVisibleRows = Math.max(1, layout.totalVisibleRowCount || 1);
    const startSlot = clampNumber(state.visibleRange.startRow, 1, totalVisibleRows);
    const endSlot = clampNumber(state.visibleRange.endRow, startSlot, totalVisibleRows);
    const renderedRowIndices = layout.logicalRows.slice(startSlot - 1, endSlot);
    state.rowViewport = {
      startSlot,
      endSlot,
      renderedRowIndices,
      topSpacerHeight: (startSlot - 1) * metrics.rowHeight,
      bottomSpacerHeight: Math.max(0, totalVisibleRows - endSlot) * metrics.rowHeight,
      signature: \`\${startSlot}:\${endSlot}:\${layout.totalVisibleRowCount}\`,
    };
  }

  function updateColumnViewportFromVisibleRange() {
    const metrics = state.logicalGridMetrics || state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
    const totalColumnCount = Math.max(1, metrics.columnCount || 1);
    if (!state.columnVirtualizationEnabled) {
      state.columnViewport = {
        startColumn: 1,
        endColumn: totalColumnCount,
        renderedColumnIndices: createIndexRange(1, totalColumnCount),
        leftSpacerWidth: 0,
        rightSpacerWidth: 0,
        signature: \`full:\${totalColumnCount}\`,
      };
      return;
    }
    const startColumn = clampNumber(state.visibleRange.startColumn, 1, totalColumnCount);
    const endColumn = clampNumber(state.visibleRange.endColumn, startColumn, totalColumnCount);
    state.columnViewport = {
      startColumn,
      endColumn,
      renderedColumnIndices: createIndexRange(startColumn, endColumn),
      leftSpacerWidth: (startColumn - 1) * metrics.columnWidth,
      rightSpacerWidth: Math.max(0, totalColumnCount - endColumn) * metrics.columnWidth,
      signature: \`\${startColumn}:\${endColumn}:\${totalColumnCount}\`,
    };
  }

  function rebuildCurrentView() {
    const metrics = state.gridMetrics || buildGridMetrics(state.table, resolveGridMetricOptions());
    const layout = state.visibleRowLayout || createEmptyVisibleRowLayout();
    currentView = buildSheetGridView(state.table, {
      minColumnCount: Math.max(1, state.logicalGridMetrics?.columnCount || metrics.columnCount),
      minRowCount: Math.max(1, layout.fullRowCount || state.logicalGridMetrics?.rowCount || metrics.rowCount),
      rowIndices: state.rowViewport.renderedRowIndices,
      columnIndices: state.columnViewport.renderedColumnIndices,
    });
  }

  function applyPendingScrollCellToViewport() {
    if (!state.pendingScrollCell || !refs.gridWrap) return;
    const rowSlot = state.visibleRowLayout.rowSlotByIndex.get(state.pendingScrollCell.row);
    const nextScrollTop = rowSlot
      ? resolveScrollTopForRowSlot(rowSlot, state.viewportState, state.gridMetrics)
      : state.viewportState.scrollTop;
    const nextScrollLeft = resolveScrollLeftForColumn(state.pendingScrollCell.col, state.viewportState, state.gridMetrics);
    refs.gridWrap.scrollTop = nextScrollTop;
    refs.gridWrap.scrollLeft = nextScrollLeft;
    state.viewportState = updateViewportState(state.viewportState, refs.gridWrap, {
      contentWidth: state.gridMetrics.contentWidth,
      contentHeight: state.gridMetrics.contentHeight,
    });
    state.visibleRange = calculateVisibleRange(state.gridMetrics, state.viewportState);
  }

  function resolveScrollTopForRowSlot(rowSlot, viewportState, metrics) {
    const safeSlot = Math.max(1, Math.trunc(Number(rowSlot) || 1));
    const bodyHeight = Math.max(0, viewportState.height - metrics.columnHeaderHeight);
    const rowTop = (safeSlot - 1) * metrics.rowHeight;
    const rowBottom = rowTop + metrics.rowHeight;
    if (rowTop < viewportState.scrollTop) {
      return rowTop;
    }
    if (rowBottom > viewportState.scrollTop + bodyHeight) {
      return Math.max(0, rowBottom - bodyHeight);
    }
    return viewportState.scrollTop;
  }

  function resolveScrollLeftForColumn(columnIndex, viewportState, metrics) {
    const safeColumn = Math.max(1, Math.trunc(Number(columnIndex) || 1));
    const bodyWidth = Math.max(0, viewportState.width - metrics.rowHeaderWidth);
    const columnLeft = (safeColumn - 1) * metrics.columnWidth;
    const columnRight = columnLeft + metrics.columnWidth;
    if (columnLeft < viewportState.scrollLeft) {
      return columnLeft;
    }
    if (columnRight > viewportState.scrollLeft + bodyWidth) {
      return Math.max(0, columnRight - bodyWidth);
    }
    return viewportState.scrollLeft;
  }

  function createEmptyVisibleRowLayout() {
    return {
      fullRowCount: 1,
      logicalRows: [1],
      rowSlotByIndex: new Map([[1, 1]]),
      totalVisibleRowCount: 1,
    };
  }

  function createEmptyRowViewport() {
    return {
      startSlot: 1,
      endSlot: 1,
      renderedRowIndices: [1],
      topSpacerHeight: 0,
      bottomSpacerHeight: 0,
      signature: "",
    };
  }

  function createEmptyColumnViewport() {
    return {
      startColumn: 1,
      endColumn: 1,
      renderedColumnIndices: [1],
      leftSpacerWidth: 0,
      rightSpacerWidth: 0,
      signature: "",
    };
  }

  function shouldUseRowVirtualization(totalVisibleRowCount) {
    return Math.max(1, Math.trunc(Number(totalVisibleRowCount) || 1)) > MIN_VIRTUALIZED_ROW_COUNT;
  }

  function shouldUseColumnVirtualization(totalColumnCount) {
    return Math.max(1, Math.trunc(Number(totalColumnCount) || 1)) > MIN_VIRTUALIZED_COLUMN_COUNT;
  }

  function createIndexRange(start, end) {
    const safeStart = Math.max(1, Math.trunc(Number(start) || 1));
    const safeEnd = Math.max(safeStart, Math.trunc(Number(end) || safeStart));
    return Array.from({ length: safeEnd - safeStart + 1 }, (_, offset) => safeStart + offset);
  }

  function getRenderedGridColumnSpan() {
    return 1
      + currentView.columns.length
      + (state.columnViewport.leftSpacerWidth > 0 ? 1 : 0)
      + (state.columnViewport.rightSpacerWidth > 0 ? 1 : 0);
  }

  function getMenuItems(menuKey) {
    if (menuKey === "edit") {
      return [
        { label: "Undo", action: "undo", disabled: !canUndo(state.history), hint: "Ctrl+Z" },
        { label: "Redo", action: "redo", disabled: !canRedo(state.history), hint: "Ctrl+Y" },
        { label: "Copy Range", action: "copy", disabled: Boolean(state.editing), hint: "Ctrl+C" },
        { label: "Paste Range", action: "paste", disabled: Boolean(state.editing), hint: "Ctrl+V" },
      ];
    }
    if (menuKey === "view") {
      return [
        { label: "Insert Row Above", action: "insert-row-above", disabled: isWholeSheetSelection() },
        { label: "Insert Row Below", action: "insert-row-below", disabled: isWholeSheetSelection() },
        { label: "Insert Column Left", action: "insert-column-left", disabled: isWholeSheetSelection() },
        { label: "Insert Column Right", action: "insert-column-right", disabled: isWholeSheetSelection() },
        { label: "Insert Cells", submenuKey: "insert-cells", disabled: shouldDisableInsertCells() },
        { label: "Delete Rows", action: "delete-rows", disabled: isWholeSheetSelection() },
        { label: "Delete Columns", action: "delete-columns", disabled: isWholeSheetSelection() },
      ];
    }
    if (menuKey === "insert-cells") {
      return [
        { label: "Shift Right", action: "insert-cells-right", disabled: shouldDisableInsertCells() },
        { label: "Shift Down", action: "insert-cells-down", disabled: shouldDisableInsertCells() },
      ];
    }
    return MENU_DEFINITIONS[menuKey] || [];
  }

  async function handleCopyCommand() {
    const text = selectionToDelimitedText(state.table, state.selection);
    const bounds = getSelectionBounds(state.selection);
    const copiedMessage = \`Copied \${bounds.endRow - bounds.startRow + 1}x\${bounds.endCol - bounds.startCol + 1} range.\`;
    rememberCopiedSelection();
    if (!navigator.clipboard?.writeText) {
      setStatus(\`\${copiedMessage} Clipboard write is not available here; use Ctrl+C / Cmd+C inside the grid if you need the system clipboard too.\`);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setStatus(copiedMessage);
    } catch (error) {
      const detail = String(error?.message || "").trim();
      setStatus(detail
        ? \`\${copiedMessage} Clipboard write failed here: \${detail}\`
        : \`\${copiedMessage} Clipboard write is blocked here.\`);
    }
  }

  async function handlePasteCommand() {
    if (!navigator.clipboard?.readText) {
      setStatus("Paste command is not available here. Use Ctrl+V / Cmd+V inside the grid.");
      return;
    }
    try {
      const text = await navigator.clipboard.readText();
      const matrix = parseDelimitedText(text, { preserveEmptyCell: true });
      if (!matrix.length) {
        setStatus("Clipboard is empty.");
        return;
      }
      applyClipboardMatrix(matrix, "Pasted clipboard range into the grid.");
    } catch (error) {
      setStatus(error?.message || "Paste command is blocked here. Use Ctrl+V / Cmd+V inside the grid.");
    }
  }

  function applyClipboardMatrix(matrix, statusMessage) {
    const beforeSnapshot = captureSnapshot();
    const writeResult = applyMatrixToTable(state.table, state.activeCell, matrix);
    applySnapshot(
      {
        table: writeResult.table,
        activeCell: state.activeCell,
        selection: selectionFromMatrix(state.activeCell, matrix),
      },
      {
        beforeSnapshot,
        recordHistory: writeResult.changed,
        statusMessage,
      },
    );
  }

  function handleUndo() {
    commitEditing("stay");
    const currentSnapshot = captureSnapshot();
    const result = undoHistory(state.history, currentSnapshot);
    if (!result.snapshot) {
      setStatus("Nothing to undo.");
      return;
    }
    state.history = result.history;
    applySnapshot(result.snapshot, {
      statusMessage: "Undid the last change.",
    });
  }

  function handleRedo() {
    commitEditing("stay");
    const currentSnapshot = captureSnapshot();
    const result = redoHistory(state.history, currentSnapshot);
    if (!result.snapshot) {
      setStatus("Nothing to redo.");
      return;
    }
    state.history = result.history;
    applySnapshot(result.snapshot, {
      statusMessage: "Redid the last change.",
    });
  }

  function captureSnapshot() {
    return {
      table: state.table,
      activeCell: { ...state.activeCell },
      selection: cloneJsonValue(state.selection),
    };
  }

  function applySnapshot(snapshot, options = {}) {
    if (options.recordHistory && options.beforeSnapshot) {
      state.history = pushHistorySnapshot(state.history, options.beforeSnapshot);
    }
    state.table = snapshot.table;
    state.activeCell = normalizeCell(snapshot.activeCell);
    state.selection = cloneJsonValue(snapshot.selection) || createCellSelection(state.activeCell);
    state.editing = null;
    state.fillDrag = null;
    state.findReplace.currentMatch = null;
    renderWorkspace();
    if (options.statusMessage) {
      setStatus(options.statusMessage);
    }
  }

  function hasTableChanged(left, right) {
    return JSON.stringify(left) !== JSON.stringify(right);
  }

  function shouldRenderFillHandle(rowIndex, columnIndex) {
    if (state.editing || state.fillDrag || state.selectionDrag) return false;
    if (!["cell", "range"].includes(state.selection.mode)) return false;
    const bounds = getSelectionBounds(state.selection);
    return rowIndex === bounds.endRow && columnIndex === bounds.endCol;
  }

  function isFillPreviewCell(rowIndex, columnIndex) {
    if (!state.fillDrag) return false;
    const sourceBounds = getSelectionBounds(state.fillDrag.sourceSelection);
    const previewBounds = getFillPreviewBounds();
    if (!previewBounds) return false;
    return isCellInsideBounds(rowIndex, columnIndex, previewBounds)
      && !isCellInsideBounds(rowIndex, columnIndex, sourceBounds);
  }

  function getCopiedSelectionBounds() {
    return state.copiedSelection ? getSelectionBounds(state.copiedSelection) : null;
  }

  function getCopiedRangeCellClasses(copiedBounds, rowIndex, columnIndex) {
    if (!copiedBounds || !isCellInsideBounds(rowIndex, columnIndex, copiedBounds)) {
      return [];
    }
    const edgeClasses = [];
    if (rowIndex === copiedBounds.startRow) {
      edgeClasses.push("copy-edge-top");
    }
    if (rowIndex === copiedBounds.endRow) {
      edgeClasses.push("copy-edge-bottom");
    }
    if (columnIndex === copiedBounds.startCol) {
      edgeClasses.push("copy-edge-left");
    }
    if (columnIndex === copiedBounds.endCol) {
      edgeClasses.push("copy-edge-right");
    }
    return edgeClasses.length ? ["is-copied-range", ...edgeClasses] : [];
  }

  function rememberCopiedSelection(selection = state.selection) {
    state.copiedSelection = cloneJsonValue(selection);
    renderGrid();
  }

  function clearCopiedSelection(options = {}) {
    if (!state.copiedSelection) {
      return false;
    }
    state.copiedSelection = null;
    if (options.render) {
      renderGrid();
    }
    return true;
  }

  function getFillPreviewBounds() {
    if (!state.fillDrag?.previewCell) return null;
    const sourceBounds = getSelectionBounds(state.fillDrag.sourceSelection);
    return {
      startRow: Math.min(sourceBounds.startRow, state.fillDrag.previewCell.row),
      endRow: Math.max(sourceBounds.endRow, state.fillDrag.previewCell.row),
      startCol: Math.min(sourceBounds.startCol, state.fillDrag.previewCell.col),
      endCol: Math.max(sourceBounds.endCol, state.fillDrag.previewCell.col),
    };
  }

  function isCellInsideBounds(rowIndex, columnIndex, bounds) {
    return rowIndex >= bounds.startRow
      && rowIndex <= bounds.endRow
      && columnIndex >= bounds.startCol
      && columnIndex <= bounds.endCol;
  }

  function isUndoShortcut(event) {
    return (event.ctrlKey || event.metaKey)
      && !event.shiftKey
      && String(event.key || "").toLowerCase() === "z";
  }

  function isRedoShortcut(event) {
    const key = String(event.key || "").toLowerCase();
    return (event.ctrlKey || event.metaKey)
      && (key === "y" || (key === "z" && event.shiftKey));
  }

  function handleGlobalUndoRedoKeydown(event) {
    if (event.defaultPrevented || isEditingTarget(event.target)) return;
    if (isUndoShortcut(event)) {
      event.preventDefault();
      event.stopPropagation();
      handleUndo();
      return;
    }
    if (isRedoShortcut(event)) {
      event.preventDefault();
      event.stopPropagation();
      handleRedo();
    }
  }

  function renderSelectionState() {
    renderFormulaBar();
    renderGrid();
  }

  function resolvePointerCell(event) {
    const pointerElement = resolvePointerElement(event);
    const hoveredCell = pointerElement?.closest?.("[data-cell='true']");
    return hoveredCell ? cellFromDataset(hoveredCell) : null;
  }

  function resolvePointerElement(event) {
    if (!event) return null;
    if (event.target instanceof Element) {
      return event.target;
    }
    if (typeof event.clientX !== "number" || typeof event.clientY !== "number") {
      return null;
    }
    return document.elementFromPoint(event.clientX, event.clientY);
  }

  function isPointerOverGrid(event) {
    return Boolean(resolvePointerElement(event)?.closest?.("#sheetGrid"));
  }

  function insertLineBreakAtCursor(element, mode) {
    const selectionStart = element.selectionStart ?? element.value.length;
    const selectionEnd = element.selectionEnd ?? element.value.length;
    const nextValue = \`\${element.value.slice(0, selectionStart)}\\n\${element.value.slice(selectionEnd)}\`;
    element.value = nextValue;
    element.selectionStart = selectionStart + 1;
    element.selectionEnd = selectionStart + 1;
    state.selection = createCellSelection(state.activeCell);
    state.editing = {
      mode,
      draft: nextValue,
    };
    if (mode === "cell" && refs.formulaBarInput.value !== nextValue) {
      refs.formulaBarInput.value = nextValue;
    }
    resizeTextarea(element, mode === "cell" ? 180 : 100);
    resizeTextarea(refs.formulaBarInput, 100);
  }

  function rememberTextExportSettings(nextSettings = state.exportDraft) {
    if (!nextSettings) return;
    state.exportSettings = normalizeTextExportSettings(nextSettings);
  }

  function buildFilterState() {
    return {
      globalSearch: state.globalSearch,
      columnFilters: state.columnFilters,
      advancedFilter: state.advancedFilter,
    };
  }

  function getVisibleRowInfo() {
    const filterState = buildFilterState();
    const filterSignature = buildFilterSignature(filterState);
    const cached = state.visibleRowsCache;
    if (cached && cached.table === state.table && cached.filterSignature === filterSignature) {
      return cached;
    }
    const visibleRowSet = getVisibleRowSet(state.table, filterState);
    const headerRowIndex = getHeaderRowIndex(state.table);
    let visibleDataRowCount = 0;
    visibleRowSet.forEach((rowIndex) => {
      if (rowIndex > headerRowIndex) {
        visibleDataRowCount += 1;
      }
    });
    const nextCache = {
      table: state.table,
      filterSignature,
      visibleRowSet,
      visibleDataRowCount,
    };
    state.visibleRowsCache = nextCache;
    return nextCache;
  }

  function buildFilterSignature(filterState) {
    return JSON.stringify({
      globalSearch: String(filterState?.globalSearch || ""),
      columnFilters: filterState?.columnFilters || {},
      advancedFilter: filterState?.advancedFilter || {},
    });
  }

  function countVisibleDataRows() {
    return getVisibleRowInfo().visibleDataRowCount;
  }

  function buildVisibleRowStatus(prefix) {
    const totalRows = state.table.rows.length;
    const visibleRows = countVisibleDataRows();
    return \`\${prefix} Showing \${visibleRows} of \${totalRows} data rows.\`;
  }

  function rowWithinPrintArea(rowIndex, printBounds) {
    return rowIndex >= printBounds.startRow && rowIndex <= printBounds.endRow;
  }

  function openFindReplacePanel(mode) {
    state.openPanel = "find-replace";
    state.headerMenu = null;
    state.panelError = "";
    state.pendingFocusId = mode === "replace" ? "replaceTextInput" : "findTextInput";
    renderWorkspace();
  }

  function openAdvancedFilterPanel() {
    state.openPanel = "advanced-filter";
    state.headerMenu = null;
    state.panelError = "";
    state.advancedFilterDraft = createAdvancedFilterDraft();
    state.pendingFocusId = "advancedFilterLogicInput";
    renderWorkspace();
  }

  function openSortPanel() {
    state.openPanel = "sort";
    state.headerMenu = null;
    state.panelError = "";
    state.sortDraft = createSortDraft();
    state.pendingFocusId = "sortPrimaryColumn";
    renderWorkspace();
  }

  function openPageSetupPanel() {
    state.openPanel = "page-setup";
    state.headerMenu = null;
    state.panelError = "";
    state.pageSetupDraft = createPageSetupDraft(state.table.pageSetup);
    state.pendingFocusId = "pageSetupPaperSize";
    renderWorkspace();
  }

  function openGridLimitsPanel() {
    state.openPanel = "grid-limits";
    state.headerMenu = null;
    state.panelError = "";
    state.gridLimitsDraft = createGridLimitsDraft();
    state.pendingFocusId = "gridLimitsRowsInput";
    renderWorkspace();
  }

  function openHelpPanel() {
    state.openPanel = "help-page";
    state.headerMenu = null;
    state.panelError = "";
    state.pendingFocusId = "";
    renderWorkspace();
  }

  function openVersionPanel() {
    state.openPanel = "version-page";
    state.headerMenu = null;
    state.panelError = "";
    state.pendingFocusId = "";
    renderWorkspace();
  }

  function openTextExportPanel(target) {
    state.openPanel = "text-export";
    state.headerMenu = null;
    state.panelError = "";
    state.exportDraft = normalizeTextExportSettings({
      ...state.exportSettings,
      target,
    });
    state.pendingFocusId = "textExportEncodingSelect";
    renderWorkspace();
  }

  function openImportFilePicker(mode) {
    state.importFileMode = mode;
    refs.importFileInput.accept = mode === "excel"
      ? ".xlsx,.xlsm,.xls"
      : ".csv,.tsv,.txt,.json,.xml";
    refs.importFileInput.click();
  }

  async function beginExcelImport(file) {
    setStatus(\`Reading \${file.name}...\`);
    const xlsx = await ensureXlsxLibrary();
    const workbook = xlsx.read(await file.arrayBuffer(), {
      type: "array",
      cellHTML: false,
      cellStyles: false,
    });
    const sheetOptions = listExcelWorkbookSheets(workbook);
    if (!sheetOptions.length) {
      throw new Error("The selected Excel workbook does not contain any sheets.");
    }
    if (sheetOptions.length === 1) {
      const imported = excelWorkbookToMatrix(workbook, sheetOptions[0].index);
      applyImportedMatrix(imported.matrix, \`Imported \${imported.sheetName} from \${file.name}.\`);
      return;
    }
    state.importDraft = {
      kind: "excel",
      fileName: file.name,
      workbook,
      sheetOptions,
      selectedSheetIndex: sheetOptions[0].index,
    };
    state.openPanel = "excel-import";
    state.headerMenu = null;
    state.panelError = "";
    state.pendingFocusId = "excelImportSheetSelect";
    renderWorkspace();
    setStatus(\`Loaded \${file.name}. Choose one sheet to import.\`);
  }

  async function beginTextImport(file) {
    const fileKind = inferImportFileKind(file.name);
    if (!isTextImportKind(fileKind)) {
      throw new Error("The selected file is not a supported text or structured-data import type.");
    }
    const bytes = new Uint8Array(await file.arrayBuffer());
    const draft = {
      kind: "text",
      fileName: file.name,
      fileKind,
      bytes,
      encoding: inferDefaultTextImportEncoding(bytes),
      delimiterMode: inferDefaultDelimiterMode(fileKind),
      needsReread: false,
      error: "",
      text: "",
      matrix: [],
    };
    refreshTextImportDraft(draft);
    state.importDraft = draft;
    state.openPanel = "text-import";
    state.headerMenu = null;
    state.panelError = "";
    state.pendingFocusId = "textImportEncodingSelect";
    renderWorkspace();
    setStatus(\`Loaded \${file.name}. Review the preview and import it into the current sheet.\`);
  }

  function handleTextImportReread() {
    if (state.importDraft?.kind !== "text") return;
    refreshTextImportDraft(state.importDraft);
    renderWorkspace();
  }

  function handleApplyTextImport() {
    const draft = state.importDraft;
    if (!draft || draft.kind !== "text") return;
    if (draft.needsReread) {
      draft.error = "Press Re-read after changing the encoding so the preview uses the original raw bytes.";
      renderWorkspace();
      return;
    }
    if (draft.error) {
      renderWorkspace();
      return;
    }
    if (!draft.matrix.length) {
      draft.error = "There is no parsed data to import.";
      renderWorkspace();
      return;
    }
    applyImportedMatrix(draft.matrix, \`Imported \${draft.fileKind.toUpperCase()} data from \${draft.fileName}.\`);
  }

  function handleApplyExcelImport() {
    const draft = state.importDraft;
    if (!draft || draft.kind !== "excel") return;
    const imported = excelWorkbookToMatrix(draft.workbook, draft.selectedSheetIndex);
    applyImportedMatrix(imported.matrix, \`Imported \${imported.sheetName} from \${draft.fileName}.\`);
  }

  async function handleApplyTextExport() {
    const draft = state.exportDraft;
    if (!draft) return;
    commitEditing("stay");
    const settings = normalizeTextExportSettings(draft);
    const visibleRowSet = getVisibleRowInfo().visibleRowSet;
    const matrix = buildTextExportMatrix(state.table, {
      includeHiddenData: settings.includeHiddenData,
      visibleRowSet,
    });
    const text = serializeTextExportMatrix(matrix, settings);
    let legacyEncode = null;
    if (settings.encoding === "Shift-JIS" || settings.encoding === "EUC-JP") {
      legacyEncode = await ensureLegacyTextExportEncoder();
    }
    const bytes = encodeTextExportBytes(text, {
      ...settings,
      legacyEncode,
    });
    const fileName = buildTextExportFileName(state.sourceFileName || state.table.sourceName, settings.target);
    const blob = new Blob([bytes], { type: getTextExportMimeType(settings.target, settings.encoding) });
    rememberTextExportSettings(settings);
    try {
      const savedWithFilePicker = await trySaveWithFilePicker(blob, fileName, getTextExportFilePickerTypes(settings.target));
      if (savedWithFilePicker) {
        setStatus(\`Exported \${settings.target.toUpperCase()} as \${fileName}.\`);
      } else {
        saveWithDownloadLink(blob, fileName);
        setStatus(\`Started \${settings.target.toUpperCase()} download as \${fileName}. If no download appears, this browser may block file downloads.\`);
      }
      closeOpenPanel();
    } catch (error) {
      setStatus(formatExportErrorMessage(error));
    }
  }

  function closeOpenPanel() {
    if (!state.openPanel) return;
    if (state.openPanel === "text-import" || state.openPanel === "excel-import") {
      state.importDraft = null;
    }
    if (state.openPanel === "text-export") {
      state.exportDraft = null;
    }
    if (state.openPanel === "grid-limits") {
      state.gridLimitsDraft = null;
    }
    state.openPanel = null;
    state.panelError = "";
    renderWorkspace();
  }

  function refreshTextImportDraft(draft) {
    try {
      const result = parseTextImportContent({
        fileName: draft.fileName,
        bytes: draft.bytes,
        encoding: draft.encoding,
        delimiterMode: draft.delimiterMode,
      });
      draft.text = result.text;
      draft.matrix = result.matrix;
      draft.error = "";
      draft.needsReread = false;
    } catch (error) {
      draft.text = "";
      draft.matrix = [];
      draft.error = error.message || "The selected file could not be parsed.";
      draft.needsReread = false;
    }
  }

  function applyImportedMatrix(matrix, prefix) {
    const safeMatrix = Array.isArray(matrix) ? matrix : [];
    if (!safeMatrix.length) {
      setStatus("The selected import did not contain any cells to insert.");
      closeOpenPanel();
      return;
    }
    commitEditing("stay");
    const startCell = getImportAnchorCell(state.selection);
    const beforeSnapshot = captureSnapshot();
    const writeResult = applyMatrixToTable(state.table, startCell, safeMatrix);
    const importedSelection = selectionFromMatrix(startCell, safeMatrix);
    clearCopiedSelection();
    closeOpenPanelWithoutRender();
    applySnapshot(
      {
        table: writeResult.table,
        activeCell: startCell,
        selection: importedSelection,
      },
      {
        beforeSnapshot,
        recordHistory: writeResult.changed,
        statusMessage: \`\${prefix} Inserted \${formatMatrixShape(safeMatrix)} at \${gridCellName(startCell.row, startCell.col)}.\`,
      },
    );
  }

  function closeOpenPanelWithoutRender() {
    state.importDraft = null;
    state.exportDraft = null;
    state.gridLimitsDraft = null;
    state.openPanel = null;
    state.panelError = "";
  }

  function formatMatrixShape(matrix) {
    const rowCount = Array.isArray(matrix) ? matrix.length : 0;
    const columnCount = rowCount
      ? matrix.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0)
      : 0;
    return \`\${rowCount}x\${columnCount}\`;
  }

  async function ensureXlsxLibrary() {
    if (window.XLSX) return window.XLSX;
    if (!xlsxLoadPromise) {
      xlsxLoadPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "./vendor/xlsx/dist/xlsx.full.min.js";
        script.async = true;
        script.dataset.cwsXlsxLoader = "true";
        script.onload = () => {
          if (window.XLSX) {
            resolve(window.XLSX);
            return;
          }
          xlsxLoadPromise = null;
          reject(new Error("The Excel import library loaded but did not initialize correctly."));
        };
        script.onerror = () => {
          xlsxLoadPromise = null;
          reject(new Error("Failed to load the Excel import library."));
        };
        document.head.append(script);
      });
    }
    return xlsxLoadPromise;
  }

  async function ensureLegacyTextExportEncoder() {
    if (window.cptable?.utils?.encode) {
      return createLegacyTextExportEncoder();
    }
    if (!codepageLoadPromise) {
      codepageLoadPromise = (async () => {
        await loadScriptOnce("./vendor/codepage/dist/cpexcel.full.js", "cwsCodepageBase");
        await loadScriptOnce("./vendor/codepage/bits/51932.js", "cwsCodepageEucJp");
        await loadScriptOnce("./vendor/codepage/cputils.js", "cwsCodepageUtils");
      })();
    }
    await codepageLoadPromise;
    return createLegacyTextExportEncoder();
  }

  function createLegacyTextExportEncoder() {
    return (encoding, text) => {
      const codepage = mapTextExportEncodingToCodepage(encoding);
      if (!codepage) {
        throw new Error(\`No legacy encoder is configured for \${encoding}.\`);
      }
      if (!window.cptable?.utils?.hascp?.(codepage)) {
        throw new Error(\`\${encoding} export is not available in this browser build.\`);
      }
      const encoded = window.cptable.utils.encode(codepage, String(text ?? ""));
      return encoded instanceof Uint8Array ? encoded : Uint8Array.from(encoded || []);
    };
  }

  function mapTextExportEncodingToCodepage(encoding) {
    if (encoding === "Shift-JIS") return 932;
    if (encoding === "EUC-JP") return 51932;
    return 0;
  }

  async function loadScriptOnce(src, marker) {
    if (document.querySelector(\`script[data-script-marker="\${marker}"]\`)) {
      return;
    }
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.scriptMarker = marker;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(\`Failed to load \${src}.\`));
      document.head.append(script);
    });
  }

  function handleSetHeaderRow() {
    commitEditing("stay");
    const bounds = getSelectionBounds(state.selection);
    const targetRow = state.selection.mode === "row" && getSelectionRowCount() > 1
      ? bounds.startRow
      : state.activeCell.row;
    const beforeSnapshot = captureSnapshot();
    const nextTable = setHeaderRow(state.table, targetRow);
    clearCopiedSelection();
    applySnapshot(
      {
        table: nextTable,
        activeCell: { row: targetRow, col: state.activeCell.col },
        selection: createCellSelection({ row: targetRow, col: state.activeCell.col }),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Set row \${targetRow} as the formal header row.\`,
      },
    );
  }

  function handleInsertRows(placement) {
    if (isWholeSheetSelection()) return;
    commitEditing("stay");
    const target = resolveRowInsertTarget(placement);
    const beforeSnapshot = captureSnapshot();
    const nextTable = insertRows(state.table, target.anchorRow, target.count, placement);
    const nextView = buildSheetGridView(nextTable);
    clearCopiedSelection();
    applySnapshot(
      {
        table: nextTable,
        activeCell: clampActiveCell({ row: target.insertStartRow, col: state.activeCell.col }, nextView),
        selection: createRowSelection(target.insertStartRow, nextView.columnCount, target.insertStartRow + target.count - 1),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Inserted \${target.count} row\${target.count === 1 ? "" : "s"} \${placement} row \${target.anchorRow}.\`,
      },
    );
  }

  function handleInsertColumns(placement) {
    if (isWholeSheetSelection()) return;
    commitEditing("stay");
    const target = resolveColumnInsertTarget(placement);
    const beforeSnapshot = captureSnapshot();
    const nextTable = insertColumns(state.table, target.anchorColumn, target.count, placement);
    const nextView = buildSheetGridView(nextTable);
    clearCopiedSelection();
    applySnapshot(
      {
        table: nextTable,
        activeCell: clampActiveCell({ row: state.activeCell.row, col: target.insertStartColumn }, nextView),
        selection: createColumnSelection(target.insertStartColumn, nextView.rowCount, target.insertStartColumn + target.count - 1),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Inserted \${target.count} column\${target.count === 1 ? "" : "s"} \${placement} column \${formatColumnName(target.anchorColumn)}.\`,
      },
    );
  }

  function handleInsertCells(direction) {
    if (shouldDisableInsertCells()) return;
    commitEditing("stay");
    const beforeSnapshot = captureSnapshot();
    const bounds = getSelectionBounds(state.selection);
    const nextTable = insertCells(state.table, bounds, direction);
    clearCopiedSelection();
    applySnapshot(
      {
        table: nextTable,
        activeCell: { row: bounds.startRow, col: bounds.startCol },
        selection: createRangeSelection(
          { row: bounds.startRow, col: bounds.startCol },
          { row: bounds.endRow, col: bounds.endCol },
        ),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Inserted \${getSelectionRowCount()}x\${getSelectionColumnCount()} blank area and shifted cells \${direction}.\`,
      },
    );
  }

  function handleDeleteRows() {
    if (isWholeSheetSelection()) return;
    commitEditing("stay");
    const target = resolveRowDeleteTarget();
    const beforeSnapshot = captureSnapshot();
    const nextTable = deleteRows(state.table, target.startRow, target.count);
    const nextView = buildSheetGridView(nextTable);
    const nextActiveRow = Math.min(target.startRow, nextView.rowCount);
    const nextSelectionEndRow = Math.min(nextView.rowCount, nextActiveRow + target.count - 1);
    clearCopiedSelection();
    applySnapshot(
      {
        table: nextTable,
        activeCell: clampActiveCell({ row: nextActiveRow, col: state.activeCell.col }, nextView),
        selection: createRowSelection(nextActiveRow, nextView.columnCount, nextSelectionEndRow),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Deleted \${target.count} row\${target.count === 1 ? "" : "s"} starting at row \${target.startRow}.\`,
      },
    );
  }

  function handleDeleteColumns() {
    if (isWholeSheetSelection()) return;
    commitEditing("stay");
    const target = resolveColumnDeleteTarget();
    const beforeSnapshot = captureSnapshot();
    const nextTable = deleteColumns(state.table, target.startColumn, target.count);
    const nextView = buildSheetGridView(nextTable);
    const nextActiveColumn = Math.min(target.startColumn, nextView.columnCount);
    const nextSelectionEndColumn = Math.min(nextView.columnCount, nextActiveColumn + target.count - 1);
    clearCopiedSelection();
    applySnapshot(
      {
        table: nextTable,
        activeCell: clampActiveCell({ row: state.activeCell.row, col: nextActiveColumn }, nextView),
        selection: createColumnSelection(nextActiveColumn, nextView.rowCount, nextSelectionEndColumn),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Deleted \${target.count} column\${target.count === 1 ? "" : "s"} starting at column \${formatColumnName(target.startColumn)}.\`,
      },
    );
  }

  function openHeaderMenu(columnIndex, button) {
    const existing = state.columnFilters[columnKeyForIndex(columnIndex)];
    const rect = button.getBoundingClientRect();
    state.headerMenu = {
      columnIndex,
      operator: existing?.operator || "contains",
      value: existing?.value || "",
      left: Math.max(8, rect.left - 8),
      top: rect.bottom + 8,
      error: "",
    };
    renderFloatingLayer();
  }

  function handleQuickSort(columnIndex, direction) {
    if (!columnIndex) return;
    commitEditing("stay");
    const beforeSnapshot = captureSnapshot();
    const nextTable = sortTableRows(state.table, [{ columnKey: columnKeyForIndex(columnIndex), direction }]);
    state.headerMenu = null;
    applySnapshot(
      {
        table: nextTable,
        activeCell: state.activeCell,
        selection: state.selection,
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: buildVisibleRowStatus(\`Sorted \${state.table.columns?.[columnIndex - 1]?.label || gridCellName(getHeaderRowIndex(state.table), columnIndex)} \${direction === "asc" ? "A → Z" : "Z → A"}.\`),
      },
    );
  }

  function handleApplyHeaderFilter() {
    if (!state.headerMenu) return;
    const operator = state.headerMenu.operator;
    const value = state.headerMenu.value;
    if ((operator === "contains" || operator === "equals") && value === "") {
      state.headerMenu.error = "Enter a filter value or use Is Empty / Is Not Empty.";
      renderFloatingLayer();
      return;
    }
    state.columnFilters = {
      ...state.columnFilters,
      [columnKeyForIndex(state.headerMenu.columnIndex)]: {
        operator,
        value,
      },
    };
    state.headerMenu = null;
    renderWorkspace();
    setStatus(buildVisibleRowStatus("Applied the column filter."));
  }

  function handleClearHeaderFilter() {
    if (!state.headerMenu) return;
    const nextFilters = { ...state.columnFilters };
    delete nextFilters[columnKeyForIndex(state.headerMenu.columnIndex)];
    state.columnFilters = nextFilters;
    state.headerMenu = null;
    renderWorkspace();
    setStatus(buildVisibleRowStatus("Cleared the column filter."));
  }

  function handleClearFilters() {
    state.columnFilters = {};
    state.advancedFilter = { enabled: false, conditions: [], logic: "" };
    state.headerMenu = null;
    renderWorkspace();
    setStatus(buildVisibleRowStatus("Cleared column and advanced filters."));
  }

  function runFindNext() {
    commitEditing("stay");
    if (!state.findReplace.findText) {
      state.panelError = "Enter text to find.";
      renderFloatingLayer();
      return;
    }
    const startCell = state.findReplace.currentMatch || state.activeCell;
    const includeCurrent = !state.findReplace.currentMatch;
    const match = findNextMatch(state.table, state.selection, startCell, {
      ...state.findReplace,
      includeCurrent,
    });
    if (!match) {
      state.findReplace.currentMatch = null;
      state.panelError = "No more matches were found in the current scope.";
      renderFloatingLayer();
      setStatus("No matches were found.");
      return;
    }
    state.findReplace.currentMatch = { row: match.row, col: match.col };
    state.panelError = "";
    state.activeCell = { row: match.row, col: match.col };
    state.selection = createCellSelection(state.activeCell);
    state.pendingScrollCell = state.activeCell;
    renderWorkspace();
    setStatus(\`Found a match at \${gridCellName(match.row, match.col)}.\`);
  }

  function runReplaceOne() {
    commitEditing("stay");
    if (!state.findReplace.findText) {
      state.panelError = "Enter text to find before replacing.";
      renderFloatingLayer();
      return;
    }
    const match = resolveReplaceTarget();
    if (!match) {
      state.panelError = "No match is available to replace.";
      renderFloatingLayer();
      setStatus("No match is available to replace.");
      return;
    }
    const beforeSnapshot = captureSnapshot();
    const currentValue = getCellValue(state.table, match.row, match.col);
    const nextValue = buildSingleReplacement(currentValue);
    const nextTable = setCellValue(state.table, match.row, match.col, nextValue);
    applySnapshot(
      {
        table: nextTable,
        activeCell: { row: match.row, col: match.col },
        selection: createCellSelection({ row: match.row, col: match.col }),
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Replaced the match at \${gridCellName(match.row, match.col)}.\`,
      },
    );
    const nextMatch = findNextMatch(state.table, state.selection, match, {
      ...state.findReplace,
      includeCurrent: false,
    });
    if (nextMatch) {
      state.findReplace.currentMatch = { row: nextMatch.row, col: nextMatch.col };
      state.activeCell = { row: nextMatch.row, col: nextMatch.col };
      state.selection = createCellSelection(state.activeCell);
      state.pendingScrollCell = state.activeCell;
      renderWorkspace();
    }
    state.panelError = "";
    renderFloatingLayer();
  }

  function runReplaceAll() {
    commitEditing("stay");
    if (!state.findReplace.findText) {
      state.panelError = "Enter text to find before replacing.";
      renderFloatingLayer();
      return;
    }
    const beforeSnapshot = captureSnapshot();
    const result = replaceAllMatches(state.table, state.selection, state.findReplace);
    if (!result.count) {
      state.panelError = "No matches were found in the current scope.";
      renderFloatingLayer();
      setStatus("No matches were found.");
      return;
    }
    applySnapshot(
      {
        table: result.table,
        activeCell: state.activeCell,
        selection: state.selection,
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, result.table),
        statusMessage: \`Replaced \${result.count} matches in the current scope.\`,
      },
    );
    state.panelError = "";
    renderFloatingLayer();
  }

  function resolveReplaceTarget() {
    const currentMatch = state.findReplace.currentMatch;
    if (currentMatch && currentCellMatchesFind(currentMatch.row, currentMatch.col)) {
      return currentMatch;
    }
    return findNextMatch(state.table, state.selection, state.activeCell, {
      ...state.findReplace,
      includeCurrent: true,
    });
  }

  function currentCellMatchesFind(row, col) {
    const value = getCellValue(state.table, row, col);
    return state.findReplace.wholeCell
      ? compareMaybeCaseSensitive(value, state.findReplace.findText, state.findReplace.caseSensitive)
      : includesMaybeCaseSensitive(value, state.findReplace.findText, state.findReplace.caseSensitive);
  }

  function buildSingleReplacement(currentValue) {
    const text = String(currentValue ?? "");
    const findText = state.findReplace.findText;
    const replaceText = state.findReplace.replaceText;
    if (state.findReplace.wholeCell) {
      return replaceText;
    }
    if (state.findReplace.caseSensitive) {
      return text.replace(findText, replaceText);
    }
    const index = text.toLocaleLowerCase().indexOf(findText.toLocaleLowerCase());
    if (index < 0) return text;
    return \`\${text.slice(0, index)}\${replaceText}\${text.slice(index + findText.length)}\`;
  }

  function handleAddAdvancedCondition() {
    if (!state.advancedFilterDraft) return;
    if (state.advancedFilterDraft.conditions.length >= 20) return;
    state.advancedFilterDraft.conditions.push(createAdvancedCondition());
    if (!state.advancedFilterDraft.logic || state.advancedFilterDraft.logic === buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length - 1)) {
      state.advancedFilterDraft.logic = buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length);
    }
    state.panelError = "";
    renderFloatingLayer();
  }

  function handleRemoveAdvancedCondition(index) {
    if (!state.advancedFilterDraft) return;
    if (state.advancedFilterDraft.conditions.length <= 1) return;
    state.advancedFilterDraft.conditions.splice(index, 1);
    state.advancedFilterDraft.logic = buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length);
    state.panelError = "";
    renderFloatingLayer();
  }

  function handleResetAdvancedLogic() {
    if (!state.advancedFilterDraft) return;
    state.advancedFilterDraft.logic = buildDefaultAdvancedFilterLogic(state.advancedFilterDraft.conditions.length);
    state.panelError = "";
    renderFloatingLayer();
  }

  function handleApplyAdvancedFilter() {
    if (!state.advancedFilterDraft) return;
    const result = validateAdvancedFilterDefinition(state.advancedFilterDraft);
    if (!result.ok) {
      state.panelError = result.errors.join(" ");
      renderFloatingLayer();
      return;
    }
    state.advancedFilter = {
      enabled: result.conditions.length > 0,
      conditions: result.conditions,
      logic: result.logic,
    };
    state.panelError = "";
    state.openPanel = null;
    renderWorkspace();
    setStatus(buildVisibleRowStatus("Applied the advanced filter."));
  }

  function handleApplySort() {
    if (!state.sortDraft?.primaryColumn) {
      state.panelError = "Choose a primary sort column.";
      renderFloatingLayer();
      return;
    }
    const rules = [
      { columnKey: state.sortDraft.primaryColumn, direction: state.sortDraft.primaryDirection },
    ];
    if (state.sortDraft.secondaryColumn) {
      rules.push({ columnKey: state.sortDraft.secondaryColumn, direction: state.sortDraft.secondaryDirection });
    }
    const beforeSnapshot = captureSnapshot();
    const nextTable = sortTableRows(state.table, rules);
    state.openPanel = null;
    state.panelError = "";
    applySnapshot(
      {
        table: nextTable,
        activeCell: state.activeCell,
        selection: state.selection,
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: buildVisibleRowStatus("Applied the sort order."),
      },
    );
  }

  function handleApplyPageSetup(printAfter) {
    const validationError = validatePageSetupDraft(state.pageSetupDraft);
    if (validationError) {
      state.panelError = validationError;
      renderFloatingLayer();
      return;
    }
    const beforeSnapshot = captureSnapshot();
    const nextTable = applyPageSetup(state.table, state.pageSetupDraft);
    const changed = hasTableChanged(beforeSnapshot.table, nextTable);
    state.openPanel = null;
    state.panelError = "";
    applySnapshot(
      {
        table: nextTable,
        activeCell: state.activeCell,
        selection: state.selection,
      },
      {
        beforeSnapshot,
        recordHistory: changed,
        statusMessage: "Applied page setup settings.",
      },
    );
    if (printAfter) {
      window.print();
      setStatus("Applied page setup and opened the browser print dialog.");
    }
  }

  function handleApplyGridLimits() {
    const validationError = validateGridLimitsDraft(state.gridLimitsDraft);
    if (validationError) {
      state.panelError = validationError;
      renderFloatingLayer();
      return;
    }
    const nextLimits = {
      maxRows: Number(state.gridLimitsDraft.maxRows),
      maxColumns: Number(state.gridLimitsDraft.maxColumns),
    };
    const beforeSnapshot = captureSnapshot();
    const nextTable = setGridLimits(state.table, nextLimits);
    state.gridLimitsDraft = null;
    state.openPanel = null;
    state.panelError = "";
    clearCopiedSelection();
    applySnapshot(
      {
        table: nextTable,
        activeCell: clampActiveCell(state.activeCell, buildSheetGridView(nextTable)),
        selection: state.selection,
      },
      {
        beforeSnapshot,
        recordHistory: hasTableChanged(beforeSnapshot.table, nextTable),
        statusMessage: \`Updated the editable grid to \${nextLimits.maxRows} rows x \${nextLimits.maxColumns} columns.\`,
      },
    );
  }

  function createAdvancedCondition() {
    return {
      columnKey: state.table.columns?.[0]?.key || columnKeyForIndex(1),
      operator: "contains",
      value: "",
    };
  }

  function createAdvancedFilterDraft() {
    const sourceConditions = state.advancedFilter.conditions.length
      ? cloneJsonValue(state.advancedFilter.conditions)
      : [createAdvancedCondition()];
    return {
      conditions: sourceConditions,
      logic: state.advancedFilter.logic || buildDefaultAdvancedFilterLogic(sourceConditions.length),
    };
  }

  function createSortDraft() {
    return {
      primaryColumn: state.table.columns?.[0]?.key || "",
      primaryDirection: "asc",
      secondaryColumn: "",
      secondaryDirection: "asc",
    };
  }

  function createPageSetupDraft(pageSetup) {
    const source = pageSetup || {};
    return {
      margins: {
        top: source.margins?.top ?? 12,
        right: source.margins?.right ?? 12,
        bottom: source.margins?.bottom ?? 12,
        left: source.margins?.left ?? 12,
      },
      paperSize: source.paperSize || "A4",
      orientation: source.orientation || "portrait",
      printArea: {
        mode: source.printArea?.mode || "entire-sheet",
        range: source.printArea?.range || "",
      },
      headerFooter: {
        header: source.headerFooter?.header || "",
        footer: source.headerFooter?.footer || "",
      },
      background: source.background
        ? {
          mode: source.background.mode || "solid-color",
          color: source.background.color || "#ffffff",
        }
        : null,
    };
  }

  function createGridLimitsDraft() {
    const limits = getGridLimits(state.table);
    return {
      maxRows: String(Math.max(currentView.rowCount, limits.maxRows)),
      maxColumns: String(Math.max(currentView.columnCount, limits.maxColumns)),
    };
  }

  function validatePageSetupDraft(draft) {
    if (draft.printArea.mode === "custom" && !parseCellRange(draft.printArea.range)) {
      return "Enter a valid custom range such as A1:D20.";
    }
    return "";
  }

  function validateGridLimitsDraft(draft) {
    const maxRows = parseStrictPositiveInteger(draft?.maxRows);
    if (!maxRows.ok) {
      return "Maximum Rows must be an integer greater than or equal to 1.";
    }
    const maxColumns = parseStrictPositiveInteger(draft?.maxColumns);
    if (!maxColumns.ok) {
      return "Maximum Columns must be an integer greater than or equal to 1.";
    }
    const headerRowIndex = getHeaderRowIndex(state.table);
    if (maxRows.value < headerRowIndex) {
      return \`Maximum Rows cannot be smaller than the current formal header row \${headerRowIndex}.\`;
    }
    const lastUsedRow = getLastUsedRowIndex(state.table);
    if (maxRows.value < lastUsedRow) {
      return \`Maximum Rows cannot be smaller than the last used row \${lastUsedRow}.\`;
    }
    const lastUsedColumn = getLastUsedColumnIndex(state.table);
    if (maxColumns.value < lastUsedColumn) {
      return \`Maximum Columns cannot be smaller than the last used column \${formatGridLimitColumnFeedback(lastUsedColumn)}.\`;
    }
    return "";
  }

  function formatScopeLabel() {
    const scope = getSelectionBounds(state.selection);
    const cellCount = (scope.endRow - scope.startRow + 1) * (scope.endCol - scope.startCol + 1);
    if (cellCount <= 1) {
      return "Whole sheet";
    }
    return \`\${gridCellName(scope.startRow, scope.startCol)}:\${gridCellName(scope.endRow, scope.endCol)}\`;
  }

  function renderColumnOptions() {
    if (!state.table.columns.length) {
      return \`<option value="c1">Column A</option>\`;
    }
    return state.table.columns
      .map((column, index) => \`<option value="\${escapeAttr(column.key)}">\${escapeHtml(column.label || columnLabelFromIndex(index + 1))}</option>\`)
      .join("");
  }

  function renderOperatorOptions(selected) {
    const options = [
      { value: "contains", label: "contains" },
      { value: "equals", label: "equals" },
      { value: "is-empty", label: "is empty" },
      { value: "is-not-empty", label: "is not empty" },
    ];
    return options
      .map((option) => \`<option value="\${option.value}"\${option.value === selected ? " selected" : ""}>\${escapeHtml(option.label)}</option>\`)
      .join("");
  }

  function renderFixedOptions(options, selected) {
    return options
      .map((option) => \`<option value="\${escapeAttr(option)}"\${option === selected ? " selected" : ""}>\${escapeHtml(option)}</option>\`)
      .join("");
  }

  function parseStrictPositiveInteger(value) {
    const text = String(value ?? "").trim();
    if (!/^[1-9]\\d*$/.test(text)) {
      return { ok: false, value: 0 };
    }
    return {
      ok: true,
      value: Number(text),
    };
  }

  function formatGridLimitColumnFeedback(value) {
    const parsed = parseStrictPositiveInteger(value);
    if (!parsed.ok) return "Enter a column count of 1 or greater.";
    return \`\${parsed.value} = \${formatColumnName(parsed.value)}\`;
  }

  function formatColumnName(columnIndex) {
    return gridCellName(1, columnIndex).replace(/\\d+$/, "");
  }

  function clampNumber(value, minimum, maximum) {
    return Math.min(Math.max(Number(value) || minimum, minimum), maximum);
  }

  function cellFromDataset(element) {
    return {
      row: Number(element.dataset.row || 1),
      col: Number(element.dataset.col || 1),
    };
  }

  function sameCell(left, right) {
    return left?.row === right?.row && left?.col === right?.col;
  }

  function compareMaybeCaseSensitive(left, right, caseSensitive) {
    return caseSensitive
      ? String(left ?? "") === String(right ?? "")
      : String(left ?? "").toLocaleLowerCase() === String(right ?? "").toLocaleLowerCase();
  }

  function includesMaybeCaseSensitive(left, right, caseSensitive) {
    return caseSensitive
      ? String(left ?? "").includes(String(right ?? ""))
      : String(left ?? "").toLocaleLowerCase().includes(String(right ?? "").toLocaleLowerCase());
  }

  function isEditingTarget(target) {
    return Boolean(target?.closest?.("#activeCellEditor, #formulaBarInput, #globalSearchInput, #floatingLayer input, #floatingLayer textarea, #floatingLayer select"));
  }

  function normalizeDownloadName(value) {
    const text = String(value || "workbook.cws.html").trim() || "workbook.cws.html";
    return /\\.html?$/i.test(text) ? text : \`\${text}.html\`;
  }

  function buildTextExportFileName(sourceName, target) {
    const normalizedTarget = normalizeTextExportTarget(target);
    const rawName = String(sourceName || "workbook").trim() || "workbook";
    const withoutCwsSuffix = rawName.replace(/\\.cws\\.html?$/i, "");
    const withoutGenericSuffix = withoutCwsSuffix.replace(/\\.(html|htm|csv|tsv|txt)$/i, "");
    const baseName = withoutGenericSuffix || "workbook";
    return \`\${baseName}.\${normalizedTarget}\`;
  }

  function getTextExportFilePickerTypes(target) {
    const normalizedTarget = normalizeTextExportTarget(target);
    const extensions = normalizedTarget === "csv"
      ? [".csv"]
      : normalizedTarget === "tsv"
        ? [".tsv"]
        : [".txt"];
    return [
      {
        description: \`\${normalizedTarget.toUpperCase()} text\`,
        accept: {
          "text/plain": extensions,
        },
      },
    ];
  }

  function getTextExportMimeType(target, encoding) {
    const normalizedTarget = normalizeTextExportTarget(target);
    const normalizedEncoding = normalizeTextExportEncoding(encoding);
    const baseType = normalizedTarget === "csv" ? "text/csv" : "text/plain";
    return \`\${baseType};charset=\${normalizedEncoding.toLowerCase()}\`;
  }

  function cloneJsonValue(value) {
    return value ? JSON.parse(JSON.stringify(value)) : value;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\\"": "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/\`/g, "&#96;");
  }

  function debugGridLog(label, payload) {
    if (!debugGridEvents) return;
    document.documentElement.dataset.cwsGridDebug = \`\${label} \${JSON.stringify(payload)}\`;
    console.log(\`[cws-grid] \${label}\`, payload);
  }

  function describeEventTarget(target) {
    if (!(target instanceof Element)) {
      return { kind: typeof target };
    }
    const cell = target.closest("[data-cell='true']");
    const rowHeader = target.closest("[data-row-header='true']");
    const columnHeader = target.closest("[data-col-header='true']");
    return {
      tag: target.tagName,
      cell: cell ? { row: cell.dataset.row || "", col: cell.dataset.col || "" } : null,
      rowHeader: rowHeader ? { row: rowHeader.dataset.row || "" } : null,
      columnHeader: columnHeader ? { col: columnHeader.dataset.col || "" } : null,
    };
  }

}

standaloneBootstrap();`;
