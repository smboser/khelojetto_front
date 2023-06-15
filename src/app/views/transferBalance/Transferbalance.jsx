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
  const { getTransferbalances, points } = useTransferbalance();
  const { palette } = useTheme();
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

  const classes = useClasses(styles);

  const headCells = [
    { id: 'id', label: 'Id' },
    { id: 'from_id', label: 'From Id' },
    { id: 'to_id', label: 'To Id' },
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
                  <NavLink
                    to="/points/transfer-balance/add"
                    style={{ color: palette.primary.main }}
                  >
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
                        <TableCell>{item.from_id}</TableCell>
                        <TableCell>{item.to_id}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.last_balance}</TableCell>
                        <TableCell>{item.transfer_on}</TableCell>
                        <TableCell></TableCell>
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
  );
};

export default TransferBalance;
