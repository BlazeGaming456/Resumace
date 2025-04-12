import React from 'react'
import Form from './pages/Form'
import ATSScore from './pages/ATSScore'
import {Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/form' element={<Form />} />
      <Route path='/ats-score' element={<ATSScore />} />
    </Routes>
  )
}

export default App