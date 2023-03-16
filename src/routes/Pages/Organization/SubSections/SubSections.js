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
  if (validatePermission(PERMISSIONS.SUB_SECTION.UPDATE, permissions)) {
    actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  }
  if (validatePermission(PERMISSIONS.SUB_SECTION.DELETE, permissions)) {
    actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  }
  return actions;
};

const SubSectionList = props => {
  const { subSections, classes, onAddSubSection, onUpdateSubSection, onDeleteSubSection } = props;
  const { userRole } = useSelector(({ auth }) => auth);
  const userActions = getUserActions(userRole?.permissions);
  const onSubSectionMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      //  onSectionView(row);
    } else if (menu.action === 'edit') {
      onUpdateSubSection(data);
    } else if (menu.action === 'delete') {
      onDeleteSubSection(data);
    }
  };
  function actionLink({ data, rowIndex }) {
    return (
      <CmtDropdownMenu
        items={userActions}
        onItemClick={menu => onSubSectionMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz />}
      />
    );
  }
  return (
    <>
      <DataGrid
        id="sub-sections"
        columnAutoWidth={true}
        dataSource={subSections}
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
          caption="Sub-Section Name"
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
          dataField="companyName"
          minWidth={100}
          caption="Subsidiary Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="departmentsName"
          minWidth={100}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="sectionName"
          minWidth={100}
          caption="Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="subSectionHead"
          minWidth={100}
          caption="Sub-section Head"
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
            <RoleBasedGuard permission={PERMISSIONS.SUB_SECTION.CREATE}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={onAddSubSection}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <AddCircle /> Add Sub-Section
              </Button>
            </RoleBasedGuard>
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default SubSectionList;
