import { styled } from '@mui/material';
import DashboardItem from './shared/DashboardItem';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' }
}));

const DashboardSa = () => {
  return (
    <ContentBox
      className="analytics"
      sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      <DashboardItem
        img="/assets/images/icons/s3.png"
        text="Stockez"
        link="/users/stockez"
      ></DashboardItem>
      <DashboardItem
        img="/assets/images/icons/s2.png"
        text="Agents"
        link="/users/agent"
      ></DashboardItem>
      <DashboardItem
        img="/assets/images/icons/s3.png"
        text="Players"
        link="/users/player"
      ></DashboardItem>
      <DashboardItem
        img="/assets/images/icons/s4.png"
        text="Set Power"
        link="/setpowers/set-power"
      ></DashboardItem>
      <DashboardItem
        img="/assets/images/icons/v3.png"
        text="Point Trasnfer"
        link="/points/transfer-balance"
      ></DashboardItem>
    </ContentBox>
  );
};

export default DashboardSa;
