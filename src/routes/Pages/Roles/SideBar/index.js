import React, { useContext } from 'react';
import useStyles from '../index.style';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {ListItem, ListItemText, Typography, withWidth} from '@material-ui/core';
import { getAppSidebarHeight } from '../../../../@jumbo/constants/AppConstants';
import AppContext from '../../../../@jumbo/components/contextProvider/AppContextProvider/AppContext';
import { AddCircle } from '@mui/icons-material';
import CmtList from '../../../../@coremat/CmtList';
import Role from './Role';

const RolesSidebar = props => {
  const { width, roles, onChangeRole, handleCreateNew, onDeleteRole, selectedRole } = props;
  const { showFooter } = useContext(AppContext);

  const classes = useStyles({
    height: getAppSidebarHeight(width, showFooter),
  });

  return (
    <Box className={classes.inBuildAppSidebar}>
      <Box className={classes.inBuildAppSidebarHeader}>
        <Button className={classes.addTaskBtn} variant="contained" color="primary" onClick={handleCreateNew}>
          <AddCircle />
          <Box component="span" className="add-task-btn-text">
            Create Role
          </Box>
        </Button>
      </Box>

      <PerfectScrollbar style={{ height: '100%' }}>
        <List component="nav" className={classes.appNav}>
          {/*<ListItem component="div" className={classes.appNavHeaderItem}>*/}
          {/*  <Box component="span" className={classes.appNavHeaderItemText}>*/}
          {/*    Roles*/}
          {/*  </Box>*/}
          {/*</ListItem>*/}
          {roles.length !== 0 ? (
            <CmtList
              data={roles}
              renderRow={(item, index) => (
                <Role
                  key={index}
                  item={item}
                  classes={classes}
                  selectedItem={selectedRole}
                  onChange={onChangeRole}
                  onDeleteRole={onDeleteRole}
                />
              )}
            />
          ) : (
            <ListItem>
              <ListItemText inset>No Roles Found!</ListItemText>
            </ListItem>
          )}
        </List>
      </PerfectScrollbar>
    </Box>
  );
};

export default RolesSidebar;

RolesSidebar.prototype = {
  onClickCreateContact: PropTypes.func,
};
