import './SignUp.css'
import './components.css'
import LogoLarge from './assets/images/Temp-logo-large.svg'
import { Link } from 'react-router-dom'
import { useRef, useState } from 'react';
import { useAuth } from './AuthContext';


const linkStyle = {
  textDecoration: "none",
  color: '#633CFF'
};

const SignUp = () => {

  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const passConfRef = useRef<HTMLInputElement>(null)
  const { signup } = useAuth()
  const [error, setError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [passError, setPassError] = useState<string>('')
  const [passConfError, setPassConfError] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    if (emailRef.current?.value == ''){
      return setEmailError(`Can't be empty`)
    }

    if (passRef.current?.value.length != undefined && passRef.current?.value.length < 8){
      setEmailError('')
      return setPassError('Please check again')
    }

    if (passRef.current?.value !== passConfRef.current?.value){
      setPassError('')
      setEmailError('')
      return setPassConfError('Passwords do not match')
    }
    



    try{
      setEmailError('')
      setPassError('')
      setError('')
      setPassConfError('')
      setLoading(true)
      await signup(emailRef.current?.value, passRef.current?.value)
    } catch {
      setError('Signup failed')
    }

    setLoading(false)
  }

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
          <form action="#" onSubmit={handleSubmit}>
                <label htmlFor="Email">Email address</label>
                <input className='email' type="text" name='Email' placeholder={`e.g.: alex@email.com`} ref={emailRef} />
                <p className='error'>{emailError}</p>
                <label htmlFor="Password">Password</label>
                <input className='password' type="password" name='Password' placeholder='At least 8 characters' ref={passRef} />
                <p className='error'>{passError}</p>
                <label htmlFor="Password">Confirm password</label>
                <input className='password' type="password" name='Password' placeholder='At least 8 characters' ref={passConfRef} />
                <p className='error'>{passConfError}</p>
                <p  id='charinfo'>Password must contain at least 8 characters</p>
                <p className='error-failed'>{error}</p>
                <button disabled={loading} type='submit'>Sign Up</button>
          </form>
          <p id='createacc'>Already have an account ? <Link to='/' style={linkStyle}>Login</Link></p>
        </div>
    </div>
  )
}

export default SignUp
