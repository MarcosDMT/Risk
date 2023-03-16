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
import { AddCircle, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { validatePermission } from '../../../../@jumbo/utils/commonHelper';
import { PERMISSIONS } from '../../../../@jumbo/constants/RolesConstants';
import RoleBasedGuard from '../../../../@jumbo/hocs/RoleAuth';

const getUserActions = permissions => {
  let actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (validatePermission(PERMISSIONS.DEPARTMENT.UPDATE, permissions)) {
    actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  }
  if (validatePermission(PERMISSIONS.DEPARTMENT.DELETE, permissions)) {
    actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  }
  return actions;
};

const DepartmentList = props => {
  const { departments, classes, onAddDepartment, onUpdateDepartment, onDeleteDepartment,onViewDepartment } = props;
  const { userRole } = useSelector(({ auth }) => auth);
  const userActions = getUserActions(userRole?.permissions);
  const onDeptMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      onViewDepartment(data)
    } else if (menu.action === 'edit') {
      onUpdateDepartment(data);
    } else if (menu.action === 'delete') {
      onDeleteDepartment(data);
    }

    console.log("Department", data)
  };
  function actionLink({ data, rowIndex }) {
    return (
      <CmtDropdownMenu
        items={userActions}
        onItemClick={menu => onDeptMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz />}
      />
    );
  }
  return (
    <>
      <DataGrid
        id="departments"
        columnAutoWidth={true}
        dataSource={departments}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <Column dataField="id" key="id" visible={false} />
        <Column
          dataField="name"
          minWidth={100}
          caption="Department Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="departmentHead"
          minWidth={100}
          caption="Department Head"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="companyName"
          minWidth={100}
          caption="Subsidiary"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
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
            <RoleBasedGuard permission={PERMISSIONS.DEPARTMENT.CREATE}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={onAddDepartment}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <AddCircle /> Add Department
              </Button>
            </RoleBasedGuard>
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default DepartmentList;
