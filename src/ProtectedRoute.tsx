import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: any;
};

const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
