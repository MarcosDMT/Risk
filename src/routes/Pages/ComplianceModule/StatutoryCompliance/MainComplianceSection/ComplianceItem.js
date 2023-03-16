import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

const ComplianceItem = props => {
  const { compliance, handleOnClick, isSelected = false } = props;
  return (
    <>
      <ListItemButton selected={isSelected} onClick={() => handleOnClick(compliance.id)}>
        <ListItemText
          primaryTypographyProps={{
            variant: 'subtitle2',
          }}
          primary={compliance.title.toUpperCase()}
        />
      </ListItemButton>
    </>
  );
};

export default ComplianceItem;
