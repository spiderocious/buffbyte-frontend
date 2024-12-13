import './App.css'
import { RouterProvider, router } from '@buffbyte/routes';
import ToastProvider from './components/feedback/toast'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastProvider />
    </>
  )
}

export default App
