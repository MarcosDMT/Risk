import React, { useEffect, useState } from 'react';
import CmtDrawer from '../../../../../@coremat/CmtDrawer';
import { alpha, makeStyles } from '@material-ui/core/styles';
import useStyles from '../../../Roles/index.style';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  ComplianceContent,
  compliancePreview,
  AppHeader,
} from '../../../ComplianceModule/StatutoryCompliance/AddEditStatutoryCompliance';
import RiskStatutory from '../../RiskUniverse/CreateRisk/RiskStatutory';
import AddEditStatutoryCompliance from '../../../ComplianceModule/StatutoryCompliance/AddEditStatutoryCompliance';
import {
  Chip,
  IconButton,
  withWidth,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  InputAdornment,
} from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtImage from '../../../../../@coremat/CmtImage';
import CloseIcon from '@material-ui/icons/Close';
import { blue } from '@material-ui/core/colors';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { controlCategory, lossTypeList, probabilityList, severityList } from '../../dummyData';
import { ArrowDropDown } from '@material-ui/icons';
import { NotificationManager } from 'react-notifications';
import { Autocomplete } from '@material-ui/lab';
import { filter } from 'lodash';
import { CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import RoleBasedGuard from '../../../../../@jumbo/hocs/RoleAuth';
import { PERMISSIONS } from '../../../../../@jumbo/constants/RolesConstants';
import { fetchRisks } from '../../../../../redux/actions/RiskUniverse';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRiskControls } from '../../../../../redux/actions/RiskParams';
import { assessRiskUniverse } from '../../../../../redux/actions/RiskUniverse';
import { fetchRiskProbabilities, fetchRiskSeverities } from '../../../../../redux/actions/RiskParams';
import { fetchRiskOwners } from '../../../../../redux/actions/RiskOwners';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxOutlined fontSize="small" />;

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  headerRoot: {
    position: 'relative',
    margin: '-30px -15px 0 -15px',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 20,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: -50,
      marginRight: -50,
      paddingLeft: 50,
      paddingRight: 50,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: -65,
      marginRight: -65,
      paddingLeft: 65,
      paddingRight: 65,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: -88,
      marginRight: -88,
      paddingLeft: 88,
      paddingRight: 88,
    },
  },
  headerBgImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    minHeight: 'auto',
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  headerContent: {
    position: 'relative',
    zIndex: 3,
  },
  titleRoot: {
    color: theme.palette.common.white,
    //marginBottom: 1,
  },
  actionSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 5px',
    width: 65,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  contentArea: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 557,
    },
  },
  scrollbarRoot: {
    height: '100vh',
    padding: 10,
  },
  iconBtn: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.7),
    '&:hover, &:focus, &.active': {
      color: alpha(theme.palette.common.white, 1),
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    '&.web': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark,
    },
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer',
  },
}));
const AssessRisk = props => {
  const dispatch = useDispatch();
  // const { riskControlActions } = useSelector(({ riskUniverse}) => riskUniverse);
  // console.log(riskControlsActions)
  const { riskDetails, openDrawer, onCloseDrawer, ...rest } = props;
  const [anchor] = useState('right');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const classes = useStyle();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  const getColor = () => {
    let color;
    color = riskDetails.status === 'Approved' ? 'green' : 'orange';
    return color;
  };

  useEffect(() => {
    dispatch(fetchRisks());
  }, []);
  return (
    <CmtDrawer open={openDrawer} variant="temporary" anchor={anchor} onClose={onCloseDrawer} {...rest}>
      <div className={clsx(classes.root)}>
        <Box className={classes.contentArea}>
          <PerfectScrollbar className={classes.scrollbarRoot}>
            <Box className={classes.headerRoot}>
              <Box className={classes.headerBgImg}>
                <CmtImage src={'/images/profile-bg-img.png'} />
              </Box>
              <Box className={classes.headerContent}>
                <Box display={'flex'} alignItems={'center'}>
                  <IconButton className={classes.iconBtn} onClick={onCloseDrawer}>
                    <CloseIcon />
                  </IconButton>
                  <Typography variant={'h5'} style={{ color: 'white' }}>
                    {riskDetails.id}
                  </Typography>
                  <Box flex={'1 0 auto'} />
                  <RoleBasedGuard permission={PERMISSIONS.RISK_ASSESSMENT.CREATE}>
                    <Button
                      style={{ color: 'green', borderColor: 'green' }}
                      variant={'contained'}
                      onClick={handleClick}
                      endIcon={<ArrowDropDown />}
                      title={'Click to assess risk'}>
                      Assess Risk
                    </Button>
                  </RoleBasedGuard>

                  {/*<PopupState variant={'popper'} popupId={'popup-popper'}>*/}
                  {/*  {popupState => (*/}
                  {/*    <>*/}
                  {/*      */}
                  {/*      <Popper {...bindPopper(popupState)} placement={'bottom'} transition>*/}
                  {/*        <AssessForm {...{ riskDetails }} />*/}
                  {/*      </Popper>*/}
                  {/*    </>*/}
                  {/*  )}*/}
                  {/*</PopupState>*/}

                  {/*<Chip*/}
                  {/*  size={'small'}*/}
                  {/*  variant={'default'}*/}
                  {/*  label={riskDetails.status}*/}
                  {/*  style={{ color: 'white', backgroundColor: getColor() }}*/}
                  {/*/>*/}
                </Box>
                {open && <AssessForm {...{ riskDetails, setOpen }} />}
              </Box>
            </Box>
            {!open && (
              <Box mb={4}>
                <Preview {...{ riskDetails, isView: true }} />
              </Box>
            )}
          </PerfectScrollbar>
        </Box>
      </div>
    </CmtDrawer>
  );
};
const AssessForm = props => {
  const initialDialogValues = {
    open: false,
    name: '',
    index: '',
    title: '',
  };
  const dispatch = useDispatch();
  const { probabilities, severities, riskControls } = useSelector(({ riskParams }) => riskParams);
  console.log(severities);
  const { riskOwners } = useSelector(({ riskOwners }) => riskOwners);
  const complianceTypes = [
    { id: 1, name: 'Statutory Compliance' },
    { id: 2, name: 'Legal Compliance' },
    { id: 3, name: 'Enterprise Compliance' },
  ];
  const additionalDetails = {
    action: '',
    riskOwners: '',
    date: '',
    compliancetype: '',
  };

  const [riskComplianceDetail, setRiskComplianceDetails] = useState(additionalDetails);
  const { riskDetails, setOpen } = props;
  const [updatedRiskDetails, setUpdatedRiskDetails] = useState({ ...riskDetails });
  const classes = useStyles();
  const [riskImpact, setRiskImpact] = useState([]);
  const [dialogValues, setDialogValues] = useState(initialDialogValues);
  const [open, setModalOpen] = React.useState(false);
  const [complianceOpen, setComplianceOpen] = useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('lg');
  // const [riskControls, setRiskControls] = useState([]);

  const renderDialog = (option, index, title) => {
    setDialogValues({
      open: true,
      name: option.name,
      index: index,
      title: title,
    });
  };
  const onHandleSave = () => {
    NotificationManager.success('Risk assessed successfully!', 'Success!');
    setOpen(false);
  };
  const handleOnControlsChange = (event, values) => {
    updatedRiskDetails({ ...updatedRiskDetails, controlActions: values });
  };

  const handleOnImpactChange = (event, values) => {
    setUpdatedRiskDetails({ ...updatedRiskDetails, riskImpact: values });
    // setRiskImpact(values);
  };

  // DIALOG ASSETS

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const complianceClickOpen = () => {
    setComplianceOpen(true);
  };

  const complianceClickClose = () => {
    setComplianceOpen(false);
  };

  // useEffect(()=>{
  //   setComplianceDetails({...complianceDetail, riskOwners:riskOwners })
  // }, [riskOwners])

  useEffect(() => {
    dispatch(fetchRiskControls());
    dispatch(fetchRiskProbabilities());
    dispatch(fetchRiskSeverities());
    dispatch(fetchRiskOwners());
  }, []);

  const calculateAssessment = async (riskProbabilityId, riskSeverityId) => {
    const formData = {
      riskProbabilityId,
      riskSeverityId,
    };
    const data = await dispatch(assessRiskUniverse(formData));
    console.log(data);
    if (data) {
      setUpdatedRiskDetails({ ...updatedRiskDetails, residualRisk: data.actualName });
    } else {
      setUpdatedRiskDetails({ ...updatedRiskDetails, residualRisk: '' });
    }
    console.log('CALCULATED: ', data.actualName);
  };

  const handleProbabilityChange = e => {
    setUpdatedRiskDetails({
      ...updatedRiskDetails,
      riskProbabilityId: e.target.value,
    });
    console.log(e.target.value);
    calculateAssessment(e.target.value, updatedRiskDetails.riskSeverityId);
  };

  const handleSeverityChange = e => {
    setUpdatedRiskDetails({
      ...updatedRiskDetails,
      riskSeverityId: e.target.value,
    });
    console.log(e.target.value);
    calculateAssessment(updatedRiskDetails.riskProbabilityId, e.target.value);
  };

  const handleRiskOwnerChange = e => {
    setRiskComplianceDetails({ ...riskComplianceDetail, riskOwners: e.target.value });
  };

  const handleComplianceTypeChange = e => {
    setRiskComplianceDetails({ ...riskComplianceDetail, compliancetype: e.target.value });
  };

  const handleActionChange = e => {
    setRiskComplianceDetails({
      ...riskComplianceDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = e => {
    setRiskComplianceDetails({
      ...riskComplianceDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setRiskComplianceDetails({
      ...riskComplianceDetail,
      action: riskComplianceDetail.action,
      riskOwners: riskComplianceDetail.riskOwners,
      date: riskComplianceDetail.date,
      compliancetype: riskComplianceDetail.compliancetype,
    });
    // handleClose();
    if (riskComplianceDetail.compliancetype === 'Statutory Compliance') {
      complianceClickOpen();
    }else if(riskComplianceDetail.compliancetype === 'Legal Compliance'){
      complianceClickOpen();
    }else if(riskComplianceDetail.compliancetype ===  'Enterprise Compliance'){
      complianceClickOpen();
    }
  };

  return (
    <Box padding={4} mb={3} className={classes.inBuildAppCard}>
      <Box display={'flex'} mb={3}>
        <Box flex={'1 0 auto'} />
        <Button
          size={'small'}
          onClick={e => onHandleSave()}
          style={{ marginRight: '10px', color: 'white', backgroundColor: 'green' }}>
          Save
        </Button>
        <Button size={'small'} onClick={e => setOpen(false)} style={{ color: 'white', backgroundColor: 'darkred' }}>
          Cancel
        </Button>
      </Box>
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
            value={updatedRiskDetails.riskImpactAmount}
            onChange={e => {
              setUpdatedRiskDetails({ ...updatedRiskDetails, riskImpactAmount: e.target.value });
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography>KES</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <AppSelectBox
            fullWidth
            data={lossTypeList}
            label="Loss Type"
            valueKey="name"
            variant="outlined"
            labelKey="name"
            value={updatedRiskDetails.lossTypeActualLossTypeName}
            onChange={e => setUpdatedRiskDetails({ ...updatedRiskDetails, lossType: e.target.value })}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <AppSelectBox
            fullWidth
            data={controlCategory}
            label="Risk Control Category"
            valueKey="name"
            variant="outlined"
            labelKey="name"
            value={updatedRiskDetails.riskCategoryControlActualCategoryControlName}
            onChange={e => setUpdatedRiskDetails({ ...updatedRiskDetails, riskControlCat: e.target.value })}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Autocomplete
            multiple
            fullWidth
            value={riskDetails.controlActions}
            options={riskControls}
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
                  // onClick={e => renderDialog(option, index, 'Risk Control')}
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
            renderInput={params => <TextField fullWidth variant={'outlined'} {...params} label="Control Actions" />}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Add Additional Mitigations
            </Button>
            <Dialog
              fullWidth
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{'Add Additional Mitigations'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid item md={12} xs={12}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        name="action"
                        onChange={handleActionChange}
                        fullWidth
                        label="Action"
                        style={{ marginBottom: '20px' }}
                        type="text"
                        variant="outlined"
                      />
                      <Select
                        style={{ marginBottom: '20px' }}
                        onChange={handleRiskOwnerChange}
                        fullWidth
                        label="RiskOwners"
                        variant="outlined"
                        id="name"
                        value={riskComplianceDetail.riskOwners}>
                        {riskOwners.map((option, index) => (
                          <MenuItem key={index} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextField
                        name="date"
                        onChange={handleDateChange}
                        fullWidth
                        style={{ marginBottom: '20px' }}
                        type="date"
                        variant="outlined"
                      />
                      <Select
                        style={{ marginBottom: '20px' }}
                        onChange={handleComplianceTypeChange}
                        fullWidth
                        label="RiskOwners"
                        variant="outlined"
                        id=""
                        value={riskComplianceDetail.compliancetype}>
                        {complianceTypes.map((option, index) => (
                          <MenuItem key={index} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Button variant="contained" type="submit" color="primary" autoFocus>
                        Save
                      </Button>
                    </form>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose} color="primary" autoFocus>
                  Save
                </Button> */}
              </DialogActions>
            </Dialog>
          </div>
          {/* <Button onClick={handleClickOpen} variant='outlined' color='secondary'>Add Additional Mitigation</Button> */}
        </Grid>
        <Grid item md={12} xs={12}>
          {riskComplianceDetail.compliancetype === 'Statutory Compliance' ? (
            <>
              <div>
                <Button variant="outlined" color="primary" onClick={complianceClickOpen}>
                  Compliance Type Dialog
                </Button>
                <Dialog
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                  open={complianceOpen}
                  onClose={complianceClickClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogContent>
                    <RiskStatutory complianceClickClose={complianceClickClose} riskComplianceDetail={riskComplianceDetail} handleActionChange={handleActionChange} setRiskComplianceDetails={setRiskComplianceDetails} handleDateChange={handleDateChange} handleRiskChange={handleRiskOwnerChange}/>
                  </DialogContent>
                  {/* <DialogActions>
                    <Button variant="outlined" color="primary" onClick={complianceClickClose}>
                      Cancel
                    </Button>
                  </DialogActions> */}
                </Dialog>
              </div>
            </>
          ) : (
            ''
          )}

          {riskComplianceDetail.compliancetype === 'Legal Compliance' ? (
            <>
              <div>
                <Button variant="outlined" color="primary" onClick={complianceClickOpen}>
                  Compliance Type Dialog
                </Button>
                <Dialog
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                  open={complianceOpen}
                  onClose={complianceClickClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogContent>
                    {/* <AddEditStatutoryCompliance /> */}
                    This is the Legal Compliance
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" color="primary" onClick={complianceClickClose}>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          ) : (
            ''
          )}

          {riskComplianceDetail.compliancetype === 'Enterprise Compliance' ? (
            <>
              <div>
                <Button variant="outlined" color="primary" onClick={complianceClickOpen}>
                  Compliance Type Dialog
                </Button>
                <Dialog
                  fullWidth={fullWidth}
                  maxWidth={maxWidth}
                  open={complianceOpen}
                  onClose={complianceClickClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogContent>
                    {/* <AddEditStatutoryCompliance /> */}
                    This is the Enterprise Compliance
                  </DialogContent>
                  <DialogActions>
                    <Button variant="outlined" color="primary" onClick={complianceClickClose}>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          ) : (
            ''
          )}
        </Grid>
        <Grid item md={4} xs={12}>
          <Select
            style={{ marginBottom: '20px' }}
            onChange={handleProbabilityChange}
            fullWidth
            label="RiskOwners"
            variant="outlined"
            id=""
            // value={complianceDetail.compliancetype}
          >
            {probabilities.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={4} xs={12}>
          <Select
            style={{ marginBottom: '20px' }}
            onChange={handleSeverityChange}
            fullWidth
            label="RiskOwners"
            variant="outlined"
            id=""
            // value={complianceDetail.compliancetype}
          >
            {severities.map((option, index) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField fullWidth label="Residual Risk" variant="outlined" disabled value={updatedRiskDetails.residualRisk} />
        </Grid>
      </GridContainer>
    </Box>
  );
};
const Preview = props => {
  const { riskDetails, isView } = props;
  const classes = useStyles();
  return (
    <TableContainer className={classes.inBuildAppCard}>
      <Table size={'small'} aria-label="preview table">
        <TableBody>
          <TableRow>
            <TableCell>
              <b>Risk Title</b>
            </TableCell>
            <TableCell>{riskDetails.riskTitle !== '' ? riskDetails.riskTitle : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Risk Event</b>
            </TableCell>
            <TableCell>{riskDetails.riskEvent !== '' ? riskDetails.riskEvent : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Risk Indicator</b>
            </TableCell>
            <TableCell>{riskDetails.riskIndicator !== '' ? riskDetails.riskIndicator : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>
                Risk Appetite in {riskDetails.riskAppetiteTypeName !== '' ? riskDetails.riskAppetiteTypeName : 'Not Set'}
              </b>
            </TableCell>
            <TableCell>{riskDetails.riskAppetiteTypeName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>No. of Risk Incidents</b>
            </TableCell>
            <TableCell>{1}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Risk Owner</b>
            </TableCell>
            <TableCell>{riskDetails.riskOwner !== '' ? riskDetails.riskOwner : 'Not Set'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Probability</b>
            </TableCell>
            <TableCell>
              {riskDetails.riskProbabilityActualName !== '' ? riskDetails.riskProbabilityActualName : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Severity</b>
            </TableCell>
            <TableCell>
              {riskDetails.riskSeverityActualName !== '' ? riskDetails.riskSeverityActualName : 'Not Set'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Residual Risk</b>
            </TableCell>
            <TableCell>{riskDetails.residualRisk !== '' ? riskDetails.residualRisk : 'Not Set'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withWidth()(AssessRisk);
