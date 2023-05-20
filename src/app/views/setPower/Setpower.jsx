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
import useSetpower from 'app/hooks/useSetpower';
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

const SetPower = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { getSetpowers,setpowers } = useSetpower();

  useEffect(() => {
    console.log('Setpower Context calling');
    getSetpowers();
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
    { id: 'game_id', label: 'Game Id' },
    { id: 'power', label: 'Power' },
    { id: 'actions', label: 'Actions' }
  ];

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(
    setpowers,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else return items.filter((x) => x.game_id.toLowerCase().includes(target.value));
      }
    });
  };
  return (
    <Container>
      <SimpleCard title="Setpower">
        <Box width="100%" overflow="auto">
          {/* <PageHeader
            title="New Employee"
            subTitle="Form design with validation"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          /> */}
          {setpowers && (
            <Paper>
              {/* <EmployeeForm /> */}
              <Toolbar>
                <TextField
                  variant="outlined"
                  label="Search Setpower"
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
                        <TableCell>{item.game_id}</TableCell>
                        <TableCell>{item.power}</TableCell>
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

export default SetPower;
