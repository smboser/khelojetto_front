import { Box, styled } from '@mui/material';
import { Breadcrumb } from 'app/components';
import Stockez from './Stockez';
import StockezAdd from './StockezAdd';
import { UserProvider } from 'app/contexts/UserContext';
import StockezEdit from './StockezEdit';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppStockez = (props) => {
  console.log(props.action);
  const displayApp = () => {
    if (props?.action && props.action === 'add') {
      return <StockezAdd />;
    } else if (props?.action && props.action === 'edit') {
      return <StockezEdit />;
    } else return <Stockez />;
  };
  return (
    <Container>
      <UserProvider>{displayApp()}</UserProvider>
    </Container>
  );
};

export default AppStockez;
