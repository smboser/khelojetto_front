import { styled } from '@mui/material';
import Player from './Player';
import PlayerAdd from './PlayerAdd';
import { UserProvider } from 'app/contexts/UserContext';
import PlayerEdit from './PlayerEdit';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppPlayer = (props) => {
  const displayApp = () => {
    if (props?.action && props.action === 'add') {
      return <PlayerAdd />;
    } else if (props?.action && props.action === 'edit') {
      return <PlayerEdit />;
    } else return <Player />;
  };
  return (
    <Container>
      <UserProvider>{displayApp()}</UserProvider>
    </Container>
  );
};

export default AppPlayer;
