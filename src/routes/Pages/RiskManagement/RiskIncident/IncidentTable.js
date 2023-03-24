import React, { useEffect, useState } from 'react';
import {
  Column,
  ColumnChooser,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Item,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  StateStoring,
  Toolbar,
} from 'devextreme-react/data-grid';
import { Link } from 'react-router-dom';
import { Button, Chip } from '@material-ui/core';
import { AddCircle, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { validatePermission } from '../../../../@jumbo/utils/commonHelper';
import { PERMISSIONS } from '../../../../@jumbo/constants/RolesConstants';
import { useSelector, useDispatch } from 'react-redux';
import RoleBasedGuard from '../../../../@jumbo/hocs/RoleAuth';
import { fetchIncidents } from '../../../../redux/actions/RiskIncident';
import { Typography } from '@mui/material';


const getActions = permissions => {
  let actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (validatePermission(PERMISSIONS.RISK_INCIDENT.UPDATE, permissions)) {
    actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  }
  if (validatePermission(PERMISSIONS.RISK_INCIDENT.DELETE, permissions)) {
    actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  }
  return actions;
};
const IncidentTable = props => {
  const { onViewIncident, onUpdateIncident, onDeleteIncident } = props;
  const dispatch = useDispatch();
  const { userRole } = useSelector(({ auth }) => auth);
  const { incidents } = useSelector(({ incidents }) => incidents);
  const userActions = data => getActions(userRole?.permissions);
  const classes = useStyles();
  function actionStatus({ displayValue }) {
    let color;
    if (displayValue === 'Approved') {
      color = 'green';
    } else if (displayValue === 'Pending') {
      color = 'orange';
    } else if (displayValue === 'Rejected') {
      color = 'red';
    }

    return <Chip style={{ color: color, borderColor: color }} size={'small'} variant={'outlined'} label={displayValue} />;
  }
  const onMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      onViewIncident(data);
    } else if (menu.action === 'edit') {
      onUpdateIncident(data);
    } else if (menu.action === 'delete') {
      onDeleteIncident(data);
    }
  };
  function actionLink({ data, rowIndex }) {
    return (
      <CmtDropdownMenu
        items={userActions(data)}
        onItemClick={menu => onMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz />}
      />
    );
  }
  function actionViewLink({ data, displayValue }) {
    return (
      <a
        href={'#'}
        onClick={e => {
          e.preventDefault();
          onViewIncident(data);
        }}>
        {displayValue}
      </a>
    );
  }

  const actionIncidentOwners = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
  };

  const incidentActions = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
  };

  const convertDate = ({ displayValue,data})=>{
    let formattedDate = data.incidentDate;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>
  }

  return (
    <>
      <DataGrid
        id="incidents"
        columnAutoWidth={true}
        dataSource={incidents}
        showColumnLines={true}
        showRowLines={true}
        height={'75vh'}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <ColumnChooser enabled={true} />
        <StateStoring enabled={false} type="localStorage" storageKey="incidents" />
        <HeaderFilter visible={true} allowSearch={true} />
        <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
        <Column
          dataField="riskEvent"
          minWidth={100}
          caption="Risk Event"
          visible={false}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="incidentTitle"
          minWidth={100}
          caption="Incident Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="narration"
          minWidth={100}
          caption="Incident Narration"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        {/* <Column
          dataField="status"
          minWidth={100}
          caption="Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={actionStatus}
        /> */}
        <Column
          dataField="incidentDate"
          minWidth={100}
          caption="Incident Date"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={convertDate}
        />
        <Column
          dataField="riskCategoryControlActualCategoryControlName"
          minWidth={100}
          caption="Risk Category"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="lossTypeActualLossTypeName"
          minWidth={100}
          caption="Loss Type"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="lossTypeQuantityTypeName"
          minWidth={100}
          caption="Loss Type Measure"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="lossTypeQuantity"
          minWidth={100}
          caption="Loss Type Quantity"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="incidentActions"
          minWidth={100}
          caption="Incident Action"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={incidentActions}
        />
        <Column
          dataField="incidentOwners"
          minWidth={100}
          caption="Incident Owner"
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={actionIncidentOwners}
          allowFiltering={false}
        />
        <Column
          dataField="actionDate"
          minWidth={100}
          caption="Action Date"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={convertDate}
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
            <RoleBasedGuard permission={PERMISSIONS.RISK_INCIDENT.CREATE}>
              <Link to={'risk-incident/create-incident'}>
                <Button
                  variant="contained"
                  size={'small'}
                  className={classes.btn}
                  //onClick={onAddUser}
                  color="primary"
                  // style={{ marginBottom: '10px' }}
                  >
                  <AddCircle /> Create Incident
                </Button>
              </Link>
            </RoleBasedGuard>
          </Item>
          
          <Item location="after" name="columnChooserButton" />
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default IncidentTable;
