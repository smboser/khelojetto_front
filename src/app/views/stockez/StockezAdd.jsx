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
  Snackbar
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

const StockezAdd = () => {
  const [state, setState] = useState({ date: new Date() });
  const [response, setResponse] = useState(false); // For api response
  const { getUsers, deleteUser, createUser, users, contextMsg, contextStatus } = useUser();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (event) => {
    setLoading(true);
    setOpen(false); // Making snackbar off if it is on somehow
    setResponse(false); //
    try {
      // Adding usertype for Stockez
      createUser({ ...state, usertype: 1 }); // 1 ==> User Type Stockez
      setLoading(false);
      //navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //const handleDateChange = (date) => setState({ ...state, date });
  const { username, name, mobile, password, confirmPassword, user_status, email } = state;
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Stockez', path: '/users/stockez' }, { name: 'Add Stockez' }]}
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
            <SimpleCard title="Add a New Stockez">
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

                      {/* <FormControlLabel
                        control={<Checkbox />}
                        label="I have read and agree to the terms of service."
                      /> */}
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

export default StockezAdd;