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
import { useNavigate, useParams } from 'react-router-dom';
// import { LocalizationProvider } from '@mui/lab';
import useUser from 'app/hooks/useUser';

import { Span } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';

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

const PlayerEdit = () => {
  const [state, setState] = useState({});
  const [response, setResponse] = useState(false); // For api response
  const { getUsers, getAgents, getUser, updateUser, users, contextMsg, contextStatus, agents } =
    useUser();
  const { userId } = useParams();
  const { stoId } = useParams();
  const navigate = useNavigate();
  const [stokesdetails, setStokesdetails] = useState([]);
  // Snackbar code
  const [open, setOpen] = useState(false);
  if (contextMsg && open === false && response === false) {
    setResponse(true);
    setOpen(true);
    // Reloading data table
    setTimeout(() => {
      navigate('/users/player');
    }, 2000);
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
      if (state.password && value !== state.password) return false;
      return true;
    });
    return () => ValidatorForm.removeValidationRule('isPasswordMatch');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.password]);

  useEffect(() => {
    if (userId) getUser(userId);
    if (stoId) getAgents(stoId);
    if (users && typeof users === 'object' && !Array.isArray(users)) {
      setState({ ...state, ...users });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!users || (users && Array.isArray(users))]);

  console.log('dfghm=', state);

  useEffect(() => {
    getUsers(1);
    if (users && typeof users === 'object' && Array.isArray(users)) {
      setStokesdetails(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!users || (users && !Array.isArray(users))]);

  const handleSubmit = (event) => {
    setOpen(false); // Making Snackbar off if it is on somehow
    setResponse(false); //
    try {
      // Adding usertype for Stockez
      updateUser(state, userId);
    } catch (e) {
      console.log(e);
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
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const { username, name, mobile, password, confirmPassword, user_status, email, sto_id, ag_id } =
    state;

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Player', path: '/users/player' }, { name: 'Update Player' }]}
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
            <SimpleCard title="Update Player">
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
                      <InputLabel id="demo-simple-select-label"> Stokes</InputLabel>

                      <Select
                        id="stokes"
                        onChange={handleInput}
                        name="sto_id"
                        value={sto_id || ''}
                        fullWidth
                        variant="outlined"
                      >
                        {stokesdetails &&
                          stokesdetails.map((item, index) => (
                            <MenuItem key={index} value={item.user_id}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>

                      <Select
                        id="agent"
                        onChange={handleChange}
                        name="ag_id"
                        value={ag_id || ''}
                        fullWidth
                        variant="outlined"
                      >
                        {agents &&
                          agents.map((item, index) => (
                            <MenuItem key={index} value={item.user_id}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
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
                        validators={[]}
                        errorMessages={['this field is required']}
                      />
                      <TextField
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        label="Confirm Password"
                        value={confirmPassword || ''}
                        validators={['isPasswordMatch']}
                        errorMessages={["password didn't match"]}
                      />
                      <RadioGroup
                        row
                        name="user_status"
                        sx={{ mb: 2 }}
                        value={user_status?.toString() || ''}
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
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Update</Span>
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

export default PlayerEdit;
