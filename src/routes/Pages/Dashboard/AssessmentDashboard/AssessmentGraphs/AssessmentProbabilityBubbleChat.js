import React, { useState } from 'react';
import CmtImage from '../../../../../@coremat/CmtImage';
import { Box, Paper, Typography } from '@material-ui/core';
import CmtBackDrop from '../../../../../@coremat/CmtBackDrop';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import {
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { probabilityList, residualList, severityList } from '../../../RiskManagement/dummyData';
import { blendColors } from '../../../../../@jumbo/utils/commonHelper';
import { alpha } from '@material-ui/core/styles';
import { GRADIENT_COLORS } from '../../dummyData';

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
const AssessmentProbabilityChat = props => {
  const { classes, currentFilter = 'Likelihood Vs Impact', data, filters, setCurrentFilter } = props;
  const [revealed, setRevealed] = useState(false);
  const handleOnRevealed = () => {
    setRevealed(!revealed);
  };
  return (
    <CmtBackDrop
      concealedIcon={<CmtImage src={'/images/icons/filter_icon.png'} alt="filter" />}
      backLayerConcealed={revealed ? '' : <FilterHeader {...{ currentFilter, classes }} />}
      backLayerRevealed={<Filter {...{ currentFilter, classes, filters, setCurrentFilter }} />}
      onRevealed={handleOnRevealed}>
      <Box display="flex" alignItems="center" p={{ xs: 4, lg: 6, xl: 8 }}>
        <Box>
          <Box pl={{ xs: 4, lg: 6, xl: 8 }}>
            <Box display="flex" alignItems="baseline">
              <Typography component="div" variant="h4">
                Likelihood Vs Impact
              </Typography>
              <Box flex={'1 0 auto'} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={2}>
        <ProbabilityBubbleChart {...{ data }} />
      </Box>
    </CmtBackDrop>
  );
};

export const ProbabilityBubbleChart = props => {
  const { data } = props;
  const getColor = data => {
    const product = data.x * data.y;
    return computeResidual(product);
    // const probability = [...probabilityList];
    // const severity = [...severityList];
    // const probColor = probability.find(element => element.orderIndex + 1 === data.x);
    // const severColor = severity.find(element => element.orderIndex + 1 === data.y);
    // return blendColors(probColor.color, severColor.color, 1);
  };
  const computeResidual = value => {
    const residualRisk = [...residualList];
    let index;
    if (value > 0 && value <= 4) {
      index = 4;
    } else if (value > 4 && value <= 8) {
      index = 8;
    } else if (value > 8 && value <= 12) {
      index = 12;
    } else if (value > 12 && value <= 16) {
      index = 16;
    }
    const residual = residualRisk.find(element => element.value === index);
    return residual.color;
  };
  const getGradientColor = color => {
    const gradientColor = GRADIENT_COLORS.find(element => element[0] === color);
    console.log(`${color + ':' + gradientColor}`);
    if (gradientColor !== undefined) {
      return gradientColor[1];
    }
    return null;
  };
  const getLabelX = tick => {
    const probability = [...probabilityList];
    const probColor = probability.find(element => element.orderIndex + 1 === tick);
    return probColor.name;
  };
  const getLabelY = tick => {
    //console.log(tick);
    const severity = [...severityList];
    const severColor = severity.find(element => element.orderIndex + 1 === tick);
    if (tick !== 0) {
      return severColor.name;
    }
    return '';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const residual = payload[0].value * payload[1].value;
      return (
        <Box component={Paper} gridRowGap={'2px'} boxShadow={2} padding={2} bgcolor={alpha(computeResidual(residual), 0.5)}>
          <Typography variant={'h5'}>{payload[0].payload.name}</Typography>
          <Typography variant={'caption'} component={'p'}>{`${payload[0].name} : ${getLabelX(
            payload[0].value,
          )}`}</Typography>
          <Typography variant={'caption'} component={'p'}>{`${payload[1].name} : ${getLabelY(
            payload[1].value,
          )}`}</Typography>
          <Typography variant={'caption'} component={'p'}>{`No of ${payload[2].name} : ${payload[2].value}`}</Typography>
        </Box>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}>
        {/*<CartesianGrid strokeDasharray="3 3" />*/}
        <XAxis
          dataKey="x"
          // type={'category'}
          name="Likelihood"
          //tick={customLabelAxis}
          allowDuplicatedCategory={false}
          tickFormatter={getLabelX}
        />
        <YAxis
          dataKey="y"
          // type={'category'}
          name="Impact"
          //tick={customLabelYAxis}
          allowDuplicatedCategory={false}
          tickFormatter={getLabelY}
        />
        <ZAxis dataKey="z" type={'number'} range={[200, 800]} name="Risks" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={CustomTooltip} />
        <Scatter name="Risks" data={data}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`${getColor(entry)}`} />
          ))}
        </Scatter>
        {/*<defs>*/}
        {/*  {data.map((risk, index) => (*/}
        {/*    <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90)">*/}
        {/*      <stop offset="20%" stopColor={getColor(risk)} stopOpacity={1} />*/}
        {/*      <stop offset="100%" stopColor={getGradientColor(`${getColor(risk)}`)} stopOpacity={1} />*/}
        {/*    </linearGradient>*/}
        {/*  ))}*/}
        {/*</defs>*/}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default AssessmentProbabilityChat;
