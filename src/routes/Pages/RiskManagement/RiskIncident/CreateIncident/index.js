import React, { useEffect, useRef, useState } from 'react';
import PageContainer from '../../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../../@jumbo/constants/HeaderMessages';
import {
  Box,
  Button,
  Grid,
  Chip,
  IconButton,
  InputAdornment,
  MenuItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
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
import { DatePicker } from '@material-ui/pickers';
import { Alert, Autocomplete } from '@material-ui/lab';
import { usersList } from '../../../Organization/dummyData';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { fetchRisks } from '../../../../../redux/actions/RiskUniverse';
import { fetchRiskLossTypes } from '../../../../../redux/actions/RiskParams';
import { fetchRiskCategories } from '../../../../../redux/actions/RiskParams';
import { fetchRiskOwners } from '../../../../../redux/actions/RiskOwners';
import { useSelector, useDispatch } from 'react-redux';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';
import { createFilterOptions } from '@mui/material';
import { CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import { addRiskIncident } from '../../../../../redux/actions/RiskIncident';
import { fetchAppetiteTypes } from '../../../../../redux/actions/Utils';

const initialBreadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.RISK_INCIDENT, link: '/risk-incident' },
];
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
          Risk Incident
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
const steps = ['1. Incident Definition', '2. Incident Impact', '3. Incident Action', '4. Finish'];
const CreateIncident = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const initialDetails = {
    incidentTitle: '',
    riskUniverseId: null,
    riskUniverseTypeName: '',
    narration: '',
    incidentDate: '',
    lossTypeId: 0,
    lossTypeQuantityTypeId: 0,
    lossTypeQuantity: 0,
    riskCategoryControlId: 0,
    incidentOwners: [],
    incidentActions: [],
    actionDate: '',
  };
  const [incidentDetails, setIncidentDetails] = useState(initialDetails);
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (location.state !== undefined) {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.UPDATE_INCIDENT, isActive: true }]);
      setIncidentDetails(location.state);
      setIsUpdate(true);
    } else {
      setBreadcrumbs([...breadcrumbs, { label: HEADER.CREATE_INCIDENT, isActive: true }]);
      setIncidentDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location]);

  return (
    <React.Fragment>
      <PageContainer heading={isUpdate ? HEADER.UPDATE_INCIDENT : HEADER.CREATE_INCIDENT} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <AppHeader />
          <Box className={clsx(classes.inBuildAppContainer)}>
            <SideBarIncident {...{ activeStep, handleNext, handlePrev, setActiveStep }} />
            <IncidentContent {...{ classes, activeStep, handleNext, incidentDetails, setIncidentDetails }} />
          </Box>
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
const IncidentContent = props => {
  const initialDetails = {
    riskEvent: '',
    riskCategory: '',
    subsidiary: '',
    department: '',
    section: '',
    subSection: '',
    rootCauses: [],
    riskImpact: [],
    riskImpactAmount: 0,
    riskControlCat: '',
    controlActions: [],
    lossTypeQuantity: 0,
    lossTypeQuantityTypeId: null,
    controls: '',
    riskOwner: '',
    riskIndicator: '',
    riskIndicatorFrequency: '',
    riskAppetite: '',
    riskAppetiteType: '',
    probability: '',
    severity: '',
    residualRisk: '',
  };
  const { classes, activeStep, handleNext, incidentDetails, setIncidentDetails } = props;
  const [selectedIncidentDate, handleSelectedIncidentDate] = useState(new Date());
  const [selectedActionDate, handleSelectedActionDate] = useState(new Date());
  const [actions, setActions] = useState([]);
  const initialDialogValues = {
    open: false,
    name: '',
    index: '',
    title: '',
  };
  const checkedIcon = <CheckBoxOutlined fontSize="small" />;
  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const [dialogValues, setDialogValues] = useState(initialDialogValues);
  const [selectedRisk, setSelectedRisk] = useState(initialDetails);
  const [lossTypeOps] = useState(['Amount', '%age', 'Number']);
  const { risks } = useSelector(({ riskUniverse }) => riskUniverse);
  const { currencies, appetiteTypes, riskFrequencies } = useSelector(({ utils }) => utils);
  const { riskCategories, probabilities, lossTypes, severities, riskControls } = useSelector(({ riskParams }) => riskParams);
  const { riskOwners } = useSelector(({ riskOwners }) => riskOwners);
  const dispatch = useDispatch();
  const filter = createFilterOptions();

  const renderDialog = (option, index, title) => {
    setDialogValues({
      open: true,
      name: option.name,
      index: index,
      title: title,
    });
  };

  // const handleOnRiskChange = (event, value) => {
  //   if (value !== null) {
  //     setSelectedRisk(value);
  //   } else {
  //     setSelectedRisk(initialDetails);
  //   }
  // };
  const handleOnRiskChange = (event, value) => {
    if (value !== null) {
      setIncidentDetails({
        ...incidentDetails,
        riskUniverseTypeName: value.name,
        riskUniverseId: value.id,
      });
    } else {
      setIncidentDetails({
        ...incidentDetails,
        riskUniverseName: '',
        riskUniverseId: null,
      });
    }
  };

  const handleOnLossTypeChange = (event, value) => {
    if (value !== null) {
      setIncidentDetails({ ...incidentDetails, lossTypeId: parseInt(value.id) });
    } else {
      setIncidentDetails({ ...incidentDetails, lossTypeId: null});
    }
  };

  const handleOnRiskCategoryChange = (event, value) => {
    if (value !== null) {
      setIncidentDetails({ ...incidentDetails, riskCategoryControlId: parseInt(value.id), category: value.name });
    } else {
      setIncidentDetails({ ...incidentDetails, riskCategoryControlId: null, categoryName: '' });
    }
  };

  const handleOnIncidentOwners = (event, values) => {
    const data = [];
    if (values.length !== 0) {
      values.map(value =>
        data.push({
          id: value.id ?? null,
          name: value.name,
        }),
      );
    }
    setIncidentDetails({ ...incidentDetails, incidentOwners: values });
  };

  const handleOnIncidentActions = (event, values) => {
    setIncidentDetails({ ...incidentDetails, incidentActions: values });
    setActions(values);
  };

  useEffect(() => {
    setIncidentDetails({
      ...incidentDetails,
      riskTitle: selectedRisk.riskTitle,
      riskEvent: selectedRisk.riskEvent,
      lossType: selectedRisk.lossType,
      lossTypeMeasure: selectedRisk.riskAppetiteType,
      controlCategory: selectedRisk.riskControlCat,
    });
  }, [selectedRisk]);
  useEffect(() => {
    setIncidentDetails({ ...incidentDetails, lossTypeMeasure: lossTypeOps[0] });
  }, []);
  useEffect(() => {
    setIncidentDetails({
      ...incidentDetails,
      actionDate: moment(selectedActionDate).format('YYYY-MM-DD'),
      incidentDate: moment(selectedIncidentDate).format('YYYY-MM-DD'),
    });
  }, [selectedActionDate, selectedIncidentDate]);

  useEffect(() => {
    dispatch(fetchRisks());
    dispatch(fetchRiskLossTypes());
    dispatch(fetchRiskCategories());
    dispatch(fetchRiskOwners());
    dispatch(fetchAppetiteTypes());
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(addRiskIncident(incidentDetails, () => handleNext()));
  };

  // get selected Risk
  const chosenRisk = getAutoCompleteValue(risks, incidentDetails.riskUniverseId);
  console.log('CHOSEN ', chosenRisk);

  useEffect(() => {
    if(chosenRisk){
      setIncidentDetails({
        ...incidentDetails,
        lossTypeQuantityTypeId: chosenRisk.riskAppetiteTypeId
      })
    }
  },[chosenRisk])

  return (
    <>
      <Box className={classes.inBuildAppMainContent} minHeight={400}>
        <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
          <Box p={5} display="flex">
            {activeStep === 0 && (
              <Box width={'100%'}>
                <GridContainer>
                  <Grid item md={12} xs={12}>
                    <Alert
                      action={
                        <Link to={'../risk-universe/create-risk'}>
                          <Button variant={'outlined'} color={'primary'} size={'small'}>
                            Create Risk
                          </Button>
                        </Link>
                      }
                      severity="info">
                      If the risk does not exist in the risk universe, please click the button to create.
                    </Alert>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Incident Title"
                      variant="outlined"
                      value={incidentDetails.incidentTitle}
                      onChange={e => setIncidentDetails({ ...incidentDetails, incidentTitle: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Incident Narration"
                      variant="outlined"
                      multiline
                      minRows={4}
                      value={incidentDetails.narration}
                      onChange={e => setIncidentDetails({ ...incidentDetails, narration: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <DatePicker
                      autoOk
                      fullWidth
                      clearable
                      inputVariant={'outlined'}
                      label="Incident Date"
                      onChange={date => {
                        handleSelectedIncidentDate(date);
                      }}
                      value={incidentDetails.incidentDate !== '' ? incidentDetails.incidentDate : selectedIncidentDate}
                      format="DD-MM-yyyy"
                      animateYearScrolling
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      value={getAutoCompleteValue(risks, incidentDetails.riskUniverseId)}
                      options={risks}
                      onChange={handleOnRiskChange}
                      getOptionLabel={option => option.riskTitle || ''}
                      getOptionSelected={(option, value) => option.riskTitle === value.riskTitle}
                      autoHighlight
                      renderInput={params => (
                        <TextField fullWidth variant={'outlined'} {...params} label="Associated Risk" />
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
                      options={lossTypes}
                      value={getAutoCompleteValue(lossTypes, incidentDetails?.lossTypeId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnLossTypeChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Loss Type" />
                      )}
                    />
                  </Grid>
                  {/* <GridContainer spacing={2}> */}
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        value={chosenRisk?.riskAppetiteDirection}
                        variant={'outlined'}
                        label="Risk Apetite Direction"
                        disabled
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        value={chosenRisk?.riskProbabilityActualName}
                        variant={'outlined'}
                        label="Probability"
                        disabled
                      />
                    </Grid>
                  {/* </GridContainer> */}

                  {/* <GridContainer spacing={2}> */}
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        value={chosenRisk?.riskSeverityActualName}
                        variant={'outlined'}
                        label="Severity"
                        disabled
                      />
                    </Grid>

                    {/* velocity */}
                    <Grid item md={12} xs={12}>
                      <TextField
                        fullWidth
                        value={chosenRisk?.riskVelocityName}
                        variant={'outlined'}
                        label="Velocity"
                        disabled
                      />
                    </Grid>
                  {/* </GridContainer> */}

                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Loss Type Quantity"
                      variant="outlined"
                      type={'number'}
                      value={incidentDetails?.lossTypeQuantity}
                      onChange={e => setIncidentDetails({ ...incidentDetails, lossTypeQuantity: e.target.value })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextField
                              disabled
                              select
                              style={{ width: '90px' }}
                              label=""
                              value={incidentDetails.lossTypeQuantityTypeId}
                
                              onChange={e =>
                                setIncidentDetails({ ...incidentDetails, lossTypeQuantityTypeId: e.target.value })
                              }
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
                      options={riskCategories}
                      value={getAutoCompleteValue(riskCategories, incidentDetails?.riskCategoryControlId)}
                      getOptionLabel={option => option.name}
                      onChange={handleOnRiskCategoryChange}
                      // renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Risk Category" />
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
                      multiple
                      fullWidth
                      value={incidentDetails?.incidentActions}
                      options={actions}
                      filterOptions={(option, params) => {
                        const filtered = filter(option, params);
                        if (params.inputValue !== '') {
                          const data = { id: null, name: params.inputValue };
                          filtered.push(data);
                        }
                        return filtered;
                      }}
                      autoHighlight
                      onChange={handleOnIncidentActions}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            title={option?.name}
                            color={'primary'}
                            label={option.name}
                            onClick={e => renderDialog(option, index, 'Incident Actions')}
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
                        <TextField fullWidth variant={'outlined'} {...params} label="Incident Action" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      value={incidentDetails?.incidentOwners}
                      options={riskOwners}
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
                      onChange={handleOnIncidentOwners}
                      renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                          <Chip
                            title={option.name}
                            color={'primary'}
                            label={option.name}
                            onClick={e => renderDialog(option, index, 'Incident Owners')}
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
                      renderInput={params => (
                        <TextField fullWidth variant={'outlined'} {...params} label="Incident Owners" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <DatePicker
                      autoOk
                      clearable
                      inputVariant={'outlined'}
                      format="DD/MM/yyyy"
                      fullWidth
                      label="Action Date"
                      value={incidentDetails.actionDate !== '' ? incidentDetails.actionDate : selectedActionDate}
                      onChange={date => {
                        handleSelectedActionDate(date);
                      }}
                      animateYearScrolling
                    />
                  </Grid>
                </GridContainer>
              </Box>
            )}
            {activeStep === 3 && (
              <>
                <Box width={'100%'}>
                  <Preview {...{ incidentDetails }} />
                  <Button
                    onClick={handleSubmit}
                    style={{ marginTop: '8px', float: 'right' }}
                    variant={'contained'}
                    color={'primary'}
                    size={'small'}>
                    Save
                  </Button>
                </Box>
              </>
            )}
            {/* {activeStep === steps.length - 1 && (
              <Button variant={'contained'} color={'primary'} size={'small'}>
                Save
              </Button>
            )} */}
          </Box>
          <Box display="flex" m={3} pb={3}>
            <Box flex={'1 0 auto'} />
            {activeStep !== steps.length - 1 && (
              <Button onClick={handleNext} variant={'contained'} color={'primary'} size={'small'}>
                Continue
              </Button>
            )}
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export const Preview = props => {
  const { incidentDetails, isView } = props;
  const { risks } = useSelector(({ riskUniverse }) => riskUniverse);
  const { riskCategories, probabilities, lossTypes, severities, riskControls } = useSelector(({ riskParams }) => riskParams);
  const classes = useStyles();
  const selectedRisk = getAutoCompleteValue(risks, incidentDetails.riskUniverseId);
  const selectedLossType = getAutoCompleteValue(lossTypes, incidentDetails.lossTypeId);
  const selectedCategory = getAutoCompleteValue(riskCategories, incidentDetails.riskCategoryControlId);

  return (
    <>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td className={classes.td}>Incident Title</td>
            <td className={classes.td}>{incidentDetails.incidentTitle !== '' ? incidentDetails.incidentTitle : 'Not Set'}</td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Narration</td>
            <td className={classes.td}>{incidentDetails.narration !== '' ? incidentDetails.narration : 'Not Set'}</td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Date</td>
            <td className={classes.td}>{incidentDetails.incidentDate !== '' ? incidentDetails.incidentDate : 'Not Set'}</td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Loss Types</td>
            <td className={classes.td}>{selectedLossType ? selectedLossType.name : 'Not Set'}</td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Loss Type Quantity</td>
            <td className={classes.td}>
              {incidentDetails.lossTypeQuantityTypeId !== '' ? incidentDetails.lossTypeQuantityTypeId : 'Not Set'}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Categories</td>
            <td className={classes.td}>{selectedCategory ? selectedCategory.name : 'Not Set'}</td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Actions</td>
            <td className={classes.td}>
              {incidentDetails.incidentActions.map((item, index) => {
                if (!item.name) {
                  return null;
                }
                return (
                  <>
                    <li key={index}>{item.name}</li>
                  </>
                );
              })}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Incident Owner</td>
            <td className={classes.td}>
              {incidentDetails?.incidentOwners.map((owner, index) => {
                if (!owner.name) {
                  return null;
                }
                return <li key={owner.id}>{owner.name}</li>;
              })}
            </td>
          </tr>
          <tr>
            <td className={classes.td}>Action Date</td>
            <td className={classes.td}>{incidentDetails.actionDate !== '' ? incidentDetails.actionDate : 'Not Set'}</td>
          </tr>
        </tbody>
      </table>
    </>
    // <TableContainer className={classes.inBuildAppCard}>
    //   <Table size="small" aria-label="a dense table">
    //     {!isView && (
    //       <TableHead className={classes.tableHeader}>
    //         <TableRow>
    //           <TableCell className={classes.tableHeaderCell}>Field Name</TableCell>
    //           <TableCell className={classes.tableHeaderCell}>Input Value</TableCell>
    //         </TableRow>
    //       </TableHead>
    //     )}

    //     <TableBody>
    //       <TableRow>
    //         <TableCell>
    //           <b>Risk Title</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.riskTitle !== '' ? incidentDetails.riskTitle : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Risk Event</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.riskEvent !== '' ? incidentDetails.riskEvent : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Incident Narration</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.incidentNarration !== '' ? incidentDetails.incidentNarration : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Incident Date</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.incidentDate !== '' ? incidentDetails.incidentDate : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Loss Type</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.lossType !== '' ? incidentDetails.lossType : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Loss in {incidentDetails.lossTypeMeasure}</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.lossTypeQty !== '' ? incidentDetails.lossTypeQty : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Control Category</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.controlCategory !== '' ? incidentDetails.controlCategory : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Incident Action</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.incidentAction !== '' ? incidentDetails.incidentAction : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Action Owner</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.actionOwner !== '' ? incidentDetails.actionOwner : 'Not Set'}</TableCell>
    //       </TableRow>
    //       <TableRow>
    //         <TableCell>
    //           <b>Action Date</b>
    //         </TableCell>
    //         <TableCell>{incidentDetails.actionDate !== '' ? incidentDetails.actionDate : 'Not Set'}</TableCell>
    //       </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default CreateIncident;
