import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi } from '../services/api'

interface User {
  _id?: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signin: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  signout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const userData = await authApi.getMe()
        setUser(userData)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('accessToken')
    } finally {
      setLoading(false)
    }
  }

  const signin = async (email: string, password: string) => {
    try {
      const response = await authApi.signin(email, password)
      localStorage.setItem('accessToken', response.token)
      const userData = await authApi.getMe()
      setUser(userData)
    } catch (error) {
      console.error('Signin failed:', error)
      throw error
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await authApi.signup(name, email, password)
      localStorage.setItem('accessToken', response.token) 
      const userData = await authApi.getMe()
      setUser(userData)
    } catch (error) {
      console.error('Signup failed:', error)
      throw error
    }
  }

  const signout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      localStorage.removeItem('accessToken')
      setUser(null)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signin,
    signup,
    signout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}