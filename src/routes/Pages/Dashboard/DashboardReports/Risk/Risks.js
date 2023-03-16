import React, { useState } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'hammerjs';
import { interpolateCividis } from 'd3-scale-chromatic';
import { Chart, ChartSeries, ChartSeriesItem } from '@progress/kendo-react-charts';
import { AddBoxOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  fieldSet: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #3646A8',
  },
  scoreFieldSet: {
    border: '2px solid #3646A8',
    paddingTop: '7px',
    paddingBottom: '7px',
  },
  legend: {
    padding: '4px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  typography: {
    fontSize: '27px',
  },
  riskscore: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-around',
    marginTop: '10px',
  },
  risks: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    marginTop: '10px',
  },
  qtyOrange: {
    background: '#F77C00',
    color: '#FFFFFF',
    padding: '3px',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    borderRadius: '999px',
  },
  qtyGreen: {
    background: '#04AA6D',
    color: '#FFFFFF',
    padding: '3px',
    height: '30px',
    width: '30px',
    textAlign: 'center',
    borderRadius: '999px',
  },
  rating: {
    background: '#F77C00',
    paddingLeft: '8px',
    paddingRight: '8px',
    paddingTop: '8px',
    paddingBottom: '8px',
    marginTop: '10px',
    color: '#FFFFFF',
    width: '100px',
    textAlign: 'center',
  },
  green: {
    fontSize: '27px',
    color: '#04AA6D',
  },
  ratingGreen: {
    background: '#04AA6D',
    padding: '12px',
    marginTop: '10px',
    color: '#FFFFFF',
    width: '100px',
    textAlign: 'center',
  },
}));

const risks = [
  {
    name: 'Unauthorized use of Company Vehicles',
    qty: 23,
  },
  {
    name: 'Fuel siphoning of Company vehicles',
    qty: 19,
  },
  {
    name: 'Expired Contracts',
    qty: 28,
  },
  {
    name: 'Non accountability of raw materials - Issuance and Recieving of Inventory',
    qty: 12,
  },
  {
    name: 'Procurement of defective raw materials',
    qty: 31,
  },
  {
    name: 'Non Compliance with KRA',
    qty: 29,
  },
  {
    name: 'Non Compliance with excise duty obligations',
    qty: 24,
  },
];

const riskScore = [
  {
    risk: 2,
    rating: 'Low',
  },
  {
    risk: 4,
    rating: 'Low',
  },
  {
    risk: 1,
    rating: 'Moderate',
  },
];

function makeDataObjects(rows, cols) {
  const data = [];
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    Array.from(Array(cols)).map((_, colIndex) => {
      data.push({
        a: `А${rowIndex + 1}`,
        b: `B${colIndex + 1}`,
        value: cols + rowIndex * colIndex,
      });
    });
  }
  return data;
}

const Risks = () => {
  const classess = useStyles();
  return (
    <>
      <Typography style={{ marginTop: '20px' }} color="primary" variant="h1">
        Dashboard and Reports
      </Typography>
      <Typography style={{ marginTop: '18px' }} color="primary" variant="h4">
        Risk Heatmap - Risks
      </Typography>
      <Grid container>
        <Grid item md={9}>
          <Grid container spacing={4}>
            <Grid item md={8}>
              {/* <Chart>
                <ChartSeries>
                  <ChartSeriesItem type="heatmap" data={data} color={color} xField="a" yField="b" field="value" />
                </ChartSeries>
              </Chart> */}
            </Grid>
            <Grid item md={4}>
              {risks.map((risk, index) => (
                <Box className={classess.risks}>
                  <Typography className={risk.index === 1 || 2 ? classess.qtyOrange : classess.qtyGreen} key={index}>
                    {risk.qty}
                  </Typography>
                  <Typography key={index}>{risk.name}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} xs={12}>
          {riskScore.map((risk, index) => (
            <Box className={classess.riskscore} key={index}>
              <Typography className={risk.rating === 'Low' ? classess.ratingGreen : classess.ratingGreen}>
                {risk.rating}
              </Typography>
              <Typography>{risk.risk}</Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Risks;
