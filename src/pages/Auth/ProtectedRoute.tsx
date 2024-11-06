// This component will be used to protect routes that require authentication.
// If the user is not authenticated, they will be redirected to the login page.
import { Navigate, useLocation } from 'react-router-dom';

// This hook is a custom hook that we created in the previous step.
import { useUser } from '../../context/UserContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // The location might be useful to redirect the user back to the page they were trying to access before they were redirected to the login page.
  const location = useLocation();
  const { user } = useUser();

  // If the user is not authenticated, they will be redirected to the login page.
  if (!user) {
    return <Navigate to="/events" state={{ from: location }} />;
  }

  // Else, the children will be rendered normally.
  return children;
};

export default ProtectedRoute;
