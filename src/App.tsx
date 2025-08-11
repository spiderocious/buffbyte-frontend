import './App.css'
import { RouterProvider, router } from '@buffbyte/routes';
import { ErrorBoundary } from '@buffbyte/components';
import ToastProvider from './components/feedback/toast'

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <ToastProvider />
    </ErrorBoundary>
  )
}

export default App
