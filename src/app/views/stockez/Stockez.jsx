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
  IconButton
} from '@mui/material';
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
  const { getUsers, deleteUser, createUser, users } = useUser();
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

  const handleEdit = (userId) => {
    navigate(`/users/stockez/edit/${userId}`);
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
                              <IconButton>
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
      </Box>
    </Container>
  );
};

export default Stockez;
