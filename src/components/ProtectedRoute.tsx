import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { RootState } from '../store/rootReducer';

interface ProtectedRouteProps {
  allowRoles?: Array<'fan' | 'creator'>;
  redirectTo?: string;
}

export default function ProtectedRoute({ allowRoles, redirectTo = '/auth' }: ProtectedRouteProps) {
  const location = useLocation();
  
  const { isSignedIn, sessionData } = useSelector((s: RootState) => s.auth);
  // const userType = useSelector((state: RootState) => state.userType.userType);
// console.log("userType>>>", sessionData)
  let role = sessionData?.user_type

  if (!isSignedIn) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowRoles && role && !allowRoles.includes(role as 'fan' | 'creator')) {
    return <Navigate to={role === 'creator' ? '/creator' : '/fan'} replace />;
  }
  return <Outlet />;
}
