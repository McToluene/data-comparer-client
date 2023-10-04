import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Company, useAuth } from '../../AuthContext';
import { useState } from 'react';

type ResponsiveDialogProps = {
  company: Company;
  open: boolean;
  handleClose: () => void;
};

export default function ResponsiveDialog({ company, open, handleClose }: ResponsiveDialogProps) {
  const { companyInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  const [image, setImage] = React.useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('companyId', company.id.toString());

    try {
      setIsLoading(true);
      const apiUrl = process.env.REACT_APP_SERVER_BASE_URL + 'company/image';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        companyInfo(responseData.data);
        console.log('Image uploaded successfully');
      } else {
        console.error('Image upload failed');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'
    >
      <DialogTitle id='responsive-dialog-title'>{company.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Users: {company.users}
          <br />
          Products: {company.products}
          <br />
          Percentage: {company.percentage}%
        </DialogContentText>

        {company.imageURL ? (
          <img src={company.imageURL} alt={company.name} style={{ maxWidth: '100%' }} />
        ) : (
          <div>
            <input type='file' accept='image/*' onChange={handleImageChange} />

            {image && (
              <div>
                <p>Preview:</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt='Preview'
                  style={{ width: '200px', height: '150px' }}
                />
              </div>
            )}

            <Button color='primary' onClick={handleImageUpload} disabled={isLoading}>
              {isLoading ? 'Saving Image..' : ' Upload Image'}
            </Button>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
