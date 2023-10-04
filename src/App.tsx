import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import { useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Toast from './components/Toast/Toast';
import { useEffect, useState } from 'react';

function App() {
  const { isAuthenticated, error, updateError } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    updateError('');
  };

  useEffect(() => {
    if (error) {
      const showToast = async () => {
        setOpen(true);
      };
      showToast();
    }
  }, [error]);
  return (
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
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
      {error ? (
        <Toast severity='error' open={open} message={error} handleClose={handleClose} />
      ) : null}
    </BrowserRouter>
  );
}

export default App;
