import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { Company } from '../../AuthContext';

type CompanyComparisonProps = {
  companies: Company[];
  open: boolean;
  handleClose: () => void;
};

function ComparisonDialog({ companies, open, handleClose }: CompanyComparisonProps) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
      <DialogTitle>Company Comparison</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {companies.map((company, index) => (
            <Grid item xs={6} key={index}>
              <Paper style={{ padding: '0.7em' }} elevation={1}>
                <Typography variant='h6' gutterBottom>
                  Company: {company.name}
                </Typography>
                <Typography variant='body1'>Users: {company.users}</Typography>
                <Typography variant='body1'>Products: {company.products}</Typography>
                <Typography variant='body1'>Percentage: {company.percentage}%</Typography>

                {company.imageURL ? (
                  <img
                    src={company.imageURL}
                    alt={company.name}
                    style={{ width: '150px', height: '100px' }}
                  />
                ) : null}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ComparisonDialog;
