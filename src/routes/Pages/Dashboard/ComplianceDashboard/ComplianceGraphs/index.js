import React, { useEffect, useState } from 'react';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import { Grid } from '@material-ui/core';
import MonthlyComplianceReport from './MonthlyComplianceReport';
import OverallComplianceReport from './OverallComplianceReport';
import ComplianceCalendar from './ComplianceCalendar';
import ComplianceHeatMap from './ComplianceHeatMap';

const ComplianceGraphs = () => {
  return (
    <>
      <GridContainer>
        <Grid item xs={12} md={12}>
          <MonthlyComplianceReport />
        </Grid>
        <Grid item xs={12} md={12}>
          <ComplianceHeatMap />
        </Grid>
        <Grid item xs={12} md={7}>
          <OverallComplianceReport />
        </Grid>
        <Grid item xs={12} md={5}>
          <ComplianceCalendar />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ComplianceGraphs;
