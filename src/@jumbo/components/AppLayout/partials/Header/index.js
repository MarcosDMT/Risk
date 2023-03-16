import React, { useEffect } from 'react';
import SidebarToggleHandler from '../../../../../@coremat/CmtLayouts/Vertical/SidebarToggleHandler';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, InputBase } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import LanguageSwitcher from '../LanguageSwitcher';
import makeStyles from '@material-ui/core/styles/makeStyles';
import SearchIcon from '@material-ui/icons/Search';
import AppsMenu from './AppsMenu';
import HeaderNotifications from './HeaderNotifications';
import HeaderMessages from './HeaderMessages';
import Hidden from '@material-ui/core/Hidden';
import Logo from '../Logo';
import SearchPopover from '../SearchPopover';
import RoleBasedGuard from '../../../../hocs/RoleAuth';
import { COLORS } from '../../../../../routes/Pages/Dashboard/dummyData';
import { useSelector, useDispatch } from 'react-redux';
import { PERMISSIONS } from '../../../../constants/RolesConstants';
import { MenuItem, Select, Typography } from '@material-ui/core';
import { fetchSubsidiaries } from '../../../../../redux/actions/Subsidiaries';
import { useLocation, useHistory } from 'react-router';
import { fetchDashboardSummary } from '../../../../../redux/actions/Dashboard';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    minHeight: 64,
    [theme.breakpoints.up('md')]: {
      minHeight: 72,
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  searchRoot: {
    position: 'relative',
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
    '& .MuiSvgIcon-root': {
      position: 'absolute',
      left: 18,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
    '& .MuiInputBase-input': {
      height: 48,
      borderRadius: 30,
      backgroundColor: alpha(theme.palette.common.dark, 0.38),
      color: alpha(theme.palette.common.white, 0.7),
      boxSizing: 'border-box',
      padding: '5px 15px 5px 50px',
      transition: 'all 0.3s ease',
      '&:focus': {
        backgroundColor: alpha(theme.palette.common.dark, 0.58),
        color: alpha(theme.palette.common.white, 0.7),
      },
    },
  },
  langRoot: {
    borderLeft: `solid 1px ${alpha(theme.palette.common.dark, 0.15)}`,
    minHeight: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      minHeight: 64,
    },
  },
  iconBtn: {
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &:focus': {
      color: theme.palette.common.white,
    },
  },
  companyPanel: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  selectBoxRoot: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: theme.palette.primary.main,
    '&:before, &:after': {
      display: 'none',
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'transparent',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const { subsidiaries, currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  console.log('LOCATION', location);
  console.log('CURRENT', currentSubsidiary);

  const handleFilterChange = async e => {
    try {
      await dispatch(fetchDashboardSummary(e.target.value));
    } catch (error) {
      console.log('ERROR IS HERE ', error);
    }
  };

  const getSubsidiaries = async () => {
    await dispatch(fetchSubsidiaries());
  };

  useEffect(() => {
    getSubsidiaries();
  }, []);

  return (
    <Toolbar className={classes.root}>
      <SidebarToggleHandler edge="start" color="inherit" aria-label="menu" />
      <Logo ml={2} color="white" />
      <Box flex={1} />

      {/* <RoleBasedGuard permission={PERMISSIONS.SUBSIDIARY.DELETE}>
        <Box width={'100%'} mb={2} p={3} className={classes.companyPanel}>
          <Typography style={{ marginLeft: '10px' }} gutterBottom variant={'caption'} component={'label'}>
            Current Company
          </Typography>
          <Select
            fullWidth
            className={classes.selectBoxRoot}
            labelId="subsidiaries-select-label"
            id="subsidiaries"
            value={currentSubsidiary}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
              getContentAnchorEl: null,
            }}
            placeholder={'All Subsidiaries'}
            onChange={handleFilterChange}>
            <MenuItem key={'null'} value={'All'}>
              <Box
                component="span"
                mr={3}
                height={10}
                width={10}
                bgcolor={currentSubsidiary !== 'All' ? '#fff' : COLORS[0]}
                borderRadius="50%"
              />
              {'All Companies'}
            </MenuItem>
            {subsidiaries.length !== 0 &&
              subsidiaries.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  <Box
                    component="span"
                    mr={3}
                    height={10}
                    width={10}
                    bgcolor={currentSubsidiary !== item.id ? '#fff' : COLORS[0]}
                    borderRadius="50%"
                  />
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </RoleBasedGuard> */}

      {/* <Hidden smDown>*/}
      {/*  <Box pr={3} className={classes.searchRoot}>*/}
      {/*    <InputBase placeholder={'Search here...'} inputProps={{ 'aria-label': 'search' }} />*/}
      {/*    <SearchIcon />*/}
      {/*  </Box>*/}
      {/*</Hidden>*/}
      {/*<Hidden mdUp>*/}
      {/*  <SearchPopover iconClassName={classes.iconBtn} />*/}
      {/*</Hidden>*/}
      {/*<AppsMenu />*/}
      {/*<HeaderMessages />*/}
      {/*<HeaderNotifications />*/}
      {/*<Box className={classes.langRoot}>*/}
      {/*  <LanguageSwitcher />*/}
      {/*</Box> */}
    </Toolbar>
  );
};

export default Header;
