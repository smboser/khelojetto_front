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
import useTransferbalance from 'app/hooks/useTransferbalance';
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

const TransferBalance = () => {
  const { getTransferbalances, points,contextMsg, contextStatus } = useTransferbalance();
   const { palette } = useTheme();
   const [delOpen, setDelOpen] = useState(false);
  const [delUsername, setDelUsername] = useState('');
  const [delUserId, setDelUserId] = useState(0);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTransferbalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  // Snackbar code

  const handleEdit = (userId) => {
    navigate(`/points/transferBalance/edit/${userId}`);
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
      //deleteUser(delUserId);
    }
    setDelOpen(false);
  };

  const classes = useClasses(styles);

  const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'from_id', label: 'From Name' },
    { id: 'to_id', label: 'To Name' },
    { id: 'amount', label: 'Amount' },
    { id: 'last_balance', label: 'Last Balance' },
    { id: 'transfer_on', label: 'Transfer On' },
    { id: 'actions', label: 'Actions' }
  ];

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    points,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else return items.filter((x) => x.id.toLowerCase().includes(target.value));
      }
    });
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'TransferBalance', path: '/points/transfer-balance' }]} />
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
      <SimpleCard title="Point">
        <Box width="100%" overflow="auto">
          {/* <PageHeader
            title="New Employee"
            subTitle="Form design with validation"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          /> */}
          {points && (
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
                  label="Search Point"
                  className={classes.searchInput}
                  onChange={handleSearch}
                />
				<NavLink to="/points/transfer-balance/add" style={{ color: palette.primary.main }}>
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
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.frmName}</TableCell>
                        <TableCell>{item.toName}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.balance}</TableCell>
                        <TableCell>{item.transfer_on}</TableCell>
                        <TableCell>
						 
						
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

export default TransferBalance;
