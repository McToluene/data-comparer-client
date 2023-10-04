import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers like toBeInTheDocument
import ComparisonDialog from './ComparisonDialog';

// Mock the handleClose function
const handleClose = jest.fn();

const companies = [
  {
    id: 1,
    name: 'Company A',
    users: 100,
    products: 50,
    percentage: 75,
    imageURL: 'http://example.com/image1.jpg',
  },
  {
    id: 2,
    name: 'Company B',
    users: 200,
    products: 75,
    percentage: 90,
    imageURL: 'http://example.com/image2.jpg',
  },
];

describe('ComparisonDialog', () => {
  it('renders with companies and matches snapshot', () => {
    const { asFragment } = render(
      <ComparisonDialog companies={companies} open={true} handleClose={handleClose} />
    );

    // Check if the component matches the snapshot
    expect(asFragment()).toMatchSnapshot();

    // Check if the dialog content is rendered
    expect(screen.getByText('Company Comparison')).toBeInTheDocument();

    // Check if company information is displayed
    expect(screen.getByText('Company: Company A')).toBeInTheDocument();
    expect(screen.getByText('Company: Company B')).toBeInTheDocument();
  });

  it('renders without companies', () => {
    render(<ComparisonDialog companies={[]} open={true} handleClose={handleClose} />);

    // Check if a message for no companies is displayed
    expect(screen.getByText('Company Comparison')).toBeInTheDocument();
  });

  it('calls handleClose when close button is clicked', () => {
    render(<ComparisonDialog companies={companies} open={true} handleClose={handleClose} />);

    const closeButton = screen.getByText('Close');
    closeButton.click();

    // Check if handleClose was called
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
