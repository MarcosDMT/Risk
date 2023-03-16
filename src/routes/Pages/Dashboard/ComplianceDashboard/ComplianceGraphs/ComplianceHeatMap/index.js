import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { Area, AreaChart, Label, Legend, ResponsiveContainer, Tooltip, Treemap, XAxis, YAxis } from 'recharts';
import { Box, Link, MenuItem, Paper, Select, Typography, useTheme } from '@material-ui/core';
import CmtAdvCard from '../../../../../../@coremat/CmtAdvCard';
import CmtCardHeader from '../../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import {
  COLORS,
  complianceByDepartments,
  complianceBySections,
  complianceBySubSections,
  GRADIENT_COLORS,
  overallComplianceYearly,
} from '../../../dummyData';
import { alpha } from '@material-ui/core/styles';
import { Breadcrumbs } from '@mui/material';
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
  selectBoxRoot: {
    '&:before, &:after': {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
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
const filters = [
  {
    label: 'Overall Compliance',
    value: 'Overall',
  },
  {
    label: 'Statutory Compliance',
    value: 'Statutory',
  },
  {
    label: 'Enterprise Compliance',
    value: 'Enterprise',
  },
  {
    label: 'Legal Compliance',
    value: 'Legal',
  },
];
const ComplianceHeatMap = () => {
  const [data, setData] = useState([]);
  const [compliance, setCompliance] = useState({});
  const [complianceTypes, setComplianceTypes] = useState(filters);
  const [filter, setFilter] = useState(filters[0].value);
  const [breadcrumbsList, setBreadcrumbsList] = useState([{ name: filter + ' Compliance', action: '', level: 0 }]);
  const classes = useStyles();
  const handleFilterChange = e => {
    setFilter(e.target.value);
    resetBreadcrumbs(e.target.value);
  };
  const resetBreadcrumbs = name => {
    const data = [...breadcrumbsList];
    data[0].name = name + ' Compliance';
    setBreadcrumbsList(data);
  };
  const getFilters = () => {
    return (
      <>
        <Box component="span" mr={3} height={10} width={10} bgcolor={compliance.color} borderRadius="50%" />
        <Select
          className={classes.selectBoxRoot}
          labelId="simple-select-label"
          id="simple"
          value={filter}
          onChange={handleFilterChange}>
          {complianceTypes.map((item, index) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </>
    );
  };
  const onClickBreadcrumbs = index => {
    const list = [...breadcrumbsList];
    list.splice(index + 1, list.length);
    setBreadcrumbsList(list);
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
                  onClickBreadcrumbs(index);
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
  const fetchData = () => {
    let data = [],
      filteredData;
    if (breadcrumbsList.length === 1) {
      data = [...complianceByDepartments];
    }
    if (breadcrumbsList.length === 2) {
      data = [...complianceBySections];
    }
    if (breadcrumbsList.length === 3) {
      data = [...complianceBySubSections];
    }
    if (data.length !== 0) {
      filteredData = data.find(datum => datum.compliance === filter);
      setData(filteredData.data);
      setCompliance(filteredData);
    }
  };
  const handleOnMapClick = data => {
    if (breadcrumbsList.length < 3) {
      const list = [...breadcrumbsList];
      list.push({ name: data.name, level: breadcrumbsList.length + 1, action: '' });
      setBreadcrumbsList(list);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter, breadcrumbsList]);

  return (
    <CmtAdvCard>
      <CmtCardHeader title={'Compliance Report by Departments'} subTitle={`${filter} Compliance Rating`}>
        {getFilters()}
      </CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <Box mb={2}>{getBreadcrumbs()}</Box>
        <GridContainer>
          <Grid item xs={12} md={12}>
            <ComplianceChart {...{ data, compliance, handleOnMapClick }} />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography gutterBottom variant={'h4'}>
              KEY
            </Typography>
            <TreeMapKey {...{ data, compliance, handleOnMapClick }} />
          </Grid>
        </GridContainer>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};
const TreeMapKey = ({ data, compliance, handleOnMapClick, ...rest }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={1}>
        {data.length !== 0 &&
          data.map((item, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={e => handleOnMapClick(item)}
                className={clsx(classes.countryCellItem, {
                  // active: department.name === item.name,
                })}
                {...rest}>
                <Box component="span" ml={3} height={10} width={10} bgcolor={compliance.color} borderRadius="50%" />
                <Box>
                  <Box className="text-hover" px={1}>
                    <b>{item.slug}</b> - {item.name}
                  </Box>
                </Box>
                <Box px={1} display="flex" alignItems="center">
                  <Box mx={1}>{item.rating}%</Box>
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
};
const ComplianceChart = ({ data, compliance, handleOnMapClick }) => {
  const theme = useTheme();
  const color = compliance.color !== undefined ? compliance.color : theme.palette.success.main;
  const onClickTreeMap = data => {
    handleOnMapClick(data);
  };
  const CustomizedContent = props => {
    const { depth, x, y, width, height, fill, name, rating, slug } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? fill : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
            cursor: 'pointer',
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fontFamily={theme.typography.fontFamily}
            fontWeight={theme.typography.fontWeightLight}
            fill={alpha(theme.palette.common.white, 0.74)}
            fontSize={14}>
            {slug}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 27}
            fontFamily={theme.typography.fontFamily}
            fontWeight={theme.typography.fontWeightLight}
            textAnchor="middle"
            fill={alpha(theme.palette.common.white, 0.74)}
            fontSize={12}>
            {rating}%
          </text>
        ) : null}
      </g>
    );
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box component={Paper} boxShadow={2} padding={2}>
          <Typography variant={'h5'} style={{ color: payload[0].payload.fill }}>
            {payload[0].payload.name}
          </Typography>
          <Typography variant={'caption'}>{`Compliance Rating : ${payload[0].value}%`}</Typography>
        </Box>
      );
    }
    return null;
  };
  const getGradientColor = color => {
    const gradientColor = GRADIENT_COLORS.find(element => element[0] === color);
    if (gradientColor !== undefined) {
      return gradientColor[1];
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        data={data}
        dataKey="rating"
        ratio={4 / 3}
        stroke="#fff"
        onClick={data => onClickTreeMap(data)}
        fill={`url(#color1)`}
        content={<CustomizedContent colors={COLORS} />}
        isAnimationActive={true}>
        <Tooltip content={CustomTooltip} />
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90)">
            <stop offset="20%" stopColor={color} stopOpacity={1} />
            <stop offset="100%" stopColor={getGradientColor(color)} stopOpacity={1} />
          </linearGradient>
        </defs>
      </Treemap>
    </ResponsiveContainer>
  );
};

export default ComplianceHeatMap;
