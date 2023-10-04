import * as yup from 'yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import InputField from '../../components/InputField/InputField';
import { useAuth } from '../../AuthContext';
import Toast from '../../components/Toast/Toast';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  users: yup
    .number()
    .required('Users is required')
    .positive('Users must be a positive number')
    .required('Users is required'),
  products: yup
    .number()
    .required('Products is required')
    .positive('Products must be a positive number')
    .required('Products is required'),
  percentage: yup
    .number()
    .required('Percentage is required')
    .positive('Percentage must be a positive number')
    .required('Percentage is required'),
});

function CompanyForm() {
  const { companyInfo, company, hasCompany } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccesful, setIsSuccessful] = useState(false);
  const [form, setForm] = useState({ name: '', users: 0, products: 0, percentage: 0 });
  const [errors, setErrors] = useState({ name: '', users: '', products: '', percentage: '' });

  useEffect(() => {
    if (!hasCompany) {
      const fetchData = async () => {
        try {
          const apiUrl = process.env.REACT_APP_SERVER_BASE_URL + 'company';
          const response = await fetch(apiUrl, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });

          const responseData = await response.json();
          if (responseData.data) {
            companyInfo(responseData.data);
            setForm((prevForm) => ({
              ...prevForm,
              ...responseData.data,
            }));
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [companyInfo, hasCompany]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await schema.validate(form, { abortEarly: false });
      await createCompany(form);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((validationError) => {
          const fieldName = validationError.path as string;
          setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: validationError.message }));
        });
      }
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSuccessful(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevError) => ({ ...prevError, [name]: '' }));
  };

  async function createCompany(form: any) {
    try {
      setIsLoading((isLoading) => !isLoading);
      const apiUrl = process.env.REACT_APP_SERVER_BASE_URL + 'company';
      const request = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(form),
      });

      const response = await request.json();
      if (response.data) {
        companyInfo(response.data);
      }
      setIsLoading((isLoading) => !isLoading);
    } catch (error) {
      console.log(error);
      setIsLoading((isLoading) => !isLoading);
    }
  }

  return (
    <Grid container justifyContent='center' alignItems='center' height='100vh'>
      <Grid item xs={8} md={6} lg={8}>
        <Typography variant='h5' component='h5'>
          Company Information
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
            label='Name'
            name='name'
            id='name'
            type='text'
            value={form.name}
            onChange={handleInputChange}
            error={errors.name}
            disabled={!!company.name}
          />

          <InputField
            label='Users'
            name='users'
            id='users'
            type='number'
            value={form.users}
            onChange={handleInputChange}
            error={errors.users}
            disabled={!!company.users}
          />

          <InputField
            label='Products'
            name='products'
            id='products'
            type='number'
            value={form.products}
            onChange={handleInputChange}
            error={errors.products}
            disabled={!!company.products}
          />

          <InputField
            label='Percentage'
            name='percentage'
            id='percentage'
            value={form.percentage}
            type='number'
            onChange={handleInputChange}
            error={errors.percentage}
            disabled={!!company.percentage}
          />

          {company.imageURL ? (
            <img
              src={company.imageURL}
              alt={company.name}
              style={{ width: '150px', height: '100px' }}
            />
          ) : null}

          <Button
            size='medium'
            fullWidth={true}
            type='submit'
            variant='contained'
            color='primary'
            disabled={hasCompany || isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Grid>
      {isSuccesful ? (
        <Toast
          severity='success'
          open={isSuccesful}
          message={'Saved successfully'}
          handleClose={handleClose}
        />
      ) : null}
    </Grid>
  );
}

export default CompanyForm;
