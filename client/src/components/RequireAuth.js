import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { isLoggedIn, persist } = useAuth();
  const location = useLocation();

  return isLoggedIn || persist ? ( // TODO: Adding OR persist is a temp fix
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
