import Header from '../../components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import CompanyForm from '../CompanyForm/CompanyForm';
import CompanyTable from '../CompanyTable/CompanyTable';
import { Container } from '@mui/material';
import { Fragment } from 'react';

const Dashboard = () => {
  return (
    <Fragment>
      <Header />
      <Container maxWidth='md'>
        <Routes>
          <Route path='/form' element={<CompanyForm />} />
          <Route path='/company-table' element={<CompanyTable />} />
          <Route path='*' element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
