import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';

import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Container maxWidth='sm'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route
            path='/dashboard/*'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
