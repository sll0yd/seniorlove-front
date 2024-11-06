import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    // Affiche un message temporaire si l'utilisateur n'est pas connecté
    if (!user) {
      console.log('Utilisateur non connecté, affichage du message.');
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer); // Nettoie le timer au démontage
    }
  }, [user]);

  if (!user) {
    return (
      <>
        {showMessage && (
          <div style={{ color: 'red' }}>
            Vous devez être connecté pour accéder à cette page.
          </div>
        )}
        <Navigate to="/" state={{ from: location }} />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
