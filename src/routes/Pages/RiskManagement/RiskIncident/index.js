import React, { useEffect, useState } from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import { Box } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../Roles/index.style';
import IncidentTable from './IncidentTable';
import { incidentsList } from '../dummyData';
import ViewIncident from './ViewIncident';
import { useHistory } from 'react-router-dom';
import { deleteIncident, fetchIncidents } from '../../../../redux/actions/RiskIncident';
import { useDispatch } from 'react-redux';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.RISK_INCIDENT, active: true },
];

const RiskIncident = () => {
  const classes = useStyles();
  // const [incidents, setIncidents] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [incidentDetails, setIncidentDetails] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();

  const onViewIncident = data => {
    setIncidentDetails(data);
    setOpenDrawer(true);
  };
  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const onUpdateIncident = data => {
    history.push({ pathname: '/risk-incident/update-incident', state: data });
  };
  const onDeleteIncident = async data => {
    await dispatch(deleteIncident(data));
    await dispatch(fetchIncidents());
  };

  useEffect(() => {
    dispatch(fetchIncidents());
  }, []);
  // useEffect(() => {
  //   setIncidents(incidentsList);
  // }, []);
  return (
    <React.Fragment>
      <PageContainer heading={HEADER.RISK_INCIDENT} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box padding={5}>
            <IncidentTable {...{ onViewIncident, onUpdateIncident, onDeleteIncident }} />
          </Box>
        </Box>
      </PageContainer>
      <ViewIncident {...{ incidentDetails, openDrawer, onCloseDrawer }} />
      <NotificationContainer />
    </React.Fragment>
  );
};

export default RiskIncident;
