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
import { Button, Chip, Typography, Grid } from '@material-ui/core';
import { AddCircle, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../../index.style';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import { validatePermission } from '../../../../../@jumbo/utils/commonHelper';
import { PERMISSIONS } from '../../../../../@jumbo/constants/RolesConstants';
import { useSelector, useDispatch } from 'react-redux';
import RoleBasedGuard from '../../../../../@jumbo/hocs/RoleAuth';
import { fetchIncidents } from '../../../../../redux/actions/RiskIncident';
import moment from 'moment';

const getActions = permissions => {
  let actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  // if (validatePermission(PERMISSIONS.RISK_INCIDENT.UPDATE, permissions)) {
  //   actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  // }
  // if (validatePermission(PERMISSIONS.RISK_INCIDENT.DELETE, permissions)) {
  //   actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  // }
  return actions;
};
const IncidentReport = props => {
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
    } 
    // else if (menu.action === 'edit') {
    //   onUpdateIncident(data);
    // } 
    // else if (menu.action === 'delete') {
    //   onDeleteIncident(data);
    // }
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

  const formatDate = ({ displayValue, data }) =>{
    const initialDate = data.incidentDate;
    displayValue = new Date(initialDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>
  }

  useEffect(() => {
    dispatch(fetchIncidents());
  }, []);

  return (
    <>
      <Grid style={{ marginTop: '40px' }}>
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
            dataType={'date'}
            format={'dd/MM/yyyy'}
            allowFiltering={false}
            // cellRender={formatDate}
          />
          <Column
            dataField="riskCategoryControlActualCategoryControlName"
            minWidth={100}
            caption="Risk Control Category"
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
            dataField="lossTypeMeasure"
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
            dataField="incidentAction"
            minWidth={100}
            caption="Incident Action"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
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
              <Typography color="primary" variant="h3">
                Risk Incident
              </Typography>
            </Item>
          </Toolbar>
        </DataGrid>
      </Grid>
    </>
  );
};

export default IncidentReport;
