import { Box, styled } from '@mui/material';
import { Breadcrumb } from 'app/components';
import TransferBalance from './Transferbalance';
import TransferbalanceAdd from './TransferbalanceAdd';
import { TransferbalanceProvider } from 'app/contexts/TransferbalanceContext';
import { UserProvider } from 'app/contexts/UserContext';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppTransferbalance = (props) => {
  const displayApp = () => {
    if (props?.action && props.action === 'add') {
      return <TransferbalanceAdd />;
     }
    else if (props?.action && props.action === 'edit') {
      return <TransferBalance />;
    } else return <TransferBalance />;
	
	
  };
  return (
    <Container>
	 <UserProvider>
      <TransferbalanceProvider>{displayApp()}</TransferbalanceProvider>
	  </UserProvider>
    </Container>
  );
};

export default AppTransferbalance;
