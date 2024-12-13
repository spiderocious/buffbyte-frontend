import toast from 'react-hot-toast';

/**
 * Custom toast utilities for BUFLITE
 * Provides branded toast notifications with consistent styling
 */

export const showToast = {
  /**
   * Show a success toast
   */
  success: (message: string) => {
    return toast.success(message, {
      duration: 4000,
      style: {
        border: '1px solid #22c55e',
        background: '#f0fdf4',
        color: '#14532d',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#ffffff',
      },
    });
  },

  /**
   * Show an error toast
   */
  error: (message: string) => {
    return toast.error(message, {
      duration: 5000,
      style: {
        border: '1px solid #ef4444',
        background: '#fef2f2',
        color: '#7f1d1d',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#ffffff',
      },
    });
  },

  /**
   * Show a loading toast that can be updated
   */
  loading: (message: string = 'Loading...') => {
    return toast.loading(message, {
      style: {
        border: '1px solid #0284c7',
        background: '#f0f9ff',
        color: '#0c4a6e',
      },
      iconTheme: {
        primary: '#0284c7',
        secondary: '#ffffff',
      },
    });
  },

  /**
   * Show a promise toast that automatically handles loading, success, and error states
   */
  promise: <T>(
    promise: Promise<T>,
    {
      loading = 'Loading...',
      success = 'Success!',
      error = 'Something went wrong',
    }: {
      loading?: string;
      success?: string | ((data: T) => string);
      error?: string | ((error: unknown) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading,
      success,
      error,
    }, {
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 4000,
        style: {
          border: '1px solid #22c55e',
          background: '#f0fdf4',
          color: '#14532d',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: '#ffffff',
        },
      },
      error: {
        duration: 5000,
        style: {
          border: '1px solid #ef4444',
          background: '#fef2f2',
          color: '#7f1d1d',
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
          color: '#0c4a6e',
        },
        iconTheme: {
          primary: '#0284c7',
          secondary: '#ffffff',
        },
      },
    });
  },

  /**
   * Show a custom toast with your own styling
   */
  custom: (message: string, options?: Record<string, unknown>) => {
    return toast(message, {
      style: {
        background: '#ffffff',
        color: '#111827',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
      ...options,
    });
  },

  /**
   * Dismiss a specific toast by ID
   */
  dismiss: (toastId?: string) => {
    toast.dismiss(toastId);
  },

  /**
   * Dismiss all toasts
   */
  dismissAll: () => {
    toast.dismiss();
  },

  /**
   * Update an existing toast (useful for loading states)
   */
  update: (toastId: string, message: string, type: 'success' | 'error' | 'loading') => {
    switch (type) {
      case 'success':
        return toast.success(message, { id: toastId });
      case 'error':
        return toast.error(message, { id: toastId });
      case 'loading':
        return toast.loading(message, { id: toastId });
      default:
        return toast(message, { id: toastId });
    }
  },
};

/**
 * Specialized toasts for common BUFLITE actions
 */
export const bufliteToasts = {
  /**
   * Content analysis related toasts
   */
  analysis: {
    started: () => showToast.loading('Analyzing your content...'),
    success: (score: number) => showToast.success(`Analysis complete! Score: ${score}%`),
    error: () => showToast.error('Analysis failed. Please try again.'),
  },

  /**
   * Authentication related toasts
   */
  auth: {
    loginSuccess: () => showToast.success('Welcome back to BUFLITE!'),
    loginError: () => showToast.error('Invalid credentials. Please try again.'),
    logoutSuccess: () => showToast.success('You\'ve been logged out successfully'),
    signupSuccess: () => showToast.success('Account created! Welcome to BUFLITE!'),
    signupError: (message?: string) => showToast.error(message || 'Failed to create account'),
  },

  /**
   * Script related toasts
   */
  script: {
    saved: () => showToast.success('Script saved successfully'),
    optimized: () => showToast.success('Script optimized for your platform!'),
    exported: () => showToast.success('Script exported to teleprompter'),
    error: () => showToast.error('Failed to process script'),
  },

  /**
   * Data/API related toasts
   */
  data: {
    saved: () => showToast.success('Changes saved'),
    error: () => showToast.error('Failed to save changes'),
    networkError: () => showToast.error('Network error. Please check your connection.'),
  },
};

// Export the base toast for direct use if needed
export { toast };
