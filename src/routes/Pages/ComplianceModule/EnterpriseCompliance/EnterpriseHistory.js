import React,{useEffect} from 'react';
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
  DataGrid,
} from 'devextreme-react/data-grid';
import { Box } from '@mui/material';
import { Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getEnterpriseComplianceHistory } from '../../../../redux/actions/Compliance';
import { useLocation } from 'react-router';

const EnterpriseHistory = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    console.log("LOCATION ",location.state.id);


    const getHistoryData = async () =>{
        await dispatch(getEnterpriseComplianceHistory(location.state.id))
    }

    useEffect(() =>{
      getHistoryData();
    },[]);
  return (
    <>
     <Typography variant="h2" style={{marginTop: '20px',marginBottom: '10px'}}>Enterprise Compliance History</Typography>
        <DataGrid
          id="enterprise-compliance"
          columnAutoWidth={true}
          // dataSource={complianceList}
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
          <Column fixed={true} fixedPosition="left" caption="" width={100} alignment={'center'} allowFiltering={false} />
          <Column
            fixed={true}
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
            caption="Compliance Status"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
            allowHiding={true}
          />
          <Column
            dataField="submissionDeadline"
            minWidth={150}
            caption={'Submission Deadline'}
            allowHeaderFiltering={true}
            allowSearch={true}
            dataType={'date'}
            format={'dd/MM/yyyy'}
            allowFiltering={true}
          />
          <Column
            dataField="approvalStatus"
            minWidth={180}
            caption="Approval Status"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
            allowHiding={true}
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
            dataField="departmentsName"
            minWidth={200}
            caption="Department"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
          />
          <Column
            dataField="sectionsName"
            minWidth={100}
            caption="Section"
            allowHeaderFiltering={true}
            allowSearch={true}
            allowFiltering={false}
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
        </DataGrid>
    </>
  );
};

export default EnterpriseHistory;
