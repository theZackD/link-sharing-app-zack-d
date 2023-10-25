import LogoLarge from './assets/images/logo-devlinks-large.svg'
import './Login.css'
import './components.css'

const Login = () => {
  return (
    <div className='container'>
        <div className='head'>
          <img src={ LogoLarge } alt="" />
        </div>
        <div className="Log-container">
          <div className='title'>
              <h2>Login</h2>
              <p>Add your details below to get back into the app</p>
          </div>
          <form action="#">
              <label htmlFor="Email">Email</label>
              <input type="text" name='Email' placeholder='e.g.: alex@email.com' />
              <label htmlFor="Password">Password</label>
              <input type="text" name='Password' placeholder='Enter your password' />
          </form>
        </div>
    </div>
  )
}

export default Login
