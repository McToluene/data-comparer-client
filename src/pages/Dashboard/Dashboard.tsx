import { Fragment, useState } from 'react';
import Header from '../../components/Header/Header';
import { Routes, Route } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        {/* <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} /> */}
      </Routes>
    </Fragment>
  );
};

export default Dashboard;
