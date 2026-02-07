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
  // Login user
  login: (email: string, password: string): boolean => {
    // Demo credentials - dalam production, gunakan API call ke backend
    if (email === 'admin@unipas.ac.id' && password === 'admin123') {
      const user: User = {
        id: '1',
        email: email,
        name: 'Administrator',
        role: 'admin'
      }
      
      const authData = { user, isAuthenticated: true }
      
      // Save to localStorage
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
      
      // Save to cookies untuk middleware
      document.cookie = `up_admin_auth=${JSON.stringify(authData)}; path=/; max-age=86400`
      
      return true
    }
    
    return false
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem(AUTH_KEY)
    // Clear cookies
    document.cookie = 'up_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
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
