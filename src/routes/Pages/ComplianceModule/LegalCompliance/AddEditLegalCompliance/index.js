import React, { useEffect, useRef, useState } from 'react';
import PageContainer from '../../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import { HEADER } from '../../../../../@jumbo/constants/HeaderMessages';
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
import { departmentList, sectionsList, subSectionList, usersList } from '../../../Organization/dummyData';
import { Link, useLocation } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addLegalCompliance, updateLegalCompliance } from '../../../../../redux/actions/Compliance';
import { fetchRoles } from '../../../../../redux/actions/Roles';
import { Autocomplete } from '@material-ui/lab';
import { fetchSubsidiaries } from '../../../../../redux/actions/Subsidiaries';
import { fetchDepartments } from '../../../../../redux/actions/Departments';
import { fetchSubSections } from '../../../../../redux/actions/SubSections';
import { fetchSections } from '../../../../../redux/actions/Sections';
import CmtImage from '../../../../../@coremat/CmtImage';
import { fetchCaseTypes, fetchCurrencies } from '../../../../../redux/actions/Utils';

const initialBreadcrumbs = [{ label: HEADER.DASHBOARD, link: '/' }];
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
const AddEditLegalCompliance = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const initialDetails = {
    title: '',
    details: '',
    judgement: '',
    companyId: '',
    departmentsId: null,
    departmentsName: null,
    sectionsId: null,
    sectionsName: null,
    subSectionsId: null,
    subSectionsName: null,
    fine: 0,
    fees: 0,
    totalFees: 0,
    penaltyCurrency: 'KES',
    managementComments: '',
    active: true,
    dateofNextHearing: moment(new Date()).format('YYYY-MM-DD'),
    caseType: '',
    caseFileAttachment: '',
  };
  const [complianceDetails, setComplianceDetails] = useState(initialDetails);
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };
  const handleReset = () => {
    setComplianceDetails(initialDetails);
    setIsUpdate(false);
    setActiveStep(0);
  };
  const handleOnSave = e => {
    e.preventDefault();
    let data = { ...complianceDetails, fees: parseFloat(complianceDetails.fees), fine: parseFloat(complianceDetails.fine) };
    if (isUpdate) {
      dispatch(updateLegalCompliance(data, () => handleNext()));
    } else {
      dispatch(addLegalCompliance(data, () => handleNext()));
    }
  };

  useEffect(() => {
    if (location.state !== undefined) {
      setBreadcrumbs([
        ...breadcrumbs,
        { label: HEADER.LEGAL_COMPLIANCE.name, link: `/compliance/${HEADER.LEGAL_COMPLIANCE.url}` },
        { label: HEADER.UPDATE_LEGAL_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails(location.state);
      setIsUpdate(true);
    } else {
      setBreadcrumbs([
        ...breadcrumbs,
        { label: HEADER.LEGAL_COMPLIANCE.name, link: `/compliance/${HEADER.LEGAL_COMPLIANCE.url}` },
        { label: HEADER.CREATE_LEGAL_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location]);

  return (
    <React.Fragment>
      <PageContainer
        heading={isUpdate ? HEADER.UPDATE_LEGAL_COMPLIANCE : HEADER.CREATE_LEGAL_COMPLIANCE}
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
const ComplianceContent = props => {
  const dispatch = useDispatch();
  const { subsidiaries, currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);
  const { departments } = useSelector(({ departments }) => departments);
  const { sections } = useSelector(({ sections }) => sections);
  const { subSections } = useSelector(({ subSections }) => subSections);
  const { currencies, caseTypes } = useSelector(({ utils }) => utils);
  const {
    classes,
    activeStep,
    handleNext,
    handleOnSave,
    handleReset,
    isUpdate,
    handlePrev,
    complianceDetails,
    setComplianceDetails,
  } = props;
  const [selectedDeadline, setSelectedDeadline] = useState(new Date());
  const [currency, setCurrency] = useState(['KES', 'USD', 'EUR']);
  const initValue = { id: '', name: '' };
  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
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
      setComplianceDetails({
        ...complianceDetails,
        companyId: null,
        companyName: '',
        departmentsId: null,
        departmentsName: '',
        sectionsId: null,
        sectionsName: '',
        subSectionsId: null,
        subSectionsName: '',
      });
    }
  };
  const handleOnDepartmentChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        departmentsId: value.id,
        departmentsName: value.name,
        sectionsId: null,
        sectionsName: '',
        subSectionsId: null,
        subSectionsName: '',
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        departmentsId: null,
        departmentsName: '',
        sectionsId: null,
        sectionsName: '',
        subSectionsId: null,
        subSectionsName: '',
      });
    }
  };
  const handleOnSectionChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({
        ...complianceDetails,
        sectionsId: value.id,
        sectionsName: value.name,
        subSectionsId: null,
        subSectionsName: '',
      });
    } else {
      setComplianceDetails({
        ...complianceDetails,
        sectionsId: null,
        sectionsName: '',
        subSectionsId: null,
        subSectionsName: '',
      });
    }
  };
  const handleOnSubSectionChange = (event, value) => {
    if (value !== null) {
      setComplianceDetails({ ...complianceDetails, subSectionsId: value.id, subSectionsName: value.name });
    } else {
      setComplianceDetails({ ...complianceDetails, subSectionsId: null, subSectionsName: '' });
    }
  };
  const computeTotalFees = (fees, fines) => {
    const feesAmount = fees !== '' ? parseFloat(fees) : 0;
    const finesAmount = fines !== '' ? parseFloat(fines) : 0;
    setComplianceDetails({ ...complianceDetails, totalFees: feesAmount + finesAmount });
  };
  useEffect(() => {
    setComplianceDetails({
      ...complianceDetails,
      dateofNextHearing: moment(selectedDeadline).format('YYYY-MM-DD'),
    });
  }, [selectedDeadline]);
  useEffect(() => {
    computeTotalFees(complianceDetails.fees, complianceDetails.fine);
  }, [complianceDetails.fees, complianceDetails.fine]);
  useEffect(() => {
    setComplianceDetails({
      ...complianceDetails,
      companyId: currentSubsidiary,
      departmentsId: null,
      departmentsName: '',
      sectionsId: null,
      sectionsName: '',
      subSectionsId: null,
      subSectionsName: '',
    });
  }, [currentSubsidiary]);
  useEffect(() => {
    dispatch(fetchSubsidiaries());
    dispatch(fetchDepartments());
    dispatch(fetchSections());
    dispatch(fetchSubSections());
    dispatch(fetchCaseTypes());
    dispatch(fetchCurrencies());
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
                      required
                      variant="outlined"
                      label={'Case Title'}
                      value={complianceDetails.title}
                      onChange={e => setComplianceDetails({ ...complianceDetails, title: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      multiline
                      minRows={4}
                      variant="outlined"
                      label={'Case Details'}
                      value={complianceDetails.details}
                      onChange={e => setComplianceDetails({ ...complianceDetails, details: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppSelectBox
                      fullWidth
                      required
                      data={caseTypes}
                      label="Case Type"
                      valueKey="name"
                      variant="outlined"
                      labelKey="name"
                      value={complianceDetails.caseType}
                      onChange={e => setComplianceDetails({ ...complianceDetails, caseType: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Judgement"
                      multiline
                      minRows={5}
                      value={complianceDetails.judgement}
                      onChange={e => setComplianceDetails({ ...complianceDetails, judgement: e.target.value })}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={subsidiaries?.find(subsidiary => subsidiary.id === complianceDetails.companyId) ?? initValue}
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
                      options={departments.filter(department => department.companyId == complianceDetails.companyId)}
                      value={departments.find(department => department.id === complianceDetails.departmentsId) ?? initValue}
                      getOptionLabel={option => option.name}
                      onChange={handleOnDepartmentChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          helperText={complianceDetails.companyId === null ? 'Select Subsidiary' : ''}
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
                      options={sections.filter(section => section.departmentsId == complianceDetails.departmentsId)}
                      value={sections.find(section => section.id === complianceDetails.sectionsId) ?? initValue}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSectionChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          helperText={complianceDetails.departmentsId === null ? 'Select Department' : ''}
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
                      options={subSections.filter(subSection => subSection.sectionsId == complianceDetails.sectionsId)}
                      value={subSections.find(subSection => subSection.id === complianceDetails.sectionsId) ?? initValue}
                      getOptionLabel={option => option.name}
                      onChange={handleOnSubSectionChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField
                          helperText={complianceDetails.sectionsId === null ? 'Select Section' : ''}
                          fullWidth
                          {...params}
                          size={'small'}
                          variant={'outlined'}
                          label="Sub-Section"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Fees"
                      type={'number'}
                      variant="outlined"
                      value={complianceDetails.fees}
                      onChange={e => {
                        setComplianceDetails({ ...complianceDetails, fees: e.target.value });
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextField
                              select
                              style={{ width: '90px' }}
                              label=""
                              value={complianceDetails.penaltyCurrency}
                              onChange={e => setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })}
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
                    <TextField
                      fullWidth
                      label="Fines"
                      type={'number'}
                      variant="outlined"
                      value={complianceDetails.fine}
                      onChange={e => {
                        setComplianceDetails({ ...complianceDetails, fine: e.target.value });
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextField
                              select
                              style={{ width: '90px' }}
                              label=""
                              value={complianceDetails.penaltyCurrency}
                              onChange={e => setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })}
                              InputProps={{
                                disableUnderline: true,
                              }}>
                              {currencies.map(option => (
                                <MenuItem key={option} value={option.name}>
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
                    <TextField
                      fullWidth
                      label="Total Fees & Fines"
                      type={'number'}
                      variant="outlined"
                      value={complianceDetails.totalFees}
                      onChange={e => {
                        setComplianceDetails({ ...complianceDetails, totalFees: e.target.value });
                      }}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <TextField
                              select
                              disabled
                              style={{ width: '90px' }}
                              label=""
                              value={complianceDetails.penaltyCurrency}
                              onChange={e => setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })}
                              InputProps={{
                                disableUnderline: true,
                              }}>
                              {currencies.map(option => (
                                <MenuItem key={option} value={option.name}>
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
                    <DatePicker
                      autoOk
                      fullWidth
                      clearable
                      inputVariant={'outlined'}
                      label="Date of Next Hearing"
                      onChange={date => {
                        setSelectedDeadline(date);
                      }}
                      value={
                        complianceDetails.dateofNextHearing !== '' ? complianceDetails.dateofNextHearing : selectedDeadline
                      }
                      format="DD-MM-yyyy"
                      animateYearScrolling
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <AppTextInput
                      fullWidth
                      variant="outlined"
                      label="Management Comments"
                      multiline
                      minRows={5}
                      value={complianceDetails.managementComments}
                      onChange={e => setComplianceDetails({ ...complianceDetails, managementComments: e.target.value })}
                    />
                  </Grid>
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
              <b>Case Title</b>
            </TableCell>
            <TableCell>{complianceDetails.title !== '' ? complianceDetails.title : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Case Details</b>
            </TableCell>
            <TableCell>{complianceDetails.details !== '' ? renderHTML(complianceDetails.details) : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Case Type</b>
            </TableCell>
            <TableCell>{complianceDetails.caseType !== '' ? complianceDetails.caseType : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Judgement</b>
            </TableCell>
            <TableCell>{complianceDetails.judgement !== '' ? complianceDetails.judgement : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Company</b>
            </TableCell>
            <TableCell>{complianceDetails.companyName !== '' ? complianceDetails.companyName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Department</b>
            </TableCell>
            <TableCell>{complianceDetails.departmentsName !== '' ? complianceDetails.departmentsName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Section</b>
            </TableCell>
            <TableCell>{complianceDetails.sectionsName !== '' ? complianceDetails.sectionsName : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Sub Section</b>
            </TableCell>
            <TableCell>{complianceDetails.subSectionsName !== '' ? complianceDetails.subSectionsName : 'Not Set'}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <b>Fees in {complianceDetails.penaltyCurrency}</b>
            </TableCell>
            <TableCell>{complianceDetails.fees !== '' ? complianceDetails.fees : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Fines in {complianceDetails.penaltyCurrency}</b>
            </TableCell>
            <TableCell>{complianceDetails.fine !== '' ? complianceDetails.fine : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Total Fees & Fines in {complianceDetails.penaltyCurrency}</b>
            </TableCell>
            <TableCell>{complianceDetails.totalFees !== '' ? complianceDetails.totalFees : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Date of Next Hearing</b>
            </TableCell>
            <TableCell>
              {complianceDetails.dateofNextHearing !== '' ? complianceDetails.dateofNextHearing : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Management Comments</b>
            </TableCell>
            <TableCell>
              {complianceDetails.managementComments !== '' ? complianceDetails.managementComments : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Case File Attachment</b>
            </TableCell>
            <TableCell>
              {complianceDetails.caseFileAttachment !== '' ? complianceDetails.caseFileAttachment : 'Not Uploaded'}
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
        <Link to={'/compliance/legal-compliance'}>
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

export default AddEditLegalCompliance;
