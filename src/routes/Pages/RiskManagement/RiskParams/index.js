import React, { useState } from 'react';
import { HEADER } from '../../../../@jumbo/constants/HeaderMessages';
import PageContainer from '../../../../@jumbo/components/PageComponents/layouts/PageContainer';
import useStyles from '../../Roles/index.style';
import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Params from './Params';
import { NotificationContainer } from 'react-notifications';

const breadcrumbs = [
  { label: HEADER.DASHBOARD, link: '/' },
  { label: HEADER.RISK_PARAMS, isActive: true },
];
const AppHeader = props => {
  const classes = useStyles();
  const { handleOnSave, showForm, handleOnCancel, isEditable, setIsEditable } = props;
  return (
    <Box className={classes.inBuildAppHeader}>
      <Box className={classes.inBuildAppHeaderSidebar}>
        {/*<CmtImage src={'/images/roles.png'} style={{ width: '50px' }} />*/}
        <Typography className={classes.inBuildAppHeaderTitle} component="div" variant="h1">
          Parameters
        </Typography>
      </Box>
      <Box className={classes.inBuildAppHeaderContent}>
        {showForm && (
          <Box ml="auto" display="flex" alignItems="center">
            {isEditable ? (
              <>
                <Box ml={1}>
                  <Button
                    variant={'contained'}
                    style={{ backgroundColor: 'green', color: 'white' }}
                    size={'small'}
                    onClick={handleOnSave}>
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box ml={1}>
                  <Button
                    variant={'contained'}
                    style={{ backgroundColor: 'green', color: 'white' }}
                    size={'small'}
                    onClick={() => setIsEditable(true)}>
                    Edit
                  </Button>
                </Box>
              </>
            )}
            <Box ml={1}>
              <Button
                variant={'contained'}
                style={{ backgroundColor: 'darkred', color: 'white' }}
                size={'small'}
                onClick={handleOnCancel}>
                Close
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const RiskParams = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState(0);
  const handleOnChange = item => {
    setSelectedItem(item);
  };
  return (
    <React.Fragment>
      <PageContainer heading={HEADER.RISK_PARAMS} breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <AppHeader />
          <Box className={clsx(classes.inBuildAppContainer)}>
            <Params {...{ handleOnChange, selectedItem }} />
          </Box>
        </Box>
      </PageContainer>
      <NotificationContainer />
    </React.Fragment>
  );
};

export default RiskParams;
