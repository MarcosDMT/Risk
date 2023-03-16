import React, { useEffect, useState } from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import useStyles from '../../index.style';
import { Box, Paper } from '@material-ui/core';
import AddEditSection from './AddEditSection';
import { NotificationContainer } from 'react-notifications';
import SectionList from './Sections';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments, fetchDepartmentsByCompany } from '../../../../redux/actions/Departments';
import { addSection, deleteSection, fetchSections, updateSection } from '../../../../redux/actions/Sections';
import { idGenerator } from '../../../../@jumbo/utils/commonHelper';
import { fetchUsers } from '../../../../redux/actions/Users';
import { fetchSubsidiaries } from '../../../../redux/actions/Subsidiaries';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.SECTIONS, isActive: true },
];

const Sections = () => {
  const dispatch = useDispatch();
  const { sections } = useSelector(({ sections }) => sections);
  console.log('SECTIONS ', sections);
  const { filteredDepartments } = useSelector(({ departments }) => departments);
  const { subsidiaries } = useSelector(({ subsidiaries }) => subsidiaries);
  const { users } = useSelector(({ users }) => users);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSection, setCurrentSection] = useState(false);
  const initialDetails = {
    id: '',
    name: '',
    description: '',
    companyId: '',
    companyName: '',
    departmentsId: '',
    departmentsName: '',
    sectionHead: null,
    sectionHeadId: null,
    active: true,
  };
  const [sectionDetails, setSectionDetails] = useState(initialDetails);
  const classes = useStyles();

  const onCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSection(false);
    setSectionDetails(initialDetails);
  };
  const onAddSection = () => {
    setOpenDialog(true);
  };
  const onUpdateSection = data => {
    setSectionDetails(data);
    setCurrentSection(true);
    setOpenDialog(true);
  };

  const handleOnSave = e => {
    let formData = sectionDetails;
    e.preventDefault();
    if (formData.id === '') {
      //formData.id = idGenerator();
      dispatch(addSection(formData, () => onCloseDialog()));
    } else {
      dispatch(updateSection(formData, () => onCloseDialog()));
    }
  };
  const onDeleteSection = async data => {
    await dispatch(deleteSection(data));
    await dispatch(fetchSections());
  };

  useEffect(() => {
    dispatch(fetchSubsidiaries());
    dispatch(fetchDepartments());
    dispatch(fetchSections());
    dispatch(fetchUsers());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.SECTIONS} breadcrumbs={breadcrumbs}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Box padding={5}>
              <SectionList {...{ sections, classes, onAddSection, onUpdateSection, onDeleteSection }} />
            </Box>
          </Paper>
          <AddEditSection
            {...{
              openDialog,
              handleOnSave,
              currentSection,
              classes,
              onCloseDialog,
              users,
              subsidiaries,
              filteredDepartments,
              sectionDetails,
              setSectionDetails,
            }}
          />
        </div>
      </PageContainer>
      <NotificationContainer />
    </React.Fragment>
  );
};

export default Sections;
