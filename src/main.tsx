import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { TagProvider } from './components/TagContext.tsx';
import { RouterProvider } from 'react-router-dom';
import router from './router.tsx';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TagProvider>
      <RouterProvider router={router} />
    </TagProvider>
  </StrictMode>,
);
