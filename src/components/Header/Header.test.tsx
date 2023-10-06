import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DrawerAppBar from './Header';

// Mock the useAuth hook
jest.mock('../../AuthContext', () => ({
  useAuth: () => ({
    user: {
      role: 'USER', // Provide a user role for testing
    },
    logout: jest.fn(),
  }),
}));

describe('DrawerAppBar Component', () => {
  it('renders without crashing', () => {
    render(<DrawerAppBar />);
  });

  it('displays the app title', async () => {
    render(<DrawerAppBar />);
    const appTitle = await screen.findByText('Data Comparer', {}, { timeout: 3000 });
    expect(appTitle).toBeInTheDocument();
  });

  it('opens and closes the mobile drawer when menu button is clicked', async () => {
    render(<DrawerAppBar />);
    const menuButton = screen.getByLabelText('open drawer');

    const formText = await screen.findByText('Form', {}, { timeout: 3000 });
    expect(formText).not.toBeInTheDocument();

    fireEvent.click(menuButton);

    const formTextAfterOpen = await screen.findByText('Form', {}, { timeout: 3000 });
    expect(formTextAfterOpen).toBeInTheDocument();

    fireEvent.click(menuButton);

    const formTextAfterClose = await screen.findByText('Form', {}, { timeout: 3000 });
    expect(formTextAfterClose).not.toBeInTheDocument();
  });
});
