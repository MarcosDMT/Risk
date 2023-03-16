import React, { useEffect } from 'react';
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
import { fetchRiskApprovals } from '../../../../redux/actions/RiskUniverse'; 
import { Box, Button, Chip } from '@material-ui/core';
import { Check, FileUpload, LockResetRounded } from '@mui/icons-material';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import { AddCircle, Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { validatePermission } from '../../../../@jumbo/utils/commonHelper';
import { PERMISSIONS } from '../../../../@jumbo/constants/RolesConstants';
import { useSelector,useDispatch } from 'react-redux';
import RoleBasedGuard from '../../../../@jumbo/hocs/RoleAuth';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { approveRiskCompliance } from '../../../../redux/actions/RiskUniverse';

function AlertDialog({ data }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleApprove = (data) =>{
      console.log(data)
      const formData = { id: data.id}
      dispatch(approveRiskCompliance(formData));
    }
  
  
    return (
      <div>
        <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
          Approve
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>Are you sure you want to proceed?</p>
            </DialogContentText>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <Button onClick={handleClose} variant="outlined" color="primary">
                Decline
              </Button>
                <Button onClick={()=> handleApprove(data)} variant="contained" color="primary" autoFocus>
                  Confirm
                </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

const getActions = permissions => {
  let actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (validatePermission(PERMISSIONS.RISK_UNIVERSE.UPDATE, permissions)) {
    actions.push({ action: 'edit', label: 'Edit', icon: <Edit /> });
  }
  if (validatePermission(PERMISSIONS.RISK_UNIVERSE.DELETE, permissions)) {
    actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  }
  return actions;
};
const RiskApprovals = props => {
  const dispatch = useDispatch();
  const { risks } = useSelector(({ riskUniverse}) => riskUniverse);
  const { setOpenDialog, onViewRisk, onUpdateRisk, onDeleteRisk } = props;
  const { userRole } = useSelector(({ auth }) => auth);
  const classes = useStyles();
  const userActions = data => getActions(userRole?.permissions);
  const rootCauseFunc = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.rootCause}</li>);
  };
  const riskImpactFunc = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.riskImpact}</li>);
  };
  const actionFunc = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.action}</li>);
  };
  function actionStatus({ data }) {
    console.log(data);
    return (
        <>
          <AlertDialog  data={data}/>
        </>
      );
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

  useEffect(() => {
    dispatch(fetchRiskApprovals());
   }, []);

  console.log(risks);

  return (
    <>
      <DataGrid
        id="risks"
        columnAutoWidth={true}
        dataSource={risks}
        showColumnLines={true}
        // wordWrapEnabled={true}
        showRowLines={true}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <StateStoring enabled={false} type="localStorage" storageKey="risks" />
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
          allowHiding={true}
          cellRender={actionStatus}
        />
        <Column
          dataField="categoryName"
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
          cellRender={risks.department}
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
          dataField="subSection"
          minWidth={100}
          caption="Sub-Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="rootCauses"
          minWidth={100}
          caption="Root Causes"
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={rootCauseFunc}
          allowFiltering={false}
        />
        <Column dataField="riskImpact" minWidth={100} caption="Risk Impact" cellRender={riskImpactFunc} />
        <Column
          dataField="riskImpactAmount"
          minWidth={100}
          caption="Risk Impact Amount"
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
          dataField="riskCategoryControlActualCategoryControlName"
          minWidth={100}
          caption="Risk Control Category"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="controlActions"
          minWidth={100}
          caption="Mitigations/Control"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={actionFunc}
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
          dataField="riskOwner"
          minWidth={100}
          caption="Risk Owner"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="keyIndicatorFrequencyName"
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
            <RoleBasedGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}>
              <Link to={'risk-universe/create-risk'}>
                <Button
                  variant="contained"
                  size={'small'}
                  className={classes.btn}
                  //onClick={onAddUser}
                  color="primary"
                  style={{ marginBottom: '10px' }}>
                  <AddCircle /> Create New Risk
                </Button>
              </Link>
            </RoleBasedGuard>
          </Item>
          <Item location="before">
            <RoleBasedGuard permission={PERMISSIONS.RISK_UNIVERSE.CREATE}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={e => setOpenDialog(true)}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <FileUpload /> Import Risks
              </Button>
            </RoleBasedGuard>
          </Item>
          <Item location="after" name="columnChooserButton" />
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default RiskApprovals;