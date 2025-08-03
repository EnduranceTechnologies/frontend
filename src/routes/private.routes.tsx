import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateProps {
  children: ReactNode;
}

function Private({ children }: PrivateProps) {
  if (Cookies.get('clinic_token')) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default Private;
