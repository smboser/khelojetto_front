import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AuthGuard from './auth/AuthGuard';
import { authRoles } from './auth/authRoles';
import Loadable from './components/Loadable';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';

// session pages
const NotFound = Loadable(lazy(() => import('app/views/sessions/NotFound')));
const JwtLogin = Loadable(lazy(() => import('app/views/sessions/JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('app/views/sessions/JwtRegister')));
const ForgotPassword = Loadable(lazy(() => import('app/views/sessions/ForgotPassword')));

// echart page
const AppEchart = Loadable(lazy(() => import('app/views/charts/echarts/AppEchart')));

// dashboard page
const Analytics = Loadable(lazy(() => import('app/views/dashboard/Analytics')));

// Stockez pages
const AppStockez = Loadable(lazy(() => import('app/views/stockez/AppStockez')));

<<<<<<< HEAD
const AppSetpower = Loadable(lazy(() => import('app/views/setPower/AppSetpower')));
const AppTransferbalance = Loadable(lazy(() => import('app/views/transferBalance/AppTransferbalance')));
=======
const hocComponent = (WrappedComponent) => {
  return (props) => <WrappedComponent {...props} />;
};

const StockezComponent = hocComponent(AppStockez);
>>>>>>> 3d602532b57b2c20dcf30958a93c1eb6c463fb64

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      {
        path: '/dashboard/default',
        element: <Analytics />,
        auth: authRoles.admin
      },

      // e-chart rooute
      {
        path: '/charts/echarts',
        element: <AppEchart />,
        auth: authRoles.editor
      },

      {
        path: '/users/stockez',
        element: <StockezComponent action="list" />,
        auth: authRoles.admin
      },
      {
        path: '/users/stockez/add',
        element: <StockezComponent action="add" />,
        auth: authRoles.admin
      },
      {
        path: '/users/stockez/edit/:userId',
        element: <StockezComponent action="edit" />,
        auth: authRoles.admin
      },
	  
	  {
        path: '/setpowers/setPower',
        element: <AppSetpower />,
        auth: authRoles.admin
      },
	  
	   {
        path: '/points/transferBalance',
        element: <AppTransferbalance />,
        auth: authRoles.admin
      },
    ]
  },

  // session pages route
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },

  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> }
];

export default routes;
