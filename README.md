# React + TypeScript + Vite

This template provides a minimal setup t- get React working in Vite with HMR and some ESLint rules.

Currently, official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

1. Dashboard Grid
  - Implement a grid-based layout where widgets can be placed
  - Allow users to drag and drop widgets to rearrange them
   Support widget resizing
2. Widget Management
- Provide an interface to add new widgets to the dashboard
- Allow users remove widgets
- - Weather widget (using a public weather API, bonus if shown in map)
- - Notes widget (with local storage persistence)
- - News feed widget (using a public API)
3. Widget Configuration
- Each widget should have configurable options (e.g. location and unit)
- Configuration should persist between sessions (localStorage)
- Options might include: refresh rate, display preferences, data sources, etc.
4. Data Handling
- Use TanStack Query for all API data fetching
- Implement proper loading, error, and success states
- Set up appropriate caching and refetching strategies
5. User Preferences
- Save dashboard layout and configuration to localStorage
- Implement a way to reset the dashboard to default settings
