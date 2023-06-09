import {
  Box,
  Stack,
  Button,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
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
import useUser from 'app/hooks/useUser';
import useTransferbalance from 'app/hooks/useTransferbalance';
import useAuth from 'app/hooks/useAuth';
import { Span } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';

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

const TransferbalanceAdd = () => {
  const [state, setState] = useState({ date: new Date() });
  const [response, setResponse] = useState(false); // For api response
  const { getAllUser,users,getBalance,balances } = useUser();
  const { getTransferbalances,createTransferbalance,contextMsg, contextStatus } = useTransferbalance();
  const [loading, setLoading] = useState(false);
  const [balanceAmount, setbalanceAmount] = useState();
  const { user } = useAuth(); 
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
	   
     getAllUser();
	  console.log("dmty=",users);
    if (users && typeof users === 'object' && Array.isArray(users)) {
     setState({ ...state, ...users });
    }
  }, [!users || (users && !Array.isArray(users))]);

  console.log("fggggggg=",users);
   const handleSubmit = (event) => {
	  
    setLoading(true);
    setOpen(false); // Making snackbar off if it is on somehow
    setResponse(false); //
    try {
		
		console.log("sdfsdfsdfs=",state);
      // Adding usertype for Stockez
      createTransferbalance({ ...state,from_id: user.user_id});   // 1 ==> User Type Stockez
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
	
    const filtered = users.filter(user => {
      return user.user_id === inputVal;
    }); 

    //setState({ ...state, ...filtered });
	
	let balanced=filtered[0].balance;
	
	setbalanceAmount(balanced);

    
	
    
  };
  
  
  
 
  
  const handleChange = (event) => {
    // event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //const handleDateChange = (date) => setState({ ...state, date });
  const { from_id, to_id, amount, transfer_on, last_balance} = state;
  console.log("NewBalamce=",balanceAmount);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'TransferBalance', path: '/points/transferBalance' }, { name: 'Add TransferBalance' }]}
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
            <SimpleCard title="Add a TransferBalance">
              <div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                     
                      <InputLabel id="demo-simple-select-label">
                  {" "}
                  Username
                </InputLabel>
					  
					  <Select
                  id="stokes"
                  onChange={handleInput}
                  name="to_id"
                  defaultValue={"Please select stokes"}
                  fullWidth
                  variant="outlined"
				  validators={['required']}
                  errorMessages={['this field is required']}
                >
				 {users && users.map((item, index) => (
                    <MenuItem key={index} value={item.user_id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
					  
					   <TextField
                        type="text"
                        name="balanceAmount"
                        id="standard-basic"
                        value={balanceAmount || 0}
                        onChange={handleChange}
                        errorMessages={['this field is required']}
                        label="Balance "
                        validators={[]}
                      />

                      <TextField
                        type="text"
                        name="amount"
                        label="Amount to transfer"
                        onChange={handleChange}
                        value={amount || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />

					  
					  
				
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

export default TransferbalanceAdd;
