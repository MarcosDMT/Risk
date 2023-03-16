import React, { useEffect, useState } from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../Roles/index.style';
import { Link, useHistory } from 'react-router-dom';
import ViewCompliance from './ViewCompliance';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteEnterpriseCompliance,
  fetchEnterpriseCompliance,
  fetchEnterpriseComplianceApproved,
  fetchEnterpriseComplianceComplied,
  fetchEnterpriseComplianceMain,
  fetchEnterpriseComplianceSub,
  getEnterpriseComplianceHistory,
} from '../../../../redux/actions/Compliance';
import ImportEnterpriseCompliance from './ImportBulkCompliance';
import EnterpriseComplianceTable from './EnterpriseComplianceTable';
import MainComplianceSection from './MainComplianceSection';
import { IconButton, Tab, Tabs, Typography } from '@mui/material';
import { Add, FileUpload } from '@mui/icons-material';
import { COMPLIANCE } from '../../../../@jumbo/constants/ActionTypes';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.ENTERPRISE_COMPLIANCE.name, active: false },
];

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
      return compliance?.approvalStatus === 'Approved';
    }
    if (filter === 2) {
      return compliance?.approvalStatus === 'Pending Approval';
    }
    if (filter === 3) {
      return compliance?.obligationStatus === 1 || compliance?.obligationStatus === 3;
    }
    if (filter === 4) {
      return compliance?.obligationStatus === 0 || compliance?.obligationStatus === 2;
    }
    return true;
  });
const filterEnterpriseWithId = (data, id) =>
  data.filter(compliance => {
    if (id && compliance.mainId === id) {
      return true;
    }
    return false;
  });

const EnterpriseCompliance = () => {
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
    history.push({ pathname: `enterprise-compliance/update`, state: data });
  };
  const onDeleteCompliance = async data => {
    await dispatch(deleteEnterpriseCompliance(data));
    await dispatch(fetchEnterpriseCompliance());
  };

  const onFetchEnterpriseHistory = data =>{
    console.log("THIS DATA ",data);
    history.push({ pathname: `enterprise-compliance/history`, state: data })
  }

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
    console.log('ENTERPRISE ', enterpriseData);


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
          <Box width={'100px'}>
            <Link to={`enterprise-compliance/create`}>
              <IconButton title={'Add Compliance'} color={'primary'}>
                <Add />
              </IconButton>
            </Link>
            <IconButton onClick={() => setOpenDialog(true)} title={'Bulk Upload'} color={'primary'}>
              <FileUpload />
            </IconButton>
          </Box>
        </Box>

        <EnterpriseComplianceTable
          {...{
            breadCrumbsTitle: HEADER.ENTERPRISE_COMPLIANCE.name,
            complianceList: enterpriseData,
            classes,
            setOpenDialog,
            step: tabStep,
            onViewCompliance,
            onUpdateCompliance,
            onDeleteCompliance,
            onFetchEnterpriseHistory,
          }}
        />
      </>
    );
  };

  const initializeComplianceData = () => {
    if (mainEnterpriseComplianceData.length > 0 && !selectedEnterprise) {
      dispatch({
        type: COMPLIANCE.ENTERPRISE.GET_SELECTED,
        payload: mainEnterpriseComplianceData[0]?.id,
      });
      dispatch(fetchEnterpriseComplianceSub(mainEnterpriseComplianceData[0]));
    }
  };

  useEffect(() => {
    initializeComplianceData();
  }, [mainEnterpriseComplianceData]);

  useEffect(() => {
    dispatch(fetchEnterpriseComplianceMain());
    dispatch(fetchEnterpriseComplianceComplied());
    dispatch(fetchEnterpriseComplianceApproved());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.ENTERPRISE_COMPLIANCE.name} breadcrumbs={breadcrumbs}>
        <Box
          className={classes.inBuildAppCard}
          sx={{
            flexDirection: 'row',
            display: 'flex',
            p: 5,
          }}>
          <Box
            sx={{
              flex: 1,
              width: '100%',
              minWidth: '250px',
            }}>
            <Typography variant={'h6'}>{'Main Compliance'}</Typography>
            <MainComplianceSection {...{ complianceList: mainEnterpriseComplianceData }} />
          </Box>
          <Box sx={{ flex: 2, pl: 2, width: '100%', minWidth: 'calc(100% - 250px)' }}>{viewComplianceRecords()}</Box>
        </Box>
      </PageContainer>
      <ImportEnterpriseCompliance
        {...{
          breadCrumbsTitle: HEADER.ENTERPRISE_COMPLIANCE.name,
          openDialog,
          onCloseDialog,
          activeStep,
          setActiveStep,
          file,
          setFile,
        }}
      />
      <ViewCompliance {...{ complianceDetails, openDrawer, onCloseDrawer }} />
      <NotificationContainer />
    </React.Fragment>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default EnterpriseCompliance;
