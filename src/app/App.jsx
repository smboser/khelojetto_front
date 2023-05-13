import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { UserProvider } from './contexts/UserContext';
import { SettingsProvider } from './contexts/SettingsContext';
import routes from './routes';
import '../fake-db';

const App = () => {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <AuthProvider>
        <UserProvider>
          <MatxTheme>
            <CssBaseline />
            {content}
          </MatxTheme>
        </UserProvider>
      </AuthProvider>
    </SettingsProvider>
  );
};

export default App;
