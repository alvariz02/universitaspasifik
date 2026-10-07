export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const AUTH_KEY = 'up_admin_auth'

export const authService = {
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Login gagal. Silakan coba lagi.')
      }

      const { user } = await response.json() as { user: User }
      localStorage.setItem(AUTH_KEY, JSON.stringify({ user, isAuthenticated: true }))
      return true
    } catch (error) {
      throw error instanceof Error ? error : new Error('Tidak dapat menghubungi server. Silakan coba lagi.')
    }
  },

  logout: async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      localStorage.removeItem(AUTH_KEY)
    }
  },

  // Get current auth state
  getAuthState: (): AuthState => {
    if (typeof window === 'undefined') {
      return { user: null, isAuthenticated: false }
    }
    try {
      const stored = localStorage.getItem(AUTH_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        return {
          user: data.user,
          isAuthenticated: data.isAuthenticated
        }
      }
    } catch (error) {
      console.error('Error parsing auth data:', error)
    }
    return { user: null, isAuthenticated: false }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const state = authService.getAuthState()
    return state.isAuthenticated
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const state = authService.getAuthState()
    return state.user
  }
}
