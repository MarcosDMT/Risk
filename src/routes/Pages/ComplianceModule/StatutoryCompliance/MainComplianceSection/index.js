import React from 'react';
import { Box, List } from '@mui/material';
import ComplianceItem from './ComplianceItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatutoryComplianceSub } from '../../../../../redux/actions/Compliance';
import { COMPLIANCE } from '../../../../../@jumbo/constants/ActionTypes';
const MainComplianceSection = props => {
  const { complianceList, activeCompliance } = props;
  const { selectedStatutory } = useSelector(({ compliance }) => compliance);
  const dispatch = useDispatch();
  const handleOnComplianceClick = id => {
    dispatch({
      type: COMPLIANCE.STATUTORY.GET_SELECTED,
      payload: id,
    });
    dispatch(fetchStatutoryComplianceSub({id}));
  };
  return (
    <>
      <List component="nav" aria-label="main compliance" sx={{ width: '100%' }}>
        {Array.isArray(complianceList) &&
          complianceList.map((compliance, index) => {
            const isSelected = selectedStatutory ? compliance.id === selectedStatutory : false;
            return (
              <ComplianceItem
                key={index}
                {...{
                  compliance,
                  handleOnClick: handleOnComplianceClick,
                  isSelected,
                }}
              />
            );
          })}
      </List>
    </>
  );
};

export default MainComplianceSection;
