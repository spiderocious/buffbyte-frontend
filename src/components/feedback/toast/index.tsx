import { Toaster } from 'react-hot-toast'

export const ToastProvider = () => {
  return (
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            fontSize: '14px',
            padding: '12px 16px',
          },
          success: {
            style: {
              border: '1px solid #22c55e',
              background: '#f0fdf4',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
              background: '#fef2f2',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
          loading: {
            style: {
              border: '1px solid #0284c7',
              background: '#f0f9ff',
            },
            iconTheme: {
              primary: '#0284c7',
              secondary: '#ffffff',
            },
          },
        }}
      />
  )
}

export default ToastProvider;
