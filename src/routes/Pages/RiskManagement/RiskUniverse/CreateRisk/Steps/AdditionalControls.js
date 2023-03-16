import React, { useCallback, useEffect } from 'react';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { Add, CheckBoxOutlineBlank, CheckBoxOutlined, Delete, Edit } from '@mui/icons-material';
import { Checkbox, Chip, MenuItem, TextField } from '@material-ui/core';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import AppTextInput from '../../../../../../@jumbo/components/Common/formElements/AppTextInput';
import { Autocomplete } from '@material-ui/lab';
import { getAutoCompleteValue } from '../../../../../../@jumbo/utils/commonHelper';
import { useSelector } from 'react-redux';

const complianceTypes = [
  { id: 1, name: 'Statutory Compliance' },
  { id: 2, name: 'Legal Compliance' },
  { id: 3, name: 'Enterprise Compliance' },
];
const sourceDocsOptions = [
  { id: 1, label: 'True', value: true },
  { id: 1, label: 'False', value: false },
];

const AdditionalControls = props => {
  const { riskDetails, setRiskDetails, activeIndex, setActiveIndex, handleAddAction, handleRemoveAction } = props;

  const handleOnActionClick = index => {
    setActiveIndex(index);
  };

  return (
    <>
      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <ActionItems
          {...{
            riskDetails,
            handleOnClick: handleOnActionClick,
            handleOnRemove: handleRemoveAction,
          }}
        />
        <ActionForm
          {...{
            riskDetails,
            setRiskDetails,
            index: activeIndex,
            handleOnAdd: handleAddAction,
          }}
        />
      </Box>
    </>
  );
};

const ActionItems = props => {
  const { riskDetails, handleOnClick, handleOnRemove } = props;

  return (
    <>
      {riskDetails.additionalControlActions &&
        riskDetails.additionalControlActions?.map((act, index) => {
          if (act.action === '' || act.action === null) {
            return null;
          }
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              key={index}>
              <Typography>{act.action}</Typography>

              <Box>
                <IconButton onClick={e => handleOnClick(index)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={e => handleOnRemove(index)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}
    </>
  );
};
const ActionForm = props => {
  const { riskDetails, setRiskDetails, index, handleOnAdd } = props;
  const { statutoryComplianceData } = useSelector(({ compliance }) => compliance);
  console.log('HAS SUB ', statutoryComplianceData);

  // filter hasSubCompliance is true
  const hasSubComplianceData = statutoryComplianceData.filter(data => data.hasSubCompliance === true);

  const handleOnComplianceType = e => {
    const { name, value } = e.target;
    let data = riskDetails.additionalControlActions;
    data[index] = { ...data[index], [name]: value };
    setRiskDetails({ ...riskDetails, complianceType: data });
  };
  const handleOnChange = e => {
    const { name, value } = e.target;
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      [name]: value,
      complianceDetails: {
        ...data[index].complianceDetails,
        title: value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleDescriptionChange = e => {
    const data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        [e.target.name]: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleAuthorityChange = e => {
    const data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        [e.target.name]: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleComplianceOption = (e, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        subId: values.id,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleAttachment = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        hasAttachment: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  return (
    <>
      <GridContainer>
        <Grid item sm={12} xs={12} md={12}>
          <Box
            sx={{
              width: '100%',
              height: '50px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'primary.main',
            }}>
            <Typography>{'Add Action'}</Typography>
            <IconButton onClick={handleOnAdd}>
              <Add />
            </IconButton>
          </Box>
        </Grid>
        {index !== null && (
          <>
            <Grid item sm={12} xs={12} md={12}>
              <TextField
                required
                onChange={handleOnComplianceType}
                label="Assign additional controls to compliance type"
                name="complianceType"
                fullWidth
                select
                value={riskDetails?.additionalControlActions[index]?.complianceType}
                variant="outlined">
                {complianceTypes?.map((option, index) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <TextField
                name="action"
                fullWidth
                label="Additional controls title"
                type="text"
                onChange={handleOnChange}
                value={riskDetails?.additionalControlActions[index]?.action}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <TextField
                fullWidth
                multiline
                name="description"
                minRows={4}
                variant="outlined"
                label={'Additional Controls Description'}
                value={riskDetails?.additionalControlActions[index]?.complianceDetails.description}
                onChange={handleDescriptionChange}
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <AppTextInput
                fullWidth
                variant="outlined"
                name="authority"
                label="Authority"
                value={riskDetails?.additionalControlActions[index]?.complianceDetails.authority}
                onChange={handleAuthorityChange}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={12}>
              <TextField
                required
                onChange={handleAttachment}
                label="Support documentation"
                fullWidth
                select
                value={riskDetails?.additionalControlActions[index]?.complianceDetails.hasAttachment}
                variant="outlined">
                <MenuItem value={false}>Not Required</MenuItem>
                <MenuItem value={true}>Required</MenuItem>
                {/* {sourceDocsOptions?.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))} */}
              </TextField>
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <Autocomplete
                fullWidth
                options={hasSubComplianceData}
                value={getAutoCompleteValue(
                  hasSubComplianceData,
                  riskDetails?.additionalControlActions[index]?.complianceDetails?.subId,
                )}
                getOptionLabel={option => option.title}
                onChange={handleComplianceOption}
                renderOption={(option, { selected }) => <span key={option.id}>{option.title}</span>}
                renderInput={params => (
                  <TextField
                    fullWidth
                    {...params}
                    size={'small'}
                    variant={'outlined'}
                    label="Link additional controls to an existing compliance requirement"
                  />
                )}
              />
            </Grid>
          </>
        )}
      </GridContainer>
    </>
  );
};

export default AdditionalControls;
