import React from 'react';
import { useSelector } from 'react-redux';
import { validatePermission } from '../../utils/commonHelper';
import Error403 from '../../../routes/Pages/403';

const RoleBasedGuard = props => {
  const { children, permission, page = false } = props;
  const { userRole } = useSelector(({ auth }) => auth);

  if (!validatePermission(permission, userRole?.permissions)) {
    if (userRole.permissions !== undefined && page) {
      return <Error403 />;
    }
    return null;
  }

  return <>{children}</>;
};
export default RoleBasedGuard;
