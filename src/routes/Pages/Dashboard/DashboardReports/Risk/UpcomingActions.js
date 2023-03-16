import React, { useState, useEffect } from 'react';
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Item,
  Pager,
  Paging,
  SearchPanel,
  StateStoring,
  Toolbar,
} from 'devextreme-react/data-grid';
import { Button, Chip, Typography } from '@material-ui/core';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../../index.style';
import { Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../../@coremat/CmtDropdownMenu';
import { validatePermission } from '../../../../../@jumbo/utils/commonHelper';
import { PERMISSIONS } from '../../../../../@jumbo/constants/RolesConstants';
import { useSelector } from 'react-redux';
import RoleBasedGuard from '../../../../../@jumbo/hocs/RoleAuth';
import { MdCalculate } from 'react-icons/md';
import { assessRiskUniverse, fetchRisks } from '../../../../../redux/actions/RiskUniverse';
import { useDispatch } from 'react-redux';

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
const UpcomingActions = props => {
  const dispatch = useDispatch();
  const { setOpenDialog, onViewRisk, onUpdateRisk, onDeleteRisk, onAssessRisk } = props;
  const { risks } = useSelector(({ riskUniverse }) => riskUniverse);
  const { userRole } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const userActions = data => getActions(userRole?.permissions);
  const rootCauseFunc = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
  };
  const riskImpactFunc = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
  };
  const actionFunc = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
  };
  const actionAdditionalControls = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.action}</li>);
  };
  const actionRiskOwners = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.name}</li>);
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
    } 
    // else if (menu.action === 'edit') {
    //   onUpdateRisk(data);
    // } 
    // else if (menu.action === 'delete') {
    //   onDeleteRisk(data);
    // } 
    // else if (menu.action === 'assess') {
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

  function assessAction({ data }) {
    const calculateAssessment = data => {
      const formData = {
        riskProbabilityId: data.riskProbabilityId,
        riskSeverityId: data.riskSeverityId,
      };
      dispatch(assessRiskUniverse(formData));
    };
    return (
      <Button onClick={() => calculateAssessment(data)} variant="outlined" size="small" color="primary">
        Calculate Risk
      </Button>
    );
  }

  const formatAmount = ({ displayValue,data }) =>{
    let amount = data.riskImpactAmount;
    displayValue = String(amount).replace(/(.)(?=(\d{3})+$)/g,'$1,')
    return (
      <Typography>{displayValue}</Typography>
    )
  }

  useEffect(() => {
    dispatch(fetchRisks());
  }, []);


  function probabilityColor({ displayValue, data }) {
    return <Typography style={{ color: data?.riskProbabilityColor }}>{displayValue}</Typography>;
  }

  function severityColor({ displayValue, data }) {
    return <Typography style={{ color: data?.riskSeverityColor }}>{displayValue}</Typography>;
  }

  function velocityColor({ displayValue, data }) {
    return <Typography style={{ color: data?.riskVelocityColor }}>{displayValue}</Typography>;
  }

  function inherentColor({ displayValue, data }) {
    return <Typography style={{ color: data?.inherentRiskColor }}>{displayValue}</Typography>;
  }

  function residualColor({ displayValue, data }) {
    return <Typography style={{ color: data?.residualRiskColor }}>{displayValue}</Typography>;
  }

  return (
    <>
      <DataGrid
        id="risks"
        columnAutoWidth={true}
        dataSource={risks}
        showColumnLines={true}
        wordWrapEnabled={true}
        height={'80vh'}
        showRowLines={true}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        {/*<FilterRow visible={true} />*/}
        <StateStoring enabled={false} type="localStorage" storageKey="risks" />
        {/*<FilterPanel visible={true} />*/}
        <SearchPanel visible={true} />
        <ColumnChooser enabled={true} mode="select" />
        <HeaderFilter visible={true} allowSearch={true} />
        <ColumnFixing enabled={true} />
        {/* <Column dataField="id" caption="Risk ID" key="id" visible={true} cellRender={actionViewLink} /> */}
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
          width={150}
          fixed={true}
          fixedPosition="left"
          caption="Risk Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={actionViewLink}
          allowFiltering={false}
        />
        <Column
          fixed={true}
          fixedPosition="left"
          dataField="riskScore"
          width={250}
          caption="Risk Rating"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="additionalControlActions"
          minWidth={200}
          caption="Action Plan"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          allowHiding={true}
          cellRender={actionAdditionalControls}
        />
        <Column
          dataField="categoryName"
          minWidth={150}
          caption="Risk Category"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="departmentName"
          minWidth={150}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={risks.department}
        />
        <Column
          dataField="sectionName"
          minWidth={150}
          caption="Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="rootCauses"
          minWidth={300}
          caption="Root Causes"
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={rootCauseFunc}
          allowFiltering={false}
        />
        <Column dataField="riskImpact" minWidth={200} caption="Risk Impact" cellRender={riskImpactFunc} />
        <Column
          dataField="riskImpactAmount"
          minWidth={200}
          caption="Risk Impact Amount"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={formatAmount}
        />
        <Column
          dataField="riskCategoryControlActualCategoryControlName"
          minWidth={200}
          caption="Control Category"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="controlActions"
          minWidth={300}
          caption="Existing Mitigations/Control"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={actionFunc}
        />
        <Column
          dataField="additionalControlActions"
          minWidth={500}
          caption="Additional Mitigations/Control"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={actionAdditionalControls}
        />
        <Column
          dataField="lossTypeActualLossTypeName"
          minWidth={150}
          caption="Loss Type"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskOwners"
          minWidth={200}
          caption="Risk Owner"
          cellRender={actionRiskOwners}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="keyIndicatorFrequencyName"
          minWidth={150}
          caption="Risk Indicator"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskAppetiteAmount"
          minWidth={150}
          caption="Risk Appetite"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="previousResidualRisk"
          minWidth={150}
          caption="Previous Residual"
          allowHeaderFiltering={true}
          visible={false}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskProbabilityActualName"
          minWidth={150}
          caption="Probability"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={probabilityColor}
        />
        <Column
          dataField="riskSeverityActualName"
          minWidth={150}
          caption="Severity"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={severityColor}
        />
        <Column
          dataField="riskVelocityName"
          minWidth={150}
          caption="Velocity"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={velocityColor}
        />
        <Column
          dataField="inherentRisk"
          minWidth={150}
          caption="Inherent"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={inherentColor}
        />
        <Column
          dataField="riskScore"
          minWidth={150}
          caption="Risk Score"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="residualRisk"
          minWidth={150}
          caption="Residual Risk"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={residualColor}
        />

        {/*<Scrolling rowRenderingMode="virtual" />*/}
        <Paging defaultPageSize={20} />
        <Pager
          visible={true}
          allowedPageSizes={['all', 20, 50, 100]}
          //displayMode={true}
          showPageSizeSelector={true}
          showNavigationButtons={true}
        />
        <Toolbar>
          <Item location="before">
            <Typography color="primary" variant="h3">
              Dashboard - Upcoming Actions
            </Typography>
          </Item>
          {/* <Item location="after">
            <Typography color="primary" variant="h3">
              Risk Rating
            </Typography>
          </Item>
          <Item location="after">
            <Typography color="primary" variant="h3">
              Due Date
            </Typography>
          </Item> */}
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default UpcomingActions;
