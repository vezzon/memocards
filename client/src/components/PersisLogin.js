import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { isLoggedIn, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    if (!isLoggedIn && persist) {
      verifyRefreshToken();
    }
  }, []);

  return <Outlet />;
};

export default PersistLogin;
