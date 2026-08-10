import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen message="Authenticating session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'HR') return <Navigate to="/hr/dashboard" replace />;
    return <Navigate to="/employee/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
