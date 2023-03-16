import React, { useState } from 'react';
import { Box, Button, Checkbox, Grid, TextField } from '@material-ui/core';
import { Chip } from '@mui/material';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { getAutoCompleteValue } from '../../../../../../@jumbo/utils/commonHelper';
import { AddCircle } from '@material-ui/icons';
import { RiskAddDepartment } from '../RiskAddDepartment';
import { useDispatch, useSelector } from 'react-redux';
import GridContainer from '../../../../../../@jumbo/components/GridContainer';
import { fetchError } from '../../../../../../redux/actions';
import { CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material';
import validator from 'validator';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBoxOutlined fontSize="small" />;
const initialOrganization = {
  departmentId: '',
  departmentName: '',
  sectionId: '',
  sectionName: '',
  subSectionId: '',
  subSectionName: '',
};
const ControlsAssignment = props => {
  const dispatch = useDispatch();
  const { riskDetails, setRiskDetails, index } = props;
  const { subsidiaries } = useSelector(({ subsidiaries }) => subsidiaries);
  const { departments } = useSelector(({ departments }) => departments);
  const { sections } = useSelector(({ sections }) => sections);
  const { subSections } = useSelector(({ subSections }) => subSections);
  const { users } = useSelector(({ users }) => users);
  const { riskOwners } = useSelector(({ riskOwners }) => riskOwners);
  const filter = createFilterOptions();
  const [riskEmails, setRiskEmails] = useState([]);




  const handleRiskEmailsChange = (e, values) => {
    let data = riskDetails?.additionalControlActions;
    data[index] = { ...data[index], emails: values };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  //let uploadedData = riskDetails.additionalControlActions[index].actionOwner;
  // let dbData = [...riskOwners];
  // const mergedData = dbData.concat(uploadedData);

  const handleSubsidiaryChange = (e, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        companyId: values.id,
        companyName: values.name,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handlePrimaryOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        primaryOwnerId: values.id,
        primaryOwnerName: values.firstName + '' + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleSecondaryOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        secondaryOwnerId: values.id,
        secondaryOwnerName: values.firstName + '' + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleEscalationOwnerChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        escalationOwnerId: values.id,
        escalationOwnerName: values.firstName + '' + values.lastName,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleOnDepartmentChange = i => (event, value) => {
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [...additionalControlActions[index].complianceDetails.organization];
    if (value !== null) {
      data[i] = {
        departmentId: value.id,
        departmentName: value.name,
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    } else {
      data[i] = {
        departmentId: null,
        departmentName: '',
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: [...additionalControlActions],
    });
  };
  const handleOnSectionChange = i => (event, value) => {
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [...additionalControlActions[index].complianceDetails.organization];
    if (value !== null) {
      data[i] = {
        ...data[i],
        sectionId: value.id,
        sectionName: value.name,
        subSectionId: null,
        subSectionName: '',
      };
    } else {
      data[i] = {
        ...data[i],
        sectionId: null,
        sectionName: '',
        subSectionId: null,
        subSectionName: '',
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: [...additionalControlActions],
    });
  };

  const handleOnSubSectionChange = i => (event, value) => {
    const additionalControlActions = [...riskDetails.additionalControlActions];
    const data = [...additionalControlActions[index].complianceDetails.organization];
    // const data = [...riskDetails.complianceDetails.organization];
    if (value !== null) {
      data[i] = {
        ...data[i],
        subSectionId: value.id,
        subSectionName: value.name,
      };
    } else {
      data[i] = {
        ...data[i],
        subSectionId: null,
        subSectionName: '',
      };
    }
    additionalControlActions[index].complianceDetails.organization = [...data];
    setRiskDetails({
      ...riskDetails,
        ...riskDetails,
      additionalControlActions: [...additionalControlActions],
        // organization: [...data],
    });
  };
  const handleActionOwnerChange = (e, values) => {
    let data = riskDetails?.additionalControlActions;
    data[index] = { ...data[index], actionOwner: values };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  //handle button actions
  const handleAddDepartment = () => {
    let data = riskDetails.additionalControlActions;
    if (data[index].complianceDetails.organization) {
      data[index] = {
        ...data[index],
        complianceDetails: {
          ...data[index].complianceDetails,
          organization: [...data[index].complianceDetails.organization, initialOrganization],
        },
      };
    } else {
      data[index] = {
        ...data[index],
        complianceDetails: {
          ...data[index].complianceDetails,
          organization: [initialOrganization],
        },
      };
    }

    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };
  const handleRemoveDept = i => {
    let data = riskDetails.additionalControlActions;

    if (data[index].complianceDetails.organization?.length > 1) {
      data[index].complianceDetails.organization.splice(i, 1);
      setRiskDetails({ ...riskDetails, additionalControlActions: data });
    } else {
      dispatch(fetchError('At least One Department is Required'));
    }
  };

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const isValidEmails = riskDetails.additionalControlActions[index].emails?.every(validateEmail);

  return (
    <>
      <GridContainer>
        <Grid item sm={12} md={12} xs={12}>
          <Autocomplete
            multiple
            fullWidth
            value={riskDetails?.additionalControlActions[index]?.actionOwner ?? []}
            options={riskOwners}
            autoHighlight
            onChange={handleActionOwnerChange}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip title={option.name} color={'primary'} label={option.name} {...getTagProps({ index })} />
              ))
            }
            freeSolo
            selectOnFocus
            disableCloseOnSelect
            getOptionLabel={option => option.name}
            renderOption={(option, state) => (
              <span key={option.name}>
                <Checkbox
                  color={'primary'}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={state.selected}
                />
                {option.name}
              </span>
            )}
            renderInput={params => <TextField fullWidth variant={'outlined'} {...params} label="Action Owner" />}
          />
        </Grid>
        <Grid item sm={12} md={12} xs={12}>
          <Autocomplete
            multiple
            fullWidth
            value={riskDetails?.additionalControlActions[index]?.emails ?? []}
            options={riskEmails}
            autoHighlight
            onChange={handleRiskEmailsChange}
            filterOptions={(option, params) => {
              const filtered = filter(option, params);
              if (params.inputValue !== '') {
                filtered.push(params.inputValue);
              }
              return filtered;
            }}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                 title={option} 
                //  style={{ backgroundColor: `${!validateEmail(option) ? 'red' : '#'}`, color: "white" }}
                 color={`${!validateEmail(option) ? 'error' : 'primary'}`}
                //  variant={`${!validateEmail(option) ? 'outlined' : 'contained'}`}
                  label={option} {...getTagProps({ index })} />
              ))
            }
            freeSolo
            selectOnFocus
            disableCloseOnSelect
            getOptionLabel={option => option}
            renderOption={(option, state) => (
              <span key={option}>
                <Checkbox
                  color={'primary'}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={state.selected}
                />
                {option}
              </span>
            )}
            renderInput={params => <TextField
               fullWidth variant={'outlined'} {...params} type="email" label="Email" />}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Autocomplete
            fullWidth
            options={subsidiaries}
            value={getAutoCompleteValue(
              subsidiaries,
              riskDetails?.additionalControlActions[index]?.complianceDetails?.companyId,
            )}
            getOptionLabel={option => option.name}
            onChange={handleSubsidiaryChange}
            renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
            renderInput={params => (
              <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Subsidiary" />
            )}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Box width={'100%'} mt={5} mb={2} display={'flex'}>
            <Button
              onClick={handleAddDepartment}
              type={'button'}
              size={'small'}
              startIcon={<AddCircle />}
              variant={'outlined'}
              color={'primary'}>
              Assign Department
            </Button>
          </Box>
        </Grid>
        {riskDetails?.additionalControlActions[index]?.complianceDetails?.organization?.length !== 0 &&
          riskDetails?.additionalControlActions[index]?.complianceDetails?.organization?.map((org, index) => (
            <Grid key={index} item md={12} xs={12}>
              <Box mt={3}>
                <RiskAddDepartment
                  {...{
                    departments,
                    sections,
                    subSections,
                    org,
                    handleOnDepartmentChange,
                    handleOnSectionChange,
                    handleOnSubSectionChange,
                    index,
                    handleRemoveDept,
                    riskDetails,
                    setRiskDetails,
                  }}
                />
              </Box>
            </Grid>
          ))}
        <Grid item md={12} xs={12}>
          <Autocomplete
            fullWidth
            options={users}
            value={getAutoCompleteValue(
              users,
              riskDetails?.additionalControlActions[index]?.complianceDetails.primaryOwnerId,
            )}
            getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
            onChange={handlePrimaryOwnerChange}
            renderOption={(option, { selected }) => <span key={option.id}>{option.firstName + '' + option.lastName}</span>}
            renderInput={params => (
              <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Primary Owner" />
            )}
          />
          {/* <Autocomplete
                      fullWidth
                      options={users}
                      value={users.find(user => user.id === complianceDetails?.primaryOwnerId) ?? initValue}
                      getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
                      onChange={handleOnPrimaryOwnerChange}
                      renderOption={(option, { selected }) => (
                        <span key={option.id}>{option.firstName + ' ' + option.lastName}</span>
                      )}
                      renderInput={params => (
                        <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Primary Owner" />
                      )}
                    /> */}
        </Grid>
        <Grid item md={12} xs={12}>
          <Autocomplete
            fullWidth
            options={users}
            value={getAutoCompleteValue(
              users,
              riskDetails?.additionalControlActions[index]?.complianceDetails.secondaryOwnerId,
            )}
            getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
            onChange={handleSecondaryOwnerChange}
            renderOption={(option, { selected }) => <span key={option.id}>{option.firstName + '' + option.lastName}</span>}
            renderInput={params => (
              <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Secondary Owner" />
            )}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Autocomplete
            fullWidth
            options={users}
            value={getAutoCompleteValue(
              users,
              riskDetails?.additionalControlActions[index]?.complianceDetails?.escalationOwnerId,
            )}
            getOptionLabel={option => option.name ?? option.firstName + ' ' + option.lastName}
            onChange={handleEscalationOwnerChange}
            renderOption={(option, { selected }) => <span key={option.id}>{option.firstName + '' + option.lastName}</span>}
            renderInput={params => (
              <TextField required fullWidth {...params} size={'small'} variant={'outlined'} label="Escalation Owner" />
            )}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export default ControlsAssignment;
