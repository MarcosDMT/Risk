import React, { useEffect } from 'react';
import GridContainer from '../../../../../@jumbo/components/GridContainer';
import { Grid, IconButton, TextField } from '@material-ui/core';
import { getAutoCompleteValue } from '../../../../../@jumbo/utils/commonHelper';
import { getFilteredOptions } from '../../../../../@jumbo/utils/commonHelper';
import { Autocomplete } from '@material-ui/lab';
import { Close } from '@material-ui/icons';

export const RiskAddDepartment = props => {
  const {
    departments,
    sections,
    subSections,
    org,
    complianceDetails,
    index,
    handleOnDepartmentChange,
    handleOnSectionChange,
    handleOnSubSectionChange,
    handleRemoveDept,
    riskDetails,
    setRiskDetails,
  } = props;

  // if(!riskDetails.complianceDetails){
  //   return null;
  // }

  // useEffect(() => {
  //   setRiskDetails({
  //     ...riskDetails,
  //     additionalControlActions:[]
  //   })
  // }, [riskDetails?.additionalControlActions[index]?.complianceDetails.companyId])
  return (
    <>
      <GridContainer>
        <Grid item md={4} xs={12}>
          <Autocomplete
            fullWidth
            id={`department_${index}`}
            options={getFilteredOptions(
              departments,
              riskDetails?.additionalControlActions[index]?.complianceDetails,
              'companyId',
            )}
            value={getAutoCompleteValue(departments, org?.departmentId)}
            getOptionLabel={option => option.name}
            onChange={handleOnDepartmentChange(index)}
            renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
            renderInput={params => (
              <TextField
                required
                helperText={
                  riskDetails?.additionalControlActions[index]?.complianceDetails?.companyId === ''
                    ? 'Select Subsidiary'
                    : ''
                }
                fullWidth
                {...params}
                size={'small'}
                variant={'outlined'}
                label="Department"
              />
            )}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Autocomplete
            fullWidth
            options={getFilteredOptions(sections, org, 'departmentId', 'departmentsId')}
            value={getAutoCompleteValue(sections, org.sectionId)}
            getOptionLabel={option => option.name}
            onChange={handleOnSectionChange(index)}
            renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
            renderInput={params => (
              <TextField
                helperText={
                  riskDetails?.additionalControlActions[index]?.complianceDetails?.organization?.departmentId === ''
                    ? 'Select Department'
                    : ''
                }
                fullWidth
                {...params}
                size={'small'}
                variant={'outlined'}
                label="Section"
              />
            )}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Autocomplete
            fullWidth
            options={getFilteredOptions(subSections, org, 'sectionId', 'sectionsId')}
            value={getAutoCompleteValue(subSections, org.subSectionId)}
            getOptionLabel={option => option.name}
            onChange={handleOnSubSectionChange(index)}
            renderOption={(option, { selected }) => <span key={option.id}>{option.name}</span>}
            renderInput={params => (
              <TextField fullWidth {...params} size={'small'} variant={'outlined'} label="Sub-Section" />
            )}
          />
        </Grid>
        <Grid item md={1} xs={12}>
          <IconButton color={'secondary'} onClick={e => handleRemoveDept(index)}>
            <Close fontSize={'small'} />
          </IconButton>
        </Grid>
      </GridContainer>
    </>
  );
};
