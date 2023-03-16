import React,{useState} from 'react';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import { Box, Button, Grid } from '@mui/material';
import { Autocomplete } from '@material-ui/lab';
import { InputAdornment, MenuItem, TextField } from '@material-ui/core';
import AppTextInput from '../../../../../../@jumbo/components/Common/formElements/AppTextInput';
import AppSelectBox from '../../../../../../@jumbo/components/Common/formElements/AppSelectBox';
import { useSelector } from 'react-redux';
import { DatePicker } from '@material-ui/pickers';

const options = ['Both', 'Quantitative', 'Qualitative'];
const ControlsImpactStatus = props => {
  const { riskDetails, setRiskDetails, index, handleOnSaveAction } = props;
  const { currencies, priorities, complianceFrequencies } = useSelector(({ utils }) => utils);
  const [selectedActionDate, setSelectedActionDate] = useState(new Date());

  const handleOnDateChange = e => {
    const { name, value } = e.target;
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      [name]: value,
      complianceDetails: {
        ...data[index].complianceDetails,
        submissionDeadline: value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handlePenaltyTypeChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        penaltyTypeName: values,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handlePriorityChange = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        priority: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };
  const handlePenalty = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        penalty: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };
  const handleNarrative = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        penaltyNarrative: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };

  const handlePenaltyCurrency = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        penaltyCurrency: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };

  const handleFrequencyChange = e => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        frequencyId: e.target.value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  return (
    <>
      <GridContainer>
        <Grid item md={12} xs={12}>
          <Autocomplete
            fullWidth
            options={options}
            value={riskDetails?.additionalControlActions[index]?.complianceDetails.penaltyTypeName}
            getOptionLabel={option => option}
            onChange={handlePenaltyTypeChange}
            renderInput={params => (
              <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Penalty Type" />
            )}
          />
        </Grid>
        {riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyTypeName === options[0] && (
          <>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Penalty"
                type={'number'}
                variant="outlined"
                value={riskDetails?.additionalControlActions[index]?.complianceDetails?.penalty}
                onChange={handlePenalty}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextField
                        select
                        style={{ width: '90px' }}
                        label=""
                        value={riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyCurrency}
                        onChange={handlePenaltyCurrency}
                        InputProps={{
                          disableUnderline: true,
                        }}>
                        {currencies.map(option => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <AppTextInput
                fullWidth
                multiline
                minRows={4}
                variant="outlined"
                label={'Narrative'}
                value={riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyNarrative}
                onChange={handleNarrative}
              />
            </Grid>
          </>
        )}
        {riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyTypeName === options[1] && (
          <Grid item md={12} xs={12}>
            <TextField
              fullWidth
              label="Penalty"
              type={'number'}
              variant="outlined"
              value={riskDetails?.additionalControlActions[index]?.complianceDetails?.penalty}
              onChange={handlePenalty}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextField
                      select
                      style={{ width: '90px' }}
                      label=""
                      value={riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyCurrency}
                      onChange={handlePenaltyCurrency}
                      InputProps={{
                        disableUnderline: true,
                      }}>
                      {currencies.map(option => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}
        {riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyTypeName === options[2] && (
          <Grid item md={12} xs={12}>
            <AppTextInput
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              label={'Narrative'}
              value={riskDetails?.additionalControlActions[index]?.complianceDetails?.penaltyNarrative}
              onChange={e =>
                setRiskDetails({
                  ...riskDetails,
                  complianceDetails: {
                    ...riskDetails.complianceDetails,
                    penaltyNarrative: e.target.value,
                  },
                })
              }
            />
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          <AppSelectBox
            fullWidth
            data={priorities}
            label="Priority"
            valueKey="name"
            variant="outlined"
            labelKey="name"
            value={riskDetails?.additionalControlActions[index]?.complianceDetails.priority}
            onChange={handlePriorityChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <AppSelectBox
            fullWidth
            data={complianceFrequencies}
            label="Frequency"
            valueKey="id"
            variant="outlined"
            labelKey="name"
            value={riskDetails?.additionalControlActions[index]?.complianceDetails.frequencyId}
            onChange={handleFrequencyChange}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          {/* <DatePicker
            autoOk
            fullWidth
            clearable
            inputVariant={'outlined'}
            label="Action Date"
            onChange={date => {
              setSelectedActionDate(date);
            }}
            value={riskDetails?.additionalControlActions[index].actionDate !== '' ? riskDetails.additionalControlActions[index].actionDate : selectedActionDate}
            format="DD-MM-yyyy"
            animateYearScrolling
          /> */}
          <TextField
            label={'Action Date'}
            name="actionDate"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleOnDateChange}
            fullWidth
            type="date"
            value={riskDetails?.additionalControlActions[index]?.actionDate}
            variant="outlined"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant={'outlined'} onClick={handleOnSaveAction}>
              Save Action
            </Button>
          </Box>
        </Grid>
      </GridContainer>
    </>
  );
};

export default ControlsImpactStatus;
