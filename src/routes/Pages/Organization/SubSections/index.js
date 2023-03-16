import React, { useEffect, useState } from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import useStyles from '../../index.style';
import { Box, Paper } from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import AddEditSubSection from './AddEditSubSection';
import SubSectionList from './SubSections';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../redux/actions/Users';
import { fetchDepartments } from '../../../../redux/actions/Departments';
import { fetchSections, updateSection } from '../../../../redux/actions/Sections';
import { addSubSection, deleteSubSection, fetchSubSections } from '../../../../redux/actions/SubSections';
import { idGenerator } from '../../../../@jumbo/utils/commonHelper';
import { fetchSubsidiaries } from '../../../../redux/actions/Subsidiaries';
import RoleBasedGuard from '../../../../@jumbo/hocs/RoleAuth';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.SUB_SECTIONS, isActive: true },
];

const SubSections = () => {
  const dispatch = useDispatch();
  const { subSections } = useSelector(({ subSections }) => subSections);
  const { filteredSections } = useSelector(({ sections }) => sections);
  const { subsidiaries } = useSelector(({ subsidiaries }) => subsidiaries);
  const { filteredDepartments } = useSelector(({ departments }) => departments);
  const { users } = useSelector(({ users }) => users);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSubSection, setSubCurrentSection] = useState(false);
  const initialDetails = {
    id: '',
    name: '',
    description: '',
    companyName: '',
    companyId: '',
    sectionsId: '',
    sectionName: '',
    subSectionHead: '',
    subSectionHeadId: null,
    active: true,
  };
  const [subSectionDetails, setSubSectionDetails] = useState(initialDetails);
  const classes = useStyles();

  const onCloseDialog = () => {
    setOpenDialog(false);
    setSubCurrentSection(false);
    setSubSectionDetails(initialDetails);
  };
  const onAddSubSection = () => {
    setOpenDialog(true);
  };
  const onUpdateSubSection = data => {
    setSubSectionDetails(data);
    setSubCurrentSection(true);
    setOpenDialog(true);
  };

  const handleOnSave = e => {
    e.preventDefault();
    let formData = subSectionDetails;

    if (formData.id === '') {
      formData.id = idGenerator();
      dispatch(addSubSection(formData, () => onCloseDialog()));
    } else {
      dispatch(updateSection(formData, () => onCloseDialog()));
    }
  };
  const onDeleteSubSection = async data => {
    await dispatch(deleteSubSection(data));
    await dispatch(fetchSubSections());
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchSections());
    dispatch(fetchSubSections());
    dispatch(fetchDepartments());
    dispatch(fetchSubsidiaries());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={HEADER.SUB_SECTIONS} breadcrumbs={breadcrumbs}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Box padding={5}>
              <SubSectionList {...{ subSections, classes, onAddSubSection, onUpdateSubSection, onDeleteSubSection }} />
            </Box>
          </Paper>
          <AddEditSubSection
            {...{
              openDialog,
              handleOnSave,
              currentSubSection,
              classes,
              onCloseDialog,
              users,
              subsidiaries,
              filteredSections,
              filteredDepartments,
              subSectionDetails,
              setSubSectionDetails,
            }}
          />
        </div>
      </PageContainer>
      <NotificationContainer />
    </React.Fragment>
  );
};

export default SubSections;
