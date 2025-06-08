import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({ children }) {
  const location = useLocation()
  // TODO: Replace with actual auth check
  const isAuthenticated = false

  if (!isAuthenticated) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute 