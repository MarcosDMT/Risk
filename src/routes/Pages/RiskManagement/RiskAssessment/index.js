import React, { useEffect, useState } from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../Roles/index.style';
import { risksList } from '../dummyData';
import { useHistory } from 'react-router-dom';
import AssessmentTable from './AssessmentTable';
import AssessRisk from './AssessRisk';
import { fetchRisks } from '../../../../redux/actions/RiskUniverse';
import { useSelector,useDispatch } from 'react-redux';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.RISK_ASSESSMENT, active: true },
];
const RiskAssessment = () => {
  const { risks } = useSelector(({ riskUniverse}) => riskUniverse);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [riskDetails, setRiskDetails] = useState({});
  const classes = useStyles();
  const history = useHistory();

  // const fetchRisks = () => {
  //   setRisks(risksList);
  // };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const onViewRisk = data => {
    setRiskDetails(data);
    setOpenDrawer(true);
    console.log(data);
  };
  const onUpdateRisk = data => {
    history.push({ pathname: '/risk-universe/update-risk', state: data });
  };
  const onDeleteRisk = data => {
    console.log(data);
  };

  useEffect(() => {
    dispatch(fetchRisks());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.RISK_ASSESSMENT} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box padding={5}>
            <AssessmentTable {...{ risks, classes, setOpenDialog, onViewRisk, onUpdateRisk, onDeleteRisk }} />
          </Box>
        </Box>
      </PageContainer>
      <AssessRisk {...{ riskDetails, openDrawer, onCloseDrawer }} />
      {/* <RiskStatutory riskDetails={riskDetails}/> */}
      <NotificationContainer />
    </React.Fragment>
  );
};

export default RiskAssessment;
