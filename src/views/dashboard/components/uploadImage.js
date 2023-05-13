import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export const handleImageChange = (e, setSelectedImage, setImagePreviewUrl) => {
  e.preventDefault();

  const reader = new FileReader();
  const file = e.target.files[0];

  reader.onloadend = () => {
    setSelectedImage(file);
    setImagePreviewUrl(reader.result);
  };

  reader.readAsDataURL(file);
};

export const UploadButtons = ({ setSelectedImage, setImagePreviewUrl }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" multiple type="file" onChange={(e) => handleImageChange(e, setSelectedImage, setImagePreviewUrl)} />
        <PhotoCamera />
      </IconButton>
    </Stack>
  );
};
