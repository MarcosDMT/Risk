import React from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { Box } from '@mui/material';
import { ComplianceDashboardHeader } from '../DashboardHeader';
import ComplianceGraphs from './ComplianceGraphs';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.COMPLIANCE_DASHBOARD, isActive: true },
];
const ComplianceDashboard = () => {
  return (
    <PageContainer heading={HEADER.COMPLIANCE_DASHBOARD} breadcrumbs={breadcrumbs}>
      <Box width={'100%'}>
        <ComplianceDashboardHeader />
        <Box mt={2}>
          <ComplianceGraphs />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ComplianceDashboard;
