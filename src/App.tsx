import { AuthProvider } from './AuthContext'
import Login from './Login'
import SignUp from './SignUp'
import { Route, Routes } from 'react-router-dom'

function App() {
 
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </AuthProvider>
    )
}

export default App
