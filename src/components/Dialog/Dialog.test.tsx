import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import ResponsiveDialog from './Diaglog';

// Mock the useAuth hook
jest.mock('../../AuthContext', () => ({
  useAuth: () => ({
    companyInfo: jest.fn(),
  }),
}));

const company = {
  id: 1,
  name: 'Company A',
  users: 100,
  products: 50,
  percentage: 75,
  imageURL: 'http://example.com/image1.jpg',
};

const mockImageFile = new File(['(binary data)'], 'test-image.png', { type: 'image/png' });

describe('ResponsiveDialog', () => {
  it('renders without crashing', () => {
    render(<ResponsiveDialog company={company} open={true} handleClose={() => {}} />);

    expect(screen.getByText('Ok')).toBeInTheDocument();
  });

  it('handles image change and upload', async () => {
    render(<ResponsiveDialog company={company} open={true} handleClose={() => {}} />);

    // Simulate an image change event
    const inputElement = screen.getByLabelText('Upload Image');
    fireEvent.change(inputElement, { target: { files: [mockImageFile] } });

    // Check if the image preview is displayed
    await waitFor(() => {
      expect(screen.getByText('Preview:')).toBeInTheDocument();
    });

    // Simulate clicking the "Upload Image" button
    const uploadButton = screen.getByText('Upload Image');
    fireEvent.click(uploadButton);

    // Check if the loading text is displayed
    expect(screen.getByText('Saving.Image..')).toBeInTheDocument();
  });

  it('handles image upload failure', async () => {
    // Mock a failed fetch response
    global.fetch = jest.fn().mockRejectedValue(new Error('Image upload failed'));

    render(<ResponsiveDialog company={company} open={true} handleClose={() => {}} />);

    // Simulate an image change event
    const inputElement = screen.getByLabelText('Upload Image');
    fireEvent.change(inputElement, { target: { files: [mockImageFile] } });

    // Simulate clicking the "Upload Image" button
    const uploadButton = screen.getByText('Upload Image');
    fireEvent.click(uploadButton);

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Image upload failed')).toBeInTheDocument();
    });
  });
});
