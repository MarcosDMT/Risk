import React, { useEffect, useRef, useState } from 'react';
import PageContainer from '../../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../../@jumbo/constants/HeaderMessages';
import { AddDepartmentForm } from '../../../ComplianceModule/StatutoryCompliance/AddEditStatutoryCompliance/AddDepartmentForm';
import { AddCircle } from '@material-ui/icons';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import useStyles from '../../../index.style';
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
// import { frequencies, priority } from '../../dummyData';
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
import {
  addStatutoryCompliance,
  updateStatutoryCompliance,
  fetchStatutoryCompliance,
} from '../../../../../redux/actions/Compliance';
import CmtImage from '../../../../../@coremat/CmtImage';
import { fetchComplianceFrequencies, fetchCurrencies, fetchPriorities } from '../../../../../redux/actions/Utils';
import { fetchError } from '../../../../../redux/actions';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';
import { Options } from 'devextreme-react/autocomplete';
import { RiskAddDepartment } from './RiskAddDepartment';

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
const steps = ['1. Compliance Details', '2. Finish'];
const RiskEnterprise = ({ riskDetails, setRiskDetails, index }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleReset = () => {
    setIsUpdate(false);
    setActiveStep(0);
  };
  // const handleOnSave = e => {
  //   e.preventDefault();
  //   let data = { ...complianceDetails, penalty: parseFloat(complianceDetails.penalty) };
  //   dispatch(addStatutoryCompliance(data, () => handleNext()));
  // };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    setBreadcrumbs([
      ...breadcrumbs,
      { label: HEADER.STATUTORY_COMPLIANCE.name, link: `/compliance/${HEADER.STATUTORY_COMPLIANCE.url}` },
      { label: HEADER.CREATE_STATUTORY_COMPLIANCE, isActive: true },
    ]);
    setIsUpdate(false);
  }, []);

  return (
    <React.Fragment>
      <Box className={classes.inBuildAppCard}>
        {/* <AppHeader /> */}
        {activeStep === steps.length ? (
          <Box className={clsx(classes.inBuildAppContainer)} minHeight={400}>
            <Box width={'100%'} m={5}>
              <SuccessPage {...{ classes, handleReset, isUpdate }} />
            </Box>
          </Box>
        ) : (
          <Box className={clsx(classes.inBuildAppContainer)}>
            {/* <SideBarIncident {...{ activeStep, handleNext, handlePrev, setActiveStep }} /> */}
            <ComplianceContent
              {...{
                classes,
                isUpdate,
                activeStep,
                handleNext,
                handlePrev,
                handleReset,
                riskDetails,
                setRiskDetails,
                index,
              }}
            />
          </Box>
        )}
      </Box>
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

export const ComplianceContent = props => {
  const dispatch = useDispatch();
  const { risks } = useSelector(({ riskUniverse }) => riskUniverse);
  const { subsidiaries, currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);
  const { departments } = useSelector(({ departments }) => departments);
  const { sections } = useSelector(({ sections }) => sections);
  const { subSections } = useSelector(({ subSections }) => subSections);
  const { users } = useSelector(({ users }) => users);
  const { currencies, priorities, complianceFrequencies } = useSelector(({ utils }) => utils);
  const {
    classes,
    activeStep,
    handleNext,
    index,
    handlePrev,
    complianceDetails,
    setComplianceDetails,
    handleOnSave,
    handleFormChange,
    handleRiskOwnerChange,
    riskDetails,
    setRiskDetails,
    formData,
  } = props;
  const [selectedDeadline, setSelectedDeadline] = useState(new Date());
  const initValue = { id: '', name: '' };
  const options = ['Both', 'Quantitative', 'Qualitative'];
  const [inputValue, setInputValue] = useState('');
  const [complianceRisk, setComplianceRisk] = useState({});
  // const [checked, setChecked] = useState(false);
  // const [isSub, setIsSub] = useState(false);
  // const [attachment, setAttachment] = useState(false);
  const { statutoryComplianceData } = useSelector(({ compliance }) => compliance);

  // useEffect(() =>{
  //   setComplianceRisk(riskDetails);
  // },[riskDetails]);
  // console.log(complianceRisk)

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
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        hasSubCompliance: e.target.checked,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const isSubComplianceCheck = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        isSubCompliance: e.target.checked,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handleAttachment = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        hasAttachment: e.target.checked,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  // const handleComplianceOption =(e,value)=> {
  //   if(value !== null){
  //     setRiskDetails({...riskDetails,
  //       complianceDetails:{
  //         ...riskDetails.complianceDetails,
  //         subId: value.id
  //       }
  //       })
  //   }
  //   else{
  //     setComplianceDetails({...complianceDetails, subId: null});
  //   }
  // };

  const handleComplianceOption = (e, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        subId: values.id,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handleTypeChange = e => {
    setInputValue(e.target.value);
  };

  // const handleOnSubsidiaryChange = (event, value) => {
  //   if (value !== null) {
  //     setComplianceDetails({
  //       ...complianceDetails,
  //       companyId: value.id,
  //       companyName: value.name,
  //     });
  //   } else {
  //     setComplianceDetails({
  //       ...complianceDetails,
  //       companyId: null,
  //       companyName: '',
  //     });
  //   }
  // };

  const handleSubsidiaryChange = (e, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        companyId: values.id,
        companyName: values.name,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handlePrimaryOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        primaryOwnerId: values.id,
        primaryOwnerName: values.firstName + '' + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handleSecondaryOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        secondaryOwnerId: values.id,
        secondaryOwnerName: values.firstName + '' + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handleEscalationOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        escalationOwnerId: values.id,
        escalationOwnerName: values.firstName + '' + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handlePriorityChange = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        priority: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };

  const handleFrequencyChange = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        frequency: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handlePenaltyTypeChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        penaltyType: values,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  // const handlePenalty = (e)=>{
  //   let data = riskDetails.additionalControlActions;
  //   data[index] = {
  //     ...data[index],
  //     complianceDetails:{
  //       ...data[index].complianceDetails,
  //       penalty: e.target.value
  //     }
  //   }
  //   setRiskDetails({
  //     ...riskDetails,
  //     additionalControlActions: data
  //   })
  // }

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
  const handleOnDepartmentChange = i => (event, value) => {
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [...additionalControlActions[index].complianceDetails.organization];
    if (value !== null) {
      data[i] = {
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    } else {
      data[i] = {
        departmentId: null,
        departmentName: '',
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: [...additionalControlActions],
    });
  };

  const handleNarrative = (e) =>{
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails:{
        ...data[index].complianceDetails,
        penaltyNarrative: e.target.value
      }
    }
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data
    })
  }

  const handlePenalty = (e)=>{
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails:{
        ...data[index].complianceDetails,
        penalty: e.target.value
      }
    }
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data
    })
  }

  const handlePenaltyCurrency = (e)=>{
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails:{
        ...data[index].complianceDetails,
        penaltyCurrency: e.target.value
      }
    }
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data
    })
  }

  const handleOnSectionChange = i => (event, value) => {
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [...additionalControlActions[index].complianceDetails.organization];
    if (value !== null) {
      data[i] = {
        ...data[i],
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: '',
      };
    } else {
      data[i] = {
        ...data[i],
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: [...additionalControlActions],
    });
  };
  const handleOnSubSectionChange = index => (event, value) => {
    const data = [...riskDetails.complianceDetails.organization];
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
    setRiskDetails({
      ...riskDetails,
      complianceDetails: {
        ...riskDetails.complianceDetails,
        organization: [...data],
      },
    });
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
  // const handleOnSecondaryOwnerChange = (event, value) => {
  //   if (value !== null) {
  //     setRiskDetails({
  //       ...riskDetails,
  //       complianceDetails:{
  //         ...riskDetails.complianceDetails,
  //         secondaryOwnerId: value.id,
  //       secondaryOwnerName: value.firstName + ' ' + value.lastName,
  //       }
  //     });
  //   } else {
  //     setComplianceDetails({ ...riskDetails, secondaryOwnerId: null, secondaryOwnerName: '' });
  //   }
  // };
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

  // useEffect(() => {
  //   setComplianceDetails({
  //     ...complianceDetails,
  //     submissionDeadline: moment(selectedDeadline).format('YYYY-MM-DD'),
  //   });
  // }, [selectedDeadline]);
  // useEffect(() => {
  //   setComplianceDetails({
  //     ...complianceDetails,
  //     companyId: currentSubsidiary,
  //   });
  // }, [currentSubsidiary]);
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
    departmentId: '',
    departmentName: '',
    sectionId: '',
    sectionName: '',
    subSectionId: '',
    subSectionName: '',
  };
  const handleAddDepartment = () => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        organization: [...data[index].complianceDetails.organization, initialOrganization],
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handleDescriptionChange = e => {
    const data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        [e.target.name]: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
    // const data = [...riskDetails.additionalControlActions];
    // data[index] = {
    //   ...data[index],
    //   complianceDetails:{
    //     ...data.complianceDetails,
    //    [e.target.name]: e.target.value
    // }}
    // setRiskDetails({...riskDetails, additionalControlActions: data})
  };

  const handleAuthorityChange = e => {
    const data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        [e.target.name]: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

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
                      multiline
                      name="description"
                      minRows={4}
                      variant="outlined"
                      label={'Additional Controls Description'}
                      value={riskDetails.additionalControlActions[index].complianceDetails.description}
                      onChange={handleDescriptionChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      name="authority"
                      label="Authority"
                      value={riskDetails.additionalControlActions[index].complianceDetails.authority}
                      onChange={handleAuthorityChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    {/* <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Risk Universe"
                      value={complianceRisk?.riskTitle}
                    /> */}
                    {/* <Typography>{riskDetails?.riskTitle}</Typography> */}
                    {/* <Autocomplete
                      fullWidth
                      options={risks}
                      value={ riskDetails?.id}
                      getOptionLabel={riskDetails => riskDetails.riskTitle}
                      // onChange={handleRiskChange}
                      renderOption={(riskDetails, { selected }) => <span key={riskDetails.id}>{riskDetails.riskTitle}</span>}
                      renderInput={params => (
                        <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="RiskUniverse" />
                      )}
                    /> */}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={getAutoCompleteValue(
                        subsidiaries,
                        riskDetails.additionalControlActions[index].complianceDetails.companyId,
                      )}
                      getOptionLabel={option => option.name}
                      onChange={handleSubsidiaryChange}
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

                  {riskDetails.additionalControlActions[index].complianceDetails?.organization?.length !== 0 &&
                    riskDetails.additionalControlActions[index].complianceDetails?.organization?.map((org, index) => (
                      <Grid key={index} item md={12} xs={12}>
                        <Box mt={3}>
                          <RiskAddDepartment
                            {...{
                              departments,
                              sections,
                              subSections,
                              org,
                              complianceDetails,
                              handleOnDepartmentChange,
                              handleOnSectionChange,
                              handleOnSubSectionChange,
                              index,
                              handleRemoveDept,
                              riskDetails,
                              setRiskDetails,
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  <Grid item md={12} xs={12}>
                    {/* <TextField 
                    variant="outlined"
                    fullWidth
                    label="Primary Owner"
                     value={riskDetails.additionalControlActions[index].complianceDetails.companyName}
                     onChange={handleFieldsChange}
                     name="primaryOwnerName"
                    /> */}
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={getAutoCompleteValue(
                        users,
                        riskDetails.additionalControlActions[index].complianceDetails.primaryOwnerId,
                      )}
                      getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
                      onChange={handlePrimaryOwnerChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{option.firstName + '' + option.lastName}</span>
                      )}
                      renderInput={params => (
                        <TextField
                          required
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Primary Owner"
                        />
                      )}
                    />
                    {/* <Autocomplete
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
                    /> */}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={getAutoCompleteValue(
                        users,
                        riskDetails.additionalControlActions[index].complianceDetails.secondaryOwnerId,
                      )}
                      getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
                      onChange={handleSecondaryOwnerChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{option.firstName + '' + option.lastName}</span>
                      )}
                      renderInput={params => (
                        <TextField
                          required
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Secondary Owner"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={getAutoCompleteValue(
                        users,
                        riskDetails.additionalControlActions[index].complianceDetails.escalationOwnerId,
                      )}
                      getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
                      onChange={handleEscalationOwnerChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{option.firstName + '' + option.lastName}</span>
                      )}
                      renderInput={params => (
                        <TextField
                          required
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Escalation Owner"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={options}
                      value={riskDetails.additionalControlActions[index].complianceDetails.penaltyType}
                      getOptionLabel={option => option}
                      onChange={handlePenaltyTypeChange}
                      renderInput={params => (
                        <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Penalty Type" />
                      )}
                    />
                  </Grid>

                  {riskDetails.additionalControlActions[index].complianceDetails.penaltyType === options[0] ? (
                    <>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Penalty"
                          type={'number'}
                          variant="outlined"
                          value={riskDetails?.additionalControlActions[index]?.complianceDetails.penalty}
                          onChange={handlePenalty}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TextField
                                  select
                                  style={{ width: '90px' }}
                                  label=""
                                  value={riskDetails.additionalControlActions[index].complianceDetails.penaltyCurrency}
                                  onChange={handlePenaltyCurrency}
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
                      <Grid item md={6} xs={12}>
                        <AppTextInput
                          fullWidth
                          multiline
                          minRows={4}
                          variant="outlined"
                          label={'Narrative'}
                          value={riskDetails.additionalControlActions[index].complianceDetails.penaltyNarrative}
                          onChange={handleNarrative}
                        />
                      </Grid>
                    </>
                  ) : null}
                  {riskDetails.additionalControlActions[index].complianceDetails.penaltyType === options[1] ? (
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        label="Penalty"
                        type={'number'}
                        variant="outlined"
                        value={riskDetails.additionalControlActions[index].complianceDetails.penalty}
                        onChange={handlePenalty}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TextField
                                select
                                style={{ width: '90px' }}
                                label=""
                                value={riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyCurrency}
                                onChange={handlePenaltyCurrency}
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
                  ) : (
                    null
                  )}
                  {riskDetails.additionalControlActions[index].complianceDetails.penaltyType === options[2] ? (
                    <Grid item md={12} xs={12}>
                      <AppTextInput
                        fullWidth
                        multiline
                        minRows={4}
                        variant="outlined"
                        label={'Narrative'}
                        value={riskDetails.additionalControlActions[index].complianceDetails.penaltyNarrative}
                        onChange={e =>
                          setRiskDetails({
                            ...riskDetails,
                            complianceDetails: {
                              ...riskDetails.complianceDetails,
                              penaltyNarrative: e.target.value,
                            },
                          })
                        }
                      />
                    </Grid>
                  ) : null}

                  <Grid item md={12} xs={12}>
                    <AppSelectBox
                      fullWidth
                      data={priorities}
                      label="Priority"
                      valueKey="name"
                      variant="outlined"
                      labelKey="name"
                      value={riskDetails.additionalControlActions[index].complianceDetails.priority}
                      onChange={handlePriorityChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppSelectBox
                      fullWidth
                      data={complianceFrequencies}
                      label="Frequency"
                      valueKey="id"
                      variant="outlined"
                      labelKey="name"
                      value={riskDetails.additionalControlActions[index].complianceDetails.frequency}
                      onChange={handleFrequencyChange}
                    />
                  </Grid>
                  {/* <Grid item md={12} xs={12}>
                    <DatePicker
                      autoOk
                      fullWidth
                      clearable
                      inputVariant={'outlined'}
                      label="Submission Deadline"
                      onChange={handleFormChange}
                      name="date"
                      value={formData?.date}
                      format="DD-MM-yyyy"
                      animateYearScrolling
                    />
                  </Grid> */}
                  <Grid item md={12} xs={12}>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          checked={riskDetails.additionalControlActions[index].complianceDetails.hasSubCompliance}
                          onChange={hasSubComplianceCheck}
                          color="primary"
                        />
                      }
                      label={flags.first}
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          checked={riskDetails.additionalControlActions[index].complianceDetails.isSubCompliance}
                          onChange={isSubComplianceCheck}
                          color="primary"
                        />
                      }
                      label={flags.second}
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControlLabel
                      value="start"
                      control={
                        <Checkbox
                          checked={riskDetails.additionalControlActions[index].complianceDetails.hasAttachment}
                          onChange={handleAttachment}
                          color="primary"
                        />
                      }
                      label={flags.third}
                      labelPlacement="end"
                    />
                  </Grid>
                  {riskDetails.additionalControlActions[index].complianceDetails.isSubCompliance && (
                    <Grid item md={12} xs={12}>
                      <Autocomplete
                        fullWidth
                        options={statutoryComplianceData}
                        value={getAutoCompleteValue(
                          statutoryComplianceData,
                          riskDetails.additionalControlActions[index].complianceDetails.subId,
                        )}
                        getOptionLabel={option => option.title}
                        onChange={handleComplianceOption}
                        renderOption={(option, { selected }) => <span key={option.id}>{option.title}</span>}
                        renderInput={params => (
                          <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Select Compliance" />
                        )}
                      />
                    </Grid>
                  )}
                </GridContainer>
              </Box>
            )}
            {activeStep === 1 && (
              <Box width={'100%'}>
                <Preview {...{ complianceDetails }} />
              </Box>
            )}
          </Box>
          <Box display="flex" m={3} pb={3}>
            {activeStep === steps?.length - 1 && (
              <Button onClick={handlePrev} variant={'contained'} color={'primary'} size={'small'}>
                Prev
              </Button>
            )}
            <Box flex={'1 0 auto'} />
            {/* {activeStep !== steps?.length - 1 && (
              <Button onClick={handleNext} variant={'contained'} color={'primary'} size={'small'}>
                Continue
              </Button>
            )} */}
            {activeStep === steps?.length - 1 && (
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
  const { complianceDetails, isView } = props;
  const renderHTML = rawHTML => React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });
  const classes = useStyles();
  return (
    <TableContainer className={classes.inBuildAppCard}>
      <Table size="small" aria-label="a dense table">
        {!isView && (
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Field Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Input Value</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          <TableRow>
            <TableCell>
              <b>Compliance Title</b>
            </TableCell>
            <TableCell>{complianceDetails?.title !== '' ? complianceDetails?.title : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Compliance Description</b>
            </TableCell>
            <TableCell>
              {complianceDetails?.description !== '' ? renderHTML(complianceDetails?.description) : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Company</b>
            </TableCell>
            <TableCell>{complianceDetails?.companyName !== '' ? complianceDetails?.companyName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Department</b>
            </TableCell>
            <TableCell>
              {complianceDetails?.departmentsName !== '' ? complianceDetails?.departmentsName : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Section</b>
            </TableCell>
            <TableCell>{complianceDetails?.sectionsName !== '' ? complianceDetails?.sectionsName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Sub Section</b>
            </TableCell>
            <TableCell>
              {complianceDetails?.subSectionsName !== '' ? complianceDetails?.subSectionsName : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Authority</b>
            </TableCell>
            <TableCell>{complianceDetails?.authority !== '' ? complianceDetails?.authority : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Penalty in {complianceDetails?.penaltyCurrency}</b>
            </TableCell>
            <TableCell>{complianceDetails?.penalty !== '' ? complianceDetails?.penalty : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Primary Owner</b>
            </TableCell>
            <TableCell>
              {complianceDetails?.primaryOwnerName !== '' ? complianceDetails?.primaryOwnerName : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Secondary Owner</b>
            </TableCell>
            <TableCell>
              {complianceDetails?.secondaryOwnerName !== '' ? complianceDetails?.secondaryOwnerName : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Escalation Person</b>
            </TableCell>
            <TableCell>
              {complianceDetails?.escalationOwnerName !== '' ? complianceDetails?.escalationOwnerName : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Priority</b>
            </TableCell>
            <TableCell>{complianceDetails?.priority !== '' ? complianceDetails?.priority : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Frequency</b>
            </TableCell>
            <TableCell>{complianceDetails?.frequency !== '' ? complianceDetails?.frequency : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Submission Deadline</b>
            </TableCell>
            <TableCell>
              {complianceDetails?.submissionDeadline !== '' ? complianceDetails?.submissionDeadline : 'Not Set'}
            </TableCell>
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

export default RiskEnterprise;