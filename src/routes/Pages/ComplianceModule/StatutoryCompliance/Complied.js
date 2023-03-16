import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
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
import { getAccountStatus, getApprovalStatus } from '../../../../@jumbo/utils/commonHelper';
import { fetchHistory } from '../../../../redux/actions/Compliance';
import { useSelector, useDispatch} from 'react-redux';


const getActions = data => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  return actions;
};

const multipleValueDepartments = ({ displayValue }) => {
  return displayValue?.map((value, index) => <span key={index}>{value.departmentName}</span>);
};
const multipleValueSections = ({ displayValue }) => {
  return displayValue?.map((value, index) => <span key={index}>{value.sectionName}</span>);
};
const multipleValueSubsection = ({ displayValue }) => {
  return displayValue?.map((value, index) => <span key={index}>{value.subSectionName}</span>);
};

const Complied = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const { statutoryComplianceHistory } = useSelector(( { Compliance }) => Compliance)
  const { statutoryComplianceHistory } = useSelector(({ compliance }) => compliance);

  useEffect(() =>{
    dispatch(fetchHistory());
  },[])

  const {
    breadCrumbsTitle,
    complianceList,
    setOpenDialog,
    onViewCompliance,
    onUpdateCompliance,
    onDeleteCompliance,
  } = props;

  const userActions = data => getActions(data);
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

  function complianceApprovalStatus({ displayValue }) {
    let status = getApprovalStatus(displayValue);
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

  // FILTER ALL COMPLIED COMPLIANCES
  const compliedData = complianceList.filter(complied => {
    return complied.obligationStatus === 1;
  });
  return (
    <>
      {/* <Button variant="contained" color="primary">Approve</Button> */}
      <DataGrid
        id="statutory-compliance"
        columnAutoWidth={true}
        dataSource={statutoryComplianceHistory}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <StateStoring enabled={false} type="localStorage" storageKey="statutory_compliance" />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <ColumnChooser enabled={true} mode="select" />
        <HeaderFilter visible={true} allowSearch={true} />
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
          dataField="approvalStatus"
          width={150}
          caption={'Approval Status'}
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={complianceApprovalStatus}
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

export default Complied;
