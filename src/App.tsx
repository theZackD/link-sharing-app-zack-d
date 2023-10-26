import { AuthProvider } from './AuthContext'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import { Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'

function App() {
 
  return (
    <AuthProvider>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />}/>
    </Routes>
    </AuthProvider>
    )
}

export default App
