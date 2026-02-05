'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, User, AuthState } from '@/lib/auth'

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  })

  useEffect(() => {
    // Load auth state on mount
    const state = authService.getAuthState()
    // Use setTimeout to avoid synchronous setState in effect
    setTimeout(() => {
      setAuthState(state)
    }, 0)
  }, [])

  const login = (email: string, password: string) => {
    const success = authService.login(email, password)
    if (success) {
      const newState = authService.getAuthState()
      setAuthState(newState)
    }
    return success
  }

  const logout = () => {
    authService.logout()
    setAuthState({ user: null, isAuthenticated: false })
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
