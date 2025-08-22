import axios, { AxiosResponse } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000'

const api = axios.create({
  baseURL: API_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to sign in
      localStorage.removeItem('accessToken')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

interface User {
  id: string
  name: string
  email: string
}

interface AuthResponse {
  user: User
  token: string
}

export interface AuthAPI {
  signin: (email: string, password: string) => Promise<AuthResponse>
  signup: (name: string, email: string, password: string) => Promise<AuthResponse>
  logout: () => Promise<void>
  getMe: () => Promise<User>
}

export const authApi: AuthAPI = {
  signin: async (email: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/login', { email, password })
    return response.data
  },

  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response: AxiosResponse<AuthResponse> = await api.post('/auth/signup', { name, email, password })
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  getMe: async (): Promise<User> => {
    const response: AxiosResponse<{ user: User }> = await api.get('/auth/profile')
    return response.data.user
  }
}

export default api