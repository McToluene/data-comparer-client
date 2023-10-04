import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

type InputFieldProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ id, name, label, value, error, onChange }: InputFieldProps) => (
  <TextField
    size='small'
    fullWidth={true}
    name={name}
    id={id}
    label={label}
    value={value}
    error={Boolean(error)}
    helperText={error}
    onChange={onChange}
  />
);
export default InputField;
