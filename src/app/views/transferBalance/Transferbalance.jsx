import {
  Box,
  Icon,
  IconButton,
  styled,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Table,
  TextField
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState } from 'react';
import useTransferbalance from 'app/hooks/useTransferbalance';
import useTable from '../material-kit/tables/hooks/useTable';
import { useClasses } from '../material-kit/tables/hooks/useClasses';
import { useEffect } from 'react';

const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { getTransferbalances,points } = useTransferbalance();

  useEffect(() => {
    console.log('Transfer balance Context calling');
    getTransferbalances();
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
        if (target.value == '') return items;
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
                <TextField
                  variant="outlined"
                  label="Search Point"
                  className={classes.searchInput}
                  onChange={handleSearch}
                />
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
