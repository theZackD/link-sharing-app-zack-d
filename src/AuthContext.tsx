import React, { useContext, useEffect, useState} from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth/cordova'
import { User } from '@firebase/auth/cordova'

const AuthContext = React.createContext<any | undefined>(undefined)

export function useAuth() {
  return useContext(AuthContext)
}

type AuthProviderProps = {children : React.ReactNode}

export function AuthProvider({children} : AuthProviderProps) {
  
  const [currentUser, setCurrentUser] = useState<User | null>()
  const [loading, setLoading] = useState<boolean>(true)

  function signup(email : string, password : string){
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // send verification mail.
      sendEmailVerification(userCredential.user);
      auth.signOut();
      alert("Email sent");
  })
    return 
    
  }

  function login(email : string, password : string){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])


  const value = {
    currentUser,
    signup,
    login,
    logout
  }
  
  return (
    <AuthContext.Provider value = {value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

