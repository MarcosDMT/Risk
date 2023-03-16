import React from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box, Button, Grid } from '@material-ui/core';
import { Menu, MenuItem } from '@mui/material';
import { ArrowDropDown } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import RisksGraphs from './AssessmentGraphs';
import { NavigationButton } from '../DashboardHeader';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.ASSESSMENT_DASHBOARD, isActive: true },
];

const AssessmentDashboard = () => {
  return (
    <PageContainer heading={HEADER.ASSESSMENT_DASHBOARD} breadcrumbs={breadcrumbs}>
      <NavigationButton />
      <Box mt={3}>
        <RisksGraphs />
      </Box>
    </PageContainer>
  );
};

export default AssessmentDashboard;
