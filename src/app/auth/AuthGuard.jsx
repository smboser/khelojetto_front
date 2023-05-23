import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { navigations } from 'app/navigations';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();

  let hasAccess = false;
  navigations.forEach((nav) => {
    if (nav.children) {
      nav.children.forEach((m) => {
        if (pathname.indexOf(m.path) > -1 && m.role.indexOf(user?.user_type) > -1) {
          hasAccess = true;
        }
      });
    } else {
      if (pathname.indexOf(nav.path) > -1 && nav.role.indexOf(user?.user_type) > -1) {
        hasAccess = true;
      }
    }
  });

  if (isAuthenticated && hasAccess === true) return <>{children}</>;

  return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
};

export default AuthGuard;
