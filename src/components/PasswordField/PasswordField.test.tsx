import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordField from './PasswordField';

describe('PasswordField', () => {
  const defaultProps = {
    id: 'password',
    label: 'Password',
    name: 'password',
    value: '',
    error: '',
    showPassword: false,
    handleClickShowPassword: jest.fn(),
    onChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<PasswordField {...defaultProps} />);

    const inputElement = screen.getByLabelText('Password');
    const visibilityButton = screen.getByLabelText('toggle password visibility');

    expect(inputElement).toBeInTheDocument();
    expect(visibilityButton).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'password');
    expect(inputElement).toHaveValue('');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders with an error message when error prop is provided', () => {
    const error = 'Password is too short';
    render(<PasswordField {...defaultProps} error={error} />);

    const errorText = screen.getByText(error);

    expect(errorText).toBeInTheDocument();
  });

  it('calls the onChange function when input changes', () => {
    const handleChange = jest.fn();
    render(<PasswordField {...defaultProps} onChange={handleChange} />);

    const inputElement = screen.getByLabelText('Password');
    fireEvent.change(inputElement, { target: { value: 'new-password' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls the handleClickShowPassword function when visibility button is clicked', () => {
    const handleVisibilityClick = jest.fn();
    render(<PasswordField {...defaultProps} handleClickShowPassword={handleVisibilityClick} />);

    const visibilityButton = screen.getByLabelText('toggle password visibility');
    fireEvent.click(visibilityButton);

    expect(handleVisibilityClick).toHaveBeenCalledTimes(1);
  });
});
