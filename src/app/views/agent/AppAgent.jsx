import { styled } from '@mui/material';
import Agent from './Agent';
import AgentAdd from './AgentAdd';
import { UserProvider } from 'app/contexts/UserContext';
import AgentEdit from './AgentEdit';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppAgent = (props) => {
  const displayApp = () => {
    if (props?.action && props.action === 'add') {
      return <AgentAdd />;
    } else if (props?.action && props.action === 'edit') {
      return <AgentEdit />;
    } else return <Agent />;
  };
  return (
    <Container>
      <UserProvider>{displayApp()}</UserProvider>
    </Container>
  );
};

export default AppAgent;
