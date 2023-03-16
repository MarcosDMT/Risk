import React, { useEffect, useRef, useState } from 'react';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import AddRiskDialog from './CreateRisk/AddRiskDialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { assessRiskUniverse, fetchRisks, addRisk } from '../../../../redux/actions/RiskUniverse';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { AddCircle } from '@material-ui/icons';
import { fetchError } from '../../../../redux/actions';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  Zoom,
} from '@material-ui/core';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../Roles/index.style';
import { AccountCircle, ArrowBack, Person } from '@material-ui/icons';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ArrowBackIos, ArrowForwardIos, CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CmtList from '../../../../@coremat/CmtList';
import List from '@material-ui/core/List';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import AppSelectBox from '../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../../../../redux/actions/Departments';
import { fetchSubsidiaries } from '../../../../redux/actions/Subsidiaries';
import { fetchSections } from '../../../../redux/actions/Sections';
import { fetchSubSections } from '../../../../redux/actions/SubSections';
import { fetchUsers } from '../../../../redux/actions/Users';
import { fetchAppetiteTypes, fetchCurrencies, fetchRisksFrequencies } from '../../../../redux/actions/Utils';
import {
  fetchRiskCategories,
  fetchRiskControls,
  fetchRiskLossTypes,
  fetchRiskProbabilities,
  fetchRiskSeverities,
} from '../../../../redux/actions/RiskParams';
import { getAutoCompleteValue, getFilteredOptions } from '../../../../@jumbo/utils/commonHelper';
import { fetchRootCauses } from '../../../../redux/actions/RootCauses';
import { fetchRiskOwners } from '../../../../redux/actions/RiskOwners';
import { makeStyles } from '@material-ui/styles';
import CreateRiskAction from './CreateRisk/CreateRiskAction';

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.RISK_UNIVERSE, link: '/risk-universe' },
];
const initialDetails = {
  riskTitle: '',
  riskEvent: '',
  categoryId: '',
  categoryName: '',
  companyId: '',
  companyName: '',
  departmentId: '',
  departmentName: '',
  sectionId: '',
  sectionName: '',
  subSectionId: '',
  subSectionName: '',
  rootCauses: [],
  riskImpact: [],
  riskImpactAmount: '',
  riskImpactCurrency: '',
  riskCategoryControlId: '',
  riskCategoryControlName: '',
  controlActions: [],
  lossTypeName: '',
  lossTypeId: '',
  riskOwner: '',
  riskOwners: [],
  keyIndicator: '',
  keyIndicatorFrequencyId: '',
  keyIndicatorFrequencyName: '',
  riskAppetite: '',
  riskAppetiteTypeName: '',
  riskAppetiteTypeId: '',
  riskAppetiteDirection: '',
  riskProbabilityId: '',
  riskProbabilityName: '',
  riskSeverityId: '',
  riskSeverityName: '',
  residualRisk: '',
  riskActions: [
     {
      action: '',
      riskOwners: [],
      date: '',
      emails: [],
      complianceType: '',
  }
  ]
};

const complianceTypes = [
  { id: 1, name: 'Statutory Compliance' },
  { id: 2, name: 'Legal Compliance' },
  { id: 3, name: 'Enterprise Compliance' },
];
export const initialActions = {
    action: '',
    riskOwners: [],
    date: '',
    emails: [],
    complianceType: '',
};
const filter = createFilterOptions();
const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxOutlined fontSize="small" />;
const AppHeader = props => {
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
          Risk Event
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
const steps = ['1. Risk Definition', '2. Risk Assignment', '3. Risk Assessment', '4. Risk Impact & Control', '5. Finish'];
const AssessRiskUniverse = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [riskDetails, setRiskDetails] = useState(initialDetails);
  console.log(riskDetails)
  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    if (location.state !== undefined) {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.ASSESS_RISK, isActive: true }]);
      setRiskDetails(location.state);
      setIsUpdate(true);
    } else {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.CREATE_RISK, isActive: true }]);
      setRiskDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location]);

  useEffect(() => {
    dispatch(fetchSubsidiaries());
    dispatch(fetchDepartments());
    dispatch(fetchSections());
    dispatch(fetchSubSections());
    dispatch(fetchUsers());
    dispatch(fetchCurrencies());
    dispatch(fetchRiskLossTypes());
    dispatch(fetchRiskProbabilities());
    dispatch(fetchRiskSeverities());
    dispatch(fetchRiskControls());
    dispatch(fetchRisksFrequencies());
    dispatch(fetchRiskCategories());
    dispatch(fetchAppetiteTypes());
    dispatch(fetchRootCauses());
    dispatch(fetchRiskOwners());
  }, []);

  return (
    <React.Fragment>
      <PageContainer heading={isUpdate ? HEADER.ASSESS_RISK : HEADER.CREATE_RISK} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <AppHeader />
          <Box className={clsx(classes.inBuildAppContainer)}>
            <SideBarRisk {...{ activeStep, handleNext, handlePrev, setActiveStep }} />
            <RiskContent {...{ classes, activeStep, handleNext, riskDetails, setRiskDetails }} />
          </Box>
        </Box>
      </PageContainer>
      <NotificationContainer />
    </React.Fragment>
  );
};
const SideBarRisk = props => {
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
const Transition = React.forwardRef((props, ref) => {
  return <Zoom ref={ref} {...props} unmountOnExit />;
});
const useStyle = makeStyles(theme => ({
  root: {
    border: 'none',
    '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
      transform: 'translate(34px, 20px) scale(1);',
    },
  },
  // inputRoot: {}
}));

const RiskContent = props => {
  const initialDialogValues = {
    open: false,
    name: '',
    index: '',
    title: '',
  };
  const { classes, activeStep, handleNext, riskDetails, setRiskDetails } = props;
  console.log(riskDetails)
  const { subsidiaries } = useSelector(({ subsidiaries }) => subsidiaries);
  const dispatch = useDispatch();
  const { departments } = useSelector(({ departments }) => departments);
  const { sections } = useSelector(({ sections }) => sections);
  const { subSections } = useSelector(({ subSections }) => subSections);
  const { riskOwners } = useSelector(({ riskOwners }) => riskOwners);
  const { rootCauses } = useSelector(({ rootCauses }) => rootCauses);
  const { currencies, appetiteTypes, riskFrequencies } = useSelector(({ utils }) => utils);
  const { riskCategories, probabilities, lossTypes, severities, riskControls } = useSelector(({ riskParams }) => riskParams);
  const [riskImpact, setRiskImpact] = useState([]);
  const [riskControlsActions, setRiskControlsActions] = useState([]);
  const [riskActionDetails, setRiskActionDetails] = useState(initialActions);
  const [dialogValues, setDialogValues] = useState(initialDialogValues);
  const directions = ['Positive', 'Negative'];


  const renderDialog = (option, index, title) => {
    setDialogValues({
      open: true,
      name: option.name,
      index: index,
      title: title,
    });
  };

  // const handleAddDepartment = () => {
  //   setComplianceDetails({ ...complianceDetails, organization: [...complianceDetails.organization, initialOrganization] });
  // };

  const handleAddAction = () => {
    setRiskDetails([...riskDetails,initialActions]);
  };

  const handleRemoveAction = index => {
    const data = [...riskActionDetails];
    // if (data?.length - 1 !== 0) {
    data.splice(index, 1);
    setRiskActionDetails(data);
    // }
  };

  const handleDelete = () => {
    alert('You clicked the delete icon');
  };
  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        companyId: value.id,
        companyName: value.name,
        departmentsId: null,
        departmentsName: '',
        sectionsId: null,
        sectionsName: '',
        subSectionsId: null,
        subSectionsName: '',
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        companyId: null,
        companyName: '',
        departmentId: null,
        departmentName: '',
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      });
    }
  };
  const handleOnDepartmentChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        departmentId: null,
        departmentName: '',
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      });
    }
  };
  const handleOnSectionChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: '',
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      });
    }
  };

  // Calculate assessment function
  const calculateAssessment = async (riskProbabilityId, riskSeverityId) => {
    const formData = {
      riskProbabilityId,
      riskSeverityId,
    };
    console.log(formData);
    const data = await dispatch(assessRiskUniverse(formData));
    if (data) {
      setRiskDetails({ ...riskDetails, residualRisk: data.actualName });
    } else {
      setRiskDetails({ ...riskDetails, residualRisk: '' });
    }
    console.log('CALCULATED: ', data.actualName);
  };

  const handleOnSubSectionChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, subSectionId: value.id, subSectionName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, subSectionId: null, subSectionName: '' });
    }
  };
  const handleOnCategoryControlChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskCategoryControlId: parseInt(value.id), riskCategoryControlName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskCategoryControlId: null, riskCategoryControlName: '' });
    }
  };
  const handleOnRiskCategoryChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, categoryId: parseInt(value.id), category: value.name });
    } else {
      setRiskDetails({ ...riskDetails, categoryId: null, categoryName: '' });
    }
  };
  const handleOnProbabilityChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskProbabilityId: parseInt(value.id), riskProbabilityName: value.name });
      calculateAssessment(e.target.value, riskDetails.riskSeverityId);
    } else {
      setRiskDetails({ ...riskDetails, riskProbabilityId: null, riskProbabilityName: '' });
    }
    console.log(e.target.value);
  };
  const handleOnRiskApetiteDirection = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskAppetiteDirection: value });
    } else {
      setRiskDetails({ ...riskDetails, riskAppetiteDirection: '' });
    }
  };
  const handleOnSeverityChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskSeverityId: parseInt(value.id), riskSeverityName: value.name });
      calculateAssessment(riskDetails.riskSeverityId, e.target.value);
    } else {
      setRiskDetails({ ...riskDetails, riskSeverityId: null, riskSeverityName: '' });
    }
  };
  const handleOnLossTypeChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, lossTypeId: parseInt(value.id), lossTypeName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, lossTypeId: null, lossTypeName: '' });
    }
  };
  const handleOnRootChange = (event, values) => {
    const data = [];
    if (values.length !== 0) {
      values.map(value =>
        data.push({
          id: value.id ?? null,
          name: value.name,
        }),
      );
    }
    setRiskDetails({ ...riskDetails, rootCauses: values });
  };
  const handleOnImpactChange = (event, values) => {
    setRiskDetails({ ...riskDetails, riskImpact: values });
    setRiskImpact(values);
  };
  const handleOnControlsChange = (event, values) => {
    setRiskDetails({ ...riskDetails, controlActions: values });
    setRiskControlsActions(values);
  };
  const handleOnAppetiteChange = e => {
    const value = getAutoCompleteValue(appetiteTypes, e.target.value);
    if (value) {
      setRiskDetails({ ...riskDetails, riskAppetiteTypeId: value.id, riskAppetiteTypeName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskAppetiteTypeId: null, riskAppetiteTypeName: '' });
    }
  };
  const handleOnFrequencyChange = e => {
    const value = getAutoCompleteValue(riskFrequencies, e.target.value);
    if (value) {
      setRiskDetails({ ...riskDetails, keyIndicatorFrequencyId: value.id, keyIndicatorFrequencyName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, keyIndicatorFrequencyId: null, keyIndicatorFrequencyName: '' });
    }
  };
  const handleOnSave = e => {
    e.preventDefault();
    const { title, index, name } = dialogValues;
    let data = [];
    if (title === 'Risk Impact') {
      data = [...riskDetails.riskImpact];
      data[index] = { ...data[index], name: name };
      setRiskImpact(data);
      setRiskDetails({ ...riskDetails, riskImpact: data });
    } else if (title === 'Root Cause') {
      data = [...riskDetails.rootCauses];
      data[index] = { ...data[index], name: name };
      setRiskDetails({ ...riskDetails, rootCauses: data });
    } else if (title === 'Risk Control') {
      data = [...riskDetails.controlActions];
      data[index] = { ...data[index], name: name };
      setRiskControlsActions(data);
      setRiskDetails({ ...riskDetails, controlActions: data });
    }
    setDialogValues(initialDialogValues);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(riskDetails);
    dispatch(addRisk(riskDetails));
  };

  useEffect(() => {
    setRiskDetails({
      ...riskDetails,
      riskAppetiteTypeId: appetiteTypes[0]?.id,
      riskAppetiteTypeName: appetiteTypes[0]?.name,
      riskImpactCurrency: currencies[0]?.name,
    });
  }, []);

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
                      label="Risk Title"
                      value={riskDetails.riskTitle}
                      onChange={e => setRiskDetails({ ...riskDetails, riskTitle: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      multiline
                      minRows={4}
                      variant="outlined"
                      label="Risk Event"
                      value={riskDetails.riskEvent}
                      onChange={e => setRiskDetails({ ...riskDetails, riskEvent: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={riskCategories}
                      value={getAutoCompleteValue(riskCategories, riskDetails.categoryId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnRiskCategoryChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Risk Category" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      value={riskDetails.rootCauses}
                      options={rootCauses}
                      filterOptions={(option, params) => {
                        const filtered = filter(option, params);
                        if (params.inputValue !== '') {
                          const data = { id: null, name: params.inputValue, description: '' };
                          filtered.push(data);
                        }
                        return filtered;
                      }}
                      autoHighlight
                      disableCloseOnSelect
                      onChange={handleOnRootChange}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            title={option.name}
                            color={'primary'}
                            label={option.name}
                            onClick={e => renderDialog(option, index, 'Root Cause')}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      freeSolo
                      selectOnFocus
                      getOptionLabel={option => option.name}
                      renderOption={(option, state) => (
                        <span key={option.name}>
                          <Checkbox
                            color={'primary'}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={state.selected}
                          />
                          {option.name}
                        </span>
                      )}
                      renderInput={params => <TextField fullWidth variant={'outlined'} {...params} label="Root Causes" />}
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
                      value={getAutoCompleteValue(subsidiaries, riskDetails.companyId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSubsidiaryChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Subsidiary" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={getFilteredOptions(departments, riskDetails, 'companyId')}
                      value={getAutoCompleteValue(departments, riskDetails.departmentId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnDepartmentChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          required
                          helperText={riskDetails.companyId === '' ? 'Select Subsidiary' : ''}
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Department"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={getFilteredOptions(sections, riskDetails, 'departmentId', 'departmentsId')}
                      value={getAutoCompleteValue(sections, riskDetails.sectionId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSectionChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          helperText={riskDetails.departmentId === '' ? 'Select Department' : ''}
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Section"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={getFilteredOptions(subSections, riskDetails, 'sectionId', 'sectionsId')}
                      value={getAutoCompleteValue(subSections, riskDetails.subSectionId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSubSectionChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          helperText={riskDetails.subSectionId === '' ? 'Select Section' : ''}
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Sub Section"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AddRiskDialog riskDetails={riskDetails} setRiskDetails={setRiskDetails} />
                    <Card>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          {riskDetails.riskOwners.map(owner => (
                            <Chip style={{ margin: '2px' }} label={owner.name} onDelete={handleDelete} color="primary" />
                          ))}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 2 && (
              <Box width={'100%'}>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Risk Indicator"
                      variant="outlined"
                      value={riskDetails.keyIndicator}
                      onChange={e => setRiskDetails({ ...riskDetails, keyIndicator: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppSelectBox
                      fullWidth
                      data={riskFrequencies}
                      label="Risk Indicator Frequency"
                      valueKey="id"
                      variant="outlined"
                      labelKey="name"
                      value={riskDetails.keyIndicatorFrequencyId}
                      onChange={handleOnFrequencyChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Risk Appetite"
                      variant="outlined"
                      type={'number'}
                      value={riskDetails.riskAppetite}
                      onChange={e => setRiskDetails({ ...riskDetails, riskAppetite: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextField
                              select
                              style={{ width: '90px' }}
                              label=""
                              value={riskDetails.riskAppetiteTypeId}
                              onChange={handleOnAppetiteChange}
                              InputProps={{
                                disableUnderline: true,
                              }}>
                              {appetiteTypes.map(option => (
                                <MenuItem key={option.id} value={option.id}>
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
                    <Autocomplete
                      fullWidth
                      options={directions}
                      value={getAutoCompleteValue(directions, riskDetails.riskAppetiteDirection)}
                      getOptionLabel={option => option}
                      onChange={handleOnRiskApetiteDirection}
                      renderOption={(option, { selected }) => <span key={option}>{option}</span>}
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Risk Apetite Direction"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        // value={formData.riskOwners}
                        onChange={handleOnProbabilityChange}
                        label="Probability"
                        fullWidth
                        select
                        variant="outlined">
                        {probabilities.map((option, index) => (
                          <MenuItem key={index} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                      {/* <Select
                      style={{ marginBottom: '20px' }}
                      onChange={handleOnProbabilityChange}
                      fullWidth
                      variant="outlined"
                      id=""
                    >
                      {probabilities.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select> */}
                    </FormControl>
                    {/* <Autocomplete
                      fullWidth
                      options={probabilities}
                      value={getAutoCompleteValue(probabilities, riskDetails.riskProbabilityId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnProbabilityChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Probability" />
                      )}
                    /> */}
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        // value={formData.riskOwners}
                        onChange={handleOnSeverityChange}
                        label="Severity"
                        fullWidth
                        select
                        variant="outlined">
                        {severities.map((option, index) => (
                          <MenuItem key={index} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl fullWidth>
                      <TextField
                        // value={formData.riskOwners}
                        onChange={handleOnSeverityChange}
                        label="Velocity"
                        fullWidth
                        select
                        variant="outlined">
                        {severities.map((option, index) => (
                          <MenuItem key={index} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Inherent Risk"
                      variant="outlined"
                      disabled
                      value={riskDetails.residualRisk}
                      // onChange={e => setRiskDetails({ ...riskDetails, residualRisk: e.target.value })}
                    />
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 3 && (
              <Box width={'100%'}>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      value={riskDetails.riskImpact}
                      options={riskImpact}
                      filterOptions={(option, params) => {
                        const filtered = filter(option, params);
                        if (params.inputValue !== '') {
                          const data = { id: null, name: params.inputValue };
                          filtered.push(data);
                        }
                        return filtered;
                      }}
                      autoHighlight
                      onChange={handleOnImpactChange}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            title={option.name}
                            color={'primary'}
                            label={option.name}
                            onClick={e => renderDialog(option, index, 'Risk Impact')}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      freeSolo
                      selectOnFocus
                      disableCloseOnSelect
                      getOptionLabel={option => option.name}
                      renderOption={(option, state) => (
                        <span key={option.name}>
                          <Checkbox
                            color={'primary'}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={state.selected}
                          />
                          {option.name}
                        </span>
                      )}
                      renderInput={params => <TextField fullWidth variant={'outlined'} {...params} label="Risk Impact" />}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Risk Impact Amount"
                      type={'number'}
                      variant="outlined"
                      value={riskDetails.riskImpactAmount}
                      onChange={e => {
                        setRiskDetails({ ...riskDetails, riskImpactAmount: e.target.value });
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextField
                              select
                              style={{ width: '90px' }}
                              label=""
                              value={riskDetails.riskImpactCurrency}
                              onChange={e => setRiskDetails({ ...riskDetails, riskImpactCurrency: e.target.value })}
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
                    <Autocomplete
                      fullWidth
                      options={lossTypes}
                      value={getAutoCompleteValue(lossTypes, riskDetails.lossTypeId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnLossTypeChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Loss Type" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={riskControls}
                      value={getAutoCompleteValue(riskControls, riskDetails.riskCategoryControlId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnCategoryControlChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Control Category" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      value={riskDetails.controlActions}
                      options={riskControlsActions}
                      filterOptions={(option, params) => {
                        const filtered = filter(option, params);
                        if (params.inputValue !== '') {
                          const data = { id: null, name: params.inputValue };
                          filtered.push(data);
                        }
                        return filtered;
                      }}
                      autoHighlight
                      onChange={handleOnControlsChange}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            title={option.name}
                            color={'primary'}
                            label={option.name}
                            onClick={e => renderDialog(option, index, 'Risk Control')}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      freeSolo
                      selectOnFocus
                      disableCloseOnSelect
                      getOptionLabel={option => option.name}
                      renderOption={(option, state) => (
                        <span key={option.name}>
                          <Checkbox
                            color={'primary'}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={state.selected}
                          />
                          {option.name}
                        </span>
                      )}
                      renderInput={params => (
                        <TextField fullWidth variant={'outlined'} {...params} label="Existing Controls" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      // value={formData.riskOwners}
                      onChange={handleOnSeverityChange}
                      label="Existing Controls Rating"
                      fullWidth
                      select
                      variant="outlined">
                      {severities.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Box>
                      <Button onClick={handleAddAction} startIcon={<AddCircle />} variant="outlined" color="primary">
                        Add Additional Controls
                      </Button>
                    </Box>
                  </Grid>

                  {riskDetails?.riskActions?.length !== 0 &&
                    riskDetails?.riskActions?.map((act, index) => (
                      <Grid item md={12} xs={12}>
                        <Box key={index} mt={3}>
                          <CreateRiskAction
                            formData={riskActionDetails}
                            setFormData={setRiskActionDetails}
                            handleRemoveAction={handleRemoveAction}
                            riskDetails={riskDetails}
                            setRiskDetails={setRiskDetails}
                            index={index}
                          />
                        </Box>
                      </Grid>
                    ))}
                </GridContainer>
              </Box>
            )}
            {activeStep === 4 && (
              <Box width={'100%'}>
                <Preview {...{ riskDetails, riskActionDetails }} />
              </Box>
            )}
          </Box>
          <Box display="flex" m={3} pb={3}>
            <Box flex={'1 0 auto'} />
            {activeStep !== steps.length - 1 && (
              <Button onClick={handleNext} variant={'contained'} color={'primary'} size={'small'}>
                Continue
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button onClick={handleSubmit} variant={'contained'} color={'primary'} size={'small'}>
                Save
              </Button>
            )}
          </Box>
        </PerfectScrollbar>
      </Box>
      <Dialog open={dialogValues.open} TransitionComponent={Transition} onClose={e => setDialogValues(initialDialogValues)}>
        <form onSubmit={handleOnSave}>
          <DialogTitle>Edit {dialogValues.title}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              value={dialogValues.name}
              label={dialogValues.title}
              type="text"
              onChange={e => setDialogValues({ ...dialogValues, name: e.target.value })}
              variant="outlined"
              multiline
              minRows={5}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color={'primary'}
              size={'small'}
              variant={'outlined'}
              onClick={e => setDialogValues(initialDialogValues)}>
              Cancel
            </Button>
            <Button color={'primary'} size={'small'} variant={'contained'} type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
export const Preview = props => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { riskDetails, isView ,riskActionDetails} = props;
  console.log("RISK DDEEE ",riskDetails);
  const classes = useStyles();
  return (
    <>
      <>
        <div className={classes.root}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Typography className={classes.heading}>Risk Preview</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer className={classes.inBuildAppCard}>
                <Table size={'small'} aria-label="preview table">
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
                        <b>Risk Title</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskTitle !== '' ? riskDetails?.riskTitle : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Event</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskEvent !== '' ? riskDetails?.riskEvent : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Category</b>
                      </TableCell>
                      <TableCell>{riskDetails?.categoryName !== '' ? riskDetails?.categoryName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Causes</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.rootCauses.length !== 0
                          ? riskDetails?.rootCauses.map(rootCause => <li key={rootCause?.id}>{rootCause?.name}</li>)
                          : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Subsidiary</b>
                      </TableCell>
                      <TableCell>{riskDetails?.companyName !== '' ? riskDetails?.companyName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Department</b>
                      </TableCell>
                      <TableCell>{riskDetails?.departmentName !== '' ? riskDetails?.departmentName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Section</b>
                      </TableCell>
                      <TableCell>{riskDetails?.sectionName !== '' ? riskDetails?.sectionName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Sub Section</b>
                      </TableCell>
                      <TableCell>{riskDetails?.subSectionName !== '' ? riskDetails?.subSectionName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Owner</b>
                      </TableCell>
                      {riskDetails?.riskOwners.map(owner => (
                        <TableCell key={owner.id}>{owner.name}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Impact</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskImpact.length !== 0
                          ? riskDetails?.riskImpact.map((impact, index) => <li key={index}>{impact?.name}</li>)
                          : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Impact Amount in {riskDetails?.riskImpactCurrency}</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskImpactAmount !== '' ? riskDetails?.riskImpactAmount : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Control Category</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskCategoryControlName !== '' ? riskDetails?.riskCategoryControlName : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Control/Mitigation Actions</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.controlActions.length !== 0
                          ? riskDetails?.controlActions.map((controlAction, index) => (
                              <li key={index}>{controlAction.name}</li>
                            ))
                          : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Loss Type</b>
                      </TableCell>
                      <TableCell>{riskDetails?.lossTypeName !== '' ? riskDetails?.lossTypeName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Indicator</b>
                      </TableCell>
                      <TableCell>{riskDetails?.keyIndicator !== '' ? riskDetails?.keyIndicator : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Indicator Frequency</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.keyIndicatorFrequencyName !== '' ? riskDetails?.keyIndicatorFrequencyName : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Appetite in {riskDetails?.riskAppetiteTypeName}</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskAppetite !== '' ? riskDetails?.riskAppetite : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Appetite Direction {riskDetails?.riskAppetiteDirection}</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskAppetiteDirection !== '' ? riskDetails?.riskAppetiteDirection : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Probability</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskProbabilityName !== '' ? riskDetails?.riskProbabilityName : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Severity</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskSeverityName !== '' ? riskDetails?.riskSeverityName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Residual Risk</b>
                      </TableCell>
                      <TableCell>{riskDetails?.residualRisk !== '' ? riskDetails?.residualRisk : 'Not Set'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
              <Typography className={classes.heading}>Compliance and Action Preview</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer className={classes.inBuildAppCard}>
                <Table size={'small'} aria-label="preview table">
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
                        <b>Action Title</b>
                      </TableCell>
                      <TableCell>
                        {
                          riskDetails?.additionalControlActions?.length !==  0 ?
                          riskDetails?.additionalControlActions?.map((action,index) =>(
                            <li key={index}>{action.action.action}</li>
                          ))
                          :
                          'Not Set'
                        }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Owners</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskEvent !== '' ? riskDetails?.riskEvent : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Date</b>
                      </TableCell>
                      <TableCell>{riskDetails?.categoryName !== '' ? riskDetails?.categoryName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Emails</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.rootCauses?.length !== 0
                          ? riskDetails?.rootCauses?.map(rootCause => <li key={rootCause?.id}>{rootCause?.name}</li>)
                          : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Subsidiary</b>
                      </TableCell>
                      <TableCell>{riskDetails?.companyName !== '' ? riskDetails?.companyName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Department</b>
                      </TableCell>
                      <TableCell>{riskDetails?.departmentName !== '' ? riskDetails?.departmentName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Section</b>
                      </TableCell>
                      <TableCell>{riskDetails?.sectionName !== '' ? riskDetails?.sectionName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Sub Section</b>
                      </TableCell>
                      <TableCell>{riskDetails?.subSectionName !== '' ? riskDetails?.subSectionName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Owner</b>
                      </TableCell>
                      {riskDetails?.riskOwners?.map(owner => (
                        <TableCell key={owner.id}>{owner.name}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Impact</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskImpact.length !== 0
                          ? riskDetails?.riskImpact?.map((impact, index) => <li key={index}>{impact.name}</li>)
                          : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Impact Amount in {riskDetails?.riskImpactCurrency}</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskImpactAmount !== '' ? riskDetails?.riskImpactAmount : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Control Category</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskCategoryControlName !== '' ? riskDetails?.riskCategoryControlName : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Control/Mitigation Actions</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.controlActions?.length !== 0
                          ? riskDetails?.controlActions?.map((controlAction, index) => (
                              <li key={index}>{controlAction.name}</li>
                            ))
                          : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Loss Type</b>
                      </TableCell>
                      <TableCell>{riskDetails?.lossTypeName !== '' ? riskDetails?.lossTypeName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Indicator</b>
                      </TableCell>
                      <TableCell>{riskDetails?.keyIndicator !== '' ? riskDetails?.keyIndicator : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Indicator Frequency</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.keyIndicatorFrequencyName !== '' ? riskDetails?.keyIndicatorFrequencyName : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Appetite in {riskDetails?.riskAppetiteTypeName}</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskAppetite !== '' ? riskDetails?.riskAppetite : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Risk Appetite Direction {riskDetails?.riskAppetiteDirection}</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskAppetiteDirection !== '' ? riskDetails?.riskAppetiteDirection : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Probability</b>
                      </TableCell>
                      <TableCell>
                        {riskDetails?.riskProbabilityName !== '' ? riskDetails?.riskProbabilityName : 'Not Set'}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Severity</b>
                      </TableCell>
                      <TableCell>{riskDetails?.riskSeverityName !== '' ? riskDetails?.riskSeverityName : 'Not Set'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Residual Risk</b>
                      </TableCell>
                      <TableCell>{riskDetails?.residualRisk !== '' ? riskDetails?.residualRisk : 'Not Set'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    </>
  );
};

export default AssessRiskUniverse;
