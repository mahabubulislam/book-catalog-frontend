import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useToken from '../hooks/useToken';

const Protected = ({ children }: PropsWithChildren) => {
  const token = useToken();
  const location = useLocation();
  if (!token) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }
  return children;
};

export default Protected;
