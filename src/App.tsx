import Login from './Login'
import { Route, Routes } from 'react-router-dom'

function App() {
 
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      
    </Routes>
    )
}

export default App
