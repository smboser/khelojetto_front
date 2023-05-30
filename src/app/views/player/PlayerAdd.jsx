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

const PlayerAdd = () => {
  const [state, setState] = useState({ date: new Date() });
  const [response, setResponse] = useState(false); // For api response
  const { getAgents,getUsers, deleteUser, createUser, users, agents, contextMsg, contextStatus } = useUser();
  const [loading, setLoading] = useState(false);
   const [stokesdetails, setStokesdetails] = useState([]);
  const [agentdetails, setAgentdetails] = useState([]);
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
	  
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
  }, [state.password]);
  
   useEffect(() => {
     getUsers(1);
    if (users && typeof users === 'object' && Array.isArray(users)) {
     setState({ ...state, ...users });
    }
  }, [!users || (users && !Array.isArray(users))]);


   const handleSubmit = (event) => {
    setLoading(true);
    setOpen(false); // Making snackbar off if it is on somehow
    setResponse(false); //
    try {
		
		console.log("sdfsdfsdfs=",state);
      // Adding usertype for Stockez
      createUser({ ...state, usertype: 3}); // 1 ==> User Type Stockez
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
	
	getAgents(inputVal); 
	
    
  };
  
  
  const handleChange = (event) => {
    // event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //const handleDateChange = (date) => setState({ ...state, date });
  const { username, name, mobile, password, confirmPassword, user_status, email,type,sto_id} = state;
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Player', path: '/users/player' }, { name: 'Add Player' }]}
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
            <SimpleCard title="Add a New Player">
              <div>
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        type="text"
                        name="username"
                        id="standard-basic"
                        value={username || ''}
                        onChange={handleChange}
                        errorMessages={['this field is required']}
                        label="Username (Min length 4, Max length 9)"
                        validators={['required', 'minStringLength: 4', 'maxStringLength: 9']}
                      />

                      <TextField
                        type="text"
                        name="name"
                        label="Name"
                        onChange={handleChange}
                        value={name || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />

                      <TextField
                        type="email"
                        name="email"
                        label="Email"
                        value={email || ''}
                        onChange={handleChange}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'email is not valid']}
                      />
					  
					   <InputLabel id="demo-simple-select-label">
                  {" "}
                  Stockes
                </InputLabel>
					  
					  <Select
                  id="stokes"
                  onChange={handleInput}
                  name="sto_id"
                  defaultValue={"Please select stokes"}
                  fullWidth
                  variant="outlined"
                >
				 {users && users.map((item, index) => (
                    <MenuItem key={index} value={item.user_id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
					  
					  <InputLabel id="demo-simple-select-label">
                  {" "}
                  Agent
                </InputLabel>
					  
					  <Select
                  id="agent"
                  onChange={handleChange}
                  name="ag_id"
                  defaultValue={"Please select agents"}
                  fullWidth
                  variant="outlined"
                >
				 {agents && agents.map((item, index) => (
                    <MenuItem key={index} value={item.user_id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>

                      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={date}
                            onChange={handleDateChange}
                            renderInput={(props) => (
                              <TextField
                                {...props}
                                label="Date picker"
                                id="mui-pickers-date"
                                sx={{ mb: 2, width: '100%' }}
                              />
                            )}
                          />
                        </LocalizationProvider> */}

                      {/* <TextField
                        sx={{ mb: 4 }}
                        type="number"
                        name="creditCard"
                        label="Credit Card"
                        onChange={handleChange}
                        value={creditCard || ''}
                        errorMessages={['this field is required']}
                        validators={['required', 'minStringLength:16', 'maxStringLength: 16']}
                      /> */}
					  
					  
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <TextField
                        type="text"
                        name="mobile"
                        value={mobile || ''}
                        label="Mobile Nubmer"
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />
                      <TextField
                        name="password"
                        type="password"
                        label="Password"
                        value={password || ''}
                        onChange={handleChange}
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />
                      <TextField
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        label="Confirm Password"
                        value={confirmPassword || ''}
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={['this field is required', "password didn't match"]}
                      />
                      <RadioGroup
                        row
                        name="user_status"
                        sx={{ mb: 2 }}
                        value={user_status || ''}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="1"
                          label="Active"
                          labelPlacement="end"
                          control={<Radio color="secondary" />}
                        />

                        <FormControlLabel
                          value="0"
                          label="Inactive"
                          labelPlacement="end"
                          control={<Radio color="secondary" />}
                        />
                      </RadioGroup>

                      
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

export default PlayerAdd;
