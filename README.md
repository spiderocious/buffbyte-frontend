# BuffByte - React + TypeScript + Vite

A modern React application built with TypeScript, Vite, and React Router.

## Features

- ⚡ **Vite** - Fast build tool and development server
- 🔷 **TypeScript** - Type safety and better developer experience
- ⚛️ **React 19** - Latest React features
- 🚀 **React Router v6** - Client-side routing
- 📁 **Path Aliases** - Clean imports with `@buffbyte/*` namespace
- 🎨 **ESLint** - Code linting and formatting

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── routes/         # Router configuration
├── services/       # API services
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── config/         # Configuration files
├── constants/      # Application constants
└── assets/         # Static assets
```

## Path Aliases

Use clean imports with the `@buffbyte/*` namespace:

```typescript
import { HomePage } from '@buffbyte/pages';
import { Button } from '@buffbyte/components';
import { API_BASE_URL } from '@buffbyte/constants';
```

See [ALIASES.md](./ALIASES.md) for complete documentation.

## Routing

The application uses React Router v6 for navigation. Routes are defined in `src/routes/routes.ts`.

Available routes:
- `/` - Home page
- `/about` - About page

See [ROUTER.md](./ROUTER.md) for complete routing documentation.

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
