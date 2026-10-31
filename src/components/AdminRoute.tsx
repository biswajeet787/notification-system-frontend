
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="auth-loading">Checking permissions...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.is_staff) {
    return <Navigate to="/user-dashboard" replace />;
  }

  return <Outlet />;
}
