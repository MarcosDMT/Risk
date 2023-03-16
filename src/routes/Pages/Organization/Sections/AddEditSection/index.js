import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Slide, TextField } from '@material-ui/core';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Autocomplete } from '@material-ui/lab';
import { fetchDepartmentsByCompany } from '../../../../../redux/actions/Departments';
import { useDispatch } from 'react-redux';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';
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

const AddEditSection = props => {
  const {
    openDialog,
    handleOnSave,
    onCloseDialog,
    currentSection,
    users,
    subsidiaries,
    filteredDepartments,
    sectionDetails,
    setSectionDetails,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleOnSODChange = (event, value) => {
    if (value !== null) {
      setSectionDetails({ ...sectionDetails, sectionHeadId: value.id, sectionHead: value.firstName + ' ' + value.lastName });
    } else {
      setSectionDetails({ ...sectionDetails, sectionHeadId: '', sectionHead: '' });
    }
  };
  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setSectionDetails({ ...sectionDetails, companyId: value.id, companyName: value.name });
    } else {
      setSectionDetails({ ...sectionDetails, companyId: '', companyName: '' });
    }
  };
  const handleOnDepartmentChange = (event, value) => {
    if (value !== null) {
      setSectionDetails({ ...sectionDetails, departmentsId: value.id, departmentsName: value.name });
    } else {
      setSectionDetails({ ...sectionDetails, departmentsId: '', departmentsName: '' });
    }
  };
  useEffect(() => {
    dispatch(fetchDepartmentsByCompany(sectionDetails.companyId));
  }, [sectionDetails.companyId]);
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
          {currentSection ? 'Edit Section Details' : 'Create New Section'}
        </DialogTitle>
      </div>
      <DialogContent style={{ marginTop: 10 }}>
        <form onSubmit={handleOnSave}>
          <Box sx={{ width: '100%' }}>
            <GridContainer style={{ marginBottom: 12 }}>
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Section Name"
                  required
                  value={sectionDetails.name}
                  onChange={e => setSectionDetails({ ...sectionDetails, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={subsidiaries}
                  value={getAutoCompleteValue(subsidiaries, sectionDetails.companyId)}
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
                  value={getAutoCompleteValue(filteredDepartments, sectionDetails.departmentsId)}
                  getOptionLabel={option => option.name}
                  onChange={handleOnDepartmentChange}
                  renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                  renderInput={params => (
                    <TextField required fullWidth size={'small'} variant={'outlined'} {...params} label="Department" />
                  )}
                />
              </Grid>
              {currentSection && (
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    fullWidth
                    options={users}
                    value={getAutoCompleteValue(users, sectionDetails.sectionHeadId)}
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
              <Button variant="contained" type={'submit'} color="primary" size="small">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditSection;
