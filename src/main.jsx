import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { APIContextProvider } from './context/api.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <APIContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </APIContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
