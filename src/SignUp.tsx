import './SignUp.css'
import './components.css'
import LogoLarge from './assets/images/logo-devlinks-large.svg'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='container'>
        <div className='head'>
          <img src={ LogoLarge } alt="" />
        </div>
        <div className="Log-container">
          <div className='title'>
              <h2>Create an account</h2>
              <p id='description'>Let's get you started sharing your links</p>
          </div>
          <form action="#">
                <label htmlFor="Email">Email address</label>
                <input type="text" name='Email' placeholder={`e.g.: alex@email.com`} />
                <label htmlFor="Password">Password</label>
                <input type="text" name='Password' placeholder='At least 8 characters' />
                <label htmlFor="Password">Confirm password</label>
                <input type="text" name='Password' placeholder='At least 8 characters' />
                <p id='charinfo'>Password must contain at least 8 characters</p>
                <button type='submit'>Login</button>
          </form>
          <p id='createacc'>Already have an account ? <Link to='/'>Login</Link></p>
        </div>
    </div>
  )
}

export default SignUp
