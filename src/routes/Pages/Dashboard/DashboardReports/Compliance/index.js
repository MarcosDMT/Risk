import React, { useState, useEffect } from 'react';
import { Typography, Grid, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import MainComplianceSection from '../../../ComplianceModule/EnterpriseCompliance/MainComplianceSection';
import { Link, useHistory } from 'react-router-dom';
import { HEADER } from '../../../../../@jumbo/constants/HeaderMessages';
import { IconButton, Tab, Tabs } from '@mui/material';
import { Add, FileUpload } from '@mui/icons-material';
import EnterpriseComplianceTable from '../../../ComplianceModule/EnterpriseCompliance/EnterpriseComplianceTable';
import {
  fetchEnterpriseComplianceApproved,
  fetchEnterpriseComplianceMain,
  fetchEnterpriseComplianceComplied,
} from '../../../../../redux/actions/Compliance';
import { ComplianceDashboardHeader } from '../../DashboardHeader';
import ViewCompliance from '../../../ComplianceModule/EnterpriseCompliance/ViewCompliance';
import { fetchEnterpriseComplianceSub } from '../../../../../redux/actions/Compliance';
import { COMPLIANCE } from '../../../../../@jumbo/constants/ActionTypes';

const useStyles = makeStyles(theme => ({
  fieldSet: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #3646A8',
  },
  legend: {
    padding: '4px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  typography: {
    fontSize: '30px',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    // justifyContent: 'space-around',
  },
  parent: {
    marginTop: 12,
  },
}));

const steps = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'Waiting Approval',
    value: 'pending',
  },
  {
    label: 'Compliant',
    value: 'compliant',
  },
  {
    label: 'Non Compliant',
    value: 'non_compliant',
  },
];

const filterEnterpriseData = (data, filter) =>
  data.filter(compliance => {
    if (filter === 0) {
      return true;
    }
    if (filter === 1) {
      return compliance.approvalStatus === 'Approved';
    }
    if (filter === 2) {
      return compliance.approvalStatus === 'Pending Approval';
    }
    if (filter === 3) {
      return compliance.obligationStatus === 1 || compliance.obligationStatus === 3;
    }
    if (filter === 4) {
      return compliance.obligationStatus === 0 || compliance.obligationStatus === 2;
    }
    return false;
  });

const ComplianceDashboard = ({ data }) => {
  const classess = useStyles();
  const [tabStep, setTabStep] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const {
    mainEnterpriseComplianceData,
    subEnterpriseComplianceData,
    approvedEnterpriseCompliance,
    selectedEnterprise,
    compliedEnterpriseCompliance,
  } = useSelector(({ compliance }) => compliance);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [complianceDetails, setComplianceDetails] = useState({});
  const classes = useStyles();
  const history = useHistory();

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
  };
  const onViewCompliance = data => {
    setComplianceDetails(data);
    setOpenDrawer(true);
  };
  const onUpdateCompliance = data => {
    history.push({ pathname: `compliance/enterprise-compliance/update`, state: data });
  };
  const onDeleteCompliance = data => {
    //console.log(data);
  };

  const initializeComplianceData = () => {
    if (mainEnterpriseComplianceData.length > 0 && !selectedEnterprise) {
      dispatch({
        type: COMPLIANCE.ENTERPRISE.GET_SELECTED,
        payload: mainEnterpriseComplianceData[0].id,
      });
      dispatch(fetchEnterpriseComplianceSub(mainEnterpriseComplianceData[0]));
    }
  };

  useEffect(() => {
    initializeComplianceData();
  }, [mainEnterpriseComplianceData]);

  useEffect(() => {
    initializeComplianceData();
  }, [mainEnterpriseComplianceData]);

  const handleOnStepChange = (e, value) => {
    setTabStep(value);
  };

  const viewComplianceRecords = () => {
    let enterpriseData = filterEnterpriseData(subEnterpriseComplianceData, tabStep);
    // if (tabStep === 2){
    //   enterpriseData = filterEnterpriseWithId(approvedEnterpriseCompliance, selectedEnterprise)
    // }
    // if (tabStep === 4){
    //   enterpriseData = filterEnterpriseWithId(compliedEnterpriseCompliance, selectedEnterprise)
    // }

    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs
            visibleScrollbar={true}
            TabIndicatorProps={{
              border: 'none',
            }}
            value={tabStep}
            onChange={handleOnStepChange}
            aria-label="enterprise-compliance-tabs">
            {steps.map((step, index) => (
              <Tab key={index} label={step.label} {...a11yProps(index)} />
            ))}
          </Tabs>
          {/* <Box width={'100px'}>
              <Link to={`enterprise-compliance/create`}>
              <IconButton  title={'Add Compliance'} color={'primary'}><Add/></IconButton>
              </Link>
              <IconButton onClick={() => setOpenDialog(true)}  title={'Bulk Upload'} color={'primary'}>
                <FileUpload />
              </IconButton>
            </Box> */}
        </Box>

        <EnterpriseComplianceTable
          {...{
            breadCrumbsTitle: HEADER.ENTERPRISE_COMPLIANCE.name,
            complianceList: enterpriseData,
            classes,
            setOpenDialog,
            viewOnly: true,
            step: tabStep,
            onViewCompliance,
            onUpdateCompliance,
            onDeleteCompliance,
          }}
        />
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchEnterpriseComplianceMain());
    dispatch(fetchEnterpriseComplianceComplied());
    dispatch(fetchEnterpriseComplianceApproved());
  }, []);

  return (
    <>
      <Typography color="primary" variant="h1">
        Compliance
      </Typography>
      <Box mt={4}>
        <ComplianceDashboardHeader {...{ data }} />
      </Box>

      <Box sx={{ display: 'flex', py: 4, marginTop: 20 }}>
        <Box
          sx={{
            flex: 1,
            width: '100%',
            minWidth: '250px',
          }}>
          <MainComplianceSection {...{ complianceList: mainEnterpriseComplianceData }} />
        </Box>
        <Box sx={{ flex: 2, pl: 2, width: '100%', minWidth: 'calc(100% - 250px)' }}>{viewComplianceRecords()}</Box>
      </Box>
      <ViewCompliance {...{ complianceDetails, openDrawer, onCloseDrawer }} />
    </>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default ComplianceDashboard;
