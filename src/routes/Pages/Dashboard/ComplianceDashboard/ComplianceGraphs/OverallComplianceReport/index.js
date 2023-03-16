import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { Area, AreaChart, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTheme } from '@material-ui/core';
import CmtAdvCard from '../../../../../../@coremat/CmtAdvCard';
import CmtCardHeader from '../../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import { overallComplianceYearly } from '../../../dummyData';

const useStyles = makeStyles(theme => ({
  cardContentRoot: {
    position: 'relative',
  },
  titleRoot: {
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  listItemRoot: {
    padding: 0,
    '& .root': {
      marginBottom: 1,
    },
    '& .Cmt-label-container': {
      fontSize: 12,
      color: theme.palette.text.secondary,
    },
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  lossCategoryRoot: {
    color: theme.palette.text.primary,
    '& text': {
      fill: theme.palette.text.primary,
    },
  },
}));

const OverallComplianceReport = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  useState(() => {
    setData(overallComplianceYearly);
  }, []);

  return (
    <CmtAdvCard>
      <CmtCardHeader
        title={'Overall Compliance Report'}
        subTitle={'Area map showing overall compliance trend for the past 5 years'}
      />
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <GridContainer>
          <Grid item xs={12} md={12}>
            <ComplianceAreaChart {...{ data }} />
          </Grid>
        </GridContainer>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

const ComplianceAreaChart = ({ data }) => {
  const theme = useTheme();
  const color = theme.palette.success.main;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis type="number">
          <Label angle={270} position="insideLeft" style={{ textAnchor: 'middle' }} value={'Overall Score (%)'} />
        </YAxis>
        <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
        {/*<Legend verticalAlign="bottom" />*/}
        <defs>
          <linearGradient id="areaChart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={color} stopOpacity={1} />
            <stop offset="90%" stopColor="#FFF" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="overallScore" strokeWidth={2} stroke={color} fill="url(#areaChart)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default OverallComplianceReport;
