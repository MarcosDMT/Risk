import React, { useState } from 'react';
import CmtDrawer from '../../../../@coremat/CmtDrawer';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Chip, IconButton, withWidth, Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtCard from '../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import { AccountTree, Apartment, Domain, LocalPhone, MailOutline, Person } from '@material-ui/icons';
import CmtImage from '../../../../@coremat/CmtImage';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CloseIcon from '@material-ui/icons/Close';
import { blue } from '@material-ui/core/colors';
import {getAccountStatus} from "../../../../@jumbo/utils/commonHelper";

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
const ViewUser = props => {
  const { userDetails, openDrawer, onCloseDrawer, ...rest } = props;
  const { organization } = userDetails;
  const status = getAccountStatus(userDetails.isActive);
  const [anchor, setAnchor] = useState('right');
  const classes = useStyles();
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
                  <Box flex={'1 0 auto'} />
                  <Chip
                    size={'small'}
                    variant={'default'}
                    label={status.label}
                    style={{ color: 'white', backgroundColor: status.color }}
                  />
                </Box>
                <Box display="flex" flexDirection={'column'} justifyContent={'center'} alignItems="center">
                  <Box mb={1}>
                    <CmtAvatar size={60} src={userDetails.imageUrl} alt={userDetails.firstName} />
                  </Box>
                  <Box>
                    <Typography className={classes.titleRoot} component="div">
                      {userDetails.firstName + ' ' + userDetails.lastName}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography className={classes.titleRoot} component="div">
                      {userDetails.role !== undefined && `(${userDetails.role})`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <CmtCard>
              <CmtCardHeader title="Personal Details" />
              <CmtCardContent>
                <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 2 }}>
                  <Box className={clsx(classes.iconView, 'web')}>
                    <Person />
                  </Box>
                  <Box ml={5}>
                    <Box component="span" fontSize={12} color="text.secondary">
                      Full Name
                    </Box>
                    <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
                      {userDetails.firstName + ' ' + userDetails.lastName}
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 2 }}>
                  <Box className={classes.iconView}>
                    <MailOutline />
                  </Box>
                  <Box ml={5}>
                    <Box component="span" fontSize={12} color="text.secondary">
                      Email
                    </Box>
                    <Box component="p" className={classes.wordAddress} fontSize={16}>
                      <Box component="a" href={`mailto:${userDetails.email}`}>
                        {userDetails.email}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box className={clsx(classes.iconView, 'phone')}>
                    <LocalPhone />
                  </Box>
                  <Box ml={5}>
                    <Box component="span" fontSize={12} color="text.secondary">
                      Phone
                    </Box>
                    <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
                      {userDetails.phoneNumber}
                    </Box>
                  </Box>
                </Box>
              </CmtCardContent>
              <CmtCardHeader title="Work Details" />
              <CmtCardContent>
                <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 2 }}>
                  <Box className={clsx(classes.iconView, 'web')}>
                    <Apartment />
                  </Box>
                  <Box ml={5}>
                    <Box component="span" fontSize={12} color="text.secondary">
                      Subsidiary
                    </Box>
                    <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
                      {userDetails.subsidiary !== '' ? userDetails.subsidiary : '-'}
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 2 }}>
                  <Box className={classes.iconView}>
                    <AccountTree />
                  </Box>
                  <Box ml={5}>
                    <Box component="span" fontSize={12} color="text.secondary">
                      Department(s)
                    </Box>
                    <Box component="p" className={classes.wordAddress} fontSize={16}>
                      {organization !== undefined &&
                        organization?.length !== 0 &&
                        organization.map((org, index) => <span key={index}> {org.departmentName + ', '}</span>)}
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 2 }}>
                  <Box className={clsx(classes.iconView, 'phone')}>
                    <Domain />
                  </Box>
                  <Box ml={5}>
                    <Box component="span" fontSize={12} color="text.secondary">
                      Section(s)
                    </Box>
                    <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
                      {userDetails.section !== '' ? userDetails.section : '-'}
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box className={clsx(classes.iconView, 'web')}>
                    <Apartment />
                  </Box>
                  <Box ml={5}>
                    <Box component="span" fontSize={12} color="text.secondary">
                      Sub-Section(s)
                    </Box>
                    <Box component="p" className={classes.wordAddress} fontSize={16} color="text.primary">
                      {userDetails.subSection !== '' ? userDetails.subSection : '-'}
                    </Box>
                  </Box>
                </Box>
              </CmtCardContent>
            </CmtCard>
          </PerfectScrollbar>
        </Box>
      </div>
    </CmtDrawer>
  );
};

export default withWidth()(ViewUser);
