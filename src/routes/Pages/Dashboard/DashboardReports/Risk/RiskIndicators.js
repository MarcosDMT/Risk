import React, { useState, useEffect } from 'react';
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
import { Button, Typography, Grid } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { FileUpload } from '@mui/icons-material';
import { DataGrid } from 'devextreme-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRisks } from '../../../../../redux/actions/RiskUniverse';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import { Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import { validatePermission } from '../../../../../@jumbo/utils/commonHelper';
import { PERMISSIONS } from '../../../../../@jumbo/constants/RolesConstants';
import { MdCalculate } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
// import useStyles from '../../index.style';

const getActions = permissions => {
  let actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  // if (validatePermission(PERMISSIONS.RISK_UNIVERSE.UPDATE, permissions)) {
  //   actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  // }
  // if (validatePermission(PERMISSIONS.RISK_UNIVERSE.DELETE, permissions)) {
  //   actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  // }
  // if (validatePermission(PERMISSIONS.RISK_UNIVERSE.ASSESS, permissions)) {
  //   actions.push({ action: 'assess', label: 'Assess', icon: <MdCalculate /> });
  // }
  return actions;
};

const RiskIndicators = props => {
  // const classes = useStyles();
  const { setOpenDialog, onViewRisk } = props;
  const dispatch = useDispatch();
  const { risks } = useSelector(({ riskUniverse }) => riskUniverse);
  const userActions = data => getActions(userRole?.permissions);
  const { userRole } = useSelector(({ auth }) => auth);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchRisks());
  }, []);

  const actionRiskOwners = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
  };

  const onUpdateRisk = data => {
    history.push({ pathname: '/risk-universe/update-risk', state: data });
  };
  const onAssessRisk = data => {
    history.push({ pathname: '/risk-universe/assess-risk', state: data });
  };
  const onDeleteRisk = data => {
    console.log(data);
  };

  const onMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      onViewRisk(data);
    } 
    // else if (menu.action === 'edit') {
    //   onUpdateRisk(data);
    // } 
    // else if (menu.action === 'delete') {
    //   onDeleteRisk(data);
    // }
    //  else if (menu.action === 'assess') {
    //   onAssessRisk(data);
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

  return (
    <>
      <Grid style={{ marginTop: '40px' }}>
        <DataGrid
          id="kris"
          columnAutoWidth={true}
          dataSource={risks}
          showColumnLines={true}
          height={'75vh'}
          showRowLines={true}
          showBorders={true}
          allowColumnResizing={true}
          rowAlternationEnabled={true}>
          <FilterRow visible={true} />
          <FilterPanel visible={true} />
          <SearchPanel visible={true} />
          <ColumnChooser enabled={true} />
          <StateStoring enabled={false} type="localStorage" storageKey="storage" />
          <HeaderFilter visible={true} allowSearch={true} />
          <Column
            fixed={true}
            fixedPosition="left"
            caption="Action"
            width={120}
            alignment={'center'}
            allowFiltering={false}
            cellRender={actionLink}
          />
          <Column
            dataField="riskTitle"
            minWidth={100}
            caption="Risk Title"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
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
            dataField="departmentName"
            minWidth={100}
            caption="Department"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="riskIndicator"
            minWidth={100}
            caption="Risk Indicator"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="riskAppetiteAmount"
            minWidth={100}
            caption="Risk Appetite"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="previousStatus"
            minWidth={100}
            caption="Previous Status"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="currentStatus"
            minWidth={100}
            caption="Current Status"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="riskDirection"
            minWidth={100}
            caption="Risk Direction"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="riskOwners"
            minWidth={100}
            caption="Risk Owner"
            allowHeaderFiltering={true}
            allowSearch={true}
            cellRender={actionRiskOwners}
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
                Dashboard - Risk Indicators
              </Typography>
            </Item>
            {/* <Item location="after">
              <Typography color="primary" variant="h3">
                Trend
              </Typography>
            </Item>
            <Item location="after">
              <Typography color="primary" variant="h3">
                Quarterly
              </Typography>
            </Item> */}
          </Toolbar>
        </DataGrid>
      </Grid>
    </>
  );
};

export default RiskIndicators;
