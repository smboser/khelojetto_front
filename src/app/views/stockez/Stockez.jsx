import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useState } from 'react';
import useUser from 'app/hooks/useUser';

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

const Stockez = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { deleteUser, createUser, users } = useUser();
  console.log('users', users);
  const stockezList = users;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Stockez', path: '/stockez' }]} />
      </Box>
      <SimpleCard title="Stockez">
        <Box width="100%" overflow="auto">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Super Stockes</TableCell>
                <TableCell align="center">Revenue</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="right">Credit</TableCell>
                <TableCell align="center">Block</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockezList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{subscriber.user_id}</TableCell>
                    <TableCell align="center">{subscriber.username}</TableCell>
                    <TableCell align="center">{subscriber.name}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">{subscriber.revenue}</TableCell>
                    <TableCell align="center">{subscriber.type}</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </StyledTable>

          <TablePagination
            sx={{ px: 2 }}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={stockezList.length}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{ 'aria-label': 'Next Page' }}
            backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          />
        </Box>
      </SimpleCard>
    </Container>
  );
};

export default Stockez;
