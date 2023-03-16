import React, { useEffect, useState } from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../Roles/index.style';
import { useHistory } from 'react-router-dom';
import ViewCompliance from './ViewCompliance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLegalCompliance } from '../../../../redux/actions/Compliance';
import ImportLegalCompliance from './ImportBulkCompliance';
import LegalComplianceTable from './LegalComplianceTable';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.LEGAL_COMPLIANCE.name, active: false },
];
const LegalCompliance = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const { legalComplianceData } = useSelector(({ compliance }) => compliance);
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
    history.push({ pathname: `legal-compliance/update`, state: data });
  };
  const onDeleteCompliance = data => {
    //console.log(data);
  };
  useEffect(() => {
    dispatch(fetchLegalCompliance());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.LEGAL_COMPLIANCE.name} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box padding={5}>
            <LegalComplianceTable
              {...{
                breadCrumbsTitle: HEADER.LEGAL_COMPLIANCE.name,
                complianceList: legalComplianceData,
                classes,
                setOpenDialog,
                onViewCompliance,
                onUpdateCompliance,
                onDeleteCompliance,
              }}
            />
          </Box>
        </Box>
      </PageContainer>
      <ImportLegalCompliance
        {...{
          breadCrumbsTitle: HEADER.LEGAL_COMPLIANCE.name,
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

export default LegalCompliance;
