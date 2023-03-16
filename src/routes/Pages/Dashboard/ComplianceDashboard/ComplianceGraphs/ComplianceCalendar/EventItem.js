import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import LabelIcon from '@material-ui/icons/Label';
import CheckIcon from '@material-ui/icons/Check';
import CmtMediaObject from '../../../../../../@coremat/CmtMediaObject';
import { getTime } from '../../../../../../@jumbo/utils/dateHelper';
import useStyles from './index.style';

const EventItem = ({ item }) => {
  const classes = useStyles();
  const getColor = status => {
    let color;
    if (status === 'Complied') {
      color = 'success.main';
    } else if (status === 'Not Complied') {
      color = 'warning.main';
    } else if (status === 'Bridge') {
      color = 'error.main';
    }
    return color;
  };

  const getSubTitle = () => (
    <Typography className={classes.subTitleRoot}>
      <Box component="span" color={getColor(item.status)}>
        {item.status}
      </Box>
      <Box component="span" mx={2}>
        |
      </Box>
      Action By:
      <Box component="span" color="primary.main" ml={1}>
        {item.actionBy.name}
      </Box>
    </Typography>
  );

  return (
    <Box className={clsx(classes.eventItemRoot, { checked: item.isAttended })}>
      <CmtMediaObject
        avatarPos="center"
        avatar={<LabelIcon style={{ color: item.color }} />}
        title={item.name}
        titleProps={{
          variant: 'h4',
          component: 'div',
          className: classes.titleRoot,
        }}
        subTitle={getSubTitle()}
        actionsComponent={
          item.isAttended && (
            <Box color="success.main">
              <CheckIcon />
            </Box>
          )
        }
      />
    </Box>
  );
};

export default EventItem;
