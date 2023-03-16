import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
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
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtImage from '../../../../../@coremat/CmtImage';
import { DropzoneArea } from '@pandemicode/material-ui-dropzone';
import { DataGrid } from 'devextreme-react';
import {
  Column,
  Editing,
  EmailRule,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Lookup,
  Pager,
  Paging,
  RequiredRule,
  Scrolling,
  SearchPanel,
} from 'devextreme-react/data-grid';
import { departmentList, sectionsList, subSectionList, subsidiariesList } from '../../../Organization/dummyData';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getSteps() {
  return ['Download Template', 'Upload File', 'Validation & Confirmation'];
}

const ImportLegalCompliance = props => {
  const {
    openDialog,
    onCloseDialog,
    setActiveStep,
    activeStep,
    file,
    setFile,
    complianceList,
    breadCrumbsTitle,
  } = props;
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

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
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
          <DialogTitle className={classes.dialogTitleRoot}>{breadCrumbsTitle} Bulk Import</DialogTitle>
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
                      <b>New Records created successfully!</b>
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
                          <UploadPage {...{ file, setFile }} />
                        </>
                      )}
                      {activeStep === 2 && (
                        <>
                          <ValidationPage {...{ complianceList }} />
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
  );
};
const DownloadPage = props => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <CmtImage src={'/images/ic_download.ico'} style={{ width: '100px' }} />
      <p style={{ marginTop: '10px' }}>
        <b>Download the excel file below!</b>
      </p>
      <Button style={{ marginTop: '20px' }} variant={'outlined'} color={'primary'}>
        Download Here
      </Button>
    </Box>
  );
};
const UploadPage = props => {
  const { setFile } = props;
  const handleOnFileChange = files => {
    if (files.length === 1) {
      setFile(files[0]);
    } else {
      setFile('');
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      {/*<CmtImage src={'/images/ic_upload.png'} style={{ width: '50px' }} />*/}
      {/*<p style={{ marginTop: '10px' }}>*/}
      {/*  <b>Upload your file below</b>*/}
      {/*</p>*/}
      <Box width={'50%'} mt={2}>
        <DropzoneArea
          useChipsForPreview={true}
          showPreviewsInDropzone={false}
          showPreviews={true}
          filesLimit={1}
          onChange={files => handleOnFileChange(files)}
          acceptedFiles={['.csv', '.xlsx', '.xls']}
        />
      </Box>
    </Box>
  );
};
const ValidationPage = props => {
  const { complianceList } = props;
  function actionNumber({ rowIndex }) {
    return rowIndex + 1;
  }
  const multipleValues = ({ displayValue }) => {
    return displayValue.map((value, index) => <li key={index}>{value}</li>);
  };
  return (
    <>
      <DataGrid
        id="uploadedCompliance"
        columnAutoWidth={true}
        dataSource={complianceList}
        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        repaintChangesOnly={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}>
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <SearchPanel visible={true} />
        <Editing mode="cell" allowUpdating={true} allowDeleting={true} allowAdding={true} />
        <HeaderFilter visible={true} allowSearch={true} />
        <Column dataField="id" key="id" visible={false} />
        <Column caption="#" width={50} allowFiltering={false} cellRender={actionNumber} />
        <Column
          dataField="complianceTitle"
          minWidth={100}
          caption="Title"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="complianceDesc"
          minWidth={100}
          caption="Description"
          encodeHtml={false}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="authority"
          minWidth={100}
          caption="Authority"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="subsidiary"
          minWidth={100}
          caption="Subsidiary"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={subsidiariesList} displayExpr="subsidiaryName" valueExpr="subsidiaryName" />
        </Column>
        <Column
          dataField="department"
          minWidth={100}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={departmentList} displayExpr="deptName" valueExpr="deptName" />
        </Column>
        <Column
          dataField="section"
          minWidth={100}
          caption="Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={sectionsList} displayExpr="sectionName" valueExpr="sectionName" />
        </Column>
        <Column
          dataField="subSection"
          minWidth={100}
          caption="Sub-Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={subSectionList} displayExpr="subSectionName" valueExpr="subSectionName" />
        </Column>
        <Column
          dataField="penalty"
          minWidth={100}
          caption="Penalty"
          allowHeaderFiltering={true}
          allowSearch={true}
          // cellRender={multipleValues}
          allowFiltering={false}
        />
        <Column dataField="primaryOwner" minWidth={100} caption="Primary Owner" />
        <Column
          dataField="secondaryOwner"
          minWidth={100}
          caption="Secondary Owner"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="escalationPerson"
          minWidth={100}
          caption="Escalation Person"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="priority"
          minWidth={100}
          caption="Priority"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="frequency"
          minWidth={100}
          caption="Frequency"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="submissionDeadline"
          minWidth={100}
          caption="Submission Deadline"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="complianceType"
          minWidth={100}
          caption="Compliance Type"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="sourceDoc"
          minWidth={100}
          caption="Source Document"
          allowHeaderFiltering={true}
          allowSearch={true}
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

export default ImportLegalCompliance;
