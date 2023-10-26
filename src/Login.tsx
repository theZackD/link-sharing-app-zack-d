import LogoLarge from './assets/images/logo-devlinks-large.svg'
// import EmailIcon from './assets/images/icon-email.svg'
import { Link } from 'react-router-dom'
import React from 'react'

import './Login.css'
import './components.css'
import { useRef } from 'react';

const linkStyle = {
  textDecoration: "none",
  color: '#633CFF'
};

const Login : React.FC = () => {

  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

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
              <input className='email' type="text" name='Email' placeholder={`e.g.: alex@email.com`} ref={emailRef} />
              <label htmlFor="Password">Password</label>
              <input className='password' type="password" name='Password' placeholder={'Enter your password'} ref={passRef} />
              <button type='submit'>Login</button>
          </form>
          <p id='createacc'>Don't have an account ? <Link to='/signup' style={linkStyle}>Create an account</Link></p>
        </div>
    </div>
  )
}

export default Login
