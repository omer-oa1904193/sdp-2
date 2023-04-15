import React from 'react';
import IconButton from '@mui/material/IconButton';
import Check from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

const CheckButton = styled(IconButton)(({ theme }) => ({
  color: '#FFFFFF',
  background: '#267BAA',
  borderRadius: '50%',
  '&:hover': {
    background: '#267BAA',
    color: '#FFFFFF',
  },
  width: '24px',
  height: '24px',
}));

function CheckIconButton(props) {
  return (
    <CheckButton aria-label="settings">
      <Check sx={{ fontSize: '16px' }} />
    </CheckButton>
  );
}

export default CheckIconButton;
