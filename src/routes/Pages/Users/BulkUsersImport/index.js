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
import CmtImage from '../../../../@coremat/CmtImage';
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
import { departmentList, sectionsList, subSectionList, subsidiariesList } from '../../Organization/dummyData';
import { rolesList } from '../../Roles/dummyData';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getSteps() {
  return ['Download Template', 'Upload File', 'Validation & Confirmation'];
}

const ImportUsers = props => {
  const { openDialog, onCloseDialog, setActiveStep, activeStep, file, setFile, users } = props;
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
          <DialogTitle className={classes.dialogTitleRoot}>Users Bulk Import</DialogTitle>
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
                      <b>Users created successfully!</b>
                    </p>
                    <p>Credentials have been sent to the respective users!</p>
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
                          <ValidationPage {...{ users }} />
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
  const { users } = props;
  function actionNumber({ rowIndex }) {
    return rowIndex + 1;
  }
  return (
    <>
      <DataGrid
        id="uploadedUsers"
        columnAutoWidth={true}
        dataSource={users}
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
          dataField="firstName"
          minWidth={100}
          caption="First Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <RequiredRule />
        </Column>
        <Column
          dataField="lastName"
          minWidth={100}
          caption="Last Name"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <RequiredRule />
        </Column>
        <Column
          dataField="email"
          minWidth={100}
          caption="Email Address"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <RequiredRule />
          <EmailRule />
        </Column>
        <Column
          dataField="phoneNumber"
          minWidth={100}
          caption="PhoneNumber"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <RequiredRule />
        </Column>
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
          <RequiredRule />
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
          dataField="role"
          minWidth={100}
          caption="Role"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}>
          <Lookup dataSource={rolesList} displayExpr="name" valueExpr="name" />
          <RequiredRule />
        </Column>
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
export default ImportUsers;