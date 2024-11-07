import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './index.css';
import { TagProvider } from './context/TagContext.tsx';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <UserProvider>
      <TagProvider>
        <RouterProvider router={router} />
      </TagProvider>
    </UserProvider>
  </StrictMode>,
);
