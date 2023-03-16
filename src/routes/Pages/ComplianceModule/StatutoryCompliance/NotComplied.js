import React, { useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import { Grid, TextField } from '@material-ui/core';
import './app.css'
import {
  Column,
  ColumnChooser,
  FilterPanel,
  FilterRow,
  HeaderFilter,
  Item,
  Pager,
  Paging,
  Scrolling,
  SearchPanel,
  StateStoring,
  Toolbar,
  Selection,
} from 'devextreme-react/data-grid';
import { Link } from 'react-router-dom';
import { Chip } from '@material-ui/core';
import { FileUpload } from '@mui/icons-material';
import { DataGrid } from 'devextreme-react';
import useStyles from '../../index.style';
import { AddCircle, Cancel, Delete, Edit, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import { getAccountStatus, getComplianceStatus } from '../../../../@jumbo/utils/commonHelper';
import { fetchCompliances } from '../../../../redux/actions/Compliance';
import { complyCompliance } from '../../../../redux/actions/Compliance';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { fetchHistory } from '../../../../redux/actions/Compliance';


const getActions = data => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'edit', label: 'Edit', icon: <Edit /> },
  ];
  actions.push({ action: 'delete', label: 'Delete', icon: <Delete /> });
  return actions;
};

function AlertDialog({ data }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { statutoryCompliances } = useSelector(({ compliance }) => compliance);
  const [checked, setChecked] = React.useState(false);
  let initialdetails = {

    id: data.id,
    action: 0,
    documentUrl:{
      name: "",
      extension: "",
      data: "",
    },
    reason: "",
    additionalPenalty: null,
    penaltyNarrative: "",
    actionsTaken:[]
  }
  let [formDetails,setFormDetails] = React.useState(initialdetails);
  const fileInput = useRef(null);

  // Convert base 64 function
  const convertBase64 = (file) =>{
    return new Promise(resolve =>{
      let fileInfo;
      let baseUrl = ""

      let reader = new FileReader();

      // convert file to base64
      reader.readAsDataURL(file);

      reader.onload = () =>{
        // console.log("Called", reader);
        baseUrl = reader.result;

        // get file extension
        const fileExtension = '.' + file.name.split('.').pop();
        setFormDetails({
          ...formDetails,
          action: 1,
          documentUrl: {name : file.name, extension: fileExtension, data: baseUrl}
        })
        resolve(baseUrl);
      }
    })
  }

  // FORM ONCHANGE EVENTS
  const handleFileRead = (e) =>{
    const file = e.target.files[0]
    console.log("This is the file ",file)
    const base64 = convertBase64(file) 
  }

  const handleReasonChange = (e) =>{
      setFormDetails({
        ...formDetails,
        action: 2,
        reason: e.target.value,
      })
    }

  const handleNarrativeChange = (e) =>{
      setFormDetails({
        ...formDetails,
        action: 2,
        penaltyNarrative: e.target.value,
      })
    }

  const handleCheck = e => {
    setChecked(e.target.checked);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // COMPLY FUNCTION
  const handleComply = () => {
    const formData = { 
      ...formDetails
     };
    dispatch(complyCompliance(formData));
    dispatch(fetchCompliances());
    handleClose();
    console.log(formData);
  };

  // WAIVE FUNCTION
  const handleWaive = () => {
    const formData = { 
      ...formDetails
     };
    dispatch(complyCompliance(formData));
    dispatch(fetchCompliances());
    handleClose();
    console.log(formData);
  };


  return (
    <div>
      <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
        Comply
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          {data.hasAttachment === false ? (
            <>
              <FormControlLabel
                onChange={handleCheck}
                value="start"
                control={<Checkbox color="primary" />}
                label="Waive"
                labelPlacement="start"
              />
              <br />

              {checked ? (
                <>
                  <TextField onChange={handleFileRead} fullWidth style={{ marginBottom: '10px' }} type="file" variant="outlined"></TextField>
                  <TextField
                    style={{ marginBottom: '8px' }}
                    fullWidth
                    label="Reason"
                    multiline
                    rows={4}
                    onChange={handleReasonChange}
                    variant="outlined"></TextField>

                  {data.penaltyTypeName === 'Both' ? (
                    <>
                      <TextField
                        style={{ marginBottom: '8px' }}
                       onChange={handleNarrativeChange} fullWidth label="Narrative" multiline rows={4} variant="outlined"></TextField>
                      <TextField onChange={handleNarrativeChange} fullWidth type={'number'} label="Amount" variant="outlined"></TextField>
                    </>
                  ) : (
                    ''
                  )}
                  {data.penaltyTypeName === 'Qualitative' ? (
                    <TextField onChange={handleNarrativeChange} fullWidth label="Narrative" multiline rows={4} variant="outlined"></TextField>
                  ) : (
                    ''
                  )}
                  {data.penaltyTypeName === 'Quantitative' ? (
                    <TextField
                      style={{ marginBottom: '8px' }}
                      fullWidth
                      type={'number'}
                      label="Amount"
                      onChange={handleNarrativeChange}
                      variant="outlined"></TextField>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}
          {data.hasAttachment === true ? (
            <>
              <p style={{ color: 'red', textAlign: 'center', marginBottom: '8px' }}>
                Compliance needs a supporting document!
              </p>
              <Grid item md={12} xs={12}>
                <FormControlLabel
                  onChange={handleCheck}
                  value="start"
                  control={<Checkbox color="primary" />}
                  label="Waive"
                  labelPlacement="start"
                />
                <br />
                <TextField onChange={handleFileRead} fullWidth style={{ marginBottom: '10px' }} type="file" variant="outlined"></TextField>
                <br />
                {checked ? (
                  <>
                    <TextField
                      style={{ marginBottom: '8px' }}
                      fullWidth
                      label="Reason"
                      name="reason"
                      multiline
                      rows={4}
                      onChange={handleReasonChange}
                      value={formDetails.reason}
                      variant="outlined"></TextField>
                    <br />
                  </>
                ) : (
                  ''
                )}
                {checked ? (
                  <>
                    {data.penaltyTypeName === 'Both' ? (
                      <>
                        <TextField onChange={handleNarrativeChange} value={formDetails.penaltyNarrative} name="narrative" fullWidth label="Narrative" multiline rows={4} variant="outlined"></TextField>
                        <TextField onChange={handleNarrativeChange} value={formDetails.penaltyTypeName} name="quantitative" fullWidth type={'number'} label="Amount" variant="outlined"></TextField>
                      </>
                    ) : (
                      ''
                    )}
                    {data.penaltyTypeName === 'Qualitative' ? (
                      <TextField style={{ marginBottom: '8px' }} onChange={handleNarrativeChange} name="narrative" fullWidth label="Narrative" multiline rows={4} variant="outlined"></TextField>
                    ) : (
                      ''
                    )}
                    {data.penaltyTypeName === 'Quantitative' ? (
                      <TextField
                        style={{ marginBottom: '8px', marginTop: '8px'}}
                        fullWidth
                        name="quantitative"
                        type={'number'}
                        label="Amount"
                        onChange={handleNarrativeChange}
                        variant="outlined"></TextField>
                    ) : (
                      ''
                    )}
                    <br />
                  </>
                ) : (
                  ''
                )}
              </Grid>
            </>
          ) : (
            ''
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '8px' }}>
            {checked ? (
              <Button onClick={handleWaive} variant="contained" color="primary">
                Waive
              </Button>
            ) : (
              <Button disabled onClick={handleWaive} variant="outlined" color="primary">
                Waive
              </Button>
            )}

            <Button onClick={() => handleComply(data)} variant="contained" color="primary" autoFocus>
              Comply
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const NotComplied = props => {
  const [background,setBackground] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { statutoryComplianceHistory } = useSelector(({ compliance }) => compliance);

  useEffect(() =>{
    dispatch(fetchHistory());
  },[])
  console.log(statutoryComplianceHistory)


  const { breadCrumbsTitle, setOpenDialog, onViewCompliance, onUpdateCompliance, onDeleteCompliance } = props;

  function complyStatus({ data }) {
    return (
      <>
        <AlertDialog data={data} />
      </>
    );
  }

  function actionStatus({ displayValue }) {
    let status = getAccountStatus(displayValue);
    return (
      <Chip
        style={{ color: status.color, borderColor: status.color }}
        size={'small'}
        variant={'outlined'}
        label={status.label}
      />
    );
  }

  function complianceStatus({ displayValue }) {
    let status = getComplianceStatus(displayValue);
    
    return (
      <Chip
        style={{ color: status.color, borderColor: status.color }}
        size={'small'}
        variant={'outlined'}
        label={status.label}
      />
    );
  }

  const onMenuClick = (menu, data) => {
    if (menu.action === 'view') {
      onViewCompliance(data);
    } else if (menu.action === 'edit') {
      onUpdateCompliance(data);
    } else if (menu.action === 'delete') {
      onDeleteCompliance(data);
    }
  };
  function actionLink({ data, rowIndex }) {
    return (
      <CmtDropdownMenu
        items={userActions(data)}
        onItemClick={menu => onMenuClick(menu, data)}
        TriggerComponent={<MoreHoriz />}
      />
    );
  }
  function actionViewLink({ data, displayValue }) {
    return (
      <a
        href={'#'}
        onClick={e => {
          e.preventDefault();
          onViewCompliance(data);
        }}>
        {displayValue}
      </a>
    );
  }

  const userActions = data => getActions(data);
  const multipleValueDepartments = ({ displayValue }) => {
    return displayValue?.map((value, index) => <span key={index}>{value.departmentName}</span>);
  };
  const multipleValueSections = ({ displayValue }) => {
    return displayValue?.map((value, index) => <span key={index}>{value.sectionName}</span>);
  };
  const multipleValueSubsection = ({ displayValue }) => {
    return displayValue?.map((value, index) => <span key={index}>{value.subSectionName}</span>);
  };

  const expandedRowKeys = [1];

  return (
    <>
      <DataGrid
        dataSource={statutoryComplianceHistory}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        defaultExpandedRowKeys={expandedRowKeys}
        keyExpr="id"
        parentIdExpr="mainId">
        <Selection mode="single" />
        <SearchPanel visible={true} />
        <FilterRow visible={true} />
        <FilterPanel visible={true} />
        <HeaderFilter visible={true} />
        <Column
          // dataField="title"
          width={150}
          // caption={'Approval Status'}
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={complyStatus}
          allowFiltering={false}
        />
        <Column
          dataField="title"
          width={150}
          caption={'Obligation Title'}
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={actionViewLink}
          allowFiltering={false}
        />
        <Column
          dataField="obligationStatus"
          width={150}
          caption={'Compliance Status'}
          allowHeaderFiltering={true}
          allowSearch={true}
          cellRender={complianceStatus}
          allowFiltering={false}
        />
        <Column
          dataField="description"
          width={200}
          encodeHtml={false}
          caption="Obligation Description"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="active"
          minWidth={100}
          caption="Status"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          allowHiding={true}
          cellRender={actionStatus}
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
          dataField="companyName"
          minWidth={100}
          caption="Company"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Department"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={multipleValueDepartments}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={multipleValueSections}
        />
        <Column
          dataField="organization"
          minWidth={100}
          caption="Sub-Section"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
          cellRender={multipleValueSubsection}
        />
        <Column
          dataField="penalty"
          minWidth={100}
          caption="Penalty"
          allowHeaderFiltering={true}
          allowSearch={true}
          // cellRender={multipleValues}
          allowFiltering={false}
        />
        <Column dataField="primaryOwnerName" minWidth={100} caption="Primary Owner" />
        <Column
          dataField="secondaryOwnerName"
          minWidth={100}
          caption="Secondary Owner"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="escalationOwnerName"
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
          caption={'Submission Deadline'}
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column
          dataField="sourceDoc"
          minWidth={100}
          visible={false}
          caption="Source Document"
          allowHeaderFiltering={true}
          allowSearch={true}
          allowFiltering={false}
        />
        <Column caption="Action" width={120} alignment={'center'} allowFiltering={false} cellRender={actionLink} />
        <Toolbar>
          {/* <Item location="before">
            <Link to={`statutory-compliance/create`}>
              <Button
                variant="contained"
                size={'small'}
                className={classes.btn}
                color="primary"
                style={{ marginBottom: '10px' }}>
                <AddCircle /> Create {breadCrumbsTitle}
              </Button>
            </Link>
          </Item> */}
          {/* <Item location="before">
            <Button
              variant="contained"
              size={'small'}
              className={classes.btn}
              onClick={e => setOpenDialog(true)}
              color="primary"
              style={{ marginBottom: '10px' }}>
              <FileUpload /> Import {breadCrumbsTitle}
            </Button>
          </Item> */}
          <Item location="after" name="columnChooserButton" />
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default NotComplied;