# Leave Requests Dashboard

A modern leave request management dashboard built with **Next.js** and **SAPUI5 Web Components** (via `@ui5/webcomponents-react`).

## Features
- Filter, sort, and paginate leave requests
- Approve or reject requests with a single click
- Responsive and accessible UI (a11y)
- Unit tested with **Vitest** and **React Testing Library**
- API mock for demo/testing

## Getting Started

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run all unit tests:
```bash
npm test
```

Or use the interactive UI:
```bash
npm run test:ui
```

- Tests are written with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- UI interaction and accessibility are covered.

## Project Structure
- `src/components/` — Main React components (dashboard, cards, filters, pagination)
- `src/pages/api/hello.ts` — Mock API for leave requests (supports pagination)
- `src/ui5.config.ts` — SAPUI5 Web Components global configuration

## Documentation
- Each main file/component starts with a JSDoc-style header describing its purpose and usage.
- Follow this convention for new files for clarity and maintainability.

## Dependencies
- **Next.js** — React framework for SSR and routing
- **@ui5/webcomponents-react** — SAPUI5 Web Components for React
- **Vitest** — Unit testing
- **@testing-library/react** — UI testing utilities

## Accessibility
- The UI is built with accessibility in mind (roles, aria-labels, keyboard navigation)
- Tests include a11y checks and user interaction

