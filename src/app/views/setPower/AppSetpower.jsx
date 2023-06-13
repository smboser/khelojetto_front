import { Box, styled } from '@mui/material';
import { Breadcrumb } from 'app/components';
import SetPower from './Setpower';
import SetpowerAdd from './SetpowerAdd';
import { SetpowerProvider } from 'app/contexts/SetpowerContext';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppSetpower = (props) => {
  const displayApp = () => {
    if (props?.action && props.action === 'add') {
      return <SetpowerAdd />;
     }
    else if (props?.action && props.action === 'edit') {
      return <SetPower />;
    } else return <SetPower />;
	
	
  };
  return (
    <Container>
	
      <SetpowerProvider>{displayApp()}</SetpowerProvider>
	 
    </Container>
  );
};


export default AppSetpower;
