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
        img="/assets/images/v3.png"
        text="Point Trasnfer"
        link="/points/transferBalance"
      ></DashboardItem>
      <DashboardItem
        img="/assets/images/s3.png"
        text="View Players"
        link="/users/player"
      ></DashboardItem>
      <DashboardItem
        img="/assets/images/s2.png"
        text="View Agents"
        link="/users/agent"
      ></DashboardItem>
    </ContentBox>
  );
};

export default DashboardSa;
