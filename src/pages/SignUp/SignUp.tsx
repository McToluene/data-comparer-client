import * as yup from 'yup';
import Grid from '@mui/material/Unstable_Grid2';

import { Box, Button, Container, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../firebase';
import InputField from '../../components/InputField/InputField';
import PasswordField from '../../components/PasswordField/PasswordField';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default function SignUp() {
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
      await firebasRegister(form.email, form.password);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          const fieldName = validationError.path as string;
          setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: validationError.message }));
        });
      }
    }
  };

  const firebasRegister = async (email: string, password: string) => {
    try {
      setIsLoading((isLoading) => !isLoading);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      if (token) {
        localStorage.setItem('token', token);
        const requestData = {};

        const apiUrl = process.env.REACT_APP_SERVER_BASE_URL + 'user';
        const request = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify(requestData),
        });

        const response = await request.json();
        localStorage.setItem('user', response.data);
        setIsLoading((isLoading) => !isLoading);
        navigate('/dashboard');
      }
      setIsLoading((isLoading) => !isLoading);
    } catch (error) {
      console.error(error);
      setIsLoading((isLoading) => !isLoading);
    }
  };

  return (
    <Container maxWidth='sm'>
      <Grid container justifyContent='center' alignItems='center' height='100vh'>
        <Grid xs={8} md={6} lg={8}>
          <Typography variant='h5' component='h5'>
            Sign up
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
              id='email-sign-up'
              type='email'
              value={form.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <PasswordField
              label='Password'
              name='password'
              id='password-sign-up'
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
