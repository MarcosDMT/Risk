import React, { useState } from 'react';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import CmtImage from '../../../../../@coremat/CmtImage';
import CmtBackDrop from '../../../../../@coremat/CmtBackDrop';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { Box, IconButton, Link, MenuItem, Paper, Select, Typography, useTheme } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import { ArrowBackIos, Visibility } from '@material-ui/icons';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import CmtAdvCard from '../../../../../@coremat/CmtAdvCard';
import { Breadcrumbs } from '@mui/material';
import { COLORS, GRADIENT_COLORS } from '../../dummyData';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

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
  const { currentFilter, setCurrentFilter, classes, filters } = props;
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
const OldRisksTreeMap = props => {
  const { data, currentFilter, setCurrentFilter, classes, filters, department, setDepartment, setOpenDialog } = props;
  const [revealed, setRevealed] = useState(false);
  const handleOnRevealed = () => {
    setRevealed(!revealed);
  };

  return (
    <CmtBackDrop
      concealedIcon={<CmtImage src={'/images/icons/filter_icon.png'} alt="filter" />}
      backLayerConcealed={revealed ? '' : <FilterHeader {...{ currentFilter, classes }} />}
      backLayerRevealed={<Filter {...{ currentFilter, setCurrentFilter, classes, filters }} />}
      onRevealed={handleOnRevealed}>
      <Box display="flex" alignItems="center" p={{ xs: 4, lg: 6, xl: 8 }}>
        <Box>
          <Box pl={{ xs: 4, lg: 6, xl: 8 }}>
            <Box display="flex" alignItems="center" alignContent={'center'}>
              {department.name !== '' && (
                <IconButton onClick={e => setDepartment({ id: '', name: '' })}>
                  <ArrowBackIos fontSize={'small'} />
                </IconButton>
              )}
              <Typography component="div" variant="h4">
                Number of Risks by {currentFilter} {department.name !== '' && `- ${department.name}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={2}>
        <RisksTreeMapChat {...{ data, department, setDepartment, currentFilter, filters, setOpenDialog }} />
      </Box>
    </CmtBackDrop>
  );
};
const AssessmentTreeMap = props => {
  const { data, currentFilter, setCurrentFilter, classes, filters, department, setDepartment, setOpenDialog } = props;
  const [breadcrumbsList, setBreadcrumbsList] = useState([{ name: currentFilter, action: '', level: 0 }]);
  const handleFilterChange = e => {
    setCurrentFilter(e.target.value);
    resetBreadcrumbs(e.target.value);
  };
  const handleOnMapClick = data => {
    if (department.id === '' && currentFilter === filters[0].label) {
      setDepartment({ id: data.id, name: data.name });
      if (breadcrumbsList.length < 2) {
        const list = [...breadcrumbsList];
        list.push({ name: data.name, level: breadcrumbsList.length + 1, action: '' });
        setBreadcrumbsList(list);
      }
    } else {
      setOpenDialog(true);
    }
  };
  const resetBreadcrumbs = name => {
    onClickBreadcrumbs(0, name);
  };
  const onClickBreadcrumbs = (index, name) => {
    const list = [...breadcrumbsList];
    list.splice(index + 1, list.length);
    list[0].name = name;
    setBreadcrumbsList(list);
    setDepartment({ id: '', name: '' });
  };
  const getBreadcrumbs = () => {
    return (
      <>
        <Breadcrumbs aria-label={'breadcrumb'} separator={'>'} className="bread-crumbs">
          {breadcrumbsList.map((item, index) =>
            breadcrumbsList.length - 1 === index ? (
              <Typography underline="hover" variant={'h6'} key={index}>
                {item.name}
              </Typography>
            ) : (
              <Link
                underline="hover"
                color="primary"
                variant={'h6'}
                href=""
                onClick={e => {
                  e.preventDefault();
                  onClickBreadcrumbs(index, currentFilter);
                }}
                key={index}>
                {item.name}
              </Link>
            ),
          )}
        </Breadcrumbs>
      </>
    );
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
      <CmtCardHeader title={`Number of Risks  by ${currentFilter}`} subTitle={``}>
        {getFilters()}
      </CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <Box mb={2}>{getBreadcrumbs()}</Box>
        <GridContainer>
          <Grid item xs={12} md={12}>
            <RisksTreeMapChat {...{ data, handleOnMapClick }} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography gutterBottom variant={'h4'}>
              KEY
            </Typography>
            <RisksTreeMapKey {...{ data, department, currentFilter }} />
          </Grid>
        </GridContainer>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};
const RisksTreeMapKey = ({ data, department, currentFilter, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        {data !== undefined &&
          data.length !== 0 &&
          data.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className={clsx(classes.countryCellItem, {
                  active: department.name === item.name,
                })}
                {...rest}>
                <Box component="span" ml={3} height={10} width={10} bgcolor={item.color} borderRadius="50%" />
                <Box>
                  <Box className="text-hover" px={1}>
                    <b>{item.name}</b>
                  </Box>
                </Box>
                <Box px={1} display="flex" alignItems="center">
                  <Box mx={1}>{item.risks}</Box>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
      <Typography gutterBottom variant={'h6'}>
        {currentFilter}
      </Typography>
      <Grid container spacing={1}>
        {data !== undefined &&
          data.length !== 0 &&
          data[0].children.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                className={clsx(classes.countryCellItem, {
                  active: department.name === item.name,
                })}
                {...rest}>
                {/*<Box component="span" ml={3} height={10} width={10} bgcolor={COLORS[4]} borderRadius="50%" />*/}
                <Box>
                  <Box className="text-hover" px={1}>
                    <b>{item.slug}</b> - {item.name}
                  </Box>
                </Box>
                <Box px={1} display="flex" alignItems="center">
                  <Box mx={1}></Box>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
const RisksTreeMapChat = props => {
  const theme = useTheme();
  const { data, color = COLORS[4], handleOnMapClick } = props;
  const onClickTreeMap = data => {
    handleOnMapClick(data);
  };

  const CustomizedContent = props => {
    const { root, depth, x, y, width, height, index, fill, color, risks, name, slug } = props;
    //colors[Math.floor((index / root.children.length) * 6)]
    return (
      <g>
        {depth === 1 && (
          <defs>
            <linearGradient id={`color${index}`} x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90)">
              <stop offset="20%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={getGradientColor(color)} stopOpacity={1} />
            </linearGradient>
          </defs>
        )}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth === 1 ? `url(#color${index})` : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
            cursor: 'pointer',
          }}
        />
        {depth === 2 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fontFamily={theme.typography.fontFamily}
            letterSpacing={2}
            fontWeight={theme.typography.fontWeightLight}
            fill={alpha(theme.palette.common.white, 0.74)}
            fontSize={14}>
            {slug}
          </text>
        ) : null}
        {depth === 2 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 27}
            fontFamily={theme.typography.fontFamily}
            letterSpacing={2}
            fontWeight={theme.typography.fontWeightLight}
            textAnchor="middle"
            fill={alpha(theme.palette.common.white, 0.74)}
            fontSize={12}>
            {risks}
          </text>
        ) : null}
        {/*{depth === 1 ? (*/}
        {/*  <text x={x + 4} y={y + 18} fill="#fff" fontSize={14} fillOpacity={0.9}>*/}
        {/*    {index + 1}*/}
        {/*  </text>*/}
        {/*) : null}*/}
      </g>
    );
  };
  const getGradientColor = color => {
    const gradientColor = GRADIENT_COLORS.find(element => element[0] === color);
    if (gradientColor !== undefined) {
      return gradientColor[1];
    }
    return null;
  };
  const CustomTooltip = ({ active, payload, label }) => {
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
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        data={data}
        dataKey="risks"
        ratio={4 / 3}
        stroke="#fff"
        //onClick={data => onClickTreeMap(data)}
        fill={`url(#color1)`}
        content={<CustomizedContent colors={COLORS} />}
        isAnimationActive={true}>
        <Tooltip content={CustomTooltip} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default AssessmentTreeMap;
