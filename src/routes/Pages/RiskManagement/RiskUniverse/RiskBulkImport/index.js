import React, {useState} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { SiMicrosoftexcel } from 'react-icons/si';
import ReactPaginate from 'react-paginate';
import { postUncreatedDocuments } from '../../../../../redux/actions/RiskUniverse';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Grid,
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtImage from '../../../../../@coremat/CmtImage';
import { DropzoneArea } from '@pandemicode/material-ui-dropzone';
import { DataGrid } from 'devextreme-react';
import useDownloader from 'react-use-downloader';
import { uploadRiskDocument } from '../../../../../redux/actions/RiskUniverse';
import  BulkDetailView from '../CreateRisk/BulkDetailView';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchUploadedDocs } from '../../../../../redux/actions/RiskUniverse';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Column,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  ColumnChooser,
  Lookup,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  MasterDetail,
  Selection,
} from 'devextreme-react/data-grid';
import { departmentList, sectionsList, subSectionList, subsidiariesList } from '../../../Organization/dummyData';
import { rolesList } from '../../../Roles/dummyData';
import { controlCategory, frequency, lossTypeList, probabilityList, riskCategoryList, severityList } from '../../dummyData';
import { downloadTemplate } from '../../../../../redux/actions/RiskUniverse';
import { useDispatch, useSelector } from 'react-redux';
import { updateUploads,createBulkRisk } from '../../../../../redux/actions/RiskUniverse';
import { fetchError, fetchSuccess } from '../../../../../redux/actions';
import EditRiskDialog from "./EditRiskDialog";
import {Edit} from "@material-ui/icons";

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getSteps() {
  return ['Download Template', 'Upload File', 'Validation & Confirmation'];
}

const ImportRisks = props => {
  const {
    openDialog,
    setOpenDialog,
    onCloseDialog,
    setActiveStep,
    activeStep,
    file,
    setFile,
    risks,
    setRisks,
    uploadRisks,
    setUploadRisks,
  } = props;
  const dispatch = useDispatch();
  const useStyles = makeStyles(theme => ({
    backButton: {
      marginRight: theme.spacing(2),
    },
    instructions: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    dialogRoot: {
      position: 'relative',
    },
    dialogHeader: {
      backgroundColor: theme.palette.primary.main,
      position: 'relative',
    },
    dialogTitleRoot: {
      '& .MuiTypography-h6': {
        fontSize: 16,
        color: theme.palette.common.white,
      },
    },
    scrollbar: {
      height: props => `calc(100vh - ${props.height}px)`,
    },
  }));
  const classes = useStyles();
  const steps = getSteps();

  const [selectedRowKeys,setSelectedRowKeys] = React.useState([])

  const handleNext = async () => {
      if(activeStep === steps.length - 1){
        const selectedIds = selectedRowKeys?.map((selected) =>{
          return selected.id
        })
        await dispatch(createBulkRisk(selectedIds))
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      }
      else{
        setActiveStep(prevActiveStep => prevActiveStep + 1)
      }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const [activeRisk, setActiveRisk] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOnCloseDialog = () => {
    setOpenDialog(true);
    setOpen(false)
  }

  return (
      <>
        <Dialog
            open={openDialog}
            onClose={onCloseDialog}
            //maxWidth={'xl'}
            scroll={'paper'}
            //fullWidth={true}
            fullScreen={true}
            TransitionComponent={Transition}
            className={classes.dialogRoot}>
          <AppBar className={classes.dialogHeader}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={onCloseDialog} aria-label="close">
                <CloseIcon />
              </IconButton>
              <DialogTitle className={classes.dialogTitleRoot}>Risks Bulk Import</DialogTitle>
              {/*<Button autoFocus color="inherit" onClick={handleClose}>*/}
              {/*  save*/}
              {/*</Button>*/}
            </Toolbar>
          </AppBar>
          <PerfectScrollbar className={classes.scrollbar}>
            <DialogContent style={{ marginTop: 10 }}>
              <Box sx={{ width: '100%' }}>
                <Box>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                  </Stepper>
                  <Box>
                    {activeStep === steps.length ? (
                        <Box width={'100%'} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                          <CmtImage src={'/images/ic_ok.svg'} style={{ width: '100px' }} />
                          <p style={{ marginTop: 10 }}>
                            <b>Risks created successfully!</b>
                          </p>
                          <Box mt={10}>
                            <Button onClick={onCloseDialog} variant={'outlined'} color={'primary'}>
                              Finish
                            </Button>
                          </Box>
                        </Box>
                    ) : (
                        <>
                          <Box>
                            {activeStep === 0 && (
                                <>
                                  <DownloadPage />
                                </>
                            )}
                            {activeStep === 1 && (
                                <>
                                  <UploadPage {...{ file, setFile, setRisks, risks, handleNext }} />
                                </>
                            )}
                            {activeStep === 2 && (
                                <>
                                  <ValidationPage {...{ risks,selectedRowKeys,setSelectedRowKeys, setActiveRisk, setOpenDialog, activeRisk, setOpen }} />
                                </>
                            )}
                          </Box>
                          <Box mt={20} display={'flex'}>
                            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                              Back
                            </Button>
                            <Box flex={'1 0 auto'} />
                            <Button variant="contained" color="primary" onClick={handleNext}>
                              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                          </Box>
                        </>
                    )}
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </PerfectScrollbar>
        </Dialog>
        <EditRiskDialog open={open} onClose={() => handleOnCloseDialog()}  data={activeRisk}/>
      </>

  );
};

export function CircularUnderLoad() {
  return <CircularProgress disableShrink />;
}

const DownloadPage = props => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const { template } = useSelector(({ riskUniverse }) => riskUniverse);

  const dispatchDownload = async () => {
    try {
      setLoading(true);
      const data = await dispatch(downloadTemplate());
      let fileName = data.name + data.extension;
      let fileUrl = data.data;
      download(fileUrl, fileName);
      setLoading(false);
    } catch (e) {}
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <CmtImage src={'/images/ic_download.ico'} style={{ width: '100px' }} />
      <p style={{ marginTop: '10px', marginBottom: '10px' }}>
        <b>Download the excel file below!</b>
      </p>
      {loading ? (
        <>
          {CircularUnderLoad()}
          <p>Downloading...</p>
        </>
      ) : (
        ''
      )}
      <Button onClick={() => dispatchDownload()} style={{ marginTop: '20px' }} variant={'outlined'} color={'primary'}>
        Download Here
      </Button>
    </Box>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const UploadPage = props => {
  const { uploadedDocsNames, uploadedRisks } = useSelector(({ riskUniverse }) => riskUniverse);
  const { handleNext } = props;
  // get last five uploade documents
  // let lastFive = uploadedDocsNames?.slice(0, 6);
  // console.log(lastFive);

  const [loading, setLoading] = useState(false);

  const initialState = {
    name: '',
    extension: '',
    data: '',
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const classes = useStyles();

  React.useEffect(() => {
    dispatch(fetchUploadedDocs());
  }, []);

  const uploadDocumentName = data => {
    let document = {
      template: data,
    };
    dispatch(postUncreatedDocuments(document, () => handleNext()));
  };

  const convertBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseUrl = '';

      let reader = new FileReader();

      // convert file to base64
      reader.readAsDataURL(file);

      reader.onload = () => {
        // console.log("Called", reader);
        baseUrl = reader.result;

        // get file extension

        resolve(baseUrl);
      };
    });
  };

  const handleOnFileChange = async files => {
    const file = files[0];
    if (files.length === 1) {
      const baseUrl = await convertBase64(file);
      const fileExtension = '.' + file.name.split('.').pop();
      setFormData({
        name: file.name,
        extension: fileExtension,
        data: baseUrl,
      });
    } else {
      setFormData(initialState);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.data !== '') {
      setLoading(true);
      const data = await dispatch(uploadRiskDocument(formData, () => handleNext()));
      setLoading(false);
      dispatch(fetchUploadedDocs());
      setFormData(initialState);
    } else {
      dispatch(fetchError('You cannot upload an empty document'));
    }
  };



  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <>
          <Box width={'50%'} mt={2}>
            <DropzoneArea
              useChipsForPreview={true}
              showPreviewsInDropzone={false}
              showPreviews={true}
              filesLimit={1}
              name="file"
              onChange={files => handleOnFileChange(files)}
              acceptedFiles={['.csv', '.xlsx', '.xls']}
            />
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column">
            {loading ? (
              <>
                {CircularUnderLoad()}
                <p>Uploading...</p>
              </>
            ) : (
              ''
            )}
            {formData.data !== '' && (
              <Button onClick={handleSubmit} variant={'contained'} color={'primary'}>
                Upload Here
              </Button>
            )}
          </Box>
        </>
      </Box>
      {/* <Card width={'50%'}> */}
      <Box
        width={'50%'}
        marginTop="40px"
        marginLeft="auto"
        marginRight="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column">
        <>
          {uploadedDocsNames.length > 0 ? (
            <>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography>Uploaded Documents</Typography>
                      <Typography>Last Five</Typography>
                    </Box>
                  </ListSubheader>
                }
                className={classes.root}></List>
            </>
          ) : (
            ''
          )}
          {uploadedDocsNames.length > 0 && uploadedDocsNames?.map((docs, index) => (
            <ListItem sx={{ backgroundColor: 'white' }} button key={index} onClick={() => uploadDocumentName(docs)}>
              <ListItemIcon>
                <SiMicrosoftexcel style={{ color: 'green', fontSize: '18px' }} />
              </ListItemIcon>
              <ListItemText primary={docs} />
            </ListItem>
          ))}
        </>
      </Box>
      {/* </Card> */}
    </>
  );
};
const ValidationPage = props => {
  const { uploadedRisks } = useSelector(({ riskUniverse }) => riskUniverse);
  const dispatch = useDispatch();
  const { risks,selectedRowKeys,setSelectedRowKeys, setActiveRisk, setOpen, setOpenDialog,} = props;

  function actionNumber({ rowIndex }) {
    return rowIndex + 1;
  }
  const multipleValueRootCauses = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.rootCause}</li>);
  };

  const multipleValueRiskImpact = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.riskImpact}</li>);
  };

  const multipleValueControlActions = ({ displayValue }) => {
    return displayValue?.map((value, index) => <li key={index}>{value.action}</li>);
  };

  const onSelectionChanged = ({ selectedRowKeys, selectedRowsData }) => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const errorLink = ({ data, rowIndex }) => {
    const handleOnClick = () => {
    setActiveRisk(data);
    setOpen(true);
      setOpenDialog(false);
    }
    return (
      <>
        <Box sx={{ display: 'flex', alignItems:'center'}}>
          {data.errorMessages?.length > 0 && (
              <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                    <>
                      <Chip label="View Error" variant="outlined" color="secondary" size="small" {...bindTrigger(popupState)}>
                        Error
                      </Chip>
                      <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}>
                        <Box p={4}>
                          {data.errorMessages?.map((error, index) => (
                              <>
                                <li key={index}>{error.messages}</li>
                              </>
                          ))}
                        </Box>
                      </Popover>
                    </>
                )}
              </PopupState>
          )}
          <IconButton onClick={handleOnClick}>
            <Edit fontSize={'small'}/>
          </IconButton>
        </Box>

      </>
    );
  };


  return (
    <>
      <DataGrid
        id="uploadedRisks"
        columnAutoWidth={true}
        dataSource={uploadedRisks}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        keyExpr="id"
        repaintChangesOnly={true}
        allowColumnResizing={true}
        selectedRowKeys={selectedRowKeys}
        onSelectionChanged={onSelectionChanged}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <MasterDetail enabled={true} component={BulkDetailView} />
        <ColumnChooser enabled={true} mode="select" />
        <HeaderFilter visible={true} allowSearch={true} />
        <Selection mode="multiple" />
        <Column dataField="id" key="id" visible={false} />
        <Column caption="#" width={50} allowFiltering={false} cellRender={actionNumber} />
        <Column caption="Action" width={140} alignment={'center'} allowFiltering={false} cellRender={errorLink} />

        <Column
          dataField="riskTitle"
          minWidth={100}
          caption="Risk Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          color="primary"
          allowFiltering={false}
        />
        <Column
          dataField="riskEvent"
          minWidth={100}
          visible={false}
          caption="Risk Event"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="categoryName"
          minWidth={100}
          caption="Risk Category"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={riskCategoryList} displayExpr="name" valueExpr="name" />
        </Column>
        <Column
          dataField="companyName"
          minWidth={100}
          caption="Subsidiary"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={subsidiariesList} displayExpr="subsidiaryName" valueExpr="subsidiaryName" />
        </Column>
        <Column
          dataField="departmentName"
          minWidth={100}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={departmentList} displayExpr="deptName" valueExpr="deptName" />
        </Column>
        <Column
          dataField="sectionName"
          minWidth={100}
          caption="Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={sectionsList} displayExpr="sectionName" valueExpr="sectionName" />
        </Column>
        <Column
          dataField="subSectionName"
          minWidth={100}
          caption="Sub-Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={subSectionList} displayExpr="subSectionName" valueExpr="subSectionName" />
        </Column>
        <Column
          dataField="rootCauses"
          minWidth={100}
          caption="Root Causes"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          visible={false}

          cellRender={multipleValueRootCauses}
        />
        <Column
          dataField="riskImpact"
          minWidth={100}
          caption="Risk Impact"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          visible={false}
          cellRender={multipleValueRiskImpact}
        />
        <Column
          dataField="riskImpactAmount"
          minWidth={100}
          caption="Risk Impact Amount"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}
        />
        <Column
          dataField="riskCategoryControlActualCategoryControlName"
          minWidth={100}
          caption="Risk Control Category"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}>
          <Lookup dataSource={controlCategory} displayExpr="name" valueExpr="name" />
        </Column>
        <Column
          dataField="controlActions"
          minWidth={100}
          caption="Mitigations/Control"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          visible={false}
          cellRender={multipleValueControlActions}
        />
        <Column
          dataField="lossTypeActualLossTypeName"
          minWidth={100}
          caption="Loss Type"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}>
          <Lookup dataSource={lossTypeList} displayExpr="name" valueExpr="name" />
        </Column>
        <Column
          dataField="riskOwner"
          minWidth={100}
          caption="Risk Owner"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}>
          <Lookup dataSource={rolesList} displayExpr="name" valueExpr="name" />
        </Column>
        <Column
          dataField="riskIndicator"
          minWidth={100}
          caption="Risk Indicator"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}
        />
        <Column
          dataField="keyIndicatorFrequencyName"
          minWidth={100}
          caption="Risk Indicator Frequency"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}>
          <Lookup allowClearing dataSource={frequency} displayExpr="name" valueExpr="name" />
        </Column>
        <Column
          dataField="riskAppetiteTypeName"
          minWidth={100}
          caption="Risk Appetite"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          visible={false}
        />
        <Column
          dataField="riskProbabilityActualName"
          minWidth={100}
          caption="Probability"

          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}>
          <Lookup dataSource={probabilityList} displayExpr="name" valueExpr="name" />
        </Column>
        <Column
          dataField="riskSeverityActualName"
          minWidth={100}
          caption="Severity"
          visible={false}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={severityList} displayExpr="name" valueExpr="name" />
        </Column>
        <Column
          dataField="residualRiskScore"
          minWidth={100}
          caption="Residual Risk"
          allowHeaderFiltering={true}
          allowSearch={true}
          visible={false}
          allowFiltering={false}
        />
        <Scrolling rowRenderingMode="virtual" />
        <Paging defaultPageSize={20} />
        <Pager
          visible={true}
          // allowedPageSizes={allowedPageSizes}
          displayMode={true}
          showPageSizeSelector={false}
          showInfo={true}
          showNavigationButtons={true}
        />
      </DataGrid>

    </>
  );
};

export default ImportRisks;
