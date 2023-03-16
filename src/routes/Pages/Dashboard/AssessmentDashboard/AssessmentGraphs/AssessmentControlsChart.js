import React, { useState } from 'react';
import CmtBackDrop from '../../../../../@coremat/CmtBackDrop';
import CmtImage from '../../../../../@coremat/CmtImage';
import { Box, Typography } from '@material-ui/core';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { COLORS } from '../../dummyData';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

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
const AssessmentControlsChart = props => {
  const { classes, currentFilter = 'Control Categories', data, setCurrentFilter, filters } = props;
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
      {/*<Box display="flex" alignItems="center" p={{ xs: 4, lg: 6, xl: 8 }}>*/}
      {/*  <Box>*/}
      {/*    <Box pl={{ xs: 4, lg: 6, xl: 8 }}>*/}
      {/*      <Box display="flex" alignItems="baseline">*/}
      {/*        /!*<Typography component="div" variant="h4">*!/*/}
      {/*        /!*  Number of Risks per Loss Type*!/*/}
      {/*        /!*</Typography>*!/*/}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      <Box padding={2}>
        <ControlBubbleChart {...{ data }} />
      </Box>
    </CmtBackDrop>
  );
};
const ControlBubbleChart = props => {
  const { data } = props;
  const chartOptions = {
    chart: {
      type: 'packedbubble',
      height: 350,
      styleMode: true,
    },
    title: {
      text: 'Number of Risks by Control Categories',
    },
    tooltip: {
      useHTML: true,
      pointFormat: '<b>{point.name}:</b> {point.value}',
    },
    plotOptions: {
      packedbubble: {
        minSize: '50%',
        maxSize: '120%',
        // zMin: 0,
        // zMax: 1000,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: true,
          seriesInteraction: false,
          dragBetweenSeries: false,
          parentNodeLimit: true,
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: 'y',
            operator: '>',
            value: 30,
          },
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal',
          },
        },
      },
    },
    series: data,
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};
export default AssessmentControlsChart;
