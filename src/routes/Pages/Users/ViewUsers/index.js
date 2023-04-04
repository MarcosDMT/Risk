import React, { useEffect, useState } from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import useStyles from '../../index.style';
import { Box, Paper, Typography } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import UsersList from './Users';

import ImportUsers from '../BulkUsersImport';
import ViewUser from './ViewUser';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  deactivateUser,
  deleteUser,
  fetchUsers,
  resetUserPassword,
  updateUserStatus,
} from '../../../../redux/actions/Users';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.USERS, isActive: true },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Users = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector(({ users }) => users);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
  };
  const onViewUser = data => {
    setOpenDrawer(true);
    setUserDetails(data);
  };
  const onUpdateUser = data => {
    history.push({ pathname: '/users/update-user', state: data });
  };
  const onDeactivateUser = data => {
    dispatch(
      deactivateUser({
        activateUser: false,
        userId: data.id,
      }),
    );
  };
  const onResetPassword = user => {
    dispatch(resetUserPassword(user));
  };
  const onStatusChange = user => {
    dispatch(updateUserStatus(user));
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.USERS} breadcrumbs={breadcrumbs}>
        <div className={classes.root}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Internal Users" {...a11yProps(0)} />
              <Tab label="External Users" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Paper className={classes.paper}>
              <Box padding={5}>
                <UsersList
                  {...{
                    users,
                    setOpenDialog,
                    onViewUser,
                    onUpdateUser,
                    onDeactivateUser,
                    onResetPassword,
                    onStatusChange,
                    classes,
                  }}
                />
              </Box>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            External Datagrid
            {/* <Paper className={classes.paper}>
              <Box padding={5}>
                <UsersList
                  {...{
                    users,
                    setOpenDialog,
                    onViewUser,
                    onUpdateUser,
                    onDeactivateUser,
                    onResetPassword,
                    onStatusChange,
                    classes,
                  }}
                />
              </Box>
            </Paper> */}
          </TabPanel>
        </div>
      </PageContainer>
      <NotificationContainer />
      <ImportUsers {...{ openDialog, onCloseDialog, activeStep, setActiveStep, file, setFile, users }} />
      <ViewUser {...{ userDetails, openDrawer, onCloseDrawer }} />
    </React.Fragment>
  );
};

export default Users;
