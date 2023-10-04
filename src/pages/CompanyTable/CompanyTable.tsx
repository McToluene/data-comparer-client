import React, { useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAuth } from '../../AuthContext';
import ResponsiveDialog from '../../components/Dialog/Diaglog';

function CompanyTable() {
  const [open, setOpen] = useState(false);
  const { companies, companiesInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null); // State to track the selected company

  useEffect(() => {
    if (companies.length <= 0) {
      const fetchData = async () => {
        try {
          const apiUrl = process.env.REACT_APP_SERVER_BASE_URL + 'company/list';
          const response = await fetch(apiUrl, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });

          const responseData = await response.json();
          if (responseData.data) {
            companiesInfo(responseData.data);
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [companies, companiesInfo]);

  const handleRowClick = (company: any) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedCompany(null);
    setOpen(false);
  };

  return (
    <Grid container justifyContent='center' alignItems='center' height='100vh'>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='right'>Users</TableCell>
                <TableCell align='right'>Products</TableCell>
                <TableCell align='right'>Percentage&nbsp;(%)</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <TableBody>
                {companies.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleRowClick(row)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.users}</TableCell>
                    <TableCell align='right'>{row.products}</TableCell>
                    <TableCell align='right'>{row.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6}>
        <Button
          size='medium'
          fullWidth={true}
          type='submit'
          variant='contained'
          color='primary'
          disabled={companies.length <= 1 || isLoading}
        >
          {isLoading ? 'Comparing...' : 'Compare'}
        </Button>
      </Grid>
      {selectedCompany && (
        <ResponsiveDialog company={selectedCompany} open={open} handleClose={handleClose} />
      )}
    </Grid>
  );
}

export default CompanyTable;
