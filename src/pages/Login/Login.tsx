import * as yup from 'yup';
import Grid from '@mui/material/Unstable_Grid2';
import InputField from '../../components/InputField/InputField';
import { Box, Button, Container, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import PasswordField from '../../components/PasswordField/PasswordField';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import Role from '../../enum/role.enum';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const { login, updateError } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevError) => ({ ...prevError, [name]: '' }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate(form, { abortEarly: false });
      await googleLogin(form.email, form.password);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          const fieldName = validationError.path as string;
          setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: validationError.message }));
        });
      }
    }
  };

  async function googleLogin(email: string, password: string) {
    try {
      setIsLoading((isLoading) => !isLoading);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();

      if (token) {
        localStorage.setItem('token', token);
        const apiUrl = process.env.REACT_APP_SERVER_BASE_URL + 'user';
        const request = await fetch(apiUrl, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });

        const response = await request.json();
        login(response.data);
        localStorage.setItem('user', response.data);
        setIsLoading((isLoading) => !isLoading);
        if (response.data.role === Role.USER) navigate('/dashboard/form');
        if (response.data.role === Role.ADMIN) navigate('/dashboard/company-table');
      }
      setIsLoading((isLoading) => !isLoading);
    } catch (error: any) {
      updateError(error?.message);
      setIsLoading((isLoading) => !isLoading);
    }
  }

  return (
    <Container maxWidth='sm'>
      <Grid container justifyContent='center' alignItems='center' height='100vh'>
        <Grid xs={8} md={6} lg={8}>
          <Typography variant='h5' component='h5'>
            Login
          </Typography>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1.5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            noValidate
            autoComplete='off'
            onSubmit={onSubmit}
          >
            <InputField
              label='Email'
              name='email'
              type='email'
              id='email'
              value={form.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <PasswordField
              label='Password'
              name='password'
              id='password'
              value={form.password}
              onChange={handleInputChange}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              error={errors.password}
            />
            <Button
              size='medium'
              fullWidth={true}
              type='submit'
              variant='contained'
              color='primary'
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
