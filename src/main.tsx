import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './index.css';
import { QueryProvider } from './utils/queries/QueryProvider.tsx';
import { store } from './utils/store/index.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
      <Provider store={store}>
        <StrictMode>
          <App />
        </StrictMode>
      </Provider>
    </QueryProvider>
  </BrowserRouter>
);
