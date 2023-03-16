import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Slide, TextField } from '@material-ui/core';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import AppSelectBox from '../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Autocomplete } from '@material-ui/lab';
import { fetchDepartmentsByCompany } from '../../../../../redux/actions/Departments';
import { useDispatch } from 'react-redux';
import { fetchSectionsByDepartment } from '../../../../../redux/actions/Sections';
const useStyles = makeStyles(theme => ({
  dialogRoot: {
    position: 'relative',
  },
  dialogHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  dialogTitleRoot: {
    '& .MuiTypography-h6': {
      fontSize: 16,
      color: theme.palette.common.white,
    },
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddEditSubSection = props => {
  const {
    openDialog,
    handleOnSave,
    onCloseDialog,
    currentSubSection,
    users,
    subsidiaries,
    filteredDepartments,
    filteredSections,
    subSectionDetails,
    setSubSectionDetails,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleOnSODChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({
        ...subSectionDetails,
        subSectionHeadId: value.id,
        subSectionHead: value.firstName + ' ' + value.lastName,
      });
    } else {
      setSubSectionDetails({ ...subSectionDetails, subSectionHeadId: '', subSectionHead: '' });
    }
  };
  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({ ...subSectionDetails, companyId: value.id, companyName: value.name });
    } else {
      setSubSectionDetails({ ...subSectionDetails, companyId: '', companyName: '' });
    }
  };
  const handleOnDepartmentChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({ ...subSectionDetails, departmentIds: value.id, departmentName: value.name });
    } else {
      setSubSectionDetails({ ...subSectionDetails, departmentsId: '', departmentName: '' });
    }
  };
  const handleOnSectionChange = (event, value) => {
    if (value !== null) {
      setSubSectionDetails({ ...subSectionDetails, sectionsId: value.id, sectionName: value.name });
    } else {
      setSubSectionDetails({ ...subSectionDetails, sectionsId: '', sectionName: '' });
    }
  };
  useEffect(() => {
    dispatch(fetchSectionsByDepartment(subSectionDetails.departmentsId));
  }, [subSectionDetails.departmentsId]);

  useEffect(() => {
    dispatch(fetchDepartmentsByCompany(subSectionDetails.companyId));
  }, [subSectionDetails.companyId]);

  return (
    <Dialog
      open={openDialog}
      maxWidth={'sm'}
      fullWidth={true}
      scroll={'body'}
      //onClose={onCloseDialog}
      TransitionComponent={Transition}
      className={classes.dialogRoot}>
      <div className={classes.dialogHeader}>
        <DialogTitle className={classes.dialogTitleRoot}>
          {currentSubSection ? 'Edit Sub Section Details' : 'Create New Sub Section'}
        </DialogTitle>
      </div>
      <DialogContent style={{ marginTop: 10 }}>
        <form onSubmit={handleOnSave}>
          <Box sx={{ width: '100%' }}>
            <GridContainer style={{ marginBottom: 12 }}>
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  fullWidth
                  required
                  variant="outlined"
                  label="Sub-section Name"
                  value={subSectionDetails.name}
                  onChange={e => setSubSectionDetails({ ...subSectionDetails, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={subsidiaries}
                  value={subsidiaries?.find(subsidiary => subsidiary.id === subSectionDetails.companyId)}
                  getOptionLabel={option => option.name}
                  onChange={handleOnSubsidiaryChange}
                  renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                  renderInput={params => (
                    <TextField required fullWidth size={'small'} variant={'outlined'} {...params} label="Subsidiary" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={filteredDepartments}
                  value={filteredDepartments?.find(department => department.id === subSectionDetails.departmentId)}
                  getOptionLabel={option => option.name}
                  onChange={handleOnDepartmentChange}
                  renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                  renderInput={params => (
                    <TextField required fullWidth size={'small'} variant={'outlined'} {...params} label="Department" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={filteredSections}
                  value={filteredSections?.find(section => section.id === subSectionDetails.sectionsId)}
                  getOptionLabel={option => option.name}
                  onChange={handleOnSectionChange}
                  renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                  renderInput={params => (
                    <TextField required fullWidth size={'small'} variant={'outlined'} {...params} label="Section" />
                  )}
                />
              </Grid>
              {currentSubSection && (
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    fullWidth
                    options={users}
                    value={users?.find(user => user.id === subSectionDetails.sectionHeadId)}
                    getOptionLabel={option => option.firstName + ' ' + option.lastName}
                    onChange={handleOnSODChange}
                    renderOption={(option, { selected }) => (
                      <span key={option.id}>
                        {option.firstName} {option.lastName}
                      </span>
                    )}
                    renderInput={params => (
                      <TextField fullWidth size={'small'} variant={'outlined'} {...params} label="Section Head" />
                    )}
                  />
                </Grid>
              )}
            </GridContainer>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button onClick={onCloseDialog} size="small" variant={'outlined'} color={'secondary'}>
              Cancel
            </Button>
            <Box ml={2}>
              <Button variant="contained" color="primary" size="small" type={'submit'}>
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSubSection;
