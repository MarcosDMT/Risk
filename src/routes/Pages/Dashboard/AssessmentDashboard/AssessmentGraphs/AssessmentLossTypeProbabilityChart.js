import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CmtAdvCard from '../../../../../@coremat/CmtAdvCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import { MenuItem, Select, Typography } from '@material-ui/core';
import CmtList from '../../../../../@coremat/CmtList';
import { ListItem } from '@mui/material';
import CmtProgressBar from '../../../../../@coremat/CmtProgressBar';
import { ProbabilityBubbleChart } from './AssessmentProbabilityBubbleChat';
import clsx from 'clsx';
import { COLORS, GRADIENT_COLORS } from '../../dummyData';
import { alpha } from '@material-ui/core/styles';
import { residualList } from '../../../RiskManagement/dummyData';

const useStyles = makeStyles(theme => ({
  cardContentRoot: {
    position: 'relative',
  },
  selectBoxRoot: {
    '&:before, &:after': {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
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

const AssessmentLossTypeProbabilityChart = props => {
  const { data, lossTypeData, currentFilter, setCurrentFilter, filters } = props;
  const classes = useStyles();
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
      <CmtCardHeader title={'Likelihood Vs Impact Report'} subTitle={`Number of Risks based on ${currentFilter}`}>
        {getFilters()}
      </CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <GridContainer>
          <Grid item xs={12} lg={8}>
            <GridContainer spacing={1}>
              <Grid item xs={12} md={12}>
                <ProbabilityBubbleChart {...{ data }} />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant={'h4'} gutterBottom>
                  KEY
                </Typography>
                <ProbabilityKey {...{ data }} />
              </Grid>
            </GridContainer>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Typography align={'center'} variant={'h4'}>
              Loss Category (%)
            </Typography>
            <Box mt={1} className={classes.lossCategoryRoot}>
              <LossTypeProgress data={lossTypeData} />
            </Box>
          </Grid>
        </GridContainer>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};
const ProbabilityKey = ({ data, ...rest }) => {
  const classes = useStyles();
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
  return (
    <>
      <Grid container spacing={1}>
        {data.length !== 0 &&
          data.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className={clsx(classes.countryCellItem, {
                  //active: department.name === item.name,
                })}
                {...rest}>
                <Box
                  component="span"
                  ml={3}
                  height={10}
                  width={10}
                  bgcolor={computeResidual(item.x * item.y)}
                  borderRadius="50%"
                />
                <Box>
                  <Box className="text-hover" px={1}>
                    <b>{item.slug}</b> - {item.name}
                  </Box>
                </Box>
                <Box px={1} display="flex" alignItems="center">
                  <Box mx={1}>{item.z}</Box>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
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

export default AssessmentLossTypeProbabilityChart;
