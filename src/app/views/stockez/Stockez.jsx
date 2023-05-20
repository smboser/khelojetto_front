import {
  Box,
  Icon,
  Fab,
  styled,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  TextField,
  useTheme,
  IconButton,
  Button,
  Alert,
  Snackbar
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState } from 'react';
import useUser from 'app/hooks/useUser';
import useTable from '../material-kit/tables/hooks/useTable';
import { useClasses } from '../material-kit/tables/hooks/useClasses';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px'
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px'
    }
  }
}));

const Stockez = () => {
  const { getUsers, deleteUser, contextMsg, contextStatus, users } = useUser();
  const [delOpen, setDelOpen] = useState(false);
  const [delUsername, setDelUsername] = useState('');
  const [delUserId, setDelUserId] = useState(0);
  const [response, setResponse] = useState(false); // For api response
  const { palette } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User Context calling');
    getUsers(1);
  }, []);

  const styles = (theme) => ({
    pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
    },
    searchInput: {
      width: '100%'
    }
  });

  // Snackbar code
  const [open, setOpen] = useState(false);
  if (contextMsg && open === false && response === false) {
    setResponse(true);
    setOpen(true);
    // Reloading data table
    setTimeout(() => {
      getUsers(1);
    }, 2000);
  }
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // Snackbar code

  const handleEdit = (userId) => {
    navigate(`/users/stockez/edit/${userId}`);
  };

  const handleDelete = (userId, username) => {
    setDelOpen(true);
    setDelUsername(username);
    setDelUserId(userId);
  };
  const handleDelClose = () => setDelOpen(false);

  const handleDelYes = () => {
    if (delUserId > 0) {
      setOpen(false); // Making Snackbar off if it is on somehow
      setResponse(false); //
      deleteUser(delUserId);
    }
    setDelOpen(false);
  };

  const classes = useClasses(styles);

  const headCells = [
    { id: 'user_id', label: 'Id' },
    { id: 'username', label: 'Username' },
    { id: 'name', label: 'Name' },
    { id: 'sto_id', label: 'Super Stockes' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'type', label: 'Type' },
    { id: 'balance', label: 'Credit' },
    { id: 'block', label: 'Block' },
    { id: 'actions', label: 'Actions' }
  ];

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    users,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else return items.filter((x) => x.username.toLowerCase().includes(target.value));
      }
    });
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Stockez', path: '/stockez' }]} />
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
          <SimpleCard title="Stockez">
            <Box width="100%" overflow="auto">
              {/* <PageHeader
            title="New Employee"
            subTitle="Form design with validation"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          /> */}
              {users && Array.isArray(users) && (
                <Paper>
                  {/* <EmployeeForm /> */}
                  <Toolbar>
                    <Box
                      component="span"
                      m={1}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ width: '100%' }}
                    >
                      <TextField
                        variant="outlined"
                        label="Search Stockez"
                        className={classes.searchInput}
                        onChange={handleSearch}
                      />
                      <NavLink to="/users/stockez/add" style={{ color: palette.primary.main }}>
                        <Fab size="medium" color="primary" aria-label="Add" className="button">
                          <Icon>add</Icon>
                        </Fab>
                      </NavLink>
                    </Box>
                  </Toolbar>
                  <TblContainer>
                    <TblHead />
                    <TableBody>
                      {recordsAfterPagingAndSorting &&
                        recordsAfterPagingAndSorting().map((item) => (
                          <TableRow key={item.user_id}>
                            <TableCell>{item.user_id}</TableCell>
                            <TableCell>{item.username}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.sto_id}</TableCell>
                            <TableCell>{item.revenue}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.balance}</TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleEdit(item.user_id)}>
                                <Icon fontSize="large" color="secondary">
                                  mode_edit
                                </Icon>
                              </IconButton>
                              <IconButton onClick={() => handleDelete(item.user_id, item.username)}>
                                <Icon fontSize="large" color="error">
                                  close
                                </Icon>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </TblContainer>
                  <TblPagination />
                </Paper>
              )}
            </Box>
          </SimpleCard>
        </Container>

        <Dialog
          open={delOpen}
          onClose={handleDelClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete User ?</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you surce you want to delete User <strong>{delUsername}</strong> ?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDelYes} color="primary">
              Yes
            </Button>

            <Button onClick={handleDelClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Stockez;
