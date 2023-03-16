import React, { useEffect, useRef, useState } from 'react';
import useStyles from '../../../Roles/index.style';
import { assessRiskUniverse } from '../../../../../redux/actions/RiskUniverse';
import FormControl from '@material-ui/core/FormControl';
import { AddCircle } from '@material-ui/icons';
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
  Grid, IconButton,
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
import PerfectScrollbar from 'react-perfect-scrollbar';
import {ArrowBackIos, ArrowForwardIos, CheckBoxOutlineBlank, CheckBoxOutlined} from '@mui/icons-material';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../../../../../redux/actions/Departments';
import { fetchSubsidiaries } from '../../../../../redux/actions/Subsidiaries';
import { fetchSections } from '../../../../../redux/actions/Sections';
import { fetchSubSections } from '../../../../../redux/actions/SubSections';
import { fetchUsers } from '../../../../../redux/actions/Users';
import { fetchAppetiteTypes, fetchCurrencies, fetchRisksFrequencies } from '../../../../../redux/actions/Utils';
import {
  fetchRiskCategories,
  fetchRiskControls,
  fetchRiskLossTypes,
  fetchRiskProbabilities,
  fetchRiskSeverities,
} from '../../../../../redux/actions/RiskParams';
import { getAutoCompleteValue, getFilteredOptions } from '../../../../../@jumbo/utils/commonHelper';
import { fetchRootCauses } from '../../../../../redux/actions/RootCauses';
import { fetchRiskOwners } from '../../../../../redux/actions/RiskOwners';
import { updateUploads } from '../../../../../redux/actions/RiskUniverse';
import List from "@material-ui/core/List";
import CmtList from "../../../../../@coremat/CmtList";
import ListItem from "@material-ui/core/ListItem";
import clsx from "clsx";
import ListItemText from "@material-ui/core/ListItemText";
import AdditionalControlsForm from "./AdditionalControlsForm";
import AdditionalControlItems from "./AdditionalControlItems";

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
  riskImpactAmount: null,
  riskImpactCurrency: '',
  riskCategoryControlId: '',
  riskCategoryControlName: '',
  controlActions: [],
  existingControlRating: '',
  existingControlRatingId: '',
  lossTypeName: '',
  lossTypeId: '',
  riskOwner: '',
  riskOwners: [],
  riskIndicator: '',
  keyIndicatorFrequencyId: '',
  keyIndicatorFrequencyName: '',
  riskAppetiteAmount: '',
  riskAppetiteTypeName: '',
  riskAppetiteTypeId: '',
  riskAppetiteDirection: '',
  riskProbabilityId: '',
  riskProbabilityName: '',
  riskSeverityId: '',
  riskSeverityName: '',
  riskVelocityName: '',
  riskVelocity: '',
  residualRisk: '',
  additionalControlActions: [
    {
      action: '',
      actionOwner: [],
      actionDate: '',
      emails: [],
      complianceType: '',
      complianceDetails: {
        title: '',
        description: '',
        authority: '',
        companyId: '',
        companyName: '',
        organization: [
          {
            departmentId: '',
            departmentName: '',
            sectionId: '',
            sectionName: '',
            subsectionId: null,
            subsectionName: '',
          },
        ],
        penaltyTypeId: '',
        penaltyType: '',
        penalty: 0,
        penaltyNarrative: '',
        penaltyCurrency: '',
        primaryOwnerId: '',
        primaryOwnerName: '',
        secondaryOwnerId: '',
        secondaryOwnerName: '',
        escalationOwnerId: '',
        escalationOwnerName: '',
        priority: '',
        frequency: '',
        submissionDeadline: '',
        nextDeadline: '',
        hasSubCompliance: false,
        isSubCompliance: false,
        subId: null,
        hasAttachment: false,
      },
    },
  ],
};
const initialActions = {
  action: '',
  riskOwners: '',
  date: '',
  compliancetype: '',
};
const filter = createFilterOptions();
const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxOutlined fontSize="small" />;
const steps = [
    '1. Risk Definition',
  '2. Risk Assignment',
  '3. Risk Assessment',
  '4. Risk Impact & Control',
  '5. Additional Controls',
  '6. Finish'
];
const BulkDetailView = props => {
  const { data } = props;

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [riskDetails, setRiskDetails] = useState(initialDetails);
  const dispatch = useDispatch();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  const handleChange = (event, newValue) => {
    setActiveStep(newValue);
  };
  useEffect(() => {
    if (data !== undefined) {
      setRiskDetails(data);
    }
  }, [data]);

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
      <Box className={classes.inBuildAppCard}>
        <Box className={clsx(classes.inBuildAppContainer)}>
          <SideBarRisk {...{ activeStep, handleNext, handlePrev, setActiveStep }} />
          <RiskContent {...{ classes, activeStep, handleNext, riskDetails, setRiskDetails }} />
        </Box>
      </Box>
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    backgroundColor: 'background.paper',*/}
      {/*  }}>*/}
      {/*  <RiskContent {...{ classes, activeStep, handleNext, handleChange, riskDetails, setRiskDetails }} />*/}
      {/*</Box>*/}
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
const RiskContent = props => {
  const { uploadedRisks } = useSelector(({ riskUniverse }) => riskUniverse);
  const [value, setValue] = React.useState(0);
  const initialDialogValues = {
    open: false,
    name: '',
    index: '',
    title: '',
  };
  const { classes, activeStep, handleNext, handleChange, riskDetails, setRiskDetails } = props;
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
  const [riskActionDetails, setRiskActionDetails] = useState([initialActions]);
  const [dialogValues, setDialogValues] = useState(initialDialogValues);
  const directions = ['Positive', 'Negative'];
  const [activeIndex, setActiveIndex] = useState(null);

  let dbRootCauses = rootCauses;
  let selectedRootCauses = riskDetails.rootCauses;
  const mergedRootCauses = dbRootCauses.concat(selectedRootCauses);

  const velocity = [
    { id: 1, name: 'Less than 1 yr' },
    { id: 2, name: '1 - 3 yrs' },
    { id: 3, name: '3 - 5 yrs' },
    { id: 4, name: 'Above 5 yrs' },
  ];

  const existingControls = [
    { id: 1, name: 'Effective' },
    { id: 2, name: 'Adequate' },
    { id: 3, name: 'Ineffective' },
    { id: 4, name: 'Defective' },
  ];

  const renderDialog = (option, index, title) => {
    setDialogValues({
      open: true,
      name: option.name,
      index: index,
      title: title,
    });
  };

  const initialAction = {
    action: '',
    actionOwner: [],
    actionDate: '',
    emails: [],
    complianceType: '',
    complianceDetails: {
      title: '',
      description: '',
      authority: '',
      companyId: '',
      companyName: '',
      organization: [
        {
          departmentId: '',
          departmentName: '',
          sectionId: '',
          sectionName: '',
          subsectionId: null,
          subsectionName: '',
        },
      ],
      penaltyTypeId: '',
      penaltyType: '',
      penalty: 0,
      penaltyCurrency: '',
      primaryOwnerId: '',
      primaryOwnerName: '',
      secondaryOwnerId: '',
      secondaryOwnerName: '',
      escalationOwnerId: '',
      escalationOwnerName: '',
      priority: '',
      frequency: '',
      submissionDeadline: '',
      nextDeadline: '',
      hasSubCompliance: false,
      isSubCompliance: false,
      subId: null,
      hasAttachment: false,
    },
  };

  const handleAddAction = () => {
    let data = riskDetails;
    data = {
      ...data,
      additionalControlActions: [...data.additionalControlActions, initialAction],
    };
    setRiskDetails({
      ...data,
    });
  };

  const handleExistingControlsChange = e => {
    setRiskActionDetails({
      ...riskDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleRemoveAction = index => {
    const data = [...riskDetails.additionalControlActions];
    // if (data?.length - 1 !== 0) {
    data.splice(index, 1);
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
    // }
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
    const data = await dispatch(assessRiskUniverse(formData));
    if (data) {
      setRiskDetails({ ...riskDetails, residualRisk: data.actualName });
    } else {
      setRiskDetails({ ...riskDetails, residualRisk: '' });
    }
  };

  const handleOnSubSectionChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        complianceDetails: {
          ...riskDetails.complianceDetails,
          subSectionId: value.id,
          subSectionName: value.name,
        },
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        complianceDetails: {
          ...riskDetails.complianceDetails,
          subSectionId: null,
          subSectionName: '',
        },
      });
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
  const handleOnRiskApetiteDirection = (event, values) => {
    if (values !== null) {
      setRiskDetails({ ...riskDetails, riskAppetiteDirection: values });
    } else {
      setRiskDetails({ ...riskDetails, riskAppetiteDirection: '' });
    }
  };
  const handleOnLossTypeChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, lossTypeId: parseInt(value.id), lossTypeName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, lossTypeId: null, lossTypeName: '' });
    }
  };
  const handleControlsRatingChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, controlRating: parseInt(value.id), existingControlRating: value.name });
    } else {
      setRiskDetails({ ...riskDetails, controlRating: null, existingControlRating: '' });
    }
  };
  const handleSeverityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskSeverityId: parseInt(value.id), riskSeverityName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskSeverityId: null, riskSeverityName: '' });
    }
  };
  const handleVelocityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskVelocity: parseInt(value.id), riskVelocityName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskVelocity: null, riskVelocityName: '' });
    }
  };

  const handleProbabilityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskProbabilityId: parseInt(value.id), riskProbabilityName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskProbabilityId: null, riskProbabilityName: '' });
    }
  };
  const handleOnRootChange = (event, values) => {
    const data = [];
    if (values.length !== 0) {
      values.map(value =>
        data.push({
          id: value.id ?? null,
          name: value.name ?? value.rootCause,
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
    const data = [];
    if (values.length !== 0) {
      values.map(value =>
        data.push({
          id: value.id ?? null,
          name: value.name ?? value.action,
        }),
      );
    }
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

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOnToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateUploads(riskDetails));
  };

  const handleOnControlActionClick = index => {
   setActiveIndex(index);
   setOpenDrawer(true);
  }

  useEffect(() => {
    setRiskDetails({
      ...riskDetails,
      riskAppetiteTypeId: appetiteTypes[0]?.id,
      riskAppetiteTypeName: appetiteTypes[0]?.name,
      riskImpactCurrency: currencies[0]?.name,
    });
  }, []);

  // formattedRootCauses
  let formattedRootCauses = [];
  riskDetails.rootCauses.map(root =>
    formattedRootCauses.push({
      id: root.id,
      name: root.rootCause ?? root.name,
    }),
  );

  // formattedRiskImpact
  let formattedRiskImpact = [];
  riskDetails.riskImpact.map(risk =>
    formattedRiskImpact.push({
      id: risk.id,
      name: risk.riskImpact ?? risk.name,
    }),
  );

  React.useEffect(() => {
    setRiskDetails({
      riskImpactCurrency: 'KES',
    });
  }, []);

  return (
    <>
      <Box className={classes.inBuildAppMainContent} minHeight={400}>
        <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
          <Box p={5} display="flex">
            {activeStep === 0 && (
                <Box>
                  <GridContainer>
                    <Grid item md={12} xs={12}>
                      <AppTextInput
                          fullWidth
                          variant="outlined"
                          label="Risk Title"
                          value={riskDetails?.riskTitle}
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
                          value={riskDetails?.riskEvent}
                          onChange={e => setRiskDetails({ ...riskDetails, riskEvent: e.target.value })}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Autocomplete
                          fullWidth
                          options={riskCategories}
                          value={getAutoCompleteValue(riskCategories, riskDetails?.categoryId)}
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
                          value={formattedRootCauses}
                          // value={riskDetails?.rootCauses.map((root) =>( root.name))}
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
                          getOptionLabel={option => option?.name}
                          renderOption={(option, state) => (
                              <span key={option?.name}>
                          <Checkbox
                              color={'primary'}
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={state.selected}
                          />
                                {option?.name}
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
                      value={getAutoCompleteValue(subsidiaries, riskDetails?.companyId)}
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
                      value={getAutoCompleteValue(departments, riskDetails?.departmentId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnDepartmentChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          required
                          helperText={riskDetails?.companyId === '' ? 'Select Subsidiary' : ''}
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
                      value={getAutoCompleteValue(sections, riskDetails?.sectionId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSectionChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          helperText={riskDetails?.departmentId === '' ? 'Select Department' : ''}
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
                      value={getAutoCompleteValue(subSections, riskDetails?.subSectionId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSubSectionChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          helperText={riskDetails?.subSectionId === '' ? 'Select Section' : ''}
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Sub Section"
                        />
                      )}
                    />
                  </Grid>
                  {/*<Grid item md={12} xs={12}>*/}
                  {/*  <AddRiskDialog riskDetails={riskDetails} setRiskDetails={setRiskDetails} />*/}
                  {/*  <Card>*/}
                  {/*    <CardContent>*/}
                  {/*      <Typography className={classes.title} color="textSecondary" gutterBottom>*/}
                  {/*        {riskDetails?.riskOwners.map((owner, index) => (*/}
                  {/*          <Chip*/}
                  {/*            key={index}*/}
                  {/*            style={{ margin: '2px' }}*/}
                  {/*            label={owner.name}*/}
                  {/*            onDelete={handleDelete}*/}
                  {/*            color="primary"*/}
                  {/*          />*/}
                  {/*        ))}*/}
                  {/*      </Typography>*/}
                  {/*    </CardContent>*/}
                  {/*  </Card>*/}
                  {/*</Grid>*/}
                </GridContainer>
              </Box>
            )}
            {activeStep === 2 && (
              <Box>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Risk Indicator"
                      variant="outlined"
                      value={riskDetails?.riskIndicator}
                      onChange={e => setRiskDetails({ ...riskDetails, riskIndicator: e.target.value })}
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
                      value={riskDetails?.keyIndicatorFrequencyId}
                      onChange={handleOnFrequencyChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Risk Appetite"
                      variant="outlined"
                      type={'number'}
                      value={riskDetails?.riskAppetiteAmount}
                      onChange={e => setRiskDetails({ ...riskDetails, riskAppetiteAmount: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextField
                              select
                              style={{ width: '90px' }}
                              label=""
                              value={riskDetails?.riskAppetiteTypeId}
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
                      value={riskDetails?.riskAppetiteDirection}
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
                      <Autocomplete
                        fullWidth
                        options={probabilities}
                        value={getAutoCompleteValue(probabilities, riskDetails?.riskProbabilityId)}
                        getOptionLabel={option => option.name}
                        onChange={handleProbabilityChange}
                        renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                        renderInput={params => (
                          <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Probability" />
                        )}
                      />
                      {/* <TextField
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
                      </TextField> */}
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        fullWidth
                        options={severities}
                        value={getAutoCompleteValue(severities, riskDetails?.riskSeverityId)}
                        getOptionLabel={option => option.name}
                        onChange={handleSeverityChange}
                        renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                        renderInput={params => (
                          <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Severity" />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FormControl fullWidth>
                      <Autocomplete
                        fullWidth
                        options={velocity}
                        value={getAutoCompleteValue(velocity, riskDetails?.riskVelocity)}
                        getOptionLabel={option => option.name}
                        onChange={handleVelocityChange}
                        renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                        renderInput={params => (
                          <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Velocity" />
                        )}
                      />
                      {/* <TextField
                        // value={formData.riskOwners}
                        onChange={handleOnSeverityChange}
                        label="Velocity"
                        fullWidth
                        select
                        variant="outlined">
                        {velocity.map((option, index) => (
                          <MenuItem key={index} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField> */}
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Inherent Risk"
                      variant="outlined"
                      disabled
                      value={riskDetails?.residualRisk}
                      // onChange={e => setRiskDetails({ ...riskDetails, residualRisk: e.target.value })}
                    />
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 3 && (
              <Box>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      value={formattedRiskImpact}
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
                      getOptionLabel={option => option?.name}
                      renderOption={(option, state) => (
                        <span key={option?.name}>
                          <Checkbox
                            color={'primary'}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={state.selected}
                          />
                          {option?.name}
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
                      value={riskDetails?.riskImpactAmount}
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
                              value={riskDetails?.riskImpactCurrency}
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
                      value={getAutoCompleteValue(lossTypes, riskDetails?.lossTypeId)}
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
                      value={getAutoCompleteValue(riskControls, riskDetails?.riskCategoryControlId)}
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
                      value={riskDetails?.controlActions}
                      // options={riskControlsActions}
                      options={riskDetails?.controlActions}
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
                            title={option.name ?? option.action}
                            color={'primary'}
                            label={option.name ?? option.action}
                            onClick={e => renderDialog(option, index, 'Risk Control')}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      freeSolo
                      selectOnFocus
                      disableCloseOnSelect
                      getOptionLabel={option => option.name ?? option.action}
                      renderOption={(option, state) => (
                        <span key={option.name ?? option.action}>
                          <Checkbox
                            color={'primary'}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={state.selected}
                          />
                          {option.name ?? option.action}
                        </span>
                      )}
                      renderInput={params => (
                        <TextField fullWidth variant={'outlined'} {...params} label="Existing Controls" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={existingControls}
                      value={getAutoCompleteValue(existingControls, riskDetails?.controlRating)}
                      getOptionLabel={option => option.name}
                      onChange={handleControlsRatingChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Existing Controls Rating"
                        />
                      )}
                    />
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 4 && (
                <Box sx={{
                  display: 'flex',
                }}>
                    <Box sx={{
                      flex: 1,
                      transition: theme => theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen
                      }),
                    }}>
                      <GridContainer>
                        <Grid item md={12} xs={12}>
                          <Button onClick={handleOnToggleDrawer} startIcon={<AddCircle />} variant="outlined" color="primary">
                            Add Additional Controls
                          </Button>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {riskDetails?.additionalControlActions.length !== 0 ?
                                riskDetails?.additionalControlActions.map((act, index) => (
                                    <AdditionalControlItems
                                        handleOnDelete={handleRemoveAction}
                                        handleOnClick = {e => handleOnControlActionClick(index)}
                                        item={act}
                                        index={index}
                                        key={index}
                                    />
                                )): <Typography>No additional Controls Added</Typography>}
                          </List>
                        </Grid>
                      </GridContainer>
                    </Box>
                  <AdditionalControlActionsDrawer
                      open={openDrawer}
                      onClose={handleOnToggleDrawer}
                      riskDetails={riskDetails}
                      setRiskDetails={setRiskDetails}
                      activeIndex={activeIndex}
                  />
                </Box>
            )}
            {activeStep === 5 && (
              <Box width={'100%'}>
                <Preview riskDetails={riskDetails} />
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
                Update
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

const AdditionalControlActionsDrawer = props => {
  const { open, onClose, riskDetails, setRiskDetails, activeIndex } = props;
  if(!activeIndex){
    return null;
  }
  return(
      <>
        <Box sx={{
          flex: 1,
          borderLeft: 1,
          display: !open ? 'none' : 'grid'
        }}>
          <AdditionalControlsForm
             // handleRemoveAction={handleRemoveAction}
              riskDetails={riskDetails}
              setRiskDetails={setRiskDetails}
              index={activeIndex}
          />
        </Box>
      </>
  )
}



export const Preview = props => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { riskDetails, isView, index } = props;
  const classes = useStyles();
  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography className={classes.heading}>Risk Preview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer className={classes.inBuildAppCard}>
            <Table fullWidth size={'small'} aria-label="preview table">
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
                    {riskDetails?.rootCauses?.length !== 0
                      ? riskDetails?.rootCauses.map(rootCause => <li key={rootCause.id}>{rootCause.name}</li>)
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
                    {riskDetails?.riskImpact?.length !== 0
                      ? riskDetails?.riskImpact.map((impact, index) => <li key={index}>{impact.name}</li>)
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
                      ? riskDetails?.controlActions.map((controlAction, index) => <li key={index}>{controlAction.name}</li>)
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
          <Typography className={classes.heading}>Additional Controls Preview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GridContainer>
            {riskDetails?.additionalControlActions?.map(action => (
              <Grid item md={12} xs={12}>
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
                          <b>Risk Title</b>
                        </TableCell>
                        <TableCell>{action?.action !== '' ? action?.action : 'Not Set'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Action Date</b>
                        </TableCell>
                        <TableCell>{action?.actionDate !== '' ? action?.actionDate : 'Not Set'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Compliance Type</b>
                        </TableCell>
                        <TableCell>{action?.complianceType !== '' ? action?.complianceType : 'Not Set'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Action Owners</b>
                        </TableCell>
                        <TableCell>
                          {action?.actionOwner.map(owner => (
                            <li>{owner.name}</li>
                          ))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Emails</b>
                        </TableCell>
                        <TableCell>
                          {action?.emails?.map(email => (
                            <li>{email.email}</li>
                          ))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Compliance Title</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.title !== '' ? action?.complianceDetails?.title : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Description</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.description !== ''
                            ? action?.complianceDetails?.description
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Authority</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.authority !== '' ? action?.complianceDetails?.authority : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Company Name</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.companyName !== ''
                            ? action?.complianceDetails?.companyName
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Organization</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.organization?.map(org => (
                            <>
                              <li>{org.departmentName}</li>
                              <li>{org.sectionName}</li>
                              <li>{org.subsectionName}</li>
                            </>
                          ))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>PenaltyType</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.penaltyType !== ''
                            ? action?.complianceDetails?.penaltyType
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Penalty Currency</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.penaltyCurrency !== ''
                            ? action?.complianceDetails?.penaltyCurrency
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>PrimaryOwnerName</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.primaryOwnerName !== ''
                            ? action?.complianceDetails?.primaryOwnerName
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>SecondaryOwner</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.secondaryOwnerName !== ''
                            ? action?.complianceDetails?.secondaryOwnerName
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>EscalationOwner</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.escalationOwnerName !== ''
                            ? action?.complianceDetails?.escalationOwnerName
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Priority</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.priority !== '' ? action?.complianceDetails?.priority : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Frequency</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.frequency !== '' ? action?.complianceDetails?.frequency : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Submission Deadline</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.submissionDeadline !== ''
                            ? action?.complianceDetails?.submissionDeadline
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Next Deadline</b>
                        </TableCell>
                        <TableCell>
                          {action?.complianceDetails?.nextDeadline !== ''
                            ? action?.complianceDetails?.nextDeadline
                            : 'Not Set'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            ))}
          </GridContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default BulkDetailView;
