import {
  Box,
  Stack,
  Button,
  Grid,
  Icon,
  styled,
  Alert,
  Snackbar,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
// import { LocalizationProvider } from '@mui/lab';

import useSetpower from 'app/hooks/useSetpower';
import { Span } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useParams } from 'react-router-dom';
// import Stockez from './Stockez';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px'
}));

const powers = [
  
  { value: '2', label: '2x' },
  { value: '3', label: '3x' },
  { value: '4', label: '4x' },
  { value: '5', label: '5x' },
  { value: '6', label: '6x' },
  { value: '7', label: '7x' },
  { value: '8', label: '8x' },
  { value: '9', label: '9x' },
  { value: '10', label: '10x' }
];

const SetpowerAdd = () => {
  const [state, setState] = useState({ date: new Date() });
  const [response, setResponse] = useState(false); // For api response
  const {createSetpower,getRandomGame, powerSingle, contextMsg, contextStatus } = useSetpower();
  const [loading, setLoading] = useState(false);
   const [count, setCount] = useState('');
  // Snackbar code
  const [open, setOpen] = useState(false);
  if (contextMsg && open === false && response === false) {
    setResponse(true);
    setOpen(true);
  }
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // Snackbar code

  useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
			//const result = Math.random().toString(36).substring(2,7);
			let result = ' ';
			const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			const charactersLength = characters.length;
            for ( let i = 0; i < 8; i++ ) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
           }
            setCount(result);
        }, 2000);
  
        //Clearing the interval
        return () => clearInterval(interval);
  }, [count]);

  const handleSubmit = (event) => {
    setLoading(true);
    setOpen(false); // Making snackbar off if it is on somehow
    setResponse(false); //
    try {
      // Adding usertype for Stockez
       createSetpower({ ...state }); // 1 ==> User Type Stockez
      setLoading(false);
      //navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  const handleInput = (event) => {
    const inputVal = event.target.value;
    const inputName = event.target.name;
    setState({
      ...state,
      [inputName]: inputVal
    });
  };

  const handleChange = (event) => {
    // event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //const handleDateChange = (date) => setState({ ...state, date });
  const { game_id, power } = state;
  console.log('gghh=', state);

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'setpower', path: '/setpower' }, { name: 'Add setpower' }]}
        />
        {contextMsg && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={contextStatus === 1 ? 'success' : 'error'}
              sx={{ width: '100%' }}
              variant="filled"
            >
              {contextMsg}
            </Alert>
          </Snackbar>
        )}
        <Container>
          <Stack spacing={3}>
            <SimpleCard title="Add a Power">
              <div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        type="text"
                        name="game_id"
                        id="standard-basic"
                        value={count || 0}
                        onChange={handleChange}
                        errorMessages={['this field is required']}
                        label="Game "
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />

                      <InputLabel id="demo-simple-select-label"> Power</InputLabel>

                      <Select
                        id="power"
                        onChange={handleInput}
                        name="power"
                        defaultValue={'Please select'}
                        fullWidth
                        variant="outlined"
                        validators={['required']}
                        errorMessages={['this field is required']}
                      >
                        {powers &&
                          powers.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                      </Select>
                    </Grid>
                  </Grid>

                  <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
                  </Button>
                </ValidatorForm>
              </div>
            </SimpleCard>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
};

export default SetpowerAdd;
