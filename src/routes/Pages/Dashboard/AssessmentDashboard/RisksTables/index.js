import React from 'react';
import {
  Column,
  ColumnChooser,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  StateStoring,
} from 'devextreme-react/data-grid';
import { Chip } from '@material-ui/core';
import { DataGrid } from 'devextreme-react';

const RisksTableView = props => {
  const { risks } = props;
  const multipleValues = ({ displayValue }) => {
    return displayValue.map((value, index) => <li key={index}>{value}</li>);
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

  return (
    <>
      <DataGrid
        id="risksView"
        columnAutoWidth={true}
        dataSource={risks}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <StateStoring enabled={false} type="localStorage" storageKey="risksView" />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <ColumnChooser enabled={true} mode="select" />
        <HeaderFilter visible={true} allowSearch={true} />
        <Column dataField="id" caption="Risk ID" key="id" visible={true} />
        <Column
          dataField="riskTitle"
          width={150}
          caption="Risk Title"
          allowHeaderFiltering={true}
          allowSearch={true}
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
          dataField="riskCategory"
          minWidth={100}
          caption="Risk Category"
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
          dataField="rootCauses"
          minWidth={100}
          caption="Root Causes"
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={multipleValues}
          allowFiltering={false}
        />
        <Column dataField="riskImpact" minWidth={100} caption="Risk Impact" cellRender={multipleValues} />
        <Column
          dataField="riskImpactAmount"
          minWidth={100}
          caption="Risk Impact Amount"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="probability"
          minWidth={100}
          caption="Probability"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="severity"
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
          dataField="riskControlCat"
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
          cellRender={multipleValues}
        />
        <Column
          dataField="lossType"
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
          dataField="keyIndicator"
          minWidth={100}
          caption="Risk Indicator"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="riskAppetite"
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
      </DataGrid>
    </>
  );
};

export default RisksTableView;
