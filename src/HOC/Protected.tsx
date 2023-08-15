import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import useToken from '../hooks/useToken';

const Protected = ({ children }: PropsWithChildren) => {
  const token = useToken();
  if (!token) {
    return <Navigate to={'/login'} />;
  }
  return children;
};

export default Protected;
