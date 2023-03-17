import React, { useEffect, useRef, useState } from 'react';
import PageContainer from '../../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../../@jumbo/constants/HeaderMessages';
import { AddDepartmentForm } from './AddDepartmentForm';
import { AddCircle } from '@material-ui/icons';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { fetchStatutoryCompliance, fetchStatutoryComplianceSub } from '../../../../../redux/actions/Compliance';
import { fetchRisks } from '../../../../../redux/actions/RiskUniverse';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../../Roles/index.style';
import { ArrowBack } from '@material-ui/icons';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CmtList from '../../../../../@coremat/CmtList';
import List from '@material-ui/core/List';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { frequencies, priority } from '../../dummyData';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { fetchSubsidiaries } from '../../../../../redux/actions/Subsidiaries';
import { fetchDepartments } from '../../../../../redux/actions/Departments';
import { fetchSections } from '../../../../../redux/actions/Sections';
import { fetchSubSections } from '../../../../../redux/actions/SubSections';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@material-ui/lab';
import { fetchUsers } from '../../../../../redux/actions/Users';
import { addStatutoryCompliance, updateStatutoryCompliance } from '../../../../../redux/actions/Compliance';
import CmtImage from '../../../../../@coremat/CmtImage';
import { fetchComplianceFrequencies, fetchCurrencies, fetchPriorities } from '../../../../../redux/actions/Utils';
import { fetchError } from '../../../../../redux/actions';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';

const initialBreadcrumbs = [{ label: HEADER.DASHBOARD, link: '/' }];
export const AppHeader = props => {
  const classes = useStyles();
  const { handleOnSave, showForm, handleOnCancel, isEditable, setIsEditable } = props;
  const handleBackClick = e => {
    // eslint-disable-next-line no-restricted-globals
    history.back();
  };

  return (
    <Box className={classes.inBuildAppHeader}>
      <Box className={classes.inBuildAppHeaderSidebar}>
        {/*<CmtImage src={'/images/roles.png'} style={{ width: '50px' }} />*/}
        <IconButton style={{ color: 'white' }} onClick={handleBackClick}>
          <ArrowBack />
        </IconButton>
        <Typography className={classes.inBuildAppHeaderTitle} component="div" variant="h1">
          Compliance
        </Typography>
      </Box>
      <Box className={classes.inBuildAppHeaderContent}>
        {showForm && (
          <Box ml="auto" display="flex" alignItems="center">
            {isEditable ? (
              <>
                <Box ml={1}>
                  <Button
                    variant={'contained'}
                    style={{ backgroundColor: 'green', color: 'white' }}
                    size={'small'}
                    onClick={handleOnSave}>
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box ml={1}>
                  <Button
                    variant={'contained'}
                    style={{ backgroundColor: 'green', color: 'white' }}
                    size={'small'}
                    onClick={() => setIsEditable(true)}>
                    Edit
                  </Button>
                </Box>
              </>
            )}
            <Box ml={1}>
              <Button
                variant={'contained'}
                style={{ backgroundColor: 'darkred', color: 'white' }}
                size={'small'}
                onClick={handleOnCancel}>
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
const steps = ['1. Compliance Definition', '2.Control Assignment', '3.Control Impact & Status', '4. Finish'];
const AddEditStatutoryCompliance = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const initialDetails = {
    title: '',
    description: '',
    authority: '',
    riskUniverseId: null,
    companyId: null,
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
    penaltyTypeName: '',
    penalty: 0,
    penaltyNarrative: '',
    penaltyCurrency: 'KES',
    primaryOwnerId: null,
    secondaryOwnerId: null,
    escalationOwnerId: null,
    priority: '',
    frequencyId: null,
    // obligationStatus:'',
    active: true,
    submissionDeadline: '',
    //"nextDeadline": "2022-07-27T05:37:06.521Z",
    complianceType: '',
    sourceDoc: '',
    isSubCompliance: false,
    hasSubCompliance: true,
    subId: null,
    hasAttachment: false,
  };
  const [complianceDetails, setComplianceDetails] = useState(initialDetails);
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    selectedStatutory,
  } = useSelector(({ compliance }) => compliance);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleReset = () => {
    setComplianceDetails(initialDetails);
    setIsUpdate(false);
    setActiveStep(0);
  };
  const handleOnSave = async(e) => {
    e.preventDefault();
    let data = { ...complianceDetails, penalty: parseFloat(complianceDetails.penalty) };
    if (isUpdate) {
      dispatch(updateStatutoryCompliance(data, () => handleNext()));
    } else {
      await dispatch(addStatutoryCompliance(data, () => handleNext()));
      await dispatch(fetchStatutoryComplianceSub({id: selectedStatutory}));
    }
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    if (location.state !== undefined) {
      setBreadcrumbs([
        ...breadcrumbs,
        { label: HEADER.STATUTORY_COMPLIANCE.name, link: `/compliance/${HEADER.STATUTORY_COMPLIANCE.url}` },
        { label: HEADER.UPDATE_STATUTORY_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails({...location.state, isSubCompliance: location.state?.subId ? true : false});
      setIsUpdate(true);
    } else {
      setBreadcrumbs([
        ...breadcrumbs,
        { label: HEADER.STATUTORY_COMPLIANCE.name, link: `/compliance/${HEADER.STATUTORY_COMPLIANCE.url}` },
        { label: HEADER.CREATE_STATUTORY_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location]);

  return (
    <React.Fragment>
      <PageContainer
        heading={isUpdate ? HEADER.UPDATE_STATUTORY_COMPLIANCE : HEADER.CREATE_STATUTORY_COMPLIANCE}
        breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <AppHeader />
          {activeStep === steps.length ? (
            <Box className={clsx(classes.inBuildAppContainer)} minHeight={400}>
              <Box width={'100%'} m={5}>
                <SuccessPage {...{ classes, handleReset, isUpdate }} />
              </Box>
            </Box>
          ) : (
            <Box className={clsx(classes.inBuildAppContainer)}>
              <SideBarIncident {...{ activeStep, handleNext, handlePrev, setActiveStep }} />
              <ComplianceContent
                {...{
                  classes,
                  isUpdate,
                  activeStep,
                  handleNext,
                  handlePrev,
                  handleReset,
                  complianceDetails,
                  setComplianceDetails,
                  handleOnSave,
                }}
              />
            </Box>
          )}
        </Box>
      </PageContainer>
      <NotificationContainer />
    </React.Fragment>
  );
};
const SideBarIncident = props => {
  const classes = useStyles();
  const { activeStep, handleNext, handlePrev, setActiveStep } = props;
  return (
    <Box className={classes.inBuildAppSidebar}>
      <PerfectScrollbar className={classes.perfectScrollbarContactSidebar}>
        <Box display="flex" justifyItems={'center'} justifyContent={'center'} mt={2}>
          <IconButton color={'primary'} onClick={handlePrev} disabled={activeStep === 0}>
            <ArrowBackIos />
          </IconButton>
          <Box m={1} />
          <IconButton color={'primary'} onClick={handleNext} disabled={activeStep === steps.length - 1}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
        <Box mt={5}>
          <List component="nav" className={classes.appNav}>
            <CmtList
              data={steps}
              renderRow={(item, index) => (
                <SideBarItem {...{ key: index, index, activeStep, item, classes, setActiveStep }} />
              )}
            />
          </List>
        </Box>
      </PerfectScrollbar>
    </Box>
  );
};
const SideBarItem = props => {
  const { index, item, classes, activeStep, setActiveStep } = props;
  const labelRef = useRef(null);

  return (
    <React.Fragment>
      <ListItem
        ref={labelRef}
        button
        title={item}
        //disabled={activeStep < index}
        onClick={e => setActiveStep(index)}
        className={clsx(classes.appNavItem, classes.appTaskNavItem, {
          active: index === activeStep,
          completed: activeStep > index,
        })}>
        <ListItemText primary={item} className="Cmt-nav-text" />
      </ListItem>
    </React.Fragment>
  );
};

const sourceDocsOptions = [
  { id: 1, label: 'True', value: true },
  { id: 1, label: 'False', value: false },
];

export const ComplianceContent = props => {
  const dispatch = useDispatch();
  const { risks } = useSelector(({ riskUniverse }) => riskUniverse);
  const { subsidiaries, currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);
  const { departments } = useSelector(({ departments }) => departments);
  const { sections } = useSelector(({ sections }) => sections);
  const { subSections } = useSelector(({ subSections }) => subSections);
  const { users } = useSelector(({ users }) => users);
  const { currencies, priorities, complianceFrequencies } = useSelector(({ utils }) => utils);
  const { classes, activeStep, handleNext, handlePrev, complianceDetails, setComplianceDetails, handleOnSave } = props;
  const [selectedDeadline, setSelectedDeadline] = useState(new Date());
  const initValue = { id: '', name: '' };
  const options = ['Both', 'Quantitative', 'Qualitative'];
  const [inputValue, setInputValue] = useState('');
  // const [checked, setChecked] = useState(false);
  // const [isSub, setIsSub] = useState(false);
  // const [attachment, setAttachment] = useState(false);
  const { statutoryComplianceData } = useSelector(({ compliance }) => compliance);


  const hasSubComplianceData = statutoryComplianceData?.filter((datum) => datum.id !== complianceDetails?.id && datum.hasSubCompliance === true);


  // const hasSubComplianceData = statutoryComplianceData.filter((datum) => datum.hasSubCompliance === true);

  useEffect(() => {
    dispatch(fetchStatutoryCompliance());
  }, []);

  useEffect(() => {
    dispatch(fetchRisks());
  }, []);

  const flags = {
    first: 'HasSubCompliance',
    second: 'Link to an existing compliance',
    third: 'Compliance requires a supporting documentation',
  };

  const hasSubComplianceCheck = e => {
    setComplianceDetails({ ...complianceDetails, hasSubCompliance: e.target.checked });
    console.log(e.target.checked);
  };

  const handleAttachment = e => {
    setComplianceDetails({ ...complianceDetails, hasAttachment: e.target.value });
  };

  const handleComplianceOption = (e, value) => {
    if (value !== null) {
      setComplianceDetails({ ...complianceDetails, subId: value.id, isSubCompliance: true });
    } else {
      setComplianceDetails({ ...complianceDetails, subId: null, isSubCompliance: false });
    }
  };

  const handleTypeChange = e => {
    setInputValue(e.target.value);
  };

  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        companyId: value.id,
        companyName: value.name,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        companyId: null,
        companyName: '',
      });
    }
  };

  const handleRiskChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        riskUniverseName: value.name,
        riskUniverseId: value.id,
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        riskUniverseName: '',
        riskUniverseId: null,
      });
    }
  };
  const handleOnDepartmentChange = index => (event, value) => {
    const data = [...complianceDetails.organization];
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
    setComplianceDetails({ ...complianceDetails, organization: [...data] });
  };
  const handleOnSectionChange = index => (event, value) => {
    const data = [...complianceDetails.organization];
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
    setComplianceDetails({ ...complianceDetails, organization: [...data] });
  };
  const handleOnSubSectionChange = index => (event, value) => {
    const data = [...complianceDetails.organization];
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
    setComplianceDetails({ ...complianceDetails, organization: [...data] });
  };

  const handleOnPrimaryOwnerChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        primaryOwnerId: value.id,
        primaryOwnerName: value.firstName + ' ' + value.lastName,
      });
    } else {
      setComplianceDetails({ ...complianceDetails, primaryOwnerId: null, primaryOwnerName: '' });
    }
  };
  const handleOnSecondaryOwnerChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        secondaryOwnerId: value.id,
        secondaryOwnerName: value.firstName + ' ' + value.lastName,
      });
    } else {
      setComplianceDetails({ ...complianceDetails, secondaryOwnerId: null, secondaryOwnerName: '' });
    }
  };
  const handleOnEscalationOwnerChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        escalationOwnerId: value.id,
        escalationOwnerName: value.firstName + ' ' + value.lastName,
      });
    } else {
      setComplianceDetails({ ...complianceDetails, escalationOwnerId: null, escalationOwnerName: '' });
    }
  };

  const handleRemoveDept = index => {
    const data = [...complianceDetails?.organization];
    if (data?.length - 1 !== 0) {
      data.splice(index, 1);
      setComplianceDetails({ ...complianceDetails, organization: data });
    } else {
      dispatch(fetchError('At least One Department is Required'));
    }
  };

  const handleFrequency = (e, value) => {
    if (value !== null) {
      setComplianceDetails({ ...complianceDetails, frequencyId: value.id });
    } else {
      setComplianceDetails({ ...complianceDetails, subId: null });
    }
  };

  useEffect(() => {
    setComplianceDetails({
      ...complianceDetails,
      submissionDeadline: moment(selectedDeadline).format('YYYY-MM-DD'),
    });
  }, [selectedDeadline]);
  useEffect(() => {
    setComplianceDetails({
      ...complianceDetails,
      companyId: currentSubsidiary,
    });
  }, [currentSubsidiary]);
  useEffect(() => {
    dispatch(fetchSubsidiaries());
    dispatch(fetchDepartments());
    dispatch(fetchSections());
    dispatch(fetchSubSections());
    dispatch(fetchUsers());
    dispatch(fetchComplianceFrequencies());
    dispatch(fetchPriorities());
    dispatch(fetchCurrencies());
  }, []);

  //const { organization } = complianceDetails;
  const initialOrganization = {
    departmentId: null,
    departmentName: '',
    sectionId: null,
    sectionName: '',
    subSectionId: null,
    subSectionName: '',
  };
  const handleAddDepartment = () => {
    setComplianceDetails({ ...complianceDetails, organization: [...complianceDetails.organization, initialOrganization] });
  };

    // get value of selected frequency to display in preview
    const selectedFrequency = getAutoCompleteValue(complianceFrequencies, complianceDetails.frequencyId);

  return (
    <>
      <Box className={classes.inBuildAppMainContent} minHeight={400}>
        <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
          <Box p={5} display="flex">
            {activeStep === 0 && (
              <Box width={'100%'}>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label={'Compliance Title'}
                      value={complianceDetails?.title}
                      onChange={e => setComplianceDetails({ ...complianceDetails, title: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      multiline
                      minRows={4}
                      variant="outlined"
                      label={'Compliance Description'}
                      value={complianceDetails?.description}
                      onChange={e => setComplianceDetails({ ...complianceDetails, description: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Authority"
                      value={complianceDetails?.authority}
                      onChange={e => setComplianceDetails({ ...complianceDetails, authority: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={risks}
                      value={getAutoCompleteValue(risks, complianceDetails?.riskUniverseId)}
                      getOptionLabel={option => option.riskTitle}
                      onChange={handleRiskChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.riskTitle}</span>}
                      renderInput={params => (
                        <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="RiskUniverse" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                  <TextField
                      required
                      onChange={handleAttachment}
                      label="Source Document"
                      fullWidth
                      select
                      value={complianceDetails?.hasAttachment}
                      variant="outlined">
                      <MenuItem value={false}>Not Required</MenuItem>
                      <MenuItem value={true}>Required</MenuItem>
                      {/* {sourceDocsOptions?.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} */}
                    </TextField>
                    {/* <TextField
                      required
                      onChange={handleAttachment}
                      label="Source Document"
                      fullWidth
                      select
                      value={complianceDetails?.hasAttachment}
                      variant="outlined">
                      {sourceDocsOptions?.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField> */}
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={hasSubComplianceData}
                      value={getAutoCompleteValue(hasSubComplianceData, complianceDetails?.subId)}
                      getOptionLabel={option => option.title}
                      onChange={handleComplianceOption}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.title}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} variant={'outlined'} label="Select Compliance" />
                      )}
                    />
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 1 && (
              <Box width={'100%'}>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={subsidiaries?.find(subsidiary => subsidiary.id === complianceDetails?.companyId) ?? initValue}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSubsidiaryChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Subsidiary" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
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
                  </Grid>
                  {complianceDetails?.organization?.length !== 0 &&
                    complianceDetails?.organization?.map((org, index) => (
                      <Grid key={index} item md={12} xs={12}>
                        <Box mt={3}>
                          <AddDepartmentForm
                            {...{
                              departments,
                              sections,
                              subSections,
                              organization: org,
                              complianceDetails,
                              handleOnDepartmentChange,
                              handleOnSectionChange,
                              handleOnSubSectionChange,
                              index,
                              handleRemoveDept,
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={users.find(user => user.id === complianceDetails?.primaryOwnerId) ?? initValue}
                      getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
                      onChange={handleOnPrimaryOwnerChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{option.firstName + ' ' + option.lastName}</span>
                      )}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Primary Owner" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={users.find(user => user.id === complianceDetails?.secondaryOwnerId) ?? initValue}
                      getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
                      onChange={handleOnSecondaryOwnerChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{option.firstName + ' ' + option.lastName}</span>
                      )}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Secondary Owner" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={users.find(user => user.id === complianceDetails?.escalationOwnerId) ?? initValue}
                      getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
                      onChange={handleOnEscalationOwnerChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{option.firstName + ' ' + option.lastName}</span>
                      )}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Escalation Owner" />
                      )}
                    />
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 2 && (
              <Box width={'100%'}>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={options}
                      onChange={(e, newValue) => setComplianceDetails({ ...complianceDetails, penaltyTypeName: newValue })}
                      value={complianceDetails?.penaltyTypeName}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Penalty Types" />
                      )}
                    />
                  </Grid>

                  {complianceDetails?.penaltyTypeName === options[0] && (
                    <>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Penalty"
                          type={'number'}
                          variant="outlined"
                          value={complianceDetails?.penalty}
                          onChange={e => {
                            setComplianceDetails({ ...complianceDetails, penalty: e.target.value });
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TextField
                                  select
                                  style={{ width: '90px' }}
                                  label=""
                                  value={complianceDetails?.penaltyCurrency}
                                  onChange={e =>
                                    setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })
                                  }
                                  InputProps={{
                                    disableUnderline: true,
                                  }}>
                                  {currencies.map(option => (
                                    <MenuItem key={option.id} value={option.name}>
                                      {option.name}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppTextInput
                          fullWidth
                          multiline
                          minRows={4}
                          variant="outlined"
                          label={'Narrative'}
                          value={complianceDetails?.penaltyNarrative}
                          onChange={e => setComplianceDetails({ ...complianceDetails, penaltyNarrative: e.target.value })}
                        />
                      </Grid>
                    </>
                  )}
                  {complianceDetails?.penaltyTypeName === options[1] && (
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Penalty"
                        type={'number'}
                        variant="outlined"
                        value={complianceDetails?.penalty}
                        onChange={e => {
                          setComplianceDetails({ ...complianceDetails, penalty: e.target.value });
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TextField
                                select
                                style={{ width: '90px' }}
                                label=""
                                value={complianceDetails?.penaltyCurrency}
                                onChange={e =>
                                  setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })
                                }
                                InputProps={{
                                  disableUnderline: true,
                                }}>
                                {currencies.map(option => (
                                  <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )}
                  {complianceDetails?.penaltyTypeName === options[2] && (
                    <Grid item md={12} xs={12}>
                      <AppTextInput
                        fullWidth
                        multiline
                        minRows={4}
                        variant="outlined"
                        label={'Narrative'}
                        value={complianceDetails?.penaltyNarrative}
                        onChange={e => setComplianceDetails({ ...complianceDetails, penaltyNarrative: e.target.value })}
                      />
                    </Grid>
                  )}
                  <Grid item md={12} xs={12}>
                    <AppSelectBox
                      fullWidth
                      data={priorities}
                      label="Priority"
                      valueKey="name"
                      variant="outlined"
                      labelKey="name"
                      value={complianceDetails?.priority}
                      onChange={e => setComplianceDetails({ ...complianceDetails, priority: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                  <Autocomplete
                      fullWidth
                      options={complianceFrequencies}
                      onChange={handleFrequency}
                      value={getAutoCompleteValue(complianceFrequencies, complianceDetails?.frequencyId)}
                      getOptionLabel={option => option.name}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Frequency" />
                      )}
                    />
                    {/* <AppSelectBox
                      fullWidth
                      data={complianceFrequencies}
                      label="Frequency"
                      valueKey="id"
                      variant="outlined"
                      labelKey="name"
                      value={complianceDetails?.frequencyId}
                      onChange={e => setComplianceDetails({ ...complianceDetails, frequencyId: e.target.value })}
                    /> */}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <DatePicker
                      autoOk
                      fullWidth
                      clearable
                      inputVariant={'outlined'}
                      label="Submission Deadline"
                      onChange={date => {
                        setSelectedDeadline(date);
                      }}
                      value={
                        complianceDetails?.submissionDeadline !== ''
                          ? complianceDetails?.submissionDeadline
                          : selectedDeadline
                      }
                      format="DD-MM-yyyy"
                      animateYearScrolling
                    />
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 3 && (
              <Box width={'100%'}>
                <Preview {...{ complianceDetails,selectedFrequency }} />
              </Box>
            )}
          </Box>
          <Box display="flex" m={3} pb={3}>
            {activeStep === steps.length - 1 && (
              <Button onClick={handlePrev} variant={'contained'} color={'primary'} size={'small'}>
                Prev
              </Button>
            )}
            <Box flex={'1 0 auto'} />
            {activeStep !== steps.length - 1 && (
              <Button onClick={handleNext} variant={'contained'} color={'primary'} size={'small'}>
                Continue
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button onClick={handleOnSave} variant={'contained'} color={'primary'} size={'small'}>
                Save
              </Button>
            )}
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export const Preview = props => {
  const { complianceDetails, isView,selectedFrequency } = props;
  const renderHTML = rawHTML => React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });
  const classes = useStyles();
  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td className={classes.td}>Compliance Title</td>
          <td className={classes.td}>{complianceDetails?.title !== '' ? complianceDetails?.title : 'Not Set'}</td>
        </tr>
        <tr>
          <td className={classes.td}>Compliance Description</td>
          <td className={classes.td}>
            {complianceDetails?.description !== '' ? complianceDetails?.description : 'Not Set'}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Company</td>
          <td className={classes.td}>
            {complianceDetails?.companyName !== '' ? complianceDetails?.companyName : 'Not Set'}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Department</td>
          <td className={classes.td}>
            {complianceDetails?.organization?.map(org => {
              if (!org.departmentName) {
                return null;
              }
              return (
                <>
                  <li key={org.id}>{org.departmentName}</li>
                </>
              );
            })}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Section</td>
          <td className={classes.td}>
            {complianceDetails.organization.map(org => {
              if (!org.sectionName) {
                return null;
              }
              return (
                <>
                  <li>{org.sectionName}</li>
                </>
              );
            })}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Sub Section</td>
          <td className={classes.td}>
            {complianceDetails.organization.map(org => {
              if (!org.subSectionName) {
                return null;
              }
              return (
                <>
                  <li>{org.subSectionName}</li>
                </>
              );
            })}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Authority</td>
          <td className={classes.td}>{complianceDetails?.authority !== '' ? complianceDetails?.authority : 'Not Set'}</td>
        </tr>
        <tr>
          <td className={classes.td}>Penalty in {complianceDetails?.penaltyCurrency}</td>
          <td className={classes.td}>{complianceDetails?.penalty !== '' ? complianceDetails?.penalty : 'Not Set'}</td>
        </tr>
        <tr>
          <td className={classes.td}>Primary Owner</td>
          <td className={classes.td}>
            {complianceDetails?.primaryOwnerName !== '' ? complianceDetails?.primaryOwnerName : 'Not Set'}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Secondary Owner</td>
          <td className={classes.td}>
            {complianceDetails?.secondaryOwnerName !== '' ? complianceDetails?.secondaryOwnerName : 'Not Set'}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Escalation Owner</td>
          <td className={classes.td}>
            {complianceDetails?.escalationOwnerName !== '' ? complianceDetails?.escalationOwnerName : 'Not Set'}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Penalty Type</td>
          <td className={classes.td}>
            {complianceDetails?.penaltyTypeName !== '' ? complianceDetails?.penaltyTypeName : 'Not Set'}
          </td>
        </tr>
        <tr>
          <td className={classes.td}>Priority</td>
          <td className={classes.td}>{complianceDetails?.priority !== '' ? complianceDetails?.priority : 'Not Set'}</td>
        </tr>
        <tr>
          <td className={classes.td}>Frequency</td>
          <td className={classes.td}>{selectedFrequency?.name !== '' ? selectedFrequency?.name : 'Not Set'}</td>
        </tr>
        <tr>
          <td className={classes.td}>Submission Deadline</td>
          <td className={classes.td}>
            {complianceDetails?.submissionDeadline !== '' ? complianceDetails?.submissionDeadline : 'Not Set'}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
const SuccessPage = props => {
  const { classes, handleReset, isUpdate } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <CmtImage src={'/images/ic_ok.svg'} style={{ width: '50px' }} />
      <p className={classes.instructions} style={{ marginTop: '10px' }}>
        <b>Compliance was {isUpdate ? 'updated' : 'created'} successfully!</b>
      </p>
      <Box mt={10}>
        <Link to={'/compliance/statutory-compliance'}>
          <Button color={'primary'} variant={'contained'}>
            Back to Compliance Dashboard
          </Button>
        </Link>
        {!isUpdate && (
          <Button onClick={handleReset} className={classes.button}>
            Create New Compliance
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AddEditStatutoryCompliance;
