import React, { useEffect, useState } from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import UserForm from './UserForm';
import useStyles from '../../index.style';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Paper, Slide } from '@material-ui/core';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubsidiaries } from '../../../../redux/actions/Subsidiaries';
import { fetchDepartments } from '../../../../redux/actions/Departments';
import { fetchSections } from '../../../../redux/actions/Sections';
import { fetchRoles } from '../../../../redux/actions/Roles';
import { fetchSubSections } from '../../../../redux/actions/SubSections';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});
const AddEditUser = () => {
  const classes = useStyles();
  const initialBreadcrumbs = [
    { label: HEADER.DASHBOARD, link: '/' },
    { label: HEADER.USERS, link: '/users' },
  ];
  const [isValid, setIsValid] = useState(false);
  const [username, setUsername] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '12345678',
    companyId: '',
    companyName: '',
    organization: [
      {
        departmentId: null,
        departmentName: '',
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      },
    ],
    confirmPassword: '12345678',
    phoneNumber: '',
    staffNumber: '',
    ext_Number: '',
    roleId: null,
    roleName: '',
  };
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  const { subsidiaries, currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);
  const { filteredDepartments } = useSelector(({ departments }) => departments);
  const { filteredSections } = useSelector(({ sections }) => sections);
  const { filteredSubSections } = useSelector(({ subSections }) => subSections);
  const { rolesList } = useSelector(({ roles }) => roles);
  const [userDetails, setUserDetails] = useState(initialState);
  const location = useLocation();

  function checkErrors() {
    const { firstName, lastName, email, phoneNo, companyId } = userDetails;
    if (firstName !== '' && lastName !== '' && email !== '' && phoneNo !== '' && companyId !== '') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOnSearchUsername = () => {
    console.log(username);
  };
  useEffect(() => {
    if (location.state !== undefined) {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.EDIT_USER, isActive: true }]);
      setUserDetails(location.state);
      dispatch(fetchRoles(location.state?.companyId));
      setIsUpdate(true);
    } else {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.CREATE_USER, isActive: true }]);
      setUserDetails(initialState);
      setIsUpdate(false);
      dispatch(fetchRoles('All'));
    }
  }, [location]);
  useEffect(() => {
    checkErrors();
  }, [userDetails]);
  useEffect(() => {
    dispatch(fetchSubsidiaries());
    dispatch(fetchDepartments());
    dispatch(fetchSections());
    dispatch(fetchSubSections());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={isUpdate ? HEADER.EDIT_USER : HEADER.CREATE_USER} breadcrumbs={breadcrumbs}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <UserForm
              {...{
                initialState,
                userDetails,
                isUpdate,
                isValid,
                setIsValid,
                setUserDetails,
                departments: filteredDepartments,
                subsidiaries,
                sections: filteredSections,
                subSections: filteredSubSections,
                roles: rolesList,
                setOpenDialog,
              }}
            />
          </Paper>
        </div>
      </PageContainer>
      <ADDialog {...{ openDialog, onCloseDialog, username, setUsername, handleOnSearchUsername }} />
    </React.Fragment>
  );
};
const ADDialog = props => {
  const { openDialog, onCloseDialog, username, setUsername, handleOnSearchUsername } = props;
  const useStyles = makeStyles(theme => ({
    dialogRoot: {
      position: 'relative',
    },
    dialogHeader: {
      backgroundColor: theme.palette.primary.main,
    },
    dialogTitleRoot: {
      '& .MuiTypography-h6': {
        fontSize: 16,
        color: theme.palette.common.white,
      },
    },
  }));
  const classes = useStyles();
  return (
    <Dialog open={openDialog} onClose={onCloseDialog} TransitionComponent={Transition} className={classes.dialogRoot}>
      <div className={classes.dialogHeader}>
        <DialogTitle className={classes.dialogTitleRoot}>Import from Active Directory</DialogTitle>
      </div>
      <DialogContent style={{ marginTop: 10 }}>
        <Box sx={{ width: 400 }}>
          <GridContainer style={{ marginBottom: 12 }}>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
          </GridContainer>
        </Box>

        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog} size="small">
            Cancel
          </Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" size="small" onClick={handleOnSearchUsername}>
              Search
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;
