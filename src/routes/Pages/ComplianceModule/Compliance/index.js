import React, { useEffect, useState } from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../Roles/index.style';
import { useHistory } from 'react-router-dom';
import ComplianceTable from './ComplianceTable';
import { complianceData } from '../dummyData';
import ImportCompliance from './ImportBulkCompliance';
import ViewCompliance from './ViewCompliance';
import { Redirect, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEnterpriseCompliance,
  fetchLegalCompliance,
  fetchStatutoryCompliance,
} from '../../../../redux/actions/Compliance';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.COMPLIANCE, active: false },
];
const Compliance = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const { legalComplianceData, enterpriseComplianceData, statutoryComplianceData } = useSelector(
    ({ compliance }) => compliance,
  );
  const [complianceList, setComplianceList] = useState([]);
  const [importedCompliance, setImportedCompliance] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [complianceDetails, setComplianceDetails] = useState({});
  const [breadCrumbsTitle, setBreadCrumbsTitle] = useState('');
  const [isLegalCompliance, setIsLegalCompliance] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const searchParams = useParams();

  const fetchCompliance = compliance => {
    setComplianceList(compliance);
  };
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
    history.push({ pathname: `${searchParams.name}/update`, state: data });
  };
  const onDeleteCompliance = data => {
    //console.log(data);
  };
  const getTitle = title => {
    if (
      title !== HEADER.ENTERPRISE_COMPLIANCE.url &&
      title !== HEADER.LEGAL_COMPLIANCE.url &&
      title !== HEADER.STATUTORY_COMPLIANCE.url
    ) {
      history.push('/not-found');
    } else {
      if (title === HEADER.ENTERPRISE_COMPLIANCE.url) {
        setBreadCrumbsTitle(HEADER.ENTERPRISE_COMPLIANCE.name);
        setIsLegalCompliance(false);
        dispatch(fetchEnterpriseCompliance());
        fetchCompliance(enterpriseComplianceData);
      } else if (title === HEADER.LEGAL_COMPLIANCE.url) {
        setBreadCrumbsTitle(HEADER.LEGAL_COMPLIANCE.name);
        setIsLegalCompliance(true);
        dispatch(fetchLegalCompliance());
        fetchCompliance(legalComplianceData);
      } else if (title === HEADER.STATUTORY_COMPLIANCE.url) {
        setBreadCrumbsTitle(HEADER.STATUTORY_COMPLIANCE.name);
        setIsLegalCompliance(false);
        dispatch(fetchStatutoryCompliance());
        fetchCompliance(statutoryComplianceData);
      }
    }
  };
  useEffect(() => {
    getTitle(searchParams.name);
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={breadCrumbsTitle} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box padding={5}>
            <ComplianceTable
              {...{
                isLegalCompliance,
                breadCrumbsTitle,
                complianceList,
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
      <ImportCompliance
        {...{
          isLegalCompliance,
          breadCrumbsTitle,
          openDialog,
          onCloseDialog,
          activeStep,
          setActiveStep,
          file,
          setFile,
          complianceList: importedCompliance,
        }}
      />
      <ViewCompliance {...{ complianceDetails, openDrawer, onCloseDrawer, isLegalCompliance }} />
      <NotificationContainer />
    </React.Fragment>
  );
};

export default Compliance;
