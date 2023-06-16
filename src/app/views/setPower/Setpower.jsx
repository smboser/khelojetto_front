import {
  Box,
  Icon,
  Fab,
  styled,
  Paper,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
  Toolbar,
  TextField,
   Alert,
  Snackbar
} from '@mui/material';
import {Breadcrumb, SimpleCard } from 'app/components';
import { useState } from 'react';
import useSetpower from 'app/hooks/useSetpower';
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

const SetPower = () => {
  const { getSetpowers, powers, contextMsg, contextStatus } = useSetpower();
  const { palette } = useTheme();
  const navigate = useNavigate();
   const [open, setOpen] = useState(false);
  useEffect(() => {
    getSetpowers();
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
    powers,
    headCells,
    filterFn
  );

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else return items.filter((x) => x.game_id.toLowerCase().includes(target.value));
      }
    });
  };
  return (
     <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Setpower', path: '/setpower' }]} />
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
      <SimpleCard title="Setpower">
        <Box width="100%" overflow="auto">
          {/* <PageHeader
            title="New Employee"
            subTitle="Form design with validation"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          /> */}
          {powers && (
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
                    label="Search Setpower"
                    className={classes.searchInput}
                    onChange={handleSearch}
                  />
                  <NavLink to="/setpower/add" style={{ color: palette.primary.main }}>
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
	</Box>
    </Container>
  );
};

export default SetPower;
