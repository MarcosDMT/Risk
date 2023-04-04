import React from 'react';
import { DataGrid } from 'devextreme-react';
import {
  Column,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Item,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  Toolbar,
} from 'devextreme-react/data-grid';
import { AddCircle, Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { Button, Chip } from '@material-ui/core';
import { Check, FileUpload, LockResetRounded } from '@mui/icons-material';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Link } from 'react-router-dom';
import { getAccountStatus, validatePermission } from '../../../../@jumbo/utils/commonHelper';
import RoleBasedGuard from '../../../../@jumbo/hocs/RoleAuth';
import { PERMISSIONS } from '../../../../@jumbo/constants/RolesConstants';
import { useSelector } from 'react-redux';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

const getUserActions = (permissions, data) => {
  let actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (validatePermission(PERMISSIONS.USER.UPDATE, permissions)) {
    actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
    if (data.isActive) {
      actions.push({ action: 'disable', label: 'Disable', icon: <Cancel /> });
    } else {
      actions.push({ action: 'activate', label: 'Activate', icon: <Check /> });
    }
    actions.push({ action: 'reset-password', label: 'Reset Password', icon: <LockResetRounded /> });
  }
  if (validatePermission(PERMISSIONS.USER.DELETE, permissions)) {
    actions.push({ action: 'deactivate', label: 'Deactivate', icon: <ToggleOffIcon /> });
  }

  return actions;
};

const UsersList = props => {
  const {
    users,
    classes,
    onViewUser,
    onUpdateUser,
    onDeactivateUser,
    onStatusChange,
    onResetPassword,
    setOpenDialog,
  } = props;
  const userActions = (permissions, data) => getUserActions(permissions, data);
  const { userRole } = useSelector(({ auth }) => auth);
  const onSubSectionMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      onViewUser(data);
    } else if (menu.action === 'edit') {
      onUpdateUser(data);
    } else if (menu.action === 'deactivate') {
      onDeactivateUser(data);
    } else if (menu.action === 'disable' || menu.action === 'activate') {
      onStatusChange(data);
    } else if (menu.action === 'reset-password') {
      onResetPassword(data);
    }
  };
  function actionLink({ data, rowIndex }) {
    return (
      <CmtDropdownMenu
        items={userActions(userRole?.permissions, data)}
        onItemClick={menu => onSubSectionMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz />}
      />
    );
  }
  function actionNumber({ rowIndex }) {
    return rowIndex + 1;
  }
  function profilePic({ data }) {
    return (
      <CmtAvatar size={40} color={'primary'} src={data.imageUrl} onClick={e => onViewUser(data)} alt={data.firstName} />
    );
  }
  function actionStatus({ data, displayValue }) {
    let status = getAccountStatus(displayValue);

    return (
      <Chip
        style={{ color: status.color, borderColor: status.color }}
        size={'small'}
        variant={'outlined'}
        label={status.label}
      />
    );
  }

  const viewDepartment = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map((value, index) => <li key={index}>{value.departmentName}</li>);
  };

  // filter active users
  let activeUsers = users.filter(user => user.isActive === true);

  return (
    <>
      <DataGrid
        id="users"
        columnAutoWidth={true}
        dataSource={activeUsers}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        height="80vh"
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <Column dataField="id" key="id" visible={false} />
        <Column caption="#" width={50} visible={false} allowFiltering={false} cellRender={actionNumber} />
        <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
        <Column caption="Profile" width={100} allowFiltering={false} cellRender={profilePic} />
        <Column
          dataField="firstName"
          minWidth={100}
          caption="First Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="lastName"
          minWidth={100}
          caption="Last Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="companyName"
          minWidth={100}
          caption="Company"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={viewDepartment}
        />
        <Column
          dataField="isActive"
          minWidth={100}
          caption="Status"
          cellRender={actionStatus}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="roleName"
          minWidth={100}
          caption="Role"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />

        <Scrolling rowRenderingMode="virtual" />
        <Paging defaultPageSize={20} />
        <Pager
          visible={true}
          // allowedPageSizes={allowedPageSizes}
          displayMode={true}
          showPageSizeSelector={false}
          showInfo={true}
          showNavigationButtons={true}
        />
        <Toolbar>
          <Item location="before">
            <RoleBasedGuard permission={PERMISSIONS.USER.CREATE}>
              <Link to={'users/create-user'}>
                <Button
                  variant="contained"
                  size={'small'}
                  className={classes.btn}
                  color="primary"
                  style={{ marginBottom: '10px' }}>
                  <AddCircle /> Add User
                </Button>
              </Link>
            </RoleBasedGuard>
          </Item>
          <Item location="before">
            <RoleBasedGuard permission={PERMISSIONS.USER.CREATE}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={e => setOpenDialog(true)}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <FileUpload /> Import Users
              </Button>
            </RoleBasedGuard>
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default UsersList;
