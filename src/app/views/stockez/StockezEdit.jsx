import {
  Box,
  Stack,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  Alert,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  Checkbox
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
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

const StockezEdit = () => {
  const [state, setState] = useState({});
  const [response, setResponse] = useState(false); // For api response
  const { getUser, updateUser, users, contextMsg, contextStatus } = useUser();
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const navigate = useNavigate();

  // Snackbar code
  const [open, setOpen] = useState(false);
  if (contextMsg && open === false && response === false) {
    setResponse(true);
    setOpen(true);
    // Reloading data table
    setTimeout(() => {
      navigate('/users/stockez');
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
    if (users && typeof users === 'object' && !Array.isArray(users)) {
      setState({ ...state, ...users });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!users || (users && Array.isArray(users))]);

  const handleSubmit = (event) => {
    setLoading(true);
    setOpen(false); // Making Snackbar off if it is on somehow
    setResponse(false); //
    try {
      // Adding usertype for Stockez
      updateUser(state, userId);
      setLoading(false);
      //navigate('/');
    } catch (e) {
      setLoading(false);
    }
  };

  let inputVal = 0;
  let inputValx = false;
  const handleChange1 = (event) => {
    inputValx = event.target.checked;
    if (inputValx === true) {
      inputVal = 1;
      setState({ ...state, [event.target.name]: inputVal });
    } else {
      inputVal = 0;
      if (event.target.name === 'update_agents_revenue') {
        setState({
          ...state,
          joker_a: 0,
          tripple_a: 0,
          single_a: 0,
          double_a: 0,
          [event.target.name]: inputVal
        });
      }

      if (event.target.name === 'update_player_revenue') {
        setState({
          ...state,
          joker_p: 0,
          tripple_p: 0,
          single_p: 0,
          double_p: 0,
          [event.target.name]: inputVal
        });
      }
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleInput = (event) => {
    const inputVal = event.target.value;
    const inputName = event.target.name;
    setState({ ...state, [inputName]: inputVal });
    // frmData.append(inputName, inputVal)
  };

  const {
    username,
    name,
    mobile,
    password,
    confirmPassword,
    user_status,
    email,
    revenue,
    type,
    joker_a,
    tripple_a,
    single_a,
    double_a,
    joker_p,
    tripple_p,
    single_p,
    double_p,
    update_player_revenue,
    update_agents_revenue
  } = state;
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: 'Stockez', path: '/users/stockez' }, { name: 'Update Stockez' }]}
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
            <SimpleCard title="Update Stockez">
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
                      <TextField
                        type="text"
                        name="revenue"
                        label="Revenue(%)"
                        onChange={handleChange}
                        value={revenue || ''}
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />

                      <InputLabel id="demo-simple-select-label"> Type</InputLabel>
                      <Select
                        id="type"
                        onChange={handleInput}
                        name="type"
                        value={type || ''}
                        fullWidth
                        variant="outlined"
                      >
                        <MenuItem value={'TN'}>{'TN'}</MenuItem>
                      </Select>

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={update_agents_revenue ? true : false}
                            onChange={handleChange1}
                            name="update_agents_revenue"
                          />
                        }
                        label="Update Agents Revenue "
                      />

                      <TextField
                        type="text"
                        name="joker_a"
                        label="Revenue Jeeto Joker(%)"
                        onChange={handleChange}
                        value={joker_a || ''}
                        disabled={update_agents_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />

                      <TextField
                        type="text"
                        name="tripple_a"
                        label="Revenue Tripple Chance P(%)"
                        onChange={handleChange}
                        value={tripple_a || ''}
                        disabled={update_agents_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />

                      <TextField
                        type="text"
                        name="single_a"
                        label="Revenue Single Chance P(%)"
                        onChange={handleChange}
                        value={single_a || ''}
                        disabled={update_agents_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />

                      <TextField
                        type="text"
                        name="double_a"
                        label="Revenue Double Chance P(%)"
                        onChange={handleChange}
                        value={double_a || ''}
                        disabled={update_agents_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={update_player_revenue ? true : false}
                            onChange={handleChange1}
                            name="update_player_revenue"
                          />
                        }
                        label="Update Player Revenue "
                      />

                      <TextField
                        type="text"
                        name="joker_p"
                        label="Revenue Jeeto Joker(%)"
                        onChange={handleChange}
                        value={joker_p || ''}
                        disabled={update_player_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />

                      <TextField
                        type="text"
                        name="tripple_p"
                        label="Revenue Tripple Chance P(%)"
                        onChange={handleChange}
                        value={tripple_p || ''}
                        disabled={update_player_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />

                      <TextField
                        type="text"
                        name="single_p"
                        label="Revenue Single Chance P(%)"
                        onChange={handleChange}
                        value={single_p || ''}
                        disabled={update_player_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />

                      <TextField
                        type="text"
                        name="double_p"
                        label="Revenue Double Chance P(%)"
                        onChange={handleChange}
                        value={double_p || ''}
                        disabled={update_player_revenue ? false : true}
                        validators={[]}
                        errorMessages={['this field is required']}
                      />
                    </Grid>
                  </Grid>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    loading={loading}
                  >
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Update</Span>
                  </LoadingButton>
                </ValidatorForm>
              </div>
            </SimpleCard>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
};

export default StockezEdit;
