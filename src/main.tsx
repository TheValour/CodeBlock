import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { APIContextProvider } from './context/api.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </APIContextProvider>
  </StrictMode>,
)
