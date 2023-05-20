import { Box, styled } from '@mui/material';
import { Breadcrumb } from 'app/components';
import TransferBalance from './Transferbalance';
import { TransferbalanceProvider } from 'app/contexts/TransferbalanceContext';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppTransferbalance = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Transferbalance', path: '/transferBalance' }]} />
        <TransferbalanceProvider>
          <TransferBalance />
        </TransferbalanceProvider>
      </Box>
    </Container>
  );
};

export default AppTransferbalance;
