import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import HomePage from './pages/HomePage'
import SummaryPage from './pages/SummaryPage'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/resumo' element={<SummaryPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
