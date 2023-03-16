import React, { useState } from 'react';
import CmtDrawer from '../../../../../@coremat/CmtDrawer';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Chip, IconButton, withWidth, Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtImage from '../../../../../@coremat/CmtImage';
import CloseIcon from '@material-ui/icons/Close';
import { blue } from '@material-ui/core/colors';
// import { Preview } from '../CreateRisk';
import { Preview } from '../../../RiskManagement/RiskUniverse/CreateRisk';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  headerRoot: {
    position: 'relative',
    margin: '-30px -15px 0 -15px',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 20,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: -50,
      marginRight: -50,
      paddingLeft: 50,
      paddingRight: 50,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: -65,
      marginRight: -65,
      paddingLeft: 65,
      paddingRight: 65,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: -88,
      marginRight: -88,
      paddingLeft: 88,
      paddingRight: 88,
    },
  },
  headerBgImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    minHeight: 'auto',
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 'auto',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: alpha(theme.palette.primary.main, 0.5),
    },
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  headerContent: {
    position: 'relative',
    zIndex: 3,
  },
  titleRoot: {
    color: theme.palette.common.white,
    //marginBottom: 1,
  },
  actionSidebar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 5px',
    width: 65,
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  contentArea: {
    width: 300,
    [theme.breakpoints.up('sm')]: {
      width: 557,
    },
  },
  scrollbarRoot: {
    height: '100vh',
    padding: 10,
  },
  iconBtn: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.7),
    '&:hover, &:focus, &.active': {
      color: alpha(theme.palette.common.white, 1),
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
  iconView: {
    backgroundColor: alpha(blue['500'], 0.1),
    color: blue['500'],
    padding: 8,
    borderRadius: 4,
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    '&.web': {
      backgroundColor: alpha(theme.palette.warning.main, 0.1),
      color: theme.palette.warning.main,
    },
    '&.phone': {
      backgroundColor: alpha(theme.palette.success.main, 0.15),
      color: theme.palette.success.dark,
    },
  },
  wordAddress: {
    wordBreak: 'break-all',
    cursor: 'pointer',
  },
}));
const ViewRisk = props => {
  const { riskDetails, openDrawer, onCloseDrawer, ...rest } = props;
  const [anchor] = useState('right');
  const classes = useStyles();
  const getColor = () => {
    let color;
    color = riskDetails.status === 'Approved' ? 'green' : 'orange';
    return color;
  };
  return (
    <CmtDrawer open={openDrawer} variant="temporary" anchor={anchor} onClose={onCloseDrawer} {...rest}>
      <div className={clsx(classes.root)}>
        <Box className={classes.contentArea}>
          <PerfectScrollbar className={classes.scrollbarRoot}>
            <Box className={classes.headerRoot}>
              <Box className={classes.headerBgImg}>
                <CmtImage src={'/images/profile-bg-img.png'} />
              </Box>
              <Box className={classes.headerContent}>
                <Box display={'flex'} alignItems={'center'}>
                  <IconButton className={classes.iconBtn} onClick={onCloseDrawer}>
                    <CloseIcon />
                  </IconButton>
                  <Typography variant={'h5'} style={{ color: 'white' }}>
                    {riskDetails.id}
                  </Typography>
                  <Box flex={'1 0 auto'} />
                  <Chip
                    size={'small'}
                    variant={'default'}
                    label={riskDetails.status}
                    style={{ color: 'white', backgroundColor: getColor() }}
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Preview {...{ riskDetails, isView: true }} />
            </Box>
          </PerfectScrollbar>
        </Box>
      </div>
    </CmtDrawer>
  );
};

export default withWidth()(ViewRisk);
