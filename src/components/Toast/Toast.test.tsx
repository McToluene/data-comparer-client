import React from 'react';
import { render, screen } from '@testing-library/react';
import Toast from './Toast';

jest.setTimeout(10000);

describe('Toast Component', () => {
  it('renders without crashing', () => {
    render(<Toast open={true} handleClose={() => {}} message='Test message' severity='success' />);
  });

  it('displays the provided message', () => {
    render(<Toast open={true} handleClose={() => {}} message='Test message' severity='success' />);

    const messageElement = screen.getByText('Test message');
    expect(messageElement).toBeInTheDocument();
  });
});
