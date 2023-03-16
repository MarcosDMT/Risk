import React, { useEffect, useState } from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import useStyles from '../../index.style';
import { Box, Paper } from '@material-ui/core';
import AddEditSubsidiary from './AddEditSubsidiary';
import SubsidiaryList from './Subsidiary';
import { NotificationContainer } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubsidiary,
  deleteSubsidiary,
  fetchSubsidiaries,
  updateSubsidiary,
} from '../../../../redux/actions/Subsidiaries';
import { idGenerator } from '../../../../@jumbo/utils/commonHelper';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.SUBSIDIARIES, isActive: true },
];

const Subsidiary = () => {
  const dispatch = useDispatch();
  const { subsidiaries } = useSelector(({ subsidiaries }) => subsidiaries);
  const { authUser } = useSelector(({ auth }) => auth);
  const { users } = useSelector(({ users }) => users);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSubsidiary, setCurrentSubsidiary] = useState(false);
  const initialDetails = {
    id: '',
    name: '',
    description: '',
    country: '',
    city: '',
    street: '',
    address: '',
    tenantId: authUser?.tenant,
    mission: ' ',
    vision: ' ',
    building: '',
    imagePath: '',
    active: true,
  };
  const [subsidiaryDetails, setSubsidiaryDetails] = useState(initialDetails);
  const classes = useStyles();

  const onCloseDialog = () => {
    setOpenDialog(false);
    setSubsidiaryDetails(initialDetails);
    setCurrentSubsidiary(false);
  };
  const onAddSubsidiary = () => {
    setOpenDialog(true);
  };
  const onUpdateSubsidiary = data => {
    setSubsidiaryDetails(data);
    setCurrentSubsidiary(true);
    setOpenDialog(true);
  };

  const handleOnSave = e => {
    e.preventDefault();
    let formData = subsidiaryDetails;
    if (formData.id === '') {
      formData.id = idGenerator();
      dispatch(addSubsidiary(formData, () => onCloseDialog()));
    } else {
      dispatch(updateSubsidiary(formData, () => onCloseDialog()));
    }
  };
  const onDeleteSubsidiary = async data => {
    await dispatch(deleteSubsidiary(data));
    await fetchSubsidiaries();
  };

  useEffect(() => {
    dispatch(fetchSubsidiaries());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.SUBSIDIARIES} breadcrumbs={breadcrumbs}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Box padding={5}>
              <SubsidiaryList {...{ subsidiaries, classes, onAddSubsidiary, onUpdateSubsidiary, onDeleteSubsidiary }} />
            </Box>
          </Paper>
          <AddEditSubsidiary
            {...{
              openDialog,
              handleOnSave,
              currentSubsidiary,
              classes,
              onCloseDialog,
              users,
              subsidiaryDetails,
              setSubsidiaryDetails,
            }}
          />
        </div>
      </PageContainer>
      <NotificationContainer />
    </React.Fragment>
  );
};

export default Subsidiary;
