import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Slide, TextField } from '@material-ui/core';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Autocomplete } from '@material-ui/lab';
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

const AddEditDepartment = props => {
  const { openDialog, handleOnSave, onCloseDialog, currentDept, users, subsidiaries, deptDetails, setDeptDetails } = props;
  const classes = useStyles();

  const handleOnHODChange = (event, value) => {
    if (value !== null) {
      setDeptDetails({ ...deptDetails, departmentHeadId: value.id, departmentHead: value.firstName + ' ' + value.lastName });
    } else {
      setDeptDetails({ ...deptDetails, departmentHeadId: '', departmentHead: '' });
    }
  };
  const handleOnSubsidiaryChange = (event, value) => {
    if (value !== null) {
      setDeptDetails({ ...deptDetails, companyId: value.id, companyName: value.name });
    } else {
      setDeptDetails({ ...deptDetails, companyId: '', companyName: '' });
    }
  };

  return (
    <Dialog
      open={openDialog}
      maxWidth={'sm'}
      scroll={'body'}
      fullWidth={true}
      //onClose={onCloseDialog}
      TransitionComponent={Transition}
      className={classes.dialogRoot}>
      <div className={classes.dialogHeader}>
        <DialogTitle className={classes.dialogTitleRoot}>
          {currentDept ? 'Edit Department Details' : 'Create New Department'}
        </DialogTitle>
      </div>

      <DialogContent style={{ marginTop: 10 }}>
        <form onSubmit={handleOnSave}>
          <Box width={'100%'}>
            <GridContainer style={{ marginBottom: 12 }}>
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  fullWidth
                  required
                  variant="outlined"
                  label="Department Name"
                  value={deptDetails.name}
                  onChange={e => setDeptDetails({ ...deptDetails, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Description"
                  value={deptDetails.description}
                  onChange={e => setDeptDetails({ ...deptDetails, description: e.target.value })}
                />
              </Grid>
              {currentDept && (
                <Grid item xs={12} sm={12}>
                  <Autocomplete
                    fullWidth
                    options={users}
                    value={getAutoCompleteValue(users, deptDetails.departmentHeadId)}
                    getOptionLabel={option => option.firstName + ' ' + option.lastName}
                    disablePortal
                    onChange={handleOnHODChange}
                    renderOption={(option, { selected }) => (
                      <span key={option.id}>
                        {option.firstName} {option.lastName}
                      </span>
                    )}
                    renderInput={params => (
                      <TextField fullWidth size={'small'} variant={'outlined'} {...params} label="Department Head" />
                    )}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  fullWidth
                  options={subsidiaries}
                  value={getAutoCompleteValue(subsidiaries, deptDetails.companyId)}
                  getOptionLabel={option => option.name}
                  onChange={handleOnSubsidiaryChange}
                  renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                  renderInput={params => (
                    <TextField required fullWidth size={'small'} variant={'outlined'} {...params} label="Subsidiary" />
                  )}
                />
              </Grid>
            </GridContainer>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button variant={'outlined'} color={'secondary'} onClick={onCloseDialog} size="small">
              Cancel
            </Button>
            <Box ml={2}>
              <Button variant="contained" color="primary" type={'submit'} size="small">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditDepartment;
