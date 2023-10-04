import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import { MemoryRouter, Route } from 'react-router-dom';
import { AuthProvider } from '../../AuthContext';
import DrawerAppBar from './Header';

// Mock the AuthProvider
jest.mock('../../AuthContext', () => ({
  useAuth: () => ({
    user: { role: 'ADMIN' },
    logout: jest.fn(),
  }),
}));

describe('DrawerAppBar', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <Route path='/' Component={DrawerAppBar} />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Data Comparer')).toBeInTheDocument();
  });

  it('handles drawer toggle', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <Route path='/' Component={DrawerAppBar} />
        </AuthProvider>
      </MemoryRouter>
    );

    // Open the drawer
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);

    // Check if the menu items are visible
    expect(screen.getByText('Companies')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Close the drawer
    fireEvent.click(menuButton);

    // Check if the menu items are hidden
    expect(screen.queryByText('Companies')).toBeNull();
    expect(screen.queryByText('Logout')).toBeNull();
  });

  it('handles logout click', () => {
    const { logout } = require('../../AuthContext'); // Import the mocked logout function

    render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider>
          <Route path='/' Component={DrawerAppBar} />
        </AuthProvider>
      </MemoryRouter>
    );

    // Open the drawer
    const menuButton = screen.getByLabelText('open drawer');
    fireEvent.click(menuButton);

    // Click the "Logout" button
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // Check if the logout function is called
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
