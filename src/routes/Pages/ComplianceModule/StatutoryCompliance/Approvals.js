import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApprovals } from '../../../../redux/actions/Compliance';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Box from '@material-ui/core/Box';
// import { TreeList, Selection,Toolbar,Item,SearchPanel,FilterRow, FilterPanel, HeaderFilter } from 'devextreme-react/tree-list';
import { approveCompliance } from '../../../../redux/actions/Compliance';
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
  Selection,
} from 'devextreme-react/data-grid';
import { Link } from 'react-router-dom';
import { Chip } from '@material-ui/core';
import { FileUpload } from '@mui/icons-material';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import { AddCircle, Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { getAccountStatus, getComplianceStatus } from '../../../../@jumbo/utils/commonHelper';
import { useParams } from 'react-router-dom';
import { object } from 'prop-types';

const getActions = data => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  return actions;
};

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
    const formData = { id: data.id}
    dispatch(approveCompliance(formData));
    handleClose();
    dispatch(fetchApprovals());
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
        {/* <DialogTitle id="alert-dialog-title">{'Confirm Approval'}</DialogTitle> */}
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

export const Approvals = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { statutoryComplianceApprovals } = useSelector(({ compliance }) => compliance);



  useEffect(() => {
    dispatch(fetchApprovals());
  }, []);

  console.log(statutoryComplianceApprovals)

  const { breadCrumbsTitle, setOpenDialog, onViewCompliance, onUpdateCompliance, onDeleteCompliance } = props;

  function approvalStatus({ data} ) {
    return (
      <>
        <AlertDialog data={data} />
      </>
    );
  }

  function actionStatus({ displayValue }) {
    let status = getAccountStatus(displayValue);
    return (
      <Chip
        style={{ color: status.color, borderColor: status.color }}
        size={'small'}
        variant={'outlined'}
        label={status.label}
      />
    );
  }

  function complianceStatus({ displayValue }) {
    let status = getComplianceStatus(displayValue);
    return (
      <Chip
        style={{ color: status.color, borderColor: status.color }}
        size={'small'}
        variant={'outlined'}
        label={status.label}
      />
    );
  }

  const onMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      onViewCompliance(data);
    } else if (menu.action === 'edit') {
      onUpdateCompliance(data);
    } else if (menu.action === 'delete') {
      onDeleteCompliance(data);
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
          onViewCompliance(data);
        }}>
        {displayValue}
      </a>
    );
  }

  const userActions = data => getActions(data);
  const multipleValueDepartments = ({ displayValue }) => {
    return displayValue?.map((value, index) => <span key={index}>{value.departmentName}</span>);
  };
  const multipleValueSections = ({ displayValue }) => {
    return displayValue?.map((value, index) => <span key={index}>{value.sectionName}</span>);
  };
  const multipleValueSubsection = ({ displayValue }) => {
    return displayValue?.map((value, index) => <span key={index}>{value.subSectionName}</span>);
  };

  const expandedRowKeys = [1];

  return (
    <>
      <DataGrid
        dataSource={statutoryComplianceApprovals}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        defaultExpandedRowKeys={expandedRowKeys}
        keyExpr="id"
        parentIdExpr="mainId">
        <Selection mode="single" />
        <SearchPanel visible={true} />
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <HeaderFilter visible={true} />
        <Column
          // dataField="title"
          width={150}
          // caption={'Approval Status'}
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={approvalStatus}
          allowFiltering={false}
        />
        <Column
          dataField="title"
          width={150}
          caption={'Obligation Title'}
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={actionViewLink}
          allowFiltering={false}
        />
         <Column
          dataField="complianceStatus"
          width={150}
          caption={'Compliance Status'}
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={complianceStatus}
          allowFiltering={false}
        />
        <Column
          dataField="description"
          width={200}
          encodeHtml={false}
          caption="Obligation Description"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="active"
          minWidth={100}
          caption="Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          allowHiding={true}
          cellRender={actionStatus}
        />
        <Column
          dataField="authority"
          minWidth={100}
          caption="Authority"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="companyName"
          minWidth={100}
          caption="Company"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={multipleValueDepartments}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={multipleValueSections}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Sub-Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={multipleValueSubsection}
        />
        <Column
          dataField="penalty"
          minWidth={100}
          caption="Penalty"
          allowHeaderFiltering={true}
          allowSearch={true}
          // cellRender={multipleValues}
          allowFiltering={false}
        />
        <Column dataField="primaryOwnerName" minWidth={100} caption="Primary Owner" />
        <Column
          dataField="secondaryOwnerName"
          minWidth={100}
          caption="Secondary Owner"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="escalationOwnerName"
          minWidth={100}
          caption="Escalation Person"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="priority"
          minWidth={100}
          caption="Priority"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="frequency"
          minWidth={100}
          caption="Frequency"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="submissionDeadline"
          minWidth={100}
          caption={'Submission Deadline'}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="sourceDoc"
          minWidth={100}
          visible={false}
          caption="Source Document"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
        <Toolbar>
          {/* <Item location="before">
            <Link to={`statutory-compliance/create`}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <AddCircle /> Create {breadCrumbsTitle}
              </Button>
            </Link>
          </Item> */}
          {/* <Item location="before">
            <Button
              variant="contained"
              size={'small'}
              className={classes.btn}
              onClick={e => setOpenDialog(true)}
              color="primary"
              style={{ marginBottom: '10px' }}>
              <FileUpload /> Import {breadCrumbsTitle}
            </Button>
          </Item> */}
          <Item location="after" name="columnChooserButton" />
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default Approvals;
