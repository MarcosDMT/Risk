import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Slide } from '@material-ui/core';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ColorPickerPopup from '../../../../@jumbo/components/Common/ColorPickerPopup';
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

const AddEditParam = props => {
  const { openDialog, handleOnSave, itemName, onCloseDialog, currentItem, selectedItem, setSelectedItem } = props;
  const [color, setColor] = useState(currentItem ? selectedItem.color : '#333333');
  const classes = useStyles();
  useEffect(() => {
    if (currentItem) {
      setColor(selectedItem.color);
    }
  }, [currentItem]);
  useEffect(() => {
    if (color !== undefined) {
      setSelectedItem({ ...selectedItem, color: color });
    }
  }, [color]);
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={openDialog}
      onClose={onCloseDialog}
      TransitionComponent={Transition}
      className={classes.dialogRoot}>
      <div className={classes.dialogHeader}>
        <DialogTitle className={classes.dialogTitleRoot}>
          {itemName}: {currentItem ? `Edit Details` : `Create New Item`}
        </DialogTitle>
      </div>
      <DialogContent style={{ marginTop: 10 }}>
        <form onSubmit={handleOnSave}>
          <Box sx={{ width: '100%' }}>
            <GridContainer style={{ marginBottom: 12 }}>
              <Grid item xs={selectedItem.color !== undefined ? 10 : 12} sm={selectedItem.color !== undefined ? 10 : 12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Name"
                  value={selectedItem.name}
                  onChange={e => setSelectedItem({ ...selectedItem, name: e.target.value })}
                />
              </Grid>
              {selectedItem.color !== undefined && (
                <Grid item xs={2} sm={2}>
                  <ColorPickerPopup color={color} setColor={setColor} />
                </Grid>
              )}
              <Grid item md={12} sm={12}>
                <AppTextInput
                  fullWidth
                  variant="outlined"
                  label="Description"
                  value={selectedItem.description}
                  onChange={e => setSelectedItem({ ...selectedItem, description: e.target.value })}
                />
              </Grid>
            </GridContainer>
          </Box>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button onClick={onCloseDialog} size="small">
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

export default AddEditParam;
