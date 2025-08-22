import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation()
  const token = localStorage.getItem('accessToken')
  
  return token ? <>{children}</> : <Navigate to="/signin" state={{ from: location }} replace />
}

export default PrivateRoute