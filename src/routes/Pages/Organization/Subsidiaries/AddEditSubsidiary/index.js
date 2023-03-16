import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Slide } from '@material-ui/core';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../@jumbo/components/Common/formElements/AppTextInput';
import makeStyles from '@material-ui/core/styles/makeStyles';
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

const AddEditSubsidiary = props => {
  const {
    openDialog,
    handleOnSave,
    onCloseDialog,
    currentSubsidiary,
    users,
    subsidiaryDetails,
    setSubsidiaryDetails,
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={openDialog}
      //onClose={onCloseDialog}
      scroll={'body'}
      TransitionComponent={Transition}
      className={classes.dialogRoot}>
      <div className={classes.dialogHeader}>
        <DialogTitle className={classes.dialogTitleRoot}>
          {currentSubsidiary ? 'Edit Subsidiary Details' : 'Create New Subsidiary'}
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
                  label="Subsidiary Name"
                  value={subsidiaryDetails.name}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  fullWidth
                  multiline={true}
                  minRows={3}
                  variant="outlined"
                  label="Description"
                  value={subsidiaryDetails.description}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Country"
                  value={subsidiaryDetails.country}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, country: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="City"
                  value={subsidiaryDetails.city}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, city: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Street"
                  value={subsidiaryDetails.street}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, street: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Address"
                  value={subsidiaryDetails.address}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Mission"
                  multiline={true}
                  minRows={3}
                  value={subsidiaryDetails.mission}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, mission: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  multiline={true}
                  minRows={3}
                  label="Vision"
                  value={subsidiaryDetails.vision}
                  onChange={e => setSubsidiaryDetails({ ...subsidiaryDetails, vision: e.target.value })}
                />
              </Grid>
            </GridContainer>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button onClick={onCloseDialog} variant={'outlined'} color={'secondary'} size="small">
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

export default AddEditSubsidiary;
