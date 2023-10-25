import LogoLarge from './assets/images/logo-devlinks-large.svg'
import EmailIcon from './assets/images/icon-email.svg'
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
              <p id='description'>Add your details below to get back into the app</p>
          </div>
          <form action="#">
              <label htmlFor="Email">Email address</label>
              <input type="text" name='Email' placeholder={`e.g.: alex@email.com`} />
              <label htmlFor="Password">Password</label>
              <input type="text" name='Password' placeholder='Enter your password' />
              <button>Login</button>
          </form>
          <p id='createacc'>Don't have an account ? <a href="">Create an account</a></p>
        </div>
    </div>
  )
}

export default Login
