import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for `toBeInTheDocument`
import Toast from './Toast';

describe('Toast', () => {
  it('renders the message and handles close', () => {
    const handleClose = jest.fn();

    render(
      <Toast
        open={true}
        message='This is a test message'
        severity='success'
        handleClose={handleClose}
      />
    );

    // Check if the message is rendered
    expect(screen.getByText('This is a test message')).toBeInTheDocument();

    // Check if the close button is rendered
    const closeButton = screen.getByRole('button', { name: 'close' });
    expect(closeButton).toBeInTheDocument();

    // Simulate a click on the close button
    fireEvent.click(closeButton);

    // Check if the handleClose function is called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('displays UNDO button and handles UNDO action', () => {
    const handleClose = jest.fn();

    render(
      <Toast
        open={true}
        message='This is a test message'
        severity='error'
        handleClose={handleClose}
      />
    );

    // Check if the UNDO button is rendered
    const undoButton = screen.getByText('UNDO');
    expect(undoButton).toBeInTheDocument();

    // Simulate a click on the UNDO button
    fireEvent.click(undoButton);

    // Check if the handleClose function is called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
