import React, { useEffect, useRef, useState } from 'react';
import PageContainer from '../../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../../@jumbo/constants/HeaderMessages';
import AddRiskDialog from './AddRiskDialog';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { addRisk, updateRisk, deleteRisk, calculateResidualRisk } from '../../../../../redux/actions/RiskUniverse';
import { assessRiskUniverse } from '../../../../../redux/actions/RiskUniverse';
import FormControl from '@material-ui/core/FormControl';
import CmtImage from '../../../../../@coremat/CmtImage';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
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
import { Chip } from '@mui/material';
import { NotificationContainer } from 'react-notifications';
import useStyles from '../../../Roles/index.style';
import { AccountCircle, ArrowBack, Person } from '@material-ui/icons';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ArrowBackIos, ArrowForwardIos, CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CmtList from '../../../../../@coremat/CmtList';
import List from '@material-ui/core/List';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartments } from '../../../../../redux/actions/Departments';
import { fetchSubsidiaries } from '../../../../../redux/actions/Subsidiaries';
import { fetchSections } from '../../../../../redux/actions/Sections';
import { fetchSubSections } from '../../../../../redux/actions/SubSections';
import { fetchUsers } from '../../../../../redux/actions/Users';
import {
  fetchAppetiteTypes,
  fetchComplianceFrequencies,
  fetchCurrencies,
  fetchPriorities,
  fetchRisksFrequencies,
} from '../../../../../redux/actions/Utils';
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
import { makeStyles } from '@material-ui/styles';
import CreateRiskAction from './CreateRiskAction';
import AdditionalControls from './Steps/AdditionalControls';
import ControlsAssignment from './Steps/ControlsAssignment';
import ControlsImpactStatus from './Steps/ControlsImpactStatus';
import { fetchStatutoryCompliance } from '../../../../../redux/actions/Compliance';
import Paper from '@mui/material/Paper';
import { controllers } from 'chart.js';

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.RISK_UNIVERSE, link: '/risk-universe' },
];
const initialDetails = {
  riskTitle: '',
  riskEvent: '',
  categoryId: null,
  categoryName: '',
  companyId: null,
  companyName: '',
  departmentId: null,
  departmentName: '',
  sectionId: null,
  sectionName: '',
  subSectionId: null,
  subSectionName: '',
  rootCauses: [],
  riskImpact: [],
  riskImpactAmount: 0,
  riskImpactCurrency: '',
  riskCategoryControlId: null,
  riskCategoryControlName: '',
  controlActions: [],
  controlRatingName: '',
  controlRating: null,
  lossTypeName: '',
  lossTypeId: null,
  riskOwner: '',
  riskOwners: [],
  riskIndicator: '',
  keyIndicatorFrequencyId: 0,
  // keyIndicatorFrequencyName: '',
  riskAppetiteAmount: 0,
  riskAppetiteTypeName: '',
  riskAppetiteTypeId: null,
  riskAppetiteDirection: '',
  riskProbabilityId: null,
  riskProbabilityName: '',
  riskSeverityId: null,
  riskSeverityName: '',
  riskVelocity: null,
  riskVelocityName: '',
  residualRisk: '',
  additionalControlActions: null,
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const complianceTypes = [
  { id: 1, name: 'Statutory Compliance' },
  { id: 2, name: 'Legal Compliance' },
  { id: 3, name: 'Enterprise Compliance' },
];
const initialActions = {
  action: '',
  riskOwners: '',
  date: '',
  compliancetype: '',
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
const AllSteps = [
  'Risk Definition',
  'Risk Assignment',
  'Risk Assessment',
  'Risk Impact & Control',
  'Additional Controls',
  'Control Assignment',
  'Control Impact & Status',
  'Finish',
];
const FilteredSteps = [
  'Risk Definition',
  'Risk Assignment',
  'Risk Assessment',
  'Risk Impact & Control',
  'Additional Controls',
  'Finish',
];
export const CreateRisk = props => {
  const classes = useStyles();

  const [activeIndex, setActiveIndex] = useState(null);
  const [riskDetails, setRiskDetails] = useState(initialDetails);
  const [steps, setSteps] = useState(FilteredSteps);
  const [activeStep, setActiveStep] = useState(0);

  const location = useLocation();
  const [isUpdate, setIsUpdate] = useState(false);

  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const dispatch = useDispatch();

  const handleReset = () => {
    setRiskDetails(initialDetails);
    setIsUpdate(false);
    setActiveStep(0);
  };

  // validate third step
  const validateStep3 = () => {
    return (
      riskDetails.riskProbabilityId !== null && riskDetails.riskSeverityId !== null && riskDetails.riskVelocity !== null
    );
  };

  const handleNext = () => {
    if (activeStep === 2 && !validateStep3()) {
      return; // prevent moving to the next step if validation fails
    }
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (location.state !== undefined) {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.EDIT_USER, isActive: true }]);
      setRiskDetails(location.state);
      setIsUpdate(true);
    } else {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.CREATE_RISK, isActive: true }]);
      setRiskDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location]);

  useEffect(() => {
    activeIndex !== null ? setSteps(AllSteps) : setSteps(FilteredSteps);
  }, [activeIndex]);

  useEffect(() => {
    dispatch(fetchSubsidiaries());
    dispatch(fetchDepartments());
    dispatch(fetchSections());
    dispatch(fetchSubSections());
    dispatch(fetchUsers());
    dispatch(fetchComplianceFrequencies());
    dispatch(fetchPriorities());
    dispatch(fetchCurrencies());
    dispatch(fetchStatutoryCompliance());
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
      <PageContainer heading={isUpdate ? HEADER.UPDATE_RISK : HEADER.CREATE_RISK} breadcrumbs={breadcrumbs}>
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
              <SideBarRisk {...{ activeStep, steps, activeIndex, handleNext, handlePrev, setActiveStep }} />
              <RiskContent
                {...{
                  validateStep3,
                  classes,
                  activeStep,
                  isUpdate,
                  handleNext,
                  riskDetails,
                  setRiskDetails,
                  activeIndex,
                  setActiveIndex,
                  setActiveStep,
                  steps,
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
const SideBarRisk = props => {
  const classes = useStyles();
  const { activeStep, activeIndex, handleNext, handlePrev, setActiveStep, steps } = props;
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
              renderRow={(item, index) => {
                return (
                  <SideBarItem
                    {...{
                      key: index,
                      index,
                      activeStep,
                      item,
                      classes,
                      setActiveStep,
                    }}
                  />
                );
              }}
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
        <ListItemText primary={`${index + 1}. ${item}`} className="Cmt-nav-text" />
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

const SuccessPage = props => {
  const { classes, handleReset, isUpdate } = props;
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <CmtImage src={'/images/ic_ok.svg'} style={{ width: '50px' }} />
      <p className={classes.instructions} style={{ marginTop: '10px' }}>
        <b>Risk was {isUpdate ? 'updated' : 'created'} successfully!</b>
      </p>
      <Box mt={10}>
        <Link to={'/risk-universe'}>
          <Button color={'primary'} variant={'contained'}>
            Back to Risk Dashboard
          </Button>
        </Link>
        {!isUpdate && (
          <Button onClick={handleReset} className={classes.button}>
            Create New Risk
          </Button>
        )}
      </Box>
    </Box>
  );
};

export const RiskContent = props => {
  const initialDialogValues = {
    open: false,
    name: '',
    index: '',
    title: '',
  };
  const {
    classes,
    activeStep,
    handleNext,
    validateStep3,
    riskDetails,
    setRiskDetails,
    activeIndex,
    isUpdate,
    setActiveIndex,
    setActiveStep,
    steps,
  } = props;
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

  const velocity = [
    { id: 4, name: 'Less than 1 yr' },
    { id: 3, name: '1 - 3 yrs' },
    { id: 2, name: '3 - 5 yrs' },
    { id: 1, name: 'Above 5 yrs' },
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

  // const handleAddDepartment = () => {
  //   setComplianceDetails({ ...complianceDetails, organization: [...complianceDetails.organization, initialOrganization] });
  // };

  const initialAction = {
    action: '',
    actionOwner: [],
    actionDate: '',
    emails: [],
    complianceType: '',
    complianceDetails: {
      id: null,
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
      penaltyTypeName: '',
      penalty: 0,
      penaltyCurrency: '',
      primaryOwnerId: '',
      primaryOwnerName: '',
      secondaryOwnerId: '',
      secondaryOwnerName: '',
      escalationOwnerId: '',
      escalationOwnerName: '',
      priority: '',
      frequencyId: null,
      submissionDeadline: '',
      nextDeadline: '',
      hasSubCompliance: true,
      isSubCompliance: false,
      subId: null,
      hasAttachment: false,
    },
  };

  const handleAddAction = () => {
    let data = riskDetails;
    if (data.additionalControlActions !== null) {
      if (data.additionalControlActions[activeIndex]?.action !== '') {
        data = {
          ...data,
          additionalControlActions: [...data.additionalControlActions, initialAction],
        };
      }
    } else {
      data = {
        ...data,
        additionalControlActions: [initialAction],
      };
    }

    setRiskDetails({
      ...data,
    });
    setActiveIndex(data.additionalControlActions.length - 1);
  };

  const handleExistingControlsChange = e => {
    setRiskActionDetails({
      ...riskDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveAction = index => {
    const data = [...riskDetails.additionalControlActions];
    data.splice(index, 1);
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
    if (data.length === 0 || activeIndex === index) {
      setActiveIndex(null);
    }
    if (activeIndex && data.length > 0 && activeIndex >= data.length) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleDelete = index => {
    const data = [...riskDetails?.riskOwners];
    data.splice(index, 1);
    setRiskDetails({
      ...riskDetails,
      riskOwners: data,
    });
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
  const calculateInherentRisk = async () => {
    const formData = {
      riskProbabilityId: riskDetails.riskProbabilityId,
      riskSeverityId: riskDetails.riskSeverityId,
      riskVelocity: riskDetails.riskVelocity,
    };
    const data = await dispatch(assessRiskUniverse(formData));
    if (data?.actualName && data?.actualValue) {
      await setRiskDetails({ ...riskDetails, inherentRisk: data });
    } else {
      setRiskDetails({ ...riskDetails, inherentRisk: '' });
    }
  };

  // calculate Residual Risk
  const calculateResidual = async () => {
    const formData = {
      riskProbabilityId: riskDetails.riskProbabilityId,
      riskSeverityId: riskDetails.riskSeverityId,
      riskVelocity: riskDetails.riskVelocity,
      controlRating: riskDetails.controlRating,
      riskCategoryControlId: riskDetails.riskCategoryControlId,
    };
    const data = await dispatch(calculateResidualRisk(formData));

    const formatResponse = data => {
      // format the API response
      const formattedResponse = {
        color: data.defaultName,
        name: data.actualName,
        usualOrder: data.defaultOrder,
        realOrder: data.actualOrder,
        usualValue: data.defaultValue,
        realValue: data.actualValue,
        isActive: data.active,
      };
      return formattedResponse;
    };

    const formattedResponse = formatResponse(data);
    console.log('NEW RESPONSE ', formattedResponse);

    if (formattedResponse?.name && formattedResponse?.realValue) {
      await setRiskDetails({ ...riskDetails, residualRisk: formattedResponse });
    } else {
      setRiskDetails({ ...riskDetails, residualRisk: '' });
    }

    return formattedResponse;
  };

  useEffect(() => {
    if (
      riskDetails.riskProbabilityId !== null &&
      riskDetails.riskSeverityId !== null &&
      riskDetails.riskVelocity !== null &&
      riskDetails.controlRating !== null &&
      riskDetails.riskCategoryControlId !== null
    ) {
      calculateResidual();
    }
  }, [
    riskDetails.riskProbabilityId,
    riskDetails.riskSeverityId,
    riskDetails.riskVelocity,
    riskDetails.controlRating,
    riskDetails.riskCategoryControlId,
  ]);

  useEffect(() => {
    if (riskDetails.riskProbabilityId !== null && riskDetails.riskSeverityId !== null && riskDetails.riskVelocity !== null) {
      calculateInherentRisk();
    }
  }, [riskDetails.riskProbabilityId, riskDetails.riskSeverityId, riskDetails.riskVelocity]);

  const handleOnSubSectionChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        // complianceDetails: {
        // ...riskDetails.complianceDetails,
        subSectionId: value.id,
        subSectionName: value.name,
        // },
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        // complianceDetails: {
        // ...riskDetails.complianceDetails,
        subSectionId: null,
        subSectionName: '',
        // },
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
      setRiskDetails({ ...riskDetails, categoryId: parseInt(value.id), categoryName: value.name });
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
      setRiskDetails({ ...riskDetails, controlRating: parseInt(value.id), controlRatingName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, controlRating: null, controlRatingName: '' });
    }
  };
  const handleSeverityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskSeverityId: parseInt(value.id), riskSeverityName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskSeverityId: null, riskSeverityName: '', residualRisk: null });
    }
  };
  const handleVelocityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskVelocity: parseInt(value.id), riskVelocityName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskVelocity: null, riskVelocityName: '', residualRisk: null });
    }
  };
  const handleProbabilityChange = (event, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, riskProbabilityId: parseInt(value.id), riskProbabilityName: value.name });
    } else {
      setRiskDetails({ ...riskDetails, riskProbabilityId: null, riskProbabilityName: '', residualRisk: null });
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

  const handleOnSaveAction = () => {
    setActiveIndex(null);
    setActiveStep(4);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isUpdate) {
      dispatch(addRisk(riskDetails, () => handleNext()));
    } else {
      dispatch(updateRisk(riskDetails, () => handleNext()));
    }
  };

  const handleFrequency = (e, value) => {
    if (value !== null) {
      setRiskDetails({ ...riskDetails, keyIndicatorFrequencyId: value.id });
    } else {
      setRiskDetails({ ...riskDetails, keyIndicatorFrequencyId: null });
    }
  };

  useEffect(() => {
    setRiskDetails({
      ...riskDetails,
      riskAppetiteTypeId: appetiteTypes[0]?.id,
      riskAppetiteTypeName: appetiteTypes[0]?.name,
      riskImpactCurrency: currencies[0]?.name,
    });
  }, []);

  // get value of selected frequency to display in preview
  const selectedFrequency = getAutoCompleteValue(riskFrequencies, riskDetails.keyIndicatorFrequencyId);

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
                      value={riskDetails?.rootCauses}
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
                  <Grid item md={12} xs={12}>
                    <AddRiskDialog riskDetails={riskDetails} setRiskDetails={setRiskDetails} />
                    <Card>
                      <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          {riskDetails?.riskOwners.map((owner, index) => (
                            <Chip
                              style={{ margin: '2px' }}
                              label={owner.name}
                              color="primary"
                              onDelete={() => handleDelete(index)}
                            />
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
                      value={riskDetails?.riskIndicator}
                      onChange={e => setRiskDetails({ ...riskDetails, riskIndicator: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={riskFrequencies}
                      onChange={handleFrequency}
                      value={getAutoCompleteValue(riskFrequencies, riskDetails?.keyIndicatorFrequencyId)}
                      getOptionLabel={option => option.name}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Frequency" />
                      )}
                    />
                    {/* <AppSelectBox
                      fullWidth
                      data={riskFrequencies}
                      label="Risk Indicator Frequency"
                      valueKey="id"
                      variant="outlined"
                      labelKey="name"
                      value={riskDetails?.keyIndicatorFrequencyId}
                      onChange={handleOnFrequencyChange}
                    /> */}
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
                          <TextField
                            required
                            fullWidth
                            {...params}
                            size={'small'}
                            variant={'outlined'}
                            label="Probability"
                          />
                        )}
                      />
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
                          <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Severity" />
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
                          <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Velocity" />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Item sx={{ px: 4 }}>
                        Inherent Risk :{' '}
                        <Chip
                          label={riskDetails.inherentRisk?.actualName ? riskDetails?.inherentRisk?.actualName : 'Not Set'}
                          sx={{ color: 'white', backgroundColor: riskDetails.inherentRisk?.defaultName }}
                        />
                      </Item>
                      <Item sx={{ px: 4 }}>
                        Value :{' '}
                        <Chip
                          sx={{ color: 'white', backgroundColor: riskDetails.inherentRisk?.defaultName }}
                          label={riskDetails.inherentRisk?.actualValue ? riskDetails?.inherentRisk?.actualValue : 'Not Set'}
                        />
                      </Item>
                    </Box>
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
                      value={riskDetails?.riskImpact}
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
                            title={option?.name}
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
                      renderInput={params => (
                        <TextField fullWidth variant={'outlined'} {...params} label="Qualitative Risk Impact" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Quantitative Risk Impact"
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
                          {option?.name}
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
                  <Grid item md={12} xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Item sx={{ px: 4 }}>
                        Residual Risk :{' '}
                        <Chip
                          label={riskDetails?.residualRisk?.name ? riskDetails?.residualRisk?.name : 'Not Set'}
                          sx={{ color: 'white', backgroundColor: riskDetails?.residualRisk?.color }}
                        />
                      </Item>
                      <Item sx={{ px: 4 }}>
                        Value :{' '}
                        <Chip
                          sx={{ color: 'white', backgroundColor: riskDetails?.residualRisk?.color }}
                          label={riskDetails?.residualRisk?.realValue ? riskDetails?.residualRisk?.realValue : 'Not Set'}
                        />
                      </Item>
                    </Box>
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 4 && (
              <Box width={'100%'}>
                <AdditionalControls
                  {...{
                    riskDetails,
                    setRiskDetails,
                    activeIndex,
                    setActiveIndex,
                    handleAddAction,
                    handleRemoveAction,
                  }}
                />
              </Box>
            )}
            {activeIndex !== null && (
              <>
                {activeStep === 5 && (
                  <Box width={'100%'}>
                    <ControlsAssignment
                      {...{
                        riskDetails,
                        setRiskDetails,
                        index: activeIndex,
                      }}
                    />
                  </Box>
                )}
                {activeStep === 6 && (
                  <Box width={'100%'}>
                    <ControlsImpactStatus
                      {...{
                        riskDetails,
                        setRiskDetails,
                        index: activeIndex,
                        handleOnSaveAction,
                      }}
                    />
                  </Box>
                )}
              </>
            )}

            {activeStep === steps.length - 1 && (
              <Box width={'100%'}>
                <Preview riskDetails={riskDetails} selectedFrequency={selectedFrequency} />
              </Box>
            )}
          </Box>
          <Box display="flex" m={3} pb={3}>
            <Box flex={'1 0 auto'} />
            {activeStep !== steps.length - 1 && (
              <Button
                disabled={activeStep === 2 && !validateStep3()}
                onClick={handleNext}
                variant={'contained'}
                color={'primary'}
                size={'small'}>
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
  const [activeStep, setActiveStep] = React.useState(0);
  const { riskDetails, isView, index, selectedFrequency } = props;
  const { riskFrequencies } = useSelector(({ utils }) => utils);

  const useStyles = makeStyles(theme => ({
    isActive: {
      backgroundColor: '#E8EBF6',
      padding: 12,
      color: 'black',
      borderRadius: 4,
      fontWeight: '300',
      cursor: 'pointer',
      marginRight: 4,
      marginLeft: 4,
    },
    notActive: {
      backgroundColor: '#fff',
      padding: 12,
      color: 'black',
      borderRadius: 4,
      fontWeight: '300',
      cursor: 'pointer',
      marginRight: 4,
      marginLeft: 4,
    },
    button: {
      color: '#3F51B5',
      paddig: 10,
    },
    td: {
      border: '1px solid #dddddd',
      padding: '8px',
    },
    table: {
      borderCollapse: 'collapse',
      width: '100%',
      maxHeight: '70vh',
    },
    title: {
      marginBottom: 10,
    },
  }));

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const classes = useStyles();
  const action = activeStep > 0 ? riskDetails.additionalControlActions[activeStep - 1] : null;
  return (
    <>
      <Grid container>
        <Grid item md={3} xs={12}>
          <Grid onClick={() => setActiveStep(0)} className={activeStep === 0 ? classes.isActive : classes.notActive}>
            <Typography>Risk</Typography>
          </Grid>
          {riskDetails.additionalControlActions?.map((action, index) => (
            <Grid
              onClick={() => setActiveStep(index + 1)}
              key={index}
              className={index + 1 === activeStep ? classes.isActive : classes.notActive}>
              {/* <Typography key={index}>{action.action}</Typography> */}
              <Typography key={index}>Additional Control {index + 1}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item md={9} xs={12}>
          {activeStep == 0 && (
            <>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td className={classes.td}>Risk Title</td>
                    <td className={classes.td}>{riskDetails.riskTitle !== '' ? riskDetails.riskTitle : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Event</td>
                    <td className={classes.td}>{riskDetails.riskEvent !== '' ? riskDetails.riskEvent : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Category</td>
                    <td className={classes.td}>{riskDetails.categoryName !== '' ? riskDetails.categoryName : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Causes</td>
                    <td className={classes.td}>
                      {riskDetails.rootCauses?.length !== 0
                        ? riskDetails.rootCauses?.map(rootCause => <li key={rootCause.id}>{rootCause.name}</li>)
                        : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Subsidiary</td>
                    <td className={classes.td}>{riskDetails.companyName !== '' ? riskDetails.companyName : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Department</td>
                    <td className={classes.td}>
                      {riskDetails.departmentName !== '' ? riskDetails.departmentName : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Section</td>
                    <td className={classes.td}>{riskDetails.sectionName !== '' ? riskDetails.sectionName : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Sub Section</td>
                    <td className={classes.td}>
                      {riskDetails.subSectionName !== '' ? riskDetails.subSectionName : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Owner</td>
                    <td className={classes.td}>
                      {riskDetails.riskOwners?.map(owner => (
                        <li key={owner.id}>{owner.name}</li>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Impact</td>
                    <td className={classes.td}>
                      {riskDetails.riskImpact?.length !== 0
                        ? riskDetails.riskImpact?.map((impact, index) => <li key={index}>{impact.name}</li>)
                        : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Impact Amount in {riskDetails.riskImpactCurrency}</td>
                    <td className={classes.td}>
                      {riskDetails.riskImpactAmount !== 0 ? riskDetails.riskImpactAmount : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Control Category</td>
                    <td className={classes.td}>
                      {riskDetails.riskCategoryControlName !== '' ? riskDetails.riskCategoryControlName : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Control/Mitigation Actions</td>
                    <td className={classes.td}>
                      {riskDetails.controlActions?.length !== 0
                        ? riskDetails.controlActions?.map((controlAction, index) => (
                            <li key={index}>{controlAction.name}</li>
                          ))
                        : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Loss Type</td>
                    <td className={classes.td}>{riskDetails.lossTypeName !== '' ? riskDetails.lossTypeName : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Indicator</td>
                    <td className={classes.td}>
                      {riskDetails.riskIndicator !== '' ? riskDetails.riskIndicator : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Indicator Frequency</td>
                    <td className={classes.td}>{selectedFrequency ? selectedFrequency.name : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Appetite Amount {riskDetails.riskAppetiteTypeName}</td>
                    <td className={classes.td}>
                      {riskDetails.riskAppetiteAmount !== 0 ? riskDetails.riskAppetiteAmount : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Appetite Direction {riskDetails.riskAppetiteDirection}</td>
                    <td className={classes.td}>
                      {riskDetails.riskAppetiteDirection !== '' ? riskDetails.riskAppetiteDirection : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Probability</td>
                    <td className={classes.td}>
                      {riskDetails.riskProbabilityName !== '' ? riskDetails.riskProbabilityName : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Severity</td>
                    <td className={classes.td}>
                      {riskDetails.riskSeverityName !== '' ? riskDetails.riskSeverityName : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Risk Velocity</td>
                    <td className={classes.td}>
                      {riskDetails.riskVelocityName !== '' ? riskDetails.riskVelocityName : 'Not Set'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
          {activeStep > 0 && action && (
            <>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td className={classes.td}>Action Title</td>
                    <td className={classes.td}>{action.action !== '' ? action.action : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Action Date</td>
                    <td className={classes.td}>{action.actionDate !== '' ? action.actionDate : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Compliance Type</td>
                    <td className={classes.td}>{action.complianceType !== '' ? action.complianceType : 'Not Set'}</td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Action Owners</td>
                    <td className={classes.td}>
                      {action.actionOwner?.map(owner => (
                        <li>{owner.name}</li>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Emails</td>
                    <td className={classes.td}>
                      {action.emails?.map(email => (
                        <li>{email}</li>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Compliance Title</td>
                    <td className={classes.td}>
                      {action.complianceDetails.title !== '' ? action.complianceDetails.title : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Description</td>
                    <td className={classes.td}>
                      {action.complianceDetails.description !== '' ? action.complianceDetails.description : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Authority</td>
                    <td className={classes.td}>
                      {action.complianceDetails.authority !== '' ? action.complianceDetails.authority : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Company Name</td>
                    <td className={classes.td}>
                      {action.complianceDetails.companyName !== '' ? action.complianceDetails.companyName : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Organization</td>
                    <td className={classes.td}>
                      {action.complianceDetails.organization.map(org => (
                        <>
                          <li>{org.departmentName}</li>
                          <li>{org.sectionName}</li>
                          <li>{org.subSectionName}</li>
                        </>
                      ))}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Penalty Type</td>
                    <td className={classes.td}>
                      {action.complianceDetails.penaltyTypeName !== ''
                        ? action.complianceDetails.penaltyTypeName
                        : 'Not Set'}
                    </td>
                  </tr>
                  {/* <tr>
                    <td className={classes.td}>penalty Currency</td>
                    <td className={classes.td}>
                      {action.complianceDetails.penaltyCurrency !== ''
                        ? action.complianceDetails.penaltyCurrency
                        : 'Not Set'}
                    </td>
                  </tr> */}
                  <tr>
                    <td className={classes.td}>PrimaryOwnerName</td>
                    <td className={classes.td}>
                      {action.complianceDetails.primaryOwnerName !== ''
                        ? action.complianceDetails.primaryOwnerName
                        : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>SecondaryOwner</td>
                    <td className={classes.td}>
                      {action.complianceDetails.secondaryOwnerName !== ''
                        ? action.complianceDetails.secondaryOwnerName
                        : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>EscalationOwner</td>
                    <td className={classes.td}>
                      {action.complianceDetails.escalationOwnerName !== ''
                        ? action.complianceDetails.escalationOwnerName
                        : 'Not Set'}
                    </td>
                  </tr>
                  <tr>
                    <td className={classes.td}>Priority</td>
                    <td className={classes.td}>
                      {action.complianceDetails.priority !== '' ? action.complianceDetails.priority : 'Not Set'}
                    </td>
                  </tr>
                  {/* <tr>
                    <td className={classes.td}>Frequency</td>
                    <td className={classes.td}>
                      {selectedFrequency?.name !== '' ? selectedFrequency?.name : 'Not Set'}
                    </td>
                  </tr> */}
                  <tr>
                    <td className={classes.td}>Submission Deadline</td>
                    <td className={classes.td}>
                      {action.complianceDetails.submissionDeadline !== ''
                        ? action.complianceDetails.submissionDeadline
                        : 'Not Set'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CreateRisk;
