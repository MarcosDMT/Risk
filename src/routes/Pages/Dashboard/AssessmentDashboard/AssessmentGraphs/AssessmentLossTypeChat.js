import React, { useState } from 'react';
import CmtBackDrop from '../../../../../@coremat/CmtBackDrop';
import CmtImage from '../../../../../@coremat/CmtImage';
import { Box, Paper, Typography } from '@material-ui/core';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { COLORS } from '../../dummyData';

const Filter = props => {
  const { currentFilter, setCurrentFilter, classes, filters = [] } = props;
  const handleChange = event => {
    setCurrentFilter(event.target.value);
  };

  return (
    <CmtCardContent>
      <Box className={classes.backdropContent}>
        <AppSelectBox
          label="Filter with"
          data={filters}
          valueKey="label"
          labelKey="label"
          value={currentFilter}
          onChange={handleChange}
        />
      </Box>
    </CmtCardContent>
  );
};
const FilterHeader = ({ currentFilter, classes }) => {
  return (
    <Box display="flex" alignItems="center" mx={{ xs: -2, sm: -4 }}>
      <Box className={classes.headerItem}>
        {/*<DashboardIcon />*/}
        {currentFilter}
      </Box>
      {/*<Box className={classes.headerItem}>*/}
      {/*  <CalendarTodayIcon />*/}
      {/*  {getFormattedDate(startDate, ' DD MMM')} - {getFormattedDate(endDate, ' DD MMM')}*/}
      {/*</Box>*/}
    </Box>
  );
};
const AssessmentLossTypeChat = props => {
  const { classes, currentFilter = 'Loss Type', data, setCurrentFilter, filters } = props;
  const [revealed, setRevealed] = useState(false);
  const handleOnRevealed = () => {
    setRevealed(!revealed);
  };
  return (
    <CmtBackDrop
      concealedIcon={<CmtImage src={'/images/icons/filter_icon.png'} alt="filter" />}
      backLayerConcealed={revealed ? '' : <FilterHeader {...{ currentFilter, classes }} />}
      backLayerRevealed={<Filter {...{ currentFilter, classes, setCurrentFilter, filters }} />}
      onRevealed={handleOnRevealed}>
      <Box display="flex" alignItems="center" p={{ xs: 4, lg: 6, xl: 8 }}>
        <Box>
          <Box pl={{ xs: 4, lg: 6, xl: 8 }}>
            <Box display="flex" alignItems="baseline">
              <Typography component="div" variant="h4">
                Number of Risks per Loss Type
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={2}>
        <LossTypeStackChart {...{ data }} />
      </Box>
    </CmtBackDrop>
  );
};
const LossTypeStackChart = props => {
  const { data } = props;
  const CustomTooltip = ({ active, payload, label }) => {
    console.log(payload);
    if (active && payload && payload.length) {
      return (
        <Box component={Paper} boxShadow={2} padding={2}>
          <Typography variant={'h5'} style={{ color: payload[0].payload.fill }}>
            {payload[0].payload.name}
          </Typography>
          <Typography variant={'caption'}>{`Risks : ${payload[0].value}`}</Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <BarChart data={data}>
        {/*<CartesianGrid />*/}
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="a" stackId="a" name={'Near Miss'} fill={COLORS[3]} />
        <Bar dataKey="b" stackId="a" name={'Opportunity Cost'} fill={COLORS[2]} />
        <Bar dataKey="c" stackId="a" name={'Indirect Financial Cost'} fill={COLORS[1]} />
        <Bar dataKey="d" stackId="a" name={'Direct Financial Cost'} fill={COLORS[0]} />
        <Legend verticalAlign="bottom" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default AssessmentLossTypeChat;
