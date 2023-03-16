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
import { validatePermission } from '../../../../@jumbo/utils/commonHelper';
import { PERMISSIONS } from '../../../../@jumbo/constants/RolesConstants';
import { useSelector } from 'react-redux';
import RoleBasedGuard from '../../../../@jumbo/hocs/RoleAuth';

const getUserActions = permissions => {
  let actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (validatePermission(PERMISSIONS.SUBSIDIARY.UPDATE, permissions)) {
    actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  }
  if (validatePermission(PERMISSIONS.SUBSIDIARY.DELETE, permissions)) {
    actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  }
  return actions;
};

const SubsidiaryList = props => {
  const { subsidiaries, classes, onAddSubsidiary, onUpdateSubsidiary, onDeleteSubsidiary } = props;
  const { userRole } = useSelector(({ auth }) => auth);
  const userActions = getUserActions(userRole?.permissions);
  const onSubsidiaryMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      //  onSubsidiaryView(row);
    } else if (menu.action === 'edit') {
      onUpdateSubsidiary(data);
    } else if (menu.action === 'delete') {
      onDeleteSubsidiary(data);
    }
  };
  function actionLink({ data, rowIndex }) {
    return (
      <CmtDropdownMenu
        items={userActions}
        onItemClick={menu => onSubsidiaryMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz />}
      />
    );
  }
  return (
    <>
      <DataGrid
        id="subsidiaries"
        columnAutoWidth={true}
        dataSource={subsidiaries}
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
          caption="Subsidiary Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="description"
          minWidth={100}
          caption="Description"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="country"
          minWidth={100}
          caption="Country"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="city"
          minWidth={100}
          caption="City"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          visible={false}
          dataField="subsidiaryHead"
          minWidth={100}
          caption="Subsidiary Head"
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
            <RoleBasedGuard permission={PERMISSIONS.SUBSIDIARY.CREATE}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={onAddSubsidiary}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <AddCircle /> Add Subsidiary
              </Button>
            </RoleBasedGuard>
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default SubsidiaryList;
