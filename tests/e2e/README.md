# E2E Tests

Streamlined end-to-end tests for the Roger Twan website using Playwright.

## Test Files

### Core Tests (4 files, 17 tests)

- **`homepage.spec.ts`** (3 tests)
  - Homepage display with title and navigation
  - Footer with current year
  - Logo link functionality

- **`navigation.spec.ts`** (7 tests)
  - Navigation to all pages (About, Projects, Journal, Contact)
  - Navigation menu presence on all pages
  - Footer presence on all pages

- **`accessibility.spec.ts`** (4 tests)
  - Heading hierarchy across all pages
  - External link security attributes
  - Image alt attributes
  - Mobile menu ARIA attributes

- **`responsive.spec.ts`** (3 tests)
  - Mobile display (375x667)
  - Desktop display (1920x1080)
  - Mobile menu functionality

## Running Tests

### Run all e2e tests

```bash
npm run test:e2e
```

### Run specific test file

```bash
npx playwright test homepage.spec.ts
```

### Run in headed mode (see browser)

```bash
npx playwright test --headed
```

### Run in debug mode

```bash
npx playwright test --debug
```

### View test report

```bash
npx playwright show-report
```

## Test Configuration

- **Browser**: Chromium only (for faster execution)
- **Base URL**: `http://localhost:3000`
- **Auto-start**: Dev server starts automatically
- **Parallel**: Tests run in parallel
- **Retries**: 2 retries on CI, 0 locally

## Test Coverage

**Total: 17 tests** covering:

- ✅ Homepage functionality
- ✅ Navigation to all pages
- ✅ Footer and navigation presence
- ✅ Accessibility (ARIA, alt text, heading hierarchy)
- ✅ Responsive design (mobile & desktop)
- ✅ Mobile menu behavior

## Changes from Previous Version

**Reduced from 189 tests to 17 tests** by:

- Consolidating page-specific tests into navigation tests
- Combining accessibility checks into fewer tests
- Reducing browser coverage to Chromium only
- Simplifying responsive tests to mobile/desktop only
- Removing redundant footer tests
