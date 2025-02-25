import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // return a loading spinner or null here
    return <LoadingSpinner />;
  }

  if (!user) {
    // Redirect to login page and save the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
