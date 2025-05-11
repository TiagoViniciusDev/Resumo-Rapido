import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { SummaryProvider } from './context/summaryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SummaryProvider>
      <App />
    </SummaryProvider>
  </StrictMode>,
)
