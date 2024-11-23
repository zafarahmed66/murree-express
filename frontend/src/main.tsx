import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth-context.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
    <Toaster richColors />
  </AuthProvider>
)
