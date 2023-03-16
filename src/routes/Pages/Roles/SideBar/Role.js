import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Person } from '@material-ui/icons';

const Role = ({ classes, item, selectedItem, onChange, onDeleteRole }) => {
  const [isEdit, setEdit] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEditEl, setAnchorEditEl] = useState(null);
  const labelRef = useRef(null);

  const handleMenuClick = event => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = e => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const onClickEditLabel = event => {
    setEdit(true);
    handleMenuClose(event);
    setAnchorEditEl(labelRef.current);
  };

  const handleEditClose = () => {
    setAnchorEditEl(null);
  };

  const onClickDeleteLabel = e => {
    handleMenuClose(e);
  };

  return (
    <React.Fragment>
      <ListItem
        ref={labelRef}
        button
        title={item.description}
        className={clsx(classes.appNavItem, classes.appTaskNavItem, {
          active: item.id === selectedItem.id,
        })}
        onClick={() => onChange(item)}>
        <ListItemIcon className="Cmt-icon-root">
          {/*{item.icon ? item.icon : <LabelIcon style={{ color: 'blue' }} />}*/}
          {item.icon ? item.icon : <Person style={{ color: 'blue' }} />}
        </ListItemIcon>
        <ListItemText className="Cmt-nav-text" primary={item.name} />
        {/*{counter> 0 && (*/}
        {/*  <Box component="span" className="Cmt-nav-count">*/}
        {/*    {counter}*/}
        {/*  </Box>*/}
        {/*)}*/}
        {/*<Box className="Cmt-more-vert-icon">*/}
        {/*  <MoreVertIcon onClick={handleMenuClick} />*/}
        {/*</Box>*/}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={onClickEditLabel}>Edit</MenuItem>
          <MenuItem onClick={onClickDeleteLabel}>Delete</MenuItem>
        </Menu>
      </ListItem>

      {/*{isEdit && (*/}
      {/*  <LabelForm*/}
      {/*    anchorEl={anchorEditEl}*/}
      {/*    onClose={handleEditClose}*/}
      {/*    label={item}*/}
      {/*    setEdit={setEdit}*/}
      {/*    //saveLabel={updateLabel}*/}
      {/*  />*/}
      {/*)}*/}
    </React.Fragment>
  );
};

export default Role;

Role.prototype = {
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  selectedItem: PropTypes.string,
};

Role.defaultProps = {
  selectedItem: '',
};
