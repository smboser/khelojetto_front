import { styled } from '@mui/material';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const DashboardStockez = () => {
  return (
    <>
      <ContentBox className="analytics">Stockez</ContentBox>
    </>
  );
};

export default DashboardStockez;
