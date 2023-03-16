import React, { useState } from 'react';
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
import { Box, Button, Chip } from '@material-ui/core';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import { AddCircle, Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';

import IconButton from '@material-ui/core/IconButton';
import RoleBasedGuard from '../../../../@jumbo/hocs/RoleAuth';
import { PERMISSIONS } from '../../../../@jumbo/constants/RolesConstants';
const getActions = permissions => {
  const actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  return actions;
};
const AssessmentTable = props => {
  const { risks, onViewRisk, onUpdateRisk, onDeleteRisk } = props;
  const classes = useStyles();
  const userActions = data => getActions(data);
  const multipleValues = ({ displayValue }) => {
    return displayValue.map((value, index) => <li key={index}>{value}</li>);
  };
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
      onViewRisk(data);
    } else if (menu.action === 'edit') {
      onUpdateRisk(data);
    } else if (menu.action === 'delete') {
      onDeleteRisk(data);
    }
  };
  function actionLink({ data, rowIndex }) {
    return (
      // <CmtDropdownMenu
      //   items={userActions(data)}
      //   onItemClick={menu => onMenuClick(menu, data)}
      //   TriggerComponent={<MoreHoriz />}
      // />
      <IconButton onClick={e => onViewRisk(data)}>
        <Visibility />
      </IconButton>
    );
  }
  function actionViewLink({ data, displayValue }) {
    return (
      <a
        href={'#'}
        onClick={e => {
          e.preventDefault();
          onViewRisk(data);
        }}>
        {displayValue}
      </a>
    );
  }

  return (
    <>
      <DataGrid
        id="risk-assessment"
        columnAutoWidth={true}
        dataSource={risks}
        showColumnLines={true}
        // wordWrapEnabled={true}
        showRowLines={true}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <StateStoring enabled={false} type="localStorage" storageKey="risk-assessment" />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <ColumnChooser enabled={true} mode="select" />
        <HeaderFilter visible={true} allowSearch={true} />
        <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
        {/* <Column dataField="id" caption="Risk ID" key="id" visible={true} cellRender={actionViewLink} /> */}
        <Column
          dataField="riskTitle"
          width={150}
          caption="Risk Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={actionViewLink}
          allowFiltering={false}
        />
        <Column
          dataField="riskEvent"
          width={200}
          caption="Risk Event"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="status"
          minWidth={100}
          caption="Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          visible={false}
          cellRender={actionStatus}
        />
        <Column
          dataField="riskCategory"
          minWidth={100}
          caption="Risk Category"
          visible={false}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="departmentName"
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
          dataField="subSectionName"
          minWidth={100}
          caption="Sub-Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskProbabilityActualName"
          minWidth={100}
          caption="Probability"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskSeverityActualName"
          minWidth={100}
          caption="Severity"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="residualRisk"
          minWidth={100}
          caption="Residual Risk"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />

        <Column
          dataField="keyIndicator"
          minWidth={100}
          caption="Risk Indicator"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}
        />
        <Column
          dataField="riskAppetite"
          minWidth={100}
          visible={false}
          caption="Risk Appetite"
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
            <RoleBasedGuard permission={PERMISSIONS.RISK_UNIVERSE.ACCESS}>
              <Link to={'../risk-universe'}>
                <Button
                  variant="contained"
                  size={'small'}
                  className={classes.btn}
                  color="primary"
                  style={{ marginBottom: '10px' }}>
                  Risk Universe
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

export default AssessmentTable;
