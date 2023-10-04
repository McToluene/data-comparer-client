import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  value: string | number;
  error?: string;
  type: 'number' | 'text' | 'email';
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  id,
  name,
  label,
  value,
  type,
  disabled,
  error,
  onChange,
}: InputFieldProps) => (
  <TextField
    type={type}
    size='small'
    fullWidth={true}
    name={name}
    id={id}
    label={label}
    value={value}
    error={Boolean(error)}
    helperText={error}
    disabled={disabled}
    onChange={onChange}
  />
);
export default InputField;
