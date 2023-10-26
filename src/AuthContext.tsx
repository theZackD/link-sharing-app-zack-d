import React, { useContext, useEffect, useState} from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth/cordova'
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
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email : string, password : string){
    return signInWithEmailAndPassword(auth, email, password)
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
    login
  }
  
  return (
    <AuthContext.Provider value = {value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

