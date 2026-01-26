import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useUser();

  if (authLoading) {
    return null; // or a loading spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
