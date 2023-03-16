import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@material-ui/core';

import makeStyles from '@material-ui/core/styles/makeStyles';
import ComplianceListItem from './ComplianceListItem';
import ComplianceChart from './ComplianceChart';
import CmtCard from '../../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../../@coremat/CmtCard/CmtCardContent';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import CmtList from '../../../../../../@coremat/CmtList';
import {complianceMonthlyData} from "../../../dummyData";

const useStyles = makeStyles(theme => ({
  cardRoot: {
    height: '100%',
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

const MonthlyComplianceReport = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const classes = useStyles();
  const [complianceData, setComplianceData] = useState({});
  useEffect(() => {
    setMonthlyData(complianceMonthlyData);
    setComplianceData(complianceMonthlyData[0]);
  }, []);

  const handleOnItemChange = item => {
    setComplianceData(item);
  };
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title={'Compliance Monthly Report'} subTitle={''} />
      <CmtCardContent>
        <GridContainer>
          <Grid item xs={12} md={4}>
            <Box className={classes.textUppercase} fontSize={10} mb={2}>
              Compliance Types
            </Box>
            <CmtList
              data={monthlyData}
              renderRow={(item, index) => (
                <ComplianceListItem
                  key={index}
                  compliance={item}
                  onClick={() => handleOnItemChange(item)}
                  complianceName={complianceData.name}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ComplianceChart
              data={complianceData.data}
              color={complianceData.badgeColor}
              chartGradientColor={complianceData.chartGradientColor}
            />
          </Grid>
        </GridContainer>
      </CmtCardContent>
    </CmtCard>
  );
};

export default MonthlyComplianceReport;
