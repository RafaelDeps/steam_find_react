# Research Notes: Pagination Fix & MkDocs Integration

## Technical Decisions & Rationale

### 1. Renaming & Refactoring Pagination State
- **Decision**: Declare the `currentPage` state variable in `useGameSwiper.js` hook, replacing any legacy `page` state references.
- **Rationale**: Direct compliance with the specification to manage query index offsets via a state variable named `currentPage`.
- **Alternatives considered**: Retaining the legacy `page` naming. Rejected because compliance with user-specified nomenclature is mandatory.

### 2. Reset Filters & Page Reset Trigger
- **Decision**: Introduce a dedicated `resetFilters` function inside the `useGameSwiper.js` hook. This function will explicitly:
  1. Reset `currentPage` state to `1`.
  2. Clear the swiping queue `setQueue([])`.
  3. Reset the filter parameters state to empty values.
- **Rationale**: Guarantees that resetting query filters brings the user back to the beginning of the RAWG game catalog, preventing page offset leakage across filter states.

### 3. MkDocs Static Document Hosting
- **Decision**: Create `mkdocs.yml` in the project root, using a clean theme (like standard `material` or `readthedocs` which are easy to view). Place main summary documents inside `docs/index.md`.
- **Rationale**: Follows standard documentation layouts for frontend projects, separating build-time docs configuration from source code.

### 4. Footer Link Integration
- **Decision**: Modify the layout shell in `App.jsx` to append a responsive grid `<footer>`. Add a styled link button "Documentação" pointing to `./docs/index.html` (the relative target path for static documentation sites).
- **Rationale**: Provides quick, user-friendly access to the developer documentation directory directly from the UI shell.
