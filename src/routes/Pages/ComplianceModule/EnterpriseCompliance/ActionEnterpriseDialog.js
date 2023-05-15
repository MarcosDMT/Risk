import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { convertToBase64, getFileExtension } from '../../../../@jumbo/utils/fileHelper';
import {
  complyEnterpriseCompliance,
  fetchEnterpriseCompliance,
  fetchEnterpriseComplianceComplied,
  fetchEnterpriseComplianceMain,
} from '../../../../redux/actions/Compliance';
import { useDispatch } from 'react-redux';
import { fetchEnterpriseComplianceSub } from '../../../../redux/actions/Compliance';

const ActionEnterpriseDialog = props => {
  const { open, onClose, compliance } = props;
  const dispatch = useDispatch();
  const initialValues = {
    id: null,
    action: 1,
    documentUrl: null,
    reason: '',
    additionalPenalty: null,
    penaltyNarrative: null,
    actionsTaken: null,
  };
  const [formDetails, setFormDetails] = useState(initialValues);
  const complianceAction = compliance?.obligationStatus === 2 ? 1 : 2;
  const handleOnFileChange = async e => {
    const file = e.target.files[0];
    const fileName = file.name;
    const fileExt = '.' + getFileExtension(fileName);
    const baseUrl = await convertToBase64(file);
    setFormDetails({
      ...formDetails,
      documentUrl: {
        name: fileName,
        extension: fileExt,
        data: baseUrl,
      },
    });
  };
  const handleOnChange = e => {
    setFormDetails({
      ...formDetails,
      reason: e.target.value,
    });
  };
  const handleOnSubmit = async e => {
    e.preventDefault();
    await dispatch(complyEnterpriseCompliance(formDetails, () => onClose()));
    await dispatch(fetchEnterpriseComplianceSub(compliance?.mainId));
  };
  useEffect(() => {
    setFormDetails({
      ...formDetails,
      id: compliance?.id,
      action: complianceAction,
    });
  }, [compliance]);

  const getContent = () => {
    if (complianceAction === 1) {
      return (
        <>
          <Typography>Are you sure you want to comply now?</Typography>
          <TextField
            margin={'normal'}
            fullWidth
            type={'file'}
            required={compliance?.hasAttachment}
            helperText={'Please attach supporting document'}
            onChange={handleOnFileChange}
          />
        </>
      );
    }
    return (
      <>
        <Typography>Are you sure you want to waive now?</Typography>
        <TextField
          margin={'normal'}
          fullWidth
          minRows={4}
          label={'Reason'}
          type={'text'}
          value={formDetails.reason}
          onChange={handleOnChange}
        />
        <TextField
          margin={'normal'}
          fullWidth
          required={true}
          type={'file'}
          // value ={formDetails.file}
          onChange={handleOnFileChange}
        />
      </>
    );
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth={'sm'} fullWidth={true}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography color={'primary.main'} variant={'h6'}>
              Confirmation
            </Typography>
            <IconButton color={'primary'} onClick={() => onClose()}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleOnSubmit}>
            <Box>{getContent()}</Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
              <Button variant={'outlined'} sx={{ mr: 2 }} type={'submit'}>
                Yes, Proceed
              </Button>
              <Button variant={'contained'} onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionEnterpriseDialog;
