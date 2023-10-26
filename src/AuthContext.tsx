import React, { useContext, useEffect, useState} from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth/cordova'
import { User } from '@firebase/auth/cordova'

const AuthContext = React.createContext<any | undefined>(undefined)

export function useAuth() {
  return useContext(AuthContext)
}

type AuthProviderProps = {children : React.ReactNode}

export function AuthProvider({children} : AuthProviderProps) {
  
  const [currentUser, setCurrentUser] = useState<User | null>()

  function signup(email : string, password : string){
    return createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])


  const value = {
    currentUser,
    signup
  }
  
  return (
    <AuthContext.Provider value = {value}>
      {children}
    </AuthContext.Provider>
  )
}

