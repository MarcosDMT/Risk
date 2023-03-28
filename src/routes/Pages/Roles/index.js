import React, { useEffect, useState } from 'react';
import { HEADER } from '../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import useStyles from './index.style';
import { Box, Button, Typography } from '@material-ui/core';
import RolesSidebar from './SideBar';
import CmtSearch from '../../../@coremat/CmtSearch';
import clsx from 'clsx';
import Privileges from './Privileges';
import CmtImage from '../../../@coremat/CmtImage';
import { NotificationContainer } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { addRole, fetchPermissions, fetchRoles, filterRoles, updateRole } from '../../../redux/actions/Roles';
import Hidden from '@material-ui/core/Hidden';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.ROLES, active: true },
];

const AppHeader = props => {
  const classes = useStyles();
  const { showForm, handleOnCancel, isEditable, setIsEditable, searchRole, setSearchRole } = props;
  return (
    <Box className={classes.inBuildAppHeader}>
      <Box className={classes.inBuildAppHeaderSidebar}>
        <CmtImage src={'/images/roles.png'} style={{ width: '50px' }} />
        <Typography className={classes.inBuildAppHeaderTitle} component="div" variant="h1">
          Roles
        </Typography>
      </Box>
      <Box className={classes.inBuildAppHeaderContent}>
        <Hidden smDown>
          <CmtSearch
            className={classes.searchActionBarModified}
            placeholder="Search Role..."
            border={true}
            onChange={e => setSearchRole(e.target.value)}
            value={searchRole}
          />
        </Hidden>
        {showForm && (
          <Box ml="auto" display="flex" alignItems="center">
            <Box ml={1}>
              <Button
                variant={'outlined'}
                disabled={isEditable}
                color={'primary'}
                style={{ color: 'white' }}
                size={'small'}
                type={'button'}
                onClick={() => setIsEditable(true)}>
                Edit
              </Button>
            </Box>
            <Box ml={1}>
              <Button
                disabled={!isEditable}
                variant={'contained'}
                style={{ backgroundColor: 'green', color: 'white' }}
                size={'small'}
                type={'submit'}>
                Save
              </Button>
            </Box>
            <Box ml={1}>
              <Button
                variant={'contained'}
                style={{ backgroundColor: 'darkred', color: 'white' }}
                size={'small'}
                onClick={handleOnCancel}>
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const Roles = () => {
  const classes = useStyles();
  const { permissions, roles, filteredRoles } = useSelector(({ roles }) => roles);
  const { currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const initialRole = {
    id: '',
    name: '',
    description: '',
    companyId: currentSubsidiary,
    permissions: [],
  };
  const [searchRole, setSearchRole] = useState('');
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  //function to handle on role select action
  const onChangeRole = role => {
    setShowForm(true);
    setIsEditable(false);
    setSelectedRole(role);
    setSelectedPermissions(role.permissions);
  };
  // function to handle on permission check
  const onPermissionSelection = event => {
    const { value, checked } = event.target;
    const data = [...selectedPermissions];
    if (checked) {
      data.push(value);
    } else {
      const index = data.indexOf(value);
      if (index >= 0) {
        data.splice(index, 1);
      }
    }
    setSelectedPermissions(data);
    setSelectedRole({ ...selectedRole, permissions: data });
  };
  const handleOnSelectAll = data => {
    setSelectedPermissions(data);
    setSelectedRole({ ...selectedRole, permissions: data });
  };

  //function to handle onSaveAction

  const handleOnSave = e => {
    e.preventDefault();
    if (selectedRole.id === undefined || selectedRole.id === '') {
      console.log("SELECTED ROLE ",selectedRole)
      dispatch(addRole(selectedRole, () => setIsEditable(false)));
    } else {
      dispatch(updateRole(selectedRole, () => setIsEditable(false)));
    }
  };

  const handleCreateNew = event => {
    setShowForm(true);
    setIsEditable(true);
    setSelectedPermissions([]);
    setSelectedRole(initialRole);
  };
  //function to create on delete role
  const onDeleteRole = () => {};
  //function to handleOnCancel
  const handleOnCancel = () => {
    setShowForm(false);
    setIsEditable(false);
    setSelectedPermissions([]);
    setSelectedRole(initialRole);
  };

  useEffect(() => {
    dispatch(filterRoles(searchRole));
  }, [searchRole]);

  useEffect(() => {
    handleOnCancel();
    dispatch(fetchRoles(currentSubsidiary));
  }, [currentSubsidiary]);

  useEffect(() => {
    dispatch(fetchPermissions());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.ROLES} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard} minHeight={500}>
          <form onSubmit={handleOnSave}>
            <AppHeader {...{ handleOnCancel, showForm, isEditable, setIsEditable, searchRole, setSearchRole }} />
            <Box className={clsx(classes.inBuildAppContainer)}>
              <RolesSidebar {...{ roles, selectedRole, onChangeRole, handleCreateNew, onDeleteRole }} />
              <Privileges
                {...{
                  roles,
                  permissions,
                  onPermissionSelection,
                  selectedRole,
                  handleOnSelectAll,
                  setSelectedRole,
                  showForm,
                  isEditable,
                  setIsEditable,
                }}
              />
            </Box>
          </form>
        </Box>
      </PageContainer>
      <NotificationContainer />
    </React.Fragment>
  );
};

export default Roles;
