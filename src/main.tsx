import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@shared/lib/query-client';
import { router } from '@app/app.routes.tsx';
import { ModalHost } from '@shared/ui/drawer';
import { ToastHost } from '@shared/ui/drawer';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ModalHost />
      <ToastHost />
    </QueryClientProvider>
  </StrictMode>,
);
