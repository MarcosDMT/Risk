import React from 'react';
import { Box, List } from '@mui/material';
import ComplianceItem from './ComplianceItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnterpriseComplianceSub } from '../../../../../redux/actions/Compliance';
import { COMPLIANCE } from '../../../../../@jumbo/constants/ActionTypes';
const MainComplianceSection = props => {
  const { complianceList, activeCompliance } = props;
  const { selectedEnterprise } = useSelector(({ compliance }) => compliance);
  const dispatch = useDispatch();
  const handleOnComplianceClick = id => {
    dispatch({
      type: COMPLIANCE.ENTERPRISE.GET_SELECTED,
      payload: id,
    });
    dispatch(fetchEnterpriseComplianceSub({ id }));
  };
  return (
    <>
      <List component="nav" aria-label="main compliance" sx={{ width: '100%' }}>
        {Array.isArray(complianceList) &&
          complianceList?.map((compliance, index) => {
            const isSelected = selectedEnterprise ? compliance.id === selectedEnterprise : false;
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
