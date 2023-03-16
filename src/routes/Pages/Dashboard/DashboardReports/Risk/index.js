import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LossTypeProbabilityChart from '../../GeneralDashboard/RisksGraphs/LossTypeProbabilityChart';
import { alpha } from '@material-ui/core/styles';
import {
  riskTreeDataSections,
  lossTypeRisksCatProgress,
  lossTypeRisksDeptProgress,
  riskControlTypeData,
  riskControlTypeDataCat,
  riskProbabilityData,
  riskProbabilityDataCat,
  riskTreeDataControlCat,
  riskTreeDataDepartments,
} from '../../dummyData';
import DashboardHeader, { RiskDashboardHeader } from '../../DashboardHeader';
import UpcomingActions from './UpcomingActions';
import IncidentReport from './Incident';
import RiskIndicators from './RiskIndicators';
import ComplianceDashboard from '../Compliance';
import {
  getComplianceSummaryData,
  getRiskSummaryData,
  getUniverseDashboardData,
} from '../../../../../redux/actions/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import ViewRisk from './ViewRisk';
import ViewIncident from './ViewIncident';

const useStyles = makeStyles(theme => ({
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      paddingLeft: 8,
      paddingRight: 8,
    },
    color: alpha(theme.palette.common.white, 0.74),
    '&:not(:first-child)': {
      borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
    },
    '& .MuiSvgIcon-root': {
      marginRight: 12,
    },
  },
  backdropContent: {
    color: alpha(theme.palette.common.white, 0.74),
    '& .form-control': {
      marginBottom: 20,
      '& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root': {
        color: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        borderBottomColor: alpha(theme.palette.common.white, 0.74),
      },
    },
  },
  dialogRoot: {
    position: 'relative',
  },
  dialogHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.white,
    },
  },
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
    justifyContent: 'space-between',
    marginTop: '7px',
    paddingLeft: '14px',
    paddingRight: '14px',
    paddingTop: '12px',
    paddingBottom: '12px',
  },
  risks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10px',
    gap: 12,
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
    padding: '4px',
    marginTop: '7px',
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
    padding: '4px',
    marginTop: '10px',
    color: '#FFFFFF',
    width: '100px',
    textAlign: 'center',
  },
}));

const topSectionData = [
  {
    title: 'No. of Risks Identified',
    data: 7,
  },
  {
    title: 'Overall Risk Category',
    data: 7,
  },
  {
    title: 'Overall Risk Rating',
    data: 'Moderate',
  },
  {
    title: 'Risk Score',
    data: 7,
  },
];

const filterOptions = [
  { id: 1, label: 'Departments' },
  { id: 2, label: 'Risk Categories' },
];

const DashboardReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [probabilityData, setProbabiltyData] = useState([]);
  const [lossTypeData, setLossTypeData] = useState([]);
  const [controlTypeData, setControlTypeData] = useState([]);
  const [filters, setFilters] = useState(filterOptions);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [department, setDepartment] = useState({ id: '', name: '' });
  const [currentFilter, setCurrentFilter] = useState(filters[0].label);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [riskDetails, setRiskDetails] = useState({});
  const { dashboardData, riskSummary, complianceSummary } = useSelector(({ universeDashboard }) => universeDashboard);

  const fetchData = async () => {
    if (currentFilter === filters[0].label) {
      await dispatch(getUniverseDashboardData(filters[0]));
      setIsLoading(false);
    } else if (currentFilter === filters[1].label) {
      await dispatch(getUniverseDashboardData(filters[1]));
      setIsLoading(false);
    }
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const onViewRisk = data => {
    setRiskDetails(data);
    setOpenDrawer(true);
  };

  const onViewIncident = data => {
    setRiskDetails(data);
    setOpenDrawer(true);
  };

  const fetchRiskSummary = async () => {
    await dispatch(getRiskSummaryData());
  };
  const fetchComplianceSummary = async () => {
    await dispatch(getComplianceSummaryData());
  };

  useEffect(() => {
    fetchData();
  }, [currentFilter, department]);

  useEffect(() => {
    fetchRiskSummary();
    fetchComplianceSummary();
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Typography style={{ marginTop: '20px' }} color="primary" variant="h1">
            Dashboard and Reports
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <RiskDashboardHeader data={riskSummary} />
        </Grid>
        <Grid item md={12} xs={12}>
          <LossTypeProbabilityChart
            {...{ data: dashboardData, lossTypeData, classes, currentFilter, setCurrentFilter, filters, isLoading }}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <UpcomingActions onViewRisk={onViewRisk} />
        </Grid>
        <Grid item xs={12} md={12}>
          <IncidentReport onViewIncident={onViewIncident}/>
        </Grid>
        <Grid item xs={12} md={12}>
          <RiskIndicators onViewRisk={onViewRisk} />
        </Grid>
        <Grid item xs={12} md={12}>
          <ComplianceDashboard data={complianceSummary} />
        </Grid>
        <ViewRisk riskDetails={riskDetails} openDrawer={openDrawer} onCloseDrawer={onCloseDrawer} />
        <ViewIncident riskDetails={riskDetails} openDrawer={openDrawer} onCloseDrawer={onCloseDrawer} />
      </Grid>
    </>
  );
};

export default DashboardReport;
