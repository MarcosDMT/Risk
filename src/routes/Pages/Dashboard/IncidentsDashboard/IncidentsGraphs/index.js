import React, { useEffect, useState } from 'react';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import { Grid } from '@mui/material';
import MonthlyRiskIncidents from './MonthlyRiskIncidents';
import { lossTypeIncidentsProgress, monthlyIncidentsData } from '../../dummyData';

const IncidentsGraphs = () => {
  const [monthlyIncidents, setMonthlyIncidents] = useState([]);
  const [lossTypeIncidents, setLossTypeIncidents] = useState([]);

  useEffect(() => {
    setMonthlyIncidents(monthlyIncidentsData);
    setLossTypeIncidents(lossTypeIncidentsProgress);
  }, []);

  return (
    <>
      <GridContainer>
        <Grid item xs={12} md={12}>
          <MonthlyRiskIncidents {...{ data: monthlyIncidents, lossTypeIncidents }} />
        </Grid>
      </GridContainer>
    </>
  );
};

export default IncidentsGraphs;
