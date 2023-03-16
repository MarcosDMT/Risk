import React, { useEffect, useState } from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../Roles/index.style';
import RisksTable from './RisksTable';
import ImportRisks from './RiskBulkImport';
import { risksList } from '../dummyData';
import ViewRisk from './ViewRisk';
import { useHistory } from 'react-router-dom';
import { deleteRisk, fetchRisks } from '../../../../redux/actions/RiskUniverse';
import { useSelector, useDispatch } from 'react-redux';
import RiskApprovals from './RiskApprovals';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.RISK_UNIVERSE, active: true },
];
const RiskUniverse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { risks } = useSelector(({ riskUniverse }) => riskUniverse);
  const [file, setFile] = useState('');
  const dispatch = useDispatch();
  const [importedRisks, setImportedRisks] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [riskDetails, setRiskDetails] = useState({});
  const [uploadRisks, setUploadRisks] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
    setActiveStep(0);
  };
  const onViewRisk = data => {
    setRiskDetails(data);
    setOpenDrawer(true);
  };
  const onUpdateRisk = data => {
    history.push({ pathname: '/risk-universe/update-risk', state: data });
  };
  const onAssessRisk = data => {
    history.push({ pathname: '/risk-universe/assess-risk', state: data });
  };
  const onDeleteRisk = async data => {
    await dispatch(deleteRisk(data));
    await dispatch(fetchRisks());
  };

  useEffect(() => {
    dispatch(fetchRisks());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.RISK_UNIVERSE} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box padding={5}>
            <RisksTable {...{ risks, classes, setOpenDialog, onViewRisk, onUpdateRisk, onDeleteRisk, onAssessRisk }} />
            {/* <RiskApprovals {...{ risks, classes, setOpenDialog, onViewRisk, onUpdateRisk, onDeleteRisk }}/> */}
          </Box>
        </Box>
      </PageContainer>
      <ImportRisks
        {...{
          openDialog,
          onCloseDialog,
          activeStep,
          setActiveStep,
          setOpenDialog,
          file,
          setFile,
          risks: importedRisks,
          setRisks: setImportedRisks,
          uploadRisks,
          setUploadRisks,
        }}
      />
      <ViewRisk {...{ riskDetails, openDrawer, onCloseDrawer }} />
      <NotificationContainer />
    </React.Fragment>
  );
};

export default RiskUniverse;
