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
  if (validatePermission(PERMISSIONS.SECTION.UPDATE, permissions)) {
    actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  }
  if (validatePermission(PERMISSIONS.SECTION.DELETE, permissions)) {
    actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  }
  return actions;
};

const SectionList = props => {
  const { sections, classes, onAddSection, onUpdateSection, onDeleteSection } = props;
  const { userRole } = useSelector(({ auth }) => auth);
  const userActions = getUserActions(userRole?.permissions);
  const onSectionMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      //  onSectionView(row);
    } else if (menu.action === 'edit') {
      onUpdateSection(data);
    } else if (menu.action === 'delete') {
      onDeleteSection(data);
    }
  };
  function actionLink({ data, rowIndex }) {
    return (
      <CmtDropdownMenu
        items={userActions}
        onItemClick={menu => onSectionMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz />}
      />
    );
  }
  return (
    <>
      <DataGrid
        id="sections"
        columnAutoWidth={true}
        dataSource={sections}
        height={'80vh'}
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
          caption="Section Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="description"
          minWidth={100}
          caption="Description"
          visible={false}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="companyName"
          minWidth={100}
          caption="Company Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="departmentsName"
          minWidth={100}
          caption="Department Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="sectionHead"
          minWidth={100}
          caption="Section Head"
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
            <RoleBasedGuard permission={PERMISSIONS.SECTION.CREATE}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={onAddSection}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <AddCircle /> Add Section
              </Button>
            </RoleBasedGuard>
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default SectionList;
