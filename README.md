# Leave Requests Dashboard 🗓️

[![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![SAPUI5](https://img.shields.io/badge/SAPUI5-0063B1?style=flat-square&logo=sap)](https://sap.github.io/ui5-webcomponents/)
[![Vitest](https://img.shields.io/badge/Vitest-729B1B?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Testing Library](https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testing-library)](https://testing-library.com/)

A modern leave request management dashboard built with **Next.js** and **SAPUI5 Web Components** (via `@ui5/webcomponents-react`). Streamline your leave request workflow with an intuitive and accessible interface.

## ✨ Features

- 📋 Filter, sort, and paginate leave requests
- ✅ Approve or reject requests with a single click
- 📱 Responsive and accessible UI (a11y)
- 🧪 Unit tested with **Vitest** and **React Testing Library**
- 🔄 API mock for demo/testing

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard in action! 🎉

## 🧪 Testing

Run all unit tests:
```bash
npm test
```

Or use the interactive UI:
```bash
npm run test:ui
```

### Testing Stack
- 🎯 [Vitest](https://vitest.dev/) - Next Generation Testing Framework
- 🔍 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - User-centric Testing Utilities

## 📁 Project Structure

```
src/
├── components/     # Main React components
├── pages/
│   └── api/       # Mock API endpoints
└── ui5.config.ts  # SAPUI5 configuration
```

## 📚 Documentation

Each component and utility is thoroughly documented following JSDoc conventions:

```typescript
/**
 * @component ComponentName
 * @description Brief description
 * @param {PropType} propName - Prop description
 */
```

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [@ui5/webcomponents-react](https://sap.github.io/ui5-webcomponents-react/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

## 🎨 SAPUI5 Components

The dashboard uses the following SAPUI5 Web Components:

- **Layout Components**:
  - `FlexBox` - For responsive layouts and alignment
  - `Card` - For content containers and request cards
  - `Title` - For section headings

- **Interactive Components**:
  - `Button` - For actions (approve/reject)
  - `SegmentedButton` - For status filtering
  - `SegmentedButtonItem` - For individual filter options

- **Utility Components**:
  - `BusyIndicator` - For loading states
  - `Icon` - For visual indicators and actions

- **Configuration**:
  - `ThemeProvider` - For consistent theming
  - `Configuration` - For global UI5 settings

## ♿ Accessibility

Accessibility features:

- 🎯 ARIA labels and roles
- ⌨️ Full keyboard navigation
- 📱 Responsive design
- 🔍 High contrast support
- ✅ Accessibility testing in our test suite

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ using Next.js and SAPUI5 Web Components

