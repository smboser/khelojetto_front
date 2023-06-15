import { authRoles } from './auth/authRoles';

export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard', role: authRoles.all },
  // { label: 'PAGES', type: 'label', role: authRoles.all },
  // {
  //   name: 'Session/Auth',
  //   icon: 'security',
  //   role: authRoles.sa,
  //   children: [
  //     { name: 'Sign in', iconText: 'SI', path: '/session/signin', role: authRoles.sa },
  //     { name: 'Sign up', iconText: 'SU', path: '/session/signup', role: authRoles.sa },
  //     {
  //       name: 'Forgot Password',
  //       iconText: 'FP',
  //       path: '/session/forgot-password',
  //       role: authRoles.sa
  //     },
  //     { name: 'Error', iconText: '404', path: '/session/404', role: authRoles.sa }
  //   ]
  // },
  // { label: 'Components', type: 'label', role: authRoles.sa },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   role: authRoles.sa,
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A', role: authRoles.sa },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B', role: authRoles.sa },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C', role: authRoles.sa },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D', role: authRoles.sa },
  //     {
  //       name: 'Expansion Panel',
  //       path: '/material/expansion-panel',
  //       iconText: 'E',
  //       role: authRoles.sa
  //     },
  //     { name: 'Form', path: '/material/form', iconText: 'F', role: authRoles.sa },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I', role: authRoles.sa },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M', role: authRoles.sa },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P', role: authRoles.sa },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R', role: authRoles.sa },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S', role: authRoles.sa },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S', role: authRoles.sa },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S', role: authRoles.sa },
  //     { name: 'Table', path: '/material/table', iconText: 'T', role: authRoles.sa }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   role: authRoles.sa,
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E', role: authRoles.sa }]
  // },
  // {
  //   name: 'Documentation',
  //   icon: 'launch',
  //   type: 'extLink',
  //   role: authRoles.sa,
  //   path: 'http://demos.ui-lib.com/matx-react-doc/'
  // },
  {
    name: 'Stockez',
    icon: 'people',
    role: authRoles.sa,
    path: '/users/stockez'
  },
  {
    name: 'Agent',
    icon: 'people',
    role: authRoles.saStockez,
    path: '/users/agent'
  },
  {
    name: 'Player',
    icon: 'people',
    role: authRoles.saStockez,
    path: '/users/player'
  },
  {
    name: 'Set Power',
    icon: 'blur_linear',
    role: authRoles.saStockez,
    path: '/setpowers/set-power'
  },

  {
    name: 'Point Transfer',
    icon: 'cached',
    role: authRoles.saStockez,
    path: '/points/transfer-balance'
  }
];
