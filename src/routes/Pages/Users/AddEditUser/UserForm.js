import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { AccountBox, PanoramaFishEye, PersonAdd, Work } from '@mui/icons-material';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import TextField from '@material-ui/core/TextField';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import { AddCircle, ArrowBackIos, Close } from '@material-ui/icons';
import { getAutoCompleteValue, getFilteredOptions, isValidEmail } from '../../../../@jumbo/utils/commonHelper';
import CmtImage from '../../../../@coremat/CmtImage';
import { Link } from 'react-router-dom';
import useStyles from '../../Roles/index.style';
import { Autocomplete } from '@material-ui/lab';
import { fetchRoles } from '../../../../redux/actions/Roles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchError } from '../../../../redux/actions';
import { addUser, updateUser } from '../../../../redux/actions/Users';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    // background: `linear-gradient(136deg, ${theme.palette.primary.main}, ${theme.palette.primary.main}  50%, ${theme.palette.secondary.main}  100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    //background: `linear-gradient(136deg, ${theme.palette.primary.main}, ${theme.palette.primary.main}  50%, ${theme.palette.secondary.main}  100%)`,
  },
}));

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonAdd />,
    2: <Work />,
    3: <PanoramaFishEye />,
  };

  return (
    <Box
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}>
      {icons[String(props.icon)]}
    </Box>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

function getSteps() {
  return ['Personal Details', 'Work Details', 'Preview'];
}

const Preview = props => {
  const { userDetails } = props;
  const { organization } = userDetails;
  const classes = useStyles();
  return (
    <TableContainer className={classes.inBuildAppCard}>
      <Table size="small" aria-label="a dense table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Field Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Input Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>First Name</b>
            </TableCell>
            <TableCell>{userDetails.firstName !== '' ? userDetails.firstName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Last Name</b>
            </TableCell>
            <TableCell>{userDetails.lastName !== '' ? userDetails.lastName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Email Address</b>
            </TableCell>
            <TableCell>{userDetails.email !== '' ? userDetails.email : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Phone Number</b>
            </TableCell>
            <TableCell>{userDetails.phoneNumber !== '' ? userDetails.phoneNumber : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Staff Number</b>
            </TableCell>
            <TableCell>{userDetails.staffNumber !== '' ? userDetails.staffNumber : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Subsidiary</b>
            </TableCell>
            <TableCell>{userDetails.companyName !== '' ? userDetails.companyName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Department(s)</b>
            </TableCell>
            <TableCell>
              {organization.length !== 0 && organization.map((org, index) => <li key={index}>{org.departmentName} </li>)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Sections</b>
            </TableCell>
            <TableCell>
              {organization.length !== 0 && organization.map((org, index) => <li key={index}>{org.sectionName}, </li>)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Sub-Section</b>
            </TableCell>
            <TableCell>
              {organization.length !== 0 && organization.map((org, index) => <li key={index}>{org.subSectionName} </li>)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Role</b>
            </TableCell>
            <TableCell>{userDetails.roleName !== '' ? userDetails.roleName : 'Not Set'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
const SuccessPage = props => {
  const { classes, handleReset, isUpdate } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <CmtImage src={'/images/ic_ok.svg'} style={{ width: '50px' }} />
      <p className={classes.instructions} style={{ marginTop: '10px' }}>
        <b>User was {isUpdate ? 'updated' : 'created'} successfully!</b>
      </p>
      {/*{!isUpdate && (*/}
      {/*  <p>*/}
      {/*    An email with login credential has also been sent to!{' '}*/}
      {/*    <i>*/}
      {/*      <b>{userDetails.email}</b>*/}
      {/*    </i>*/}
      {/*    .*/}
      {/*  </p>*/}
      {/*)}*/}
      <Box mt={10}>
        <Link to={'/users'}>
          <Button color={'primary'} variant={'contained'}>
            Back to Users Dashboard
          </Button>
        </Link>
        {!isUpdate && (
          <Button onClick={handleReset} className={classes.button}>
            Create New User
          </Button>
        )}
      </Box>
    </Box>
  );
};
const UserForm = props => {
  const {
    isValid,
    isUpdate,
    initialState,
    userDetails,
    setUserDetails,
    departments,
    subsidiaries,
    sections,
    subSections,
    roles,
    setOpenDialog,
  } = props;
  const classes = useStyles();
  const { currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);
  const initialOrganization = {
    departmentId: null,
    departmentName: '',
    sectionId: null,
    sectionName: '',
    subSectionId: null,
    subSectionName: '',
  };
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { organization } = userDetails;
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleRemoveDept = index => {
    const data = [...organization];
    if (data.length - 1 !== 0) {
      data.splice(index, 1);
      setUserDetails({ ...userDetails, organization: data });
    } else {
      dispatch(fetchError('At least One Department is Required'));
    }
  };
  const handleAddDepartment = () => {
    setUserDetails({ ...userDetails, organization: [...userDetails.organization, initialOrganization] });
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setUserDetails(initialState);
  };

  const handleSubmit = () => {
    if (isUpdate) {
      dispatch(updateUser(userDetails, () => handleNext()));
    } else {
      dispatch(addUser(userDetails, () => handleNext()));
    }
    //handleNext();
  };
  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setUserDetails({
        ...userDetails,
        companyId: value.id,
        companyName: value.name,
        roleId: null,
        roleName: '',
        organization: [initialOrganization],
      });
      dispatch(fetchRoles(value.id));
    } else {
      setUserDetails({
        ...userDetails,
        companyId: '',
        companyName: '',
        roleId: null,
        roleName: '',
        organization: [initialOrganization],
      });
      dispatch(fetchRoles('All'));
    }
  };
  const handleOnRoleChange = (event, value) => {
    if (value !== null) {
      setUserDetails({ ...userDetails, roleId: value.id, roleName: value.name });
    } else {
      setUserDetails({ ...userDetails, roleId: null, roleName: '' });
    }
  };
  const handleOnDepartmentChange = index => (event, value) => {
    const data = [...userDetails.organization];
    if (value !== null) {
      data[index] = {
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    } else {
      data[index] = {
        departmentId: null,
        departmentName: '',
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    }
    setUserDetails({ ...userDetails, organization: [...data] });
  };
  const handleOnSectionChange = index => (event, value) => {
    const data = [...organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: '',
      };
    } else {
      data[index] = {
        ...data[index],
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    }
    setUserDetails({ ...userDetails, organization: [...data] });
  };
  const handleOnSubSectionChange = index => (event, value) => {
    const data = [...organization];
    if (value !== null) {
      data[index] = {
        ...data[index],
        subSectionId: value.id,
        subSectionName: value.name,
      };
    } else {
      data[index] = {
        ...data[index],
        subSectionId: null,
        subSectionName: '',
      };
    }
    setUserDetails({ ...userDetails, organization: [...data] });
  };

  useEffect(() => {
    setUserDetails({
      ...userDetails,
      companyId: currentSubsidiary,
      roleId: null,
      roleName: '',
      organization: [initialOrganization],
    });
    dispatch(fetchRoles(currentSubsidiary));
  }, [currentSubsidiary]);
  return (
    <Box className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box pt={5} pb={10} pr={10} pl={10}>
        {activeStep === steps.length ? (
          <SuccessPage {...{ classes, handleReset, userDetails, isUpdate }} />
        ) : (
          <Box display={'flex'} flexDirection={'column'}>
            {activeStep === 0 && (
              <>
                <GridContainer>
                  {!isUpdate && (
                    <Grid item md={12} xs={12}>
                      <Box display={'flex'}>
                        <Box flex={'1 0 auto'} />
                        <Button variant={'outlined'} color={'primary'} onClick={e => setOpenDialog(true)}>
                          Import From Active Directory
                        </Button>
                      </Box>
                    </Grid>
                  )}
                  <Grid item md={6} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="First Name"
                      helperText={userDetails.firstName === '' ? 'First Name is required.' : ''}
                      type="text"
                      value={userDetails.firstName}
                      onChange={e => setUserDetails({ ...userDetails, firstName: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Last Name"
                      helperText={userDetails.lastName === '' ? 'Last Name is required.' : ''}
                      value={userDetails.lastName}
                      onChange={e => setUserDetails({ ...userDetails, lastName: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Email Address"
                      helperText={isValidEmail(userDetails.email) ? '' : 'Email is Invalid!'}
                      value={userDetails.email}
                      onChange={e => setUserDetails({ ...userDetails, email: e.target.value, userName: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Phone Number"
                      value={userDetails.phoneNumber}
                      helperText={userDetails.phoneNumber === '' ? 'Phone number is required.' : ''}
                      onChange={e => setUserDetails({ ...userDetails, phoneNumber: e.target.value })}
                    />
                  </Grid>
                </GridContainer>
              </>
            )}
            {activeStep === 1 && (
              <>
                <GridContainer>
                  <Grid item md={4} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Staff Number [Optional]"
                      value={userDetails.staffNumber}
                      onChange={e => setUserDetails({ ...userDetails, staffNumber: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={getAutoCompleteValue(subsidiaries, userDetails.companyId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSubsidiaryChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Subsidiary" />
                      )}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={roles}
                      value={getAutoCompleteValue(roles, userDetails.roleId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnRoleChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Role" />
                      )}
                    />
                  </Grid>
                </GridContainer>
                <Box width={'100%'} mt={5} mb={2} display={'flex'}>
                  <Button
                    onClick={handleAddDepartment}
                    type={'button'}
                    size={'small'}
                    startIcon={<AddCircle />}
                    variant={'outlined'}
                    color={'primary'}>
                    Assign Department
                  </Button>
                </Box>

                {organization.length !== 0 &&
                  organization.map((org, index) => (
                    <Box key={index} mt={3}>
                      <AddDepartmentForm
                        {...{
                          departments,
                          sections,
                          subSections,
                          organization: org,
                          userDetails,
                          handleOnDepartmentChange,
                          handleOnSectionChange,
                          handleOnSubSectionChange,
                          index,
                          handleRemoveDept,
                        }}
                      />
                    </Box>
                  ))}
              </>
            )}
            {activeStep === 2 && (
              <Box display={'flex'} alignItems={'center'} justifyItems="center">
                <Preview {...{ userDetails }} />
              </Box>
            )}
            <Box display={'flex'} mt={10}>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                <ArrowBackIos /> Back
              </Button>
              <Box flex={'1 0 auto'} />
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  disabled={!isValid}
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.button}>
                  Finish
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const AddDepartmentForm = props => {
  const {
    departments,
    sections,
    subSections,
    organization,
    userDetails,
    index,
    handleOnDepartmentChange,
    handleOnSectionChange,
    handleOnSubSectionChange,
    handleRemoveDept,
  } = props;

  return (
    <>
      <GridContainer>
        <Grid item md={4} xs={12}>
          <Autocomplete
            fullWidth
            id={`department_${index}`}
            options={getFilteredOptions(departments, userDetails, 'companyId')}
            value={getAutoCompleteValue(departments, organization.departmentId)}
            getOptionLabel={option => option.name}
            onChange={handleOnDepartmentChange(index)}
            renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
            renderInput={params => (
              <TextField
                required
                helperText={userDetails.companyId === '' ? 'Select Subsidiary' : ''}
                fullWidth
                {...params}
                size={'small'}
                variant={'outlined'}
                label="Department"
              />
            )}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Autocomplete
            fullWidth
            options={getFilteredOptions(sections, organization, 'departmentId', 'departmentsId')}
            value={getAutoCompleteValue(sections, organization.sectionId)}
            getOptionLabel={option => option.name}
            onChange={handleOnSectionChange(index)}
            renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
            renderInput={params => (
              <TextField
                helperText={organization.departmentId === '' ? 'Select Department' : ''}
                fullWidth
                {...params}
                size={'small'}
                variant={'outlined'}
                label="Section"
              />
            )}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Autocomplete
            fullWidth
            options={getFilteredOptions(subSections, organization, 'sectionId', 'sectionsId')}
            value={getAutoCompleteValue(subSections, organization.subSectionId)}
            getOptionLabel={option => option.name}
            onChange={handleOnSubSectionChange(index)}
            renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
            renderInput={params => (
              <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Sub-Section" />
            )}
          />
        </Grid>
        <Grid item md={1} xs={12}>
          <IconButton color={'secondary'} onClick={e => handleRemoveDept(index)}>
            <Close fontSize={'small'} />
          </IconButton>
        </Grid>
      </GridContainer>
    </>
  );
};

export default UserForm;
