import React, { useEffect, useState } from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import useStyles from '../../index.style';
import { Box, Paper } from '@material-ui/core';
import DepartmentList from './Departments';
import AddEditDepartment from './AddEditDepartment';
import { NotificationContainer } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { addDepartment, deleteDepartment, fetchDepartments, updateDepartment } from '../../../../redux/actions/Departments';
import { idGenerator } from '../../../../@jumbo/utils/commonHelper';
import { fetchSubsidiaries } from '../../../../redux/actions/Subsidiaries';
import { fetchUsers } from '../../../../redux/actions/Users';
import ViewDepartment from './ViewDepartment';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.DEPARTMENTS, isActive: true },
];

const Departments = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector(({ departments }) => departments);
  const { subsidiaries } = useSelector(({ subsidiaries }) => subsidiaries);
  const { users } = useSelector(({ users }) => users);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDept, setCurrentDept] = useState(false);
  const initialDetails = {
    id: '',
    name: '',
    description: '',
    companyName: '',
    companyId: '',
    departmentHeadId: null,
    departmentHead: null,
  };
  const [deptDetails, setDeptDetails] = useState(initialDetails);
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();

  const onCloseDialog = () => {
    setOpenDialog(false);
    setDeptDetails(initialDetails);
    setCurrentDept(false);
  };

  const onAddDepartment = () => {
    setOpenDialog(true);
  };

  const onUpdateDepartment = data => {
    setDeptDetails(data);
    setCurrentDept(true);
    setOpenDialog(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const onViewDepartment = data => {
    setDeptDetails(data);
    setOpenDrawer(true);
  };

  const handleOnSave = e => {
    let formData = deptDetails;
    e.preventDefault();
    if (formData.id === '') {
      formData.id = idGenerator();
      dispatch(addDepartment(formData, () => onCloseDialog()));
    } else {
      dispatch(updateDepartment(formData, () => onCloseDialog()));
    }
  };
  const onDeleteDepartment = async data => {
    await dispatch(deleteDepartment(data));
    await dispatch(fetchDepartments());
  };

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchSubsidiaries());
    dispatch(fetchUsers());
  }, []);

  return (
    <PageContainer heading={HEADER.DEPARTMENTS} breadcrumbs={breadcrumbs}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Box padding={5}>
            <DepartmentList {...{ departments, classes, onAddDepartment, onUpdateDepartment, onDeleteDepartment, onViewDepartment }} />
          </Box>
        </Paper>
        <AddEditDepartment
          {...{
            openDialog,
            handleOnSave,
            currentDept,
            classes,
            onCloseDialog,
            subsidiaries,
            users,
            deptDetails,
            setDeptDetails,
          }}
        />
      </div>
      <ViewDepartment {...{ deptDetails, openDrawer, onCloseDrawer }} />
      <NotificationContainer />
    </PageContainer>
  );
};

export default Departments;
