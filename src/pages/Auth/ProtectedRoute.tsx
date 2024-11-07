import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user, setAuthErrorMsg } = useUser();

  useEffect(() => {
    if (!user)
      setAuthErrorMsg('Vous devez vous connecter pour accéder à cette page');
  }, [user, setAuthErrorMsg]);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
