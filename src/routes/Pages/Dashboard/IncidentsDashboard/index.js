import React from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import DashboardHeader from '../DashboardHeader';
import { Box } from '@mui/material';
import IncidentsGraphs from './IncidentsGraphs';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.INCIDENTS_DASHBOARD, isActive: true },
];
const IncidentsDashboard = () => {
  return (
    <PageContainer heading={HEADER.INCIDENTS_DASHBOARD} breadcrumbs={breadcrumbs}>
      <Box width={'100%'}>
        <DashboardHeader />
        <Box mt={2}>
          <IncidentsGraphs />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default IncidentsDashboard;
