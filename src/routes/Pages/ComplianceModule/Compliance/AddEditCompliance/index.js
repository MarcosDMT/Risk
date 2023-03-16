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
import { useLocation } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';

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
const AddEditCompliance = () => {
  const classes = useStyles();
  const searchParam = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const initialDetails = {
    complianceTitle: '',
    complianceDesc: '',
    authority: '',
    judgement: '',
    caseType: '',
    fines: '',
    fees: '',
    totalFines: '',
    department: '',
    section: '',
    subSection: '',
    penalty: '',
    penaltyCurrency: 'KES',
    primaryOwner: '',
    secondaryOwner: '',
    escalationPerson: '',
    priority: '',
    frequency: '',
    submissionStatus: '',
    submissionDeadline: moment(new Date()).format('YYYY-MM-DD'),
    complianceType: '',
    managerComments: '',
    //sourceDoc: '',
  };
  const [complianceDetails, setComplianceDetails] = useState(initialDetails);
  const [breadcrumbs, setBreadcrumbs] = useState(initialBreadcrumbs);
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [isLegalCompliance, setIsLegalCompliance] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const getTitle = title => {
    let titleName;
    if (
      title !== HEADER.ENTERPRISE_COMPLIANCE.url &&
      title !== HEADER.LEGAL_COMPLIANCE.url &&
      title !== HEADER.STATUTORY_COMPLIANCE.url
    ) {
      return history.push('/not-found');
    } else {
      if (title === HEADER.ENTERPRISE_COMPLIANCE.url) {
        titleName = HEADER.ENTERPRISE_COMPLIANCE.name;
        setTitle(HEADER.ENTERPRISE_COMPLIANCE.name);
        setIsLegalCompliance(false);
      } else if (title === HEADER.LEGAL_COMPLIANCE.url) {
        titleName = HEADER.LEGAL_COMPLIANCE.name;
        setTitle(HEADER.LEGAL_COMPLIANCE.name);
        setIsLegalCompliance(true);
      } else if (title === HEADER.STATUTORY_COMPLIANCE.url) {
        titleName = HEADER.STATUTORY_COMPLIANCE.name;
        setTitle(HEADER.STATUTORY_COMPLIANCE.name);
        setIsLegalCompliance(false);
      }
    }
    return titleName;
  };

  useEffect(() => {
    if (location.state !== undefined) {
      setBreadcrumbs([
        ...breadcrumbs,
        { label: getTitle(searchParam.name), link: `/compliance/${searchParam.name}` },
        { label: HEADER.UPDATE_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails(location.state);
      setIsUpdate(true);
    } else {
      setBreadcrumbs([
        ...breadcrumbs,
        { label: getTitle(searchParam.name), link: `/compliance/${searchParam.name}` },
        { label: HEADER.CREATE_COMPLIANCE, isActive: true },
      ]);
      setComplianceDetails(initialDetails);
      setIsUpdate(false);
    }
  }, [location]);

  return (
    <React.Fragment>
      <PageContainer
        heading={isUpdate ? HEADER.UPDATE_COMPLIANCE + ' ' + title : HEADER.CREATE_COMPLIANCE + ' ' + title}
        breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <AppHeader />
          <Box className={clsx(classes.inBuildAppContainer)}>
            <SideBarIncident {...{ activeStep, handleNext, handlePrev, setActiveStep }} />
            <ComplianceContent
              {...{ classes, activeStep, handleNext, complianceDetails, setComplianceDetails, isLegalCompliance }}
            />
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
const ComplianceContent = props => {
  const { classes, activeStep, handleNext, complianceDetails, setComplianceDetails, isLegalCompliance } = props;
  const [selectedDeadline, setSelectedDeadline] = useState(new Date());
  const [currency, setCurrency] = useState(['KES', 'USD', 'EUR']);
  const [caseTypes] = useState([
    {
      id: 1,
      name: 'Internal',
    },
    {
      id: 2,
      name: 'External',
    },
  ]);

  useEffect(() => {
    setComplianceDetails({
      ...complianceDetails,
      submissionDeadline: moment(selectedDeadline).format('YYYY-MM-DD'),
    });
  }, [selectedDeadline]);

  return (
    <>
      <Box className={classes.inBuildAppMainContent} minHeight={400}>
        <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
          <Box p={5} display="flex">
            {activeStep === 0 && (
              <Box width={'100%'}>
                <GridContainer>
                  {isLegalCompliance ? (
                    <>
                      <Grid item md={12} xs={12}>
                        <AppTextInput
                          fullWidth
                          variant="outlined"
                          label={'Case Title'}
                          value={complianceDetails.complianceTitle}
                          onChange={e => setComplianceDetails({ ...complianceDetails, complianceTitle: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppTextInput
                          fullWidth
                          multiline
                          minRows={4}
                          variant="outlined"
                          label={'Case Details'}
                          value={complianceDetails.complianceDesc}
                          onChange={e => setComplianceDetails({ ...complianceDetails, complianceDesc: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={caseTypes}
                          label="Case Type"
                          valueKey="name"
                          hidden={!isLegalCompliance}
                          variant="outlined"
                          labelKey="name"
                          value={complianceDetails.caseType}
                          onChange={e => setComplianceDetails({ ...complianceDetails, caseType: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppTextInput
                          fullWidth
                          hidden={isLegalCompliance}
                          variant="outlined"
                          label="Judgement"
                          multiline
                          minRows={5}
                          value={complianceDetails.judgement}
                          onChange={e => setComplianceDetails({ ...complianceDetails, judgement: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={departmentList}
                          label="Department"
                          valueKey="deptName"
                          variant="outlined"
                          labelKey="deptName"
                          onChange={e => setComplianceDetails({ ...complianceDetails, department: e.target.value })}
                          value={complianceDetails.department}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={sectionsList}
                          label="Section"
                          valueKey="sectionName"
                          variant="outlined"
                          labelKey="sectionName"
                          value={complianceDetails.section}
                          onChange={e => setComplianceDetails({ ...complianceDetails, section: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={subSectionList}
                          label="Sub-Section"
                          valueKey="subSectionName"
                          variant="outlined"
                          labelKey="subSectionName"
                          value={complianceDetails.subSection}
                          onChange={e => setComplianceDetails({ ...complianceDetails, subSection: e.target.value })}
                        />
                      </Grid>
                      {/*<Grid item md={12} xs={12}>*/}
                      {/*  <AppSelectBox*/}
                      {/*    fullWidth*/}
                      {/*    data={usersList}*/}
                      {/*    label="Primary Owner"*/}
                      {/*    valueKey="name"*/}
                      {/*    variant="outlined"*/}
                      {/*    labelKey="name"*/}
                      {/*    value={complianceDetails.primaryOwner}*/}
                      {/*    onChange={e => setComplianceDetails({ ...complianceDetails, primaryOwner: e.target.value })}*/}
                      {/*  />*/}
                      {/*</Grid>*/}
                      {/*<Grid item md={12} xs={12}>*/}
                      {/*  <AppSelectBox*/}
                      {/*    fullWidth*/}
                      {/*    data={usersList}*/}
                      {/*    label="Secondary Owner"*/}
                      {/*    valueKey="name"*/}
                      {/*    variant="outlined"*/}
                      {/*    labelKey="name"*/}
                      {/*    value={complianceDetails.secondaryOwner}*/}
                      {/*    onChange={e => setComplianceDetails({ ...complianceDetails, secondaryOwner: e.target.value })}*/}
                      {/*  />*/}
                      {/*</Grid>*/}
                      {/*<Grid item md={12} xs={12}>*/}
                      {/*  <AppSelectBox*/}
                      {/*    fullWidth*/}
                      {/*    data={usersList}*/}
                      {/*    label="Escalation Person"*/}
                      {/*    valueKey="name"*/}
                      {/*    variant="outlined"*/}
                      {/*    labelKey="name"*/}
                      {/*    value={complianceDetails.escalationPerson}*/}
                      {/*    onChange={e => setComplianceDetails({ ...complianceDetails, escalationPerson: e.target.value })}*/}
                      {/*  />*/}
                      {/*</Grid>*/}
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Fees"
                          type={'number'}
                          hidden={!isLegalCompliance}
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
                                  onChange={e =>
                                    setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })
                                  }
                                  InputProps={{
                                    disableUnderline: true,
                                  }}>
                                  {currency.map(option => (
                                    <MenuItem key={option} value={option}>
                                      {option}
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
                          hidden={!isLegalCompliance}
                          variant="outlined"
                          value={complianceDetails.fines}
                          onChange={e => {
                            setComplianceDetails({ ...complianceDetails, fines: e.target.value });
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TextField
                                  select
                                  style={{ width: '90px' }}
                                  label=""
                                  value={complianceDetails.penaltyCurrency}
                                  onChange={e =>
                                    setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })
                                  }
                                  InputProps={{
                                    disableUnderline: true,
                                  }}>
                                  {currency.map(option => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {/*<Grid item md={12} xs={12}>*/}
                      {/*  <AppSelectBox*/}
                      {/*    fullWidth*/}
                      {/*    data={priority}*/}
                      {/*    label="Priority"*/}
                      {/*    valueKey="name"*/}
                      {/*    variant="outlined"*/}
                      {/*    labelKey="name"*/}
                      {/*    value={complianceDetails.priority}*/}
                      {/*    onChange={e => setComplianceDetails({ ...complianceDetails, priority: e.target.value })}*/}
                      {/*  />*/}
                      {/*</Grid>*/}
                      {/*<Grid item md={12} xs={12}>*/}
                      {/*  <AppSelectBox*/}
                      {/*    fullWidth*/}
                      {/*    data={frequencies}*/}
                      {/*    label="Frequency"*/}
                      {/*    valueKey="name"*/}
                      {/*    variant="outlined"*/}
                      {/*    labelKey="name"*/}
                      {/*    value={complianceDetails.frequency}*/}
                      {/*    onChange={e => setComplianceDetails({ ...complianceDetails, frequency: e.target.value })}*/}
                      {/*  />*/}
                      {/*</Grid>*/}
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
                            complianceDetails.submissionDeadline !== ''
                              ? complianceDetails.submissionDeadline
                              : selectedDeadline
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
                          value={complianceDetails.managerComments}
                          onChange={e => setComplianceDetails({ ...complianceDetails, managerComments: e.target.value })}
                        />
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item md={12} xs={12}>
                        <AppTextInput
                          fullWidth
                          variant="outlined"
                          label={'Compliance Title'}
                          value={complianceDetails.complianceTitle}
                          onChange={e => setComplianceDetails({ ...complianceDetails, complianceTitle: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppTextInput
                          fullWidth
                          multiline
                          minRows={4}
                          variant="outlined"
                          label={'Compliance Description'}
                          value={complianceDetails.complianceDesc}
                          onChange={e => setComplianceDetails({ ...complianceDetails, complianceDesc: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppTextInput
                          fullWidth
                          variant="outlined"
                          label="Authority"
                          value={complianceDetails.authority}
                          onChange={e => setComplianceDetails({ ...complianceDetails, authority: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={departmentList}
                          label="Department"
                          valueKey="deptName"
                          variant="outlined"
                          labelKey="deptName"
                          onChange={e => setComplianceDetails({ ...complianceDetails, department: e.target.value })}
                          value={complianceDetails.department}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={sectionsList}
                          label="Section"
                          valueKey="sectionName"
                          variant="outlined"
                          labelKey="sectionName"
                          value={complianceDetails.section}
                          onChange={e => setComplianceDetails({ ...complianceDetails, section: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={subSectionList}
                          label="Sub-Section"
                          valueKey="subSectionName"
                          variant="outlined"
                          labelKey="subSectionName"
                          value={complianceDetails.subSection}
                          onChange={e => setComplianceDetails({ ...complianceDetails, subSection: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={usersList}
                          label="Primary Owner"
                          valueKey="name"
                          variant="outlined"
                          labelKey="name"
                          value={complianceDetails.primaryOwner}
                          onChange={e => setComplianceDetails({ ...complianceDetails, primaryOwner: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={usersList}
                          label="Secondary Owner"
                          valueKey="name"
                          variant="outlined"
                          labelKey="name"
                          value={complianceDetails.secondaryOwner}
                          onChange={e => setComplianceDetails({ ...complianceDetails, secondaryOwner: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={usersList}
                          label="Escalation Person"
                          valueKey="name"
                          variant="outlined"
                          labelKey="name"
                          value={complianceDetails.escalationPerson}
                          onChange={e => setComplianceDetails({ ...complianceDetails, escalationPerson: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Penalty"
                          type={'number'}
                          variant="outlined"
                          value={complianceDetails.penalty}
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
                                  value={complianceDetails.penaltyCurrency}
                                  onChange={e =>
                                    setComplianceDetails({ ...complianceDetails, penaltyCurrency: e.target.value })
                                  }
                                  InputProps={{
                                    disableUnderline: true,
                                  }}>
                                  {currency.map(option => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </TextField>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={priority}
                          label="Priority"
                          valueKey="name"
                          variant="outlined"
                          labelKey="name"
                          value={complianceDetails.priority}
                          onChange={e => setComplianceDetails({ ...complianceDetails, priority: e.target.value })}
                        />
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <AppSelectBox
                          fullWidth
                          data={frequencies}
                          label="Frequency"
                          valueKey="name"
                          variant="outlined"
                          labelKey="name"
                          value={complianceDetails.frequency}
                          onChange={e => setComplianceDetails({ ...complianceDetails, frequency: e.target.value })}
                        />
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
                            complianceDetails.submissionDeadline !== ''
                              ? complianceDetails.submissionDeadline
                              : selectedDeadline
                          }
                          format="DD-MM-yyyy"
                          animateYearScrolling
                        />
                      </Grid>
                    </>
                  )}
                </GridContainer>
              </Box>
            )}
            {activeStep === 1 && (
              <Box width={'100%'}>
                <Preview {...{ complianceDetails, isLegalCompliance }} />
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
          </Box>
        </PerfectScrollbar>
      </Box>
    </>
  );
};
export const Preview = props => {
  const { complianceDetails, isView, isLegalCompliance } = props;
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
        {isLegalCompliance ? (
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Case Title</b>
              </TableCell>
              <TableCell>
                {complianceDetails.complianceTitle !== '' ? complianceDetails.complianceTitle : 'Not Set'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Case Details</b>
              </TableCell>
              <TableCell>
                {complianceDetails.complianceDesc !== '' ? renderHTML(complianceDetails.complianceDesc) : 'Not Set'}
              </TableCell>
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
                <b>Department</b>
              </TableCell>
              <TableCell>{complianceDetails.department !== '' ? complianceDetails.department : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Section</b>
              </TableCell>
              <TableCell>{complianceDetails.section !== '' ? complianceDetails.section : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Sub Section</b>
              </TableCell>
              <TableCell>{complianceDetails.subSection !== '' ? complianceDetails.subSection : 'Not Set'}</TableCell>
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
              <TableCell>{complianceDetails.fines !== '' ? complianceDetails.fines : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Date of Next Hearing</b>
              </TableCell>
              <TableCell>
                {complianceDetails.submissionDeadline !== '' ? complianceDetails.submissionDeadline : 'Not Set'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Management Comments</b>
              </TableCell>
              <TableCell>
                {complianceDetails.managerComments !== '' ? complianceDetails.managerComments : 'Not Set'}
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Compliance Title</b>
              </TableCell>
              <TableCell>
                {complianceDetails.complianceTitle !== '' ? complianceDetails.complianceTitle : 'Not Set'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Compliance Description</b>
              </TableCell>
              <TableCell>
                {complianceDetails.complianceDesc !== '' ? renderHTML(complianceDetails.complianceDesc) : 'Not Set'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Department</b>
              </TableCell>
              <TableCell>{complianceDetails.department !== '' ? complianceDetails.department : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Section</b>
              </TableCell>
              <TableCell>{complianceDetails.section !== '' ? complianceDetails.section : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Sub Section</b>
              </TableCell>
              <TableCell>{complianceDetails.subSection !== '' ? complianceDetails.subSection : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Authority</b>
              </TableCell>
              <TableCell>{complianceDetails.authority !== '' ? complianceDetails.authority : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Penalty in {complianceDetails.penaltyCurrency}</b>
              </TableCell>
              <TableCell>{complianceDetails.penalty !== '' ? complianceDetails.penalty : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Primary Owner</b>
              </TableCell>
              <TableCell>{complianceDetails.primaryOwner !== '' ? complianceDetails.primaryOwner : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Secondary Owner</b>
              </TableCell>
              <TableCell>{complianceDetails.secondaryOwner !== '' ? complianceDetails.secondaryOwner : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Escalation Person</b>
              </TableCell>
              <TableCell>
                {complianceDetails.escalationPerson !== '' ? complianceDetails.escalationPerson : 'Not Set'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Priority</b>
              </TableCell>
              <TableCell>{complianceDetails.priority !== '' ? complianceDetails.priority : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Frequency</b>
              </TableCell>
              <TableCell>{complianceDetails.frequency !== '' ? complianceDetails.frequency : 'Not Set'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Submission Deadline</b>
              </TableCell>
              <TableCell>
                {complianceDetails.submissionDeadline !== '' ? complianceDetails.submissionDeadline : 'Not Set'}
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default AddEditCompliance;
