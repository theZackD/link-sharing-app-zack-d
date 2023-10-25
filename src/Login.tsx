import LogoLarge from './assets/images/logo-devlinks-large.svg'
// import EmailIcon from './assets/images/icon-email.svg'
import { Link } from 'react-router-dom'

import './Login.css'
import './components.css'

const linkStyle = {
  textDecoration: "none",
  color: '#633CFF'
};

const Login : React.FC = () => {
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
              <button type='submit'>Login</button>
          </form>
          <p id='createacc'>Don't have an account ? <Link to='/signup' style={linkStyle}>Create an account</Link></p>
        </div>
    </div>
  )
}

export default Login
