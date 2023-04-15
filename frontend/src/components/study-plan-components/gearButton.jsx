import React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';

const GearButton = styled(IconButton)(({ theme }) => ({
  color: '#B6B6B6',
  border: `4px solid #B1B1B1`,
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#919090',
    border: '4px solid #919090',
    color: '#FFFFFF',
  }
}));

function GearIconButton(props) {
  return (
    <GearButton aria-label="settings">
      <SettingsIcon />
    </GearButton>
  );
}

export default GearIconButton;
