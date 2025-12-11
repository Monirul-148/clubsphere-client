import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import { router } from './routes/router.jsx';

// 🔥 React Query import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';

// Create Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap whole app inside QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
