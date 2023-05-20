import { Box, styled } from '@mui/material';
import { Breadcrumb } from 'app/components';
import SetPower from './Setpower';
import { SetpowerProvider } from 'app/contexts/SetpowerContext';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppSetpower = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Setpower', path: '/stockez' }]} />
        <SetpowerProvider>
          <SetPower />
        </SetpowerProvider>
      </Box>
    </Container>
  );
};

export default AppSetpower;
