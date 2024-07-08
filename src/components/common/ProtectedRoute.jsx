import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    // Redirect to login page and save the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
