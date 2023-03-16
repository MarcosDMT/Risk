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
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Chip } from '@material-ui/core';
import { Check, FileUpload, LockResetRounded } from '@mui/icons-material';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import { AddCircle, Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
const getActions = data => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  return actions;
};
const ComplianceTable = props => {
  const {
    isLegalCompliance,
    breadCrumbsTitle,
    complianceList,
    setOpenDialog,
    onViewCompliance,
    onUpdateCompliance,
    onDeleteCompliance,
  } = props;
  const searchParam = useParams();
  const classes = useStyles();
  const userActions = data => getActions(data);
  // const multipleValues = ({ displayValue }) => {
  //   return displayValue.map((value, index) => <li key={index}>{value}</li>);
  // };
  function actionStatus({ displayValue }) {
    let color;
    if (displayValue === 'Active') {
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

  return (
    <>
      {isLegalCompliance ? (
        <DataGrid
          id="legal-compliance"
          columnAutoWidth={true}
          dataSource={complianceList}
          showColumnLines={true}
          // wordWrapEnabled={true}
          showRowLines={true}
          showBorders={true}
          allowColumnResizing={true}
          rowAlternationEnabled={true}>
          <FilterRow visible={true} />
          <StateStoring enabled={false} type="localStorage" storageKey="legal-compliance" />
          <FilterPanel visible={true} />
          <SearchPanel visible={true} />
          <ColumnChooser enabled={true} mode="select" />
          <HeaderFilter visible={true} allowSearch={true} />
          <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
          <Column
            dataField="complianceTitle"
            width={150}
            caption={'Case Title'}
            allowHeaderFiltering={true}
            allowSearch={true}
            cellRender={actionViewLink}
            allowFiltering={false}
          />
          <Column
            dataField="complianceDesc"
            width={200}
            encodeHtml={false}
            caption="Case Details"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="caseType"
            width={120}
            caption="Case Type"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="submissionStatus"
            minWidth={100}
            caption="Case Status"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
            allowHiding={true}
            cellRender={actionStatus}
          />
          <Column
            dataField="judgement"
            width={200}
            caption="Judgement"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="department"
            minWidth={100}
            caption="Department"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="section"
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
            dataField="totalFees"
            minWidth={100}
            caption="Total Fines & Fees"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="submissionDeadline"
            minWidth={100}
            caption={'Date of Next Hearing'}
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="managerComments"
            minWidth={100}
            caption="Management Comments"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="sourceDoc"
            minWidth={100}
            caption="Case File Attachment"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />

          <Scrolling rowRenderingMode="virtual" />
          <Paging defaultPageSize={20} />
          <Pager
            visible={true}
            allowedPageSizes={['all', 10, 20, 50, 100]}
            displayMode={true}
            showPageSizeSelector={false}
            showInfo={true}
            showNavigationButtons={true}
          />
          <Toolbar>
            <Item location="before">
              <Link to={`${searchParam.name}/create`}>
                <Button
                  variant="contained"
                  size={'small'}
                  className={classes.btn}
                  //onClick={onAddUser}
                  color="primary"
                  style={{ marginBottom: '10px' }}>
                  <AddCircle /> Create {breadCrumbsTitle}
                </Button>
              </Link>
            </Item>
            <Item location="before">
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={e => setOpenDialog(true)}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <FileUpload /> Import {breadCrumbsTitle}s.
              </Button>
            </Item>
            <Item location="after" name="columnChooserButton" />
            <Item location="after" name="searchPanel" />
          </Toolbar>
        </DataGrid>
      ) : (
        <DataGrid
          id="other-compliance"
          columnAutoWidth={true}
          dataSource={complianceList}
          showColumnLines={true}
          // wordWrapEnabled={true}
          showRowLines={true}
          showBorders={true}
          allowColumnResizing={true}
          rowAlternationEnabled={true}>
          <FilterRow visible={true} />
          <StateStoring enabled={false} type="localStorage" storageKey="other-compliance" />
          <FilterPanel visible={true} />
          <SearchPanel visible={true} />
          <ColumnChooser enabled={true} mode="select" />
          <HeaderFilter visible={true} allowSearch={true} />
          <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
          <Column
            dataField="complianceTitle"
            width={150}
            caption={'Obligation Title'}
            allowHeaderFiltering={true}
            allowSearch={true}
            cellRender={actionViewLink}
            allowFiltering={false}
          />
          <Column
            dataField="complianceDesc"
            width={200}
            encodeHtml={false}
            caption="Obligation Description"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="submissionStatus"
            minWidth={100}
            caption="Obligation Status"
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
            dataField="department"
            minWidth={100}
            caption="Department"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="section"
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
            dataField="penalty"
            minWidth={100}
            caption="Penalty"
            allowHeaderFiltering={true}
            allowSearch={true}
            // cellRender={multipleValues}
            allowFiltering={false}
          />
          <Column dataField="primaryOwner" minWidth={100} caption="Primary Owner" />
          <Column
            dataField="secondaryOwner"
            minWidth={100}
            caption="Secondary Owner"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="escalationPerson"
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
              <Link to={`${searchParam.name}/create`}>
                <Button
                  variant="contained"
                  size={'small'}
                  className={classes.btn}
                  //onClick={onAddUser}
                  color="primary"
                  style={{ marginBottom: '10px' }}>
                  <AddCircle /> Create {breadCrumbsTitle}
                </Button>
              </Link>
            </Item>
            <Item location="before">
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                onClick={e => setOpenDialog(true)}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <FileUpload /> Import {breadCrumbsTitle}s.
              </Button>
            </Item>
            <Item location="after" name="columnChooserButton" />
            <Item location="after" name="searchPanel" />
          </Toolbar>
        </DataGrid>
      )}
    </>
  );
};

export default ComplianceTable;
