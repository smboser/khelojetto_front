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

const AppAgent = Loadable(lazy(() => import('app/views/agent/AppAgent')));

const AppPlayer = Loadable(lazy(() => import('app/views/player/AppPlayer')));

const AppSetpower = Loadable(lazy(() => import('app/views/setPower/AppSetpower')));
const AppTransferbalance = Loadable(
  lazy(() => import('app/views/transferBalance/AppTransferbalance'))
);

const hocComponent = (WrappedComponent) => {
  return (props) => <WrappedComponent {...props} />;
};

const StockezComponent = hocComponent(AppStockez);
const AgentComponent = hocComponent(AppAgent);
const PlayerComponent = hocComponent(AppPlayer);
const TransferbalanceComponent = hocComponent(AppTransferbalance);
const SetpowerComponent = hocComponent(AppSetpower);

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
        element: <AppEchart auth="abdc" />,
        customA: authRoles.sa
      },

      {
        path: '/users/stockez',
        element: <StockezComponent action="list" />,
        auth: authRoles.sa
      },
      {
        path: '/users/stockez/add',
        element: <StockezComponent action="add" />,
        auth: authRoles.sa
      },
      {
        path: '/users/stockez/edit/:userId',
        element: <StockezComponent action="edit" />,
        auth: authRoles.sa
      },
      {
        path: '/users/agent',
        element: <AgentComponent action="list" />,
        auth: authRoles.saStockez
      },
      {
        path: '/users/agent/add',
        element: <AgentComponent action="add" />,
        auth: authRoles.saStockez
      },
      {
        path: '/users/agent/edit/:userId',
        element: <AgentComponent action="edit" />,
        auth: authRoles.saStockez
      },
      {
        path: '/users/player',
        element: <PlayerComponent action="list" />,
        auth: authRoles.saStockez
      },
      {
        path: '/users/player/add',
        element: <PlayerComponent action="add" />,
        auth: authRoles.saStockez
      },
      {
        path: '/users/player/edit/:userId/:stoId',
        element: <PlayerComponent action="edit" />,
        auth: authRoles.saStockez
      },
      {
        path: '/setpower',
        element: <SetpowerComponent action="list" />,
        auth: authRoles.saStockez
      },
	  {
        path: '/setpower/add',
        element: <SetpowerComponent action="add" />,
        auth: authRoles.sa
      },
      {
        path: '/points/transfer-balance',
        element: <TransferbalanceComponent action="list" />,
        auth: authRoles.sa
      },
	  {
        path: '/points/transfer-balance/add',
        element: <TransferbalanceComponent action="add" />,
        auth: authRoles.sa
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
