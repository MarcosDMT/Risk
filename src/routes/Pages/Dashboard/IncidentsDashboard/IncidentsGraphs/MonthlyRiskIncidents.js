import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CmtAdvCard from '../../../../../@coremat/CmtAdvCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import { Area, AreaChart, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Typography, useTheme } from '@material-ui/core';
import CmtList from '../../../../../@coremat/CmtList';
import { Avatar, Icon, ListItem } from '@mui/material';
import CmtProgressBar from '../../../../../@coremat/CmtProgressBar';
import Divider from '@material-ui/core/Divider';
import { AccountTree, Category, ListAlt, Money } from '@material-ui/icons';
import { COLORS } from '../../dummyData';
import { ArrowCircleUp } from '@mui/icons-material';

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

const MonthlyRiskIncidents = props => {
  const { data, lossTypeIncidents } = props;
  const classes = useStyles();

  return (
    <CmtAdvCard>
      <CmtCardHeader title={'Monthly Risk Incident Report'} />
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <GridContainer>
          <Grid item xs={12} lg={8}>
            <IncidentsAreaChart {...{ data }} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Typography align={'center'} variant={'h4'}>
              Loss Category (%)
            </Typography>
            <Box mt={1} className={classes.lossCategoryRoot}>
              <LossTypeProgress data={lossTypeIncidents} />
            </Box>
          </Grid>
        </GridContainer>
        <Divider style={{ marginTop: '10px' }} variant={'fullWidth'} />
        <Box mt={4} mb={3}>
          <IncidentsSummary />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

const IncidentsAreaChart = ({ data }) => {
  const theme = useTheme();
  const color = theme.palette.primary.main;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <text x={500 / 2} y={10} fill="black" textAnchor="top" dominantBaseline="central">
          <tspan fontSize="15" fontWeight={'bold'}>
            20/21 Risk Incidents
          </tspan>
        </text>
        <XAxis dataKey="name" />
        <YAxis type="number">
          <Label angle={270} position="insideLeft" style={{ textAnchor: 'middle' }} value={'No. of Incidents'} />
        </YAxis>
        <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
        <Legend verticalAlign="bottom" />
        <defs>
          <linearGradient id="areaChart" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor={color} stopOpacity={1} />
            <stop offset="90%" stopColor="#FFF" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="incidents" strokeWidth={2} stroke={color} fill="url(#areaChart)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
const LossTypeProgress = ({ data }) => {
  const classes = useStyles();
  return (
    <CmtList
      data={data}
      renderRow={(item, index) => {
        return (
          <ListItem key={index} component="div" className={classes.listItemRoot}>
            <Box width={'100%'}>
              <CmtProgressBar
                label={<Box mb={-1}>{item.label}</Box>}
                labelPos="top-left"
                value={item.value}
                renderValue={value => {
                  return `${value}%`;
                }}
                containedColor={item.color}
                thickness={7}
                onlyContained
              />
            </Box>
          </ListItem>
        );
      }}
    />
  );
};

const summaryData = [
  {
    name: 'RISK CATEGORY',
    value: 'Credit Risk',
    icon: <Category />,
    color: 'primary.main',
  },
  {
    name: 'DEPARTMENT',
    value: 'Human Resources',
    icon: <AccountTree />,
  },
  {
    name: 'TOTAL LOSSES',
    value: 'Kshs 2,000,000',
    icon: <Money />,
  },
  {
    name: 'TOTAL INCIDENTS',
    value: '200',
    icon: <ListAlt color={'primary'} />,
  },
];

const IncidentsSummary = ({ data = summaryData }) => {
  const classes = useStyles();
  return (
    <>
      <GridContainer>
        {data.length !== 0 &&
          data.map((item, index) => (
            <>
              <Grid item xs={12} md={3} key={index}>
                <Box
                  width={'100%'}
                  className={classes.listItemRoot}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Typography variant={'h6'} gutterBottom>
                    {item.value}
                  </Typography>
                  <Typography variant={'h5'}>{item.name}</Typography>
                  <Box>
                    {/*{item.icon}*/}
                    <ArrowCircleUp color={'primary'} />
                  </Box>
                </Box>
              </Grid>
            </>
          ))}
      </GridContainer>
    </>
  );
};

export default MonthlyRiskIncidents;
