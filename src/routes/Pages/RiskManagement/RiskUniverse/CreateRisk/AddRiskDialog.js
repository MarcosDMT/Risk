import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import CreateRiskOwnerDialog from './CreateRiskOwnerDialog';
import { useSelector } from 'react-redux';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';
import { Box } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Chip,Typography } from '@mui/material';

export default function AddRiskDialog({ riskDetails, setRiskDetails }) {
  const [open, setOpen] = React.useState(false);

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value ) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const { riskOwners } = useSelector(riskOwners => riskOwners);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const checkOwnerSelected = (options, value) => {
    const check = getAutoCompleteValue(options, value.id);
    if (check) {
      return true;
    }
    return false;
  };

  // handle on check
  const handleOnCheck = (e, value) => {
    const { checked } = e.target;
    const data = [...riskDetails.riskOwners];
    const index = data.findIndex(val => val.id === value.id);
    if (checked) {
      data.push({
        id: value.id,
        name: value.name,
      });
    } else {
      data.splice(index, 1);
    }
    setRiskDetails({ ...riskDetails, riskOwners: data }); //
  };

  console.log("OWNERS ",riskOwners)

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        AddRiskOwner
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" onClick={handleClose} style={{cursor: 'pointer'}}>
          <CloseIcon />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CreateRiskOwnerDialog riskDetails={riskDetails} setRiskDetails={setRiskDetails} />
            <hr style={{ marginTop: '10px' }} />
            {/* {riskOwners.riskOwners.map((owner, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={checkOwnerSelected(riskDetails.riskOwners, owner)}
                      onChange={e => handleOnCheck(e, owner)}
                    />
                  }
                  label={owner.name}
                  labelPlacement="end"
                />
                {riskOwners.riskOwners?.map((owner,index) =>(
                  <ul key={index}>{owner?.organization?.map((org,index) =>(
                    <li key={index}>{org?.departmentName}</li>
                  ))}</ul>
                ))}
                <p>{owner.riskOwnerTypeOwnerType}</p>
              </div>
            ))} */}

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {riskOwners.riskOwners.map((owner, index) =>(
              <ListItem
              key={index}
              secondaryAction={
                <Chip label={owner.riskOwnerTypeOwnerType}/>
              }
              disablePadding
              
            >
           
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkOwnerSelected(riskDetails.riskOwners, owner)}
                    onChange= {e => handleOnCheck(e, owner)}
                    disableRipple
                    inputProps={{ 'aria-labelledby':`checkbox-list-label-${index}` }}
                  />
                </ListItemIcon>
                
                <ListItemText id={`checkbox-list-label-${index}`} primary={owner.name} secondary={
                  <Typography variant={'caption'}>
                    {owner?.organization?.map((org,index) => org.departmentName +' | ')}
                  </Typography>
                } />
              
            
            </ListItem>
            ))}
            </List>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
