import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { ChangeEvent, MouseEventHandler } from 'react';

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  name: string;
  error: string;
  showPassword: boolean;
  handleClickShowPassword?: MouseEventHandler<HTMLButtonElement> | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordField = ({
  id,
  name,
  label,
  value,
  error,
  showPassword,
  handleClickShowPassword,
  onChange,
}: PasswordFieldProps) => (
  <FormControl
    sx={{ m: 1.5 }}
    size='small'
    fullWidth={true}
    variant='outlined'
    onChange={onChange}
    error={Boolean(error)}
  >
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      name={name}
      value={value}
      type={showPassword ? 'text' : 'password'}
      endAdornment={
        <InputAdornment position='end'>
          <IconButton
            aria-label='toggle password visibility'
            onClick={handleClickShowPassword}
            edge='end'
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label='Password'
    />
    {error ? <FormHelperText error>{error}</FormHelperText> : null}
  </FormControl>
);

export default PasswordField;
