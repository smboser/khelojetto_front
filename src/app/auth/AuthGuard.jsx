import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { authRoles } from './authRoles';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();

  const roleMatrix = [
    { path: 'dashboard/default', role: authRoles.sa },
    { path: '/users/stockez', role: authRoles.sa },
    { path: '/setpowers/setPower', role: authRoles.sa }
  ];

  let hasAccess = false;
  roleMatrix.forEach((m) => {
    if (pathname.indexOf(m.path) > -1 && m.role.indexOf(user?.user_type) > -1) {
      hasAccess = true;
    }
  });

  if (isAuthenticated && hasAccess === true) return <>{children}</>;

  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
};

export default AuthGuard;
