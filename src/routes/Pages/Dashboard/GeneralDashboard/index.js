import React from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box } from '@material-ui/core';
import RisksGraphs from './RisksGraphs';
import DashboardHeader from '../DashboardHeader';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.GENERAL_DASHBOARD, isActive: true },
];

const GeneralDashboard = () => {
  return (
    <PageContainer heading={HEADER.GENERAL_DASHBOARD} breadcrumbs={breadcrumbs}>
      <Box width={'100%'}>
        <DashboardHeader />
        <Box mt={2}>
          <RisksGraphs />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default GeneralDashboard;
