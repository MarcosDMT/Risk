import React, { useState } from 'react';
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
  Scrolling,
  SearchPanel,
  StateStoring,
  Toolbar,
} from 'devextreme-react/data-grid';
import { Link } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import { Chip } from '@mui/material';
import { FileUpload } from '@mui/icons-material';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import { AddCircle, Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { getAccountStatus, getComplianceStatus } from '../../../../@jumbo/utils/commonHelper';
import { Typography } from '@mui/material';
import ActionEnterpriseDialog from './ActionEnterpriseDialog';
import {
  fetchEnterpriseCompliance,
  fetchEnterpriseComplianceMain,
  fetchEnterpriseComplianceSub,
} from '../../../../redux/actions/Compliance';
import { useDispatch, useSelector } from 'react-redux';
import HistoryIcon from '@mui/icons-material/History';
import { approveCompliance } from '../../../../redux/actions/Compliance';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const getActions = (data, viewOnly) => {
  const actions = [{ action: 'view', label: 'View', icon: <Visibility /> }];
  if (!viewOnly) {
    actions.push(
      { action: 'edit', label: 'Edit', icon: <Edit /> },
      { action: 'history', label: 'History', icon: <HistoryIcon /> },
      { action: 'delete', label: 'Delete', icon: <Delete /> },
    );
  }

  return actions;
};
const EnterpriseComplianceTable = props => {
  const {
    complianceList,
    viewOnly = false,
    onViewCompliance,
    onUpdateCompliance,
    onDeleteCompliance,
    step,
    onFetchEnterpriseHistory,
  } = props;
  const userActions = data => getActions(data, viewOnly);
  const [selectedCompliance, setSelectedCompliance] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const { selectedEnterprise } = useSelector(({ compliance }) => compliance);

  const handleOnSelectCompliance = compliance => {
    setSelectedCompliance(compliance);
    setOpenDialog(true);
  };

  const handleOnCloseCompliance = () => {
    setOpenDialog(false);
    setSelectedCompliance(null);
  };

  function actionStatus({ displayValue, data }) {
    let status = getComplianceStatus(data.obligationStatus);
    return (
      <Chip
        title={'Click Here'}
        label={<Typography>{displayValue}</Typography>}
        onClick={e => {
          e.preventDefault();
          handleOnSelectCompliance(data);
        }}
        variant={'outlined'}
        style={{ cursor: 'pointer', borderColor: status?.color, color: status?.color }}
      />
    );
    // return (
    //   <>
    //     <Typography variant={'caption'} sx={{ color: status.color }}>
    //       {status.label}
    //     </Typography>
    //   </>
    // );
  }
  const onMenuClick = async (menu, data) => {
    if (menu.action === 'view') {
      onViewCompliance(data);
    } else if (menu.action === 'edit') {
      onUpdateCompliance(data);
    } else if (menu.action === 'delete') {
      await onDeleteCompliance(data);
      await dispatch(fetchEnterpriseComplianceSub({ id: selectedEnterprise }));
    } else if (menu.action === 'history') {
      onFetchEnterpriseHistory(data);
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

  const actionDepartment = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map(value => <li key={value.departmentId}>{value.departmentName}</li>);
  };

  const actionSection = ({ displayValue }) => {
    if (!Array.isArray(displayValue)) {
      return null;
    }
    return displayValue?.map(value => <li key={value.sectionId}>{value.sectionName}</li>);
  };

  const convertDate = ({ displayValue, data }) => {
    let formattedDate = data.submissionDeadline;
    displayValue = new Date(formattedDate).toLocaleDateString();
    return <Typography>{displayValue}</Typography>;
  };

  const submitApproval = async data => {
    await dispatch(approveCompliance(data));
    await dispatch(fetchEnterpriseComplianceSub(data));
  };

  function approve({ displayValue, data }) {
    if (data?.isApproved === null) {
      return (
        <Chip
          title={'Click Here'}
          label={<Typography>Approve</Typography>}
          onClick={() => dispatch(submitApproval({ id: data?.id }))}
          variant={'outlined'}
          color={'success'}
          size={'small'}
        />
      );
    } else if (data?.isApproved === true) {
      return <Typography>{displayValue}</Typography>;
    }
  }

  // Export data to excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(complianceList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'data.xlsx');
  };

  return (
    <>
      <DataGrid
        id="enterprise-compliance"
        columnAutoWidth={true}
        dataSource={complianceList}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        height={'75vh'}
        wordWrapEnabled={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={false} />
        {/*<StateStoring enabled={false} type="localStorage" storageKey="enterprise_compliance" />*/}
        <FilterPanel visible={false} />
        <SearchPanel visible={false} />
        <ColumnChooser enabled={false} mode="select" />
        <HeaderFilter visible={true} allowSearch={true} />
        <ColumnFixing enabled={true} />
        <Column
          fixed={true}
          fixedPosition="left"
          caption="Action"
          width={100}
          alignment={'center'}
          allowFiltering={false}
          cellRender={actionLink}
        />
        <Column
          fixedPosition="left"
          dataField="title"
          width={200}
          caption={'Obligation Title'}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          alignment={'left'}
        />
        <Column
          dataField="description"
          width={300}
          encodeHtml={false}
          caption="Obligation Description"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="complianceStatus"
          minWidth={180}
          visible={step !== 2}
          caption="Compliance Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          allowHiding={true}
          cellRender={actionStatus}
        />
        <Column
          dataField="submissionDeadline"
          minWidth={150}
          caption={'Submission Deadline'}
          allowHeaderFiltering={true}
          allowSearch={true}
          //dataType={'date'}
          //format={'dd/MM/yyyy'}
          allowFiltering={true}
          cellRender={convertDate}
        />
        <Column
          dataField="approvalStatus"
          minWidth={180}
          caption="Approval Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          allowHiding={true}
          cellRender={approve}
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
          minWidth={200}
          caption="Company"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="organization"
          minWidth={200}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={actionDepartment}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={actionSection}
        />
        {/*<Column*/}
        {/*  dataField="subSectionsName"*/}
        {/*  minWidth={100}*/}
        {/*  caption="Sub-Section"*/}
        {/*  allowHeaderFiltering={true}*/}
        {/*  allowSearch={true}*/}
        {/*  allowFiltering={false}*/}
        {/*/>*/}
        <Column
          dataField="penalty"
          minWidth={100}
          caption="Penalty"
          allowHeaderFiltering={true}
          allowSearch={true}
          // cellRender={multipleValues}
          allowFiltering={false}
        />
        <Column dataField="primaryOwnerName" minWidth={150} caption="Primary Owner" />
        <Column
          dataField="secondaryOwnerName"
          minWidth={150}
          caption="Secondary Owner"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="escalationOwnerName"
          minWidth={150}
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
          dataField="frequencyName"
          minWidth={100}
          caption="Frequency"
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

        <Paging defaultPageSize={20} />
        <Pager
          visible={true}
          allowedPageSizes={['all', 20, 50, 100]}
          showPageSizeSelector={true}
          showNavigationButtons={true}
        />

        <Toolbar>
          <Item location="after">
            <Button variant="outlined" size={'small'} color="primary" onClick={exportToExcel}>
              <DownloadIcon /> Export to Excel
            </Button>
          </Item>
        </Toolbar>
      </DataGrid>
      <ActionEnterpriseDialog
        {...{
          open: openDialog,
          onClose: handleOnCloseCompliance,
          compliance: selectedCompliance,
        }}
      />
    </>
  );
};

export default EnterpriseComplianceTable;
