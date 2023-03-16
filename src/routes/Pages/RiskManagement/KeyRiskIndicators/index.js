import React, { useState } from 'react';
import useStyles from '../../Roles/index.style';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { Box } from '@material-ui/core';
import KRITable from './KRITable';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.KRI, active: true },
];
const KeyRiskIndicators = () => {
  const classes = useStyles();
  const [risks, setRisks] = useState([]);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.KRI} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box padding={5}>
            <KRITable {...{ risks }} />
          </Box>
        </Box>
      </PageContainer>
    </React.Fragment>
  );
};

export default KeyRiskIndicators;
