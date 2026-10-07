'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, User, AuthState } from '@/lib/auth'

interface AuthContextType extends AuthState {
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    fetch('/api/auth/session', { cache: 'no-store', signal: controller.signal })
      .then(async response => response.ok ? (await response.json()).user : null)
      .then(user => { if (active) setAuthState({ user, isAuthenticated: !!user }) })
      .catch(() => { if (active) setAuthState({ user: null, isAuthenticated: false }) })
      .finally(() => { clearTimeout(timeout); if (active) setIsLoading(false) })
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [])

  const login = async (email: string, password: string) => {
    const success = await authService.login(email, password)
    if (success) {
      const newState = authService.getAuthState()
      setAuthState(newState)
    }
    return success
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      setAuthState({ user: null, isAuthenticated: false })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isLoading,
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
