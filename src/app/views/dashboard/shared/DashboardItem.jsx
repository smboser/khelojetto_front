import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const DashboardItem = ({ img, link, text }) => {
  return (
    <Card style={{ margin: 20, minWidth: 150 }}>
      <CardActionArea component={Link} to={link}>
        <CardMedia
          sx={{ height: 100, minWidth: 150, objectFit: 'contain' }}
          component="img"
          image={img}
          title="green iguana"
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h5" component="div">
          {text}
        </Typography> */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {text}
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </CardActionArea>
    </Card>
  );
};

export default DashboardItem;
