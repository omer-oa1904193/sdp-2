import React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

const EditButton = styled(IconButton)(({ theme }) => ({
  color: '#B6B6B6',
  border: `4px solid #B1B1B1`,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#919090',
    border: '4px solid #919090',
    color: '#FFFFFF',
  }
}));

function EditIconButton(props) {
  return (
    <EditButton aria-label="settings">
      <EditIcon />
    </EditButton>
  );
}

export default EditIconButton;
