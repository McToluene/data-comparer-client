import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputField from './InputField';

describe('InputField', () => {
  const defaultProps = {
    id: 'test-id',
    name: 'test-name',
    label: 'Test Label',
    value: '',
    error: '',
    type: 'text' as const, // Specify the type here
    onChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<InputField {...defaultProps} />);
    const textField = screen.getByLabelText('Test Label');

    expect(textField).toBeInTheDocument();
    expect(textField).toHaveAttribute('id', 'test-id');
    expect(textField).toHaveValue('');
    expect(textField).toHaveAttribute('type', 'text'); // Check the type attribute
  });

  it('calls the onChange function when input changes', () => {
    render(<InputField {...defaultProps} />);
    const textField = screen.getByLabelText('Test Label');
    fireEvent.change(textField, { target: { value: 'new-value' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(expect.anything());
  });
});
