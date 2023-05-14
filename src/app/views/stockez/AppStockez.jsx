import { Box, styled } from '@mui/material';
import { Breadcrumb } from 'app/components';
import Stockez from './Stockez';
import { UserProvider } from 'app/contexts/UserContext';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppStockez = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Stockez', path: '/stockez' }]} />
        <UserProvider>
          <Stockez />
        </UserProvider>
      </Box>
    </Container>
  );
};

export default AppStockez;
