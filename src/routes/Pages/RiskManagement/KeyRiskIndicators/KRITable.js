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
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { FileUpload } from '@mui/icons-material';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIndicator } from '../../../../redux/actions/RiskIndicator';
import { PERMISSIONS } from '../../../../@jumbo/constants/RolesConstants';
import { MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';

const getActions = permissions => {
  let actions = [{ action: 'view', label: 'View History', icon: <Visibility /> }];
  return actions;
};

const KRITable = props => {
  const { indicators } = useSelector(({ indicators }) => indicators);
  const dispatch = useDispatch();
  const history = useHistory();
  const { userRole } = useSelector(({ auth }) => auth);
  const userActions = data => getActions(userRole?.permissions);
  const classes = useStyles();
  const { risks } = props;

  const onMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      history.push({ pathname: '/risk-indicators/history', state: data });
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

  const getRiskIndicators = async () => {
    await dispatch(fetchIndicator());
  };

  useEffect(() => {
    getRiskIndicators();
  }, []);

  

  return (
    <>
      <DataGrid
        id="kris"
        columnAutoWidth={true}
        dataSource={indicators}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        height={'70vh'}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <ColumnChooser enabled={true} />
        <StateStoring enabled={false} type="localStorage" storageKey="storage" />
        <HeaderFilter visible={true} allowSearch={true} />
        {/* <Column dataField="id" caption="Risk ID" key="id" visible={true} /> */}
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
          dataField="riskUniverseTitle"
          minWidth={100}
          caption="Risk Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskCategoryName"
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
          dataField="riskAppetiteTypeName"
          minWidth={100}
          caption="Risk Appetite"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskAppetiteAmount"
          minWidth={100}
          caption="Risk Appetite Amount"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskAppetiteDirection"
          minWidth={100}
          caption="Risk Appetite Direction"
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
          <Item location="after" name="columnChooserButton" />
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default KRITable;
