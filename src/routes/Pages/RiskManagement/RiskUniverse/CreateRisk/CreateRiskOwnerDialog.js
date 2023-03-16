import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { fetchRiskOwners, fetchRiskOwnerTypes } from '../../../../../redux/actions/RiskOwners';
import { useDispatch } from 'react-redux';
import { addRiskOwner } from '../../../../../redux/actions/RiskOwners';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';
import { fetchUsers } from '../../../../../redux/actions/Users';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export default function CreateRiskOwnerDialog() {
  const dispatch = useDispatch();
  const { subsidiaries } = useSelector(subsidiaries => subsidiaries.subsidiaries);
  const { riskOwnerTypes } = useSelector(({ riskOwners }) => riskOwners);
  const { users } = useSelector(({ users }) => users);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const initialDetails = {
    name: '',
    email: '',
    phoneNumber: '',
    companyId: '',
    riskOwnerTypeId: '',
    user: '',
  };

  const [riskDetails, setRiskDetails] = React.useState(initialDetails);

  useEffect(() => {
    dispatch(fetchRiskOwnerTypes());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   onchange functions
  const handleNameChange = e => {
    setRiskDetails({ ...riskDetails, name: e.target.value });
  };
  const handleEmailChange = e => {
    setRiskDetails({ ...riskDetails, email: e.target.value });
  };
  const handlePhoneNumberChange = e => {
    setRiskDetails({ ...riskDetails, phoneNumber: e.target.value });
  };
  const handleSubsidiaryChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        companyId: value.id,
        companyName: value.name,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        companyId: null,
        companyName: '',
      });
    }
  };

  const handleRiskOwnerTypeIdChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        riskOwnerType: value.name,
        riskOwnerTypeId: value.id,
        user: '',
        name: '',
        email: '',
        phoneNumber: '',
        companyId: '',
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        riskOwnerType: '',
        riskOwnerTypeId: null,

      });
    }
  };

  const handleRiskUserChange = (e, value) => {
    if (value !== null) {
      setRiskDetails({
        ...riskDetails,
        user: value.id,
        name: `${value.firstName} ${value.lastName}`,
        email: value.email,
        phoneNumber: value.phoneNumber,
        companyId: value.companyId,
      });
    } else {
      setRiskDetails({
        ...riskDetails,
        // riskOwnerType: '',
        // riskOwnerTypeId: null,
      });
    }
  };

  const handleSubmit = async(e)=> {
    e.preventDefault();
    handleClose();
    await dispatch(addRiskOwner(riskDetails, () => handleClose()));
    await dispatch(fetchRiskOwners());
  };


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Risk Owner
      </Button>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Create Risk Owner'}</DialogTitle>
        <form className={classes.root} onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid item md={12} xs={12}>
                <Autocomplete
                  fullWidth
                  options={riskOwnerTypes}
                  value={getAutoCompleteValue(riskOwnerTypes, riskDetails.riskOwnerTypeId)}
                  getOptionLabel={option => option.ownerType}
                  onChange={handleRiskOwnerTypeIdChange}
                  renderOption={(option, { selected }) => <span key={option.id}>{option.ownerType}</span>}
                  renderInput={params => (
                    <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="RiskOwnerTypes" />
                  )}
                />
              </Grid>
              {riskDetails.riskOwnerTypeId === 7 ? (
                <>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={users}
                      value={getAutoCompleteValue(users, riskDetails.user)}
                      getOptionLabel={option => option.companyName}
                      onChange={handleRiskUserChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{`${option.firstName} ${option.lastName}`}</span>
                      )}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Users" />
                      )}
                    />
                  </Grid>
                  <>
                    <Grid item md={12} xs={12}>
                      <TextField
                        m="5px"
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={riskDetails.name}
                        onChange={handleNameChange}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={riskDetails.email}
                        onChange={handleEmailChange}
                      />
                    </Grid>
                  </>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="PhoneNumber"
                      variant="outlined"
                      value={riskDetails.phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={getAutoCompleteValue(subsidiaries, riskDetails.companyId)}
                      getOptionLabel={option => option.name}
                      onChange={handleSubsidiaryChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Subsidiary" />
                      )}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={12} xs={12}>
                    <TextField
                      m="5px"
                      fullWidth
                      label="Name"
                      variant="outlined"
                      value={riskDetails.name}
                      onChange={handleNameChange}
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={riskDetails.email}
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="PhoneNumber"
                      variant="outlined"
                      value={riskDetails.phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      fullWidth
                      options={subsidiaries}
                      value={getAutoCompleteValue(subsidiaries, riskDetails.companyId)}
                      getOptionLabel={option => option.name}
                      onChange={handleSubsidiaryChange}
                      renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Subsidiary" />
                      )}
                    />
                  </Grid>
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
