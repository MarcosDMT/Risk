import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
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
  MasterDetail,
} from 'devextreme-react/data-grid';
import { DataGrid } from 'devextreme-react';
import { fetchStatutoryComplianceSub } from '../../../../redux/actions/Compliance';

const DetailView =( { data:{ key} })=> {
  const dispatch = useDispatch();
  const {statutoryComplianceSub}  = useSelector(({compliance}) => compliance);
  console.log(statutoryComplianceSub);
  console.log(key)

  useEffect(() =>{
    dispatch(fetchStatutoryComplianceSub(key.id))
  },[]);
  return (
    <>
      <DataGrid
        id="statutory-compliance"
        columnAutoWidth={true}
        dataSource={statutoryComplianceSub}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        {/* <FilterRow visible={true} /> */}
    
        {/* <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <ColumnChooser enabled={true} mode="select" />
        <HeaderFilter visible={true} allowSearch={true} /> */}
        {/* <Column caption="Action" width={120} alignment={'center'} allowFiltering={false}  /> */}
        {/* cellRender={actionLink} */}
        <MasterDetail
          enabled={true}
         component={DetailView}
        />
        <Column
          dataField="title"
          width={150}
          caption={'Obligation Title'}
          allowHeaderFiltering={true}
          allowSearch={true}
          // cellRender={actionViewLink}
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
        {/* <Column
          dataField="active"
          minWidth={100}
          caption="Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          allowHiding={true}
          cellRender={actionStatus}
        /> */}
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
          dataField="departmentsName"
          minWidth={100}
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
        <Column
          dataField="subSectionsName"
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
       
      </DataGrid>
    </>
  );
};

export default DetailView;
