import { Fragment } from 'react';
import Header from '../../components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import CompanyForm from '../CompanyForm/CompanyForm';
import CompanyTable from '../CompanyTable/CompanyTable';

const Dashboard = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path='/form' element={<CompanyForm />} />
        <Route path='/company-table' element={<CompanyTable />} />
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </Fragment>
  );
};

export default Dashboard;
