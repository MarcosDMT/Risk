import React, { useState } from 'react';
import CmtBackDrop from '../../../../../@coremat/CmtBackDrop';
import CmtImage from '../../../../../@coremat/CmtImage';
import { Box, MenuItem, Select, Typography } from '@material-ui/core';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import Grid from '@material-ui/core/Grid';
import CmtAdvCard from '../../../../../@coremat/CmtAdvCard';
import { COLORS } from '../../dummyData';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { alpha } from '@material-ui/core/styles';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

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
  countryCellItem: {
    cursor: 'pointer',
    padding: 10,
    fontSize: 12,
    transition: 'all .2s',
    borderRadius: 4,
    '&:hover, &.active': {
      backgroundColor: alpha(theme.palette.common.dark, 0.04),
      '& .text-hover': {
        color: theme.palette.text.primary,
      },
    },
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
    },
  },
}));
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
const OldControlsChart = props => {
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
const ControlsChart = props => {
  const { classes, currentFilter = 'Control Categories', data, setCurrentFilter, filters } = props;
  const handleFilterChange = e => {
    setCurrentFilter(e.target.value);
  };
  const getFilters = () => {
    return (
      <>
        <Box component="span" mr={3} height={10} width={10} bgcolor={COLORS[4]} borderRadius="50%" />
        <Select
          className={classes.selectBoxRoot}
          labelId="simple-select-label"
          id="simple"
          value={currentFilter}
          onChange={handleFilterChange}>
          {filters.map((item, index) => (
            <MenuItem key={index} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };
  return (
    <CmtAdvCard>
      <CmtCardHeader title={'Risk Category Report'} subTitle={`Number of Risks based on ${currentFilter}`}>
        {getFilters()}
      </CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <Box padding={2}>
          <ControlBubbleChart {...{ data }} />
        </Box>
        <Box padding={2}>
          <Typography gutterBottom variant={'h4'}>
            KEY
          </Typography>
          <ControlMapKey {...{ data }} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};
const ControlMapKey = ({ data, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        {data !== undefined &&
          data.length !== 0 &&
          data[0].data.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className={clsx(classes.countryCellItem, {
                  // active: department.name === item.name,
                })}
                {...rest}>
                <Box component="span" ml={3} height={10} width={10} bgcolor={item.color} borderRadius="50%" />
                <Box>
                  <Box className="text-hover" px={1}>
                    <b>{item.slug}</b> - {item.name}
                  </Box>
                </Box>
                <Box px={1} display="flex" alignItems="center">
                  <Box mx={1}>{item.risks}</Box>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
const ControlBubbleChart = props => {
  const { data } = props;
  const chartOptions = {
    chart: {
      type: 'packedbubble',
      height: 400,
      styleMode: false,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    title: {
      text: '',
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
          format: '{point.slug}',
          filter: {
            property: 'y',
            operator: '>',
            value: 0,
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
export default ControlsChart;
