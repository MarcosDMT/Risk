import React, { useEffect } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CmtVertical from '../../../../../@coremat/CmtNavigation/Vertical';
import { sidebarNavs } from '../menus';
import { Box, InputAdornment, MenuItem, Select, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchSubsidiaries, setCurrentSubsidiary } from '../../../../../redux/actions/Subsidiaries';
import { alpha } from '@material-ui/core/styles';
import { COLORS } from '../../../../../routes/Pages/Dashboard/dummyData';
import RoleBasedGuard from '../../../../hocs/RoleAuth';
import { PERMISSIONS } from '../../../../constants/RolesConstants';

const useStyles = makeStyles(theme => ({
  perfectScrollbarSidebar: {
    height: '100%',
    transition: 'all 0.3s ease',
    '.Cmt-sidebar-fixed &, .Cmt-Drawer-container &': {
      height: 'calc(100% - 167px)',
    },
    '.Cmt-modernLayout &': {
      height: 'calc(100% - 120px)',
      // height: '100%',
    },
    '.Cmt-miniLayout &': {
      height: 'calc(100% - 91px)',
    },
    '.Cmt-miniLayout .Cmt-sidebar-content:hover &': {
      height: 'calc(100% - 167px)',
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

const SideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { subsidiaries, currentSubsidiary } = useSelector(({ subsidiaries }) => subsidiaries);

  // const handleFilterChange = e => {
  //   dispatch(setCurrentSubsidiary(e.target.value));
  // };
  return (
    <>
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

      <PerfectScrollbar className={classes.perfectScrollbarSidebar}>
        <CmtVertical menuItems={sidebarNavs} style={{ marginBottom: 10 }} />
      </PerfectScrollbar>
    </>
  );
};

export default SideBar;
