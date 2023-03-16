import React from 'react';
import { Grid } from '@material-ui/core';
import { AssuredWorkload, Stars, WarningAmber } from '@mui/icons-material';
import GridContainer from '../../../@jumbo/components/GridContainer';
import CounterCard from '../../../@jumbo/components/Common/CounterCard';
import { useHistory } from 'react-router-dom';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import { ArrowDropDown, Gavel, PlaylistAddCheck } from '@material-ui/icons';
import { backGroundColors } from '../../../@jumbo/utils/commonHelper';
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

const navigationMenu = user => {
  return [
    {
      id: 1,
      name: 'Risk Universe',
      url: 'risk-universe',
    },
    {
      id: 2,
      name: 'Risk Assessment',
      url: 'risk-assessment',
    },
    {
      id: 3,
      name: 'Incident Management',
      url: 'risk-incident',
    },
  ];
};
const DashboardCard = props => {
  const {
    icon,
    number,
    label,
    font = 15,
    numberType,
    backgroundColor = ['#8E49F0 -18.96%', '#4904AB 108.17%'],
    gradientDirection = '180deg',
  } = props;
  return (
    <CounterCard
      icon={icon}
      number={number}
      label={label}
      numberType={numberType}
      labelProps={{
        fontSize: font,
      }}
      backgroundColor={backgroundColor}
      gradientDirection={gradientDirection}
    />
  );
};
const DashboardHeader = () => {
  return (
    <>
      <GridContainer>
        {/*<Grid item md={3} xs={12}>*/}
        {/*  <DashboardCard*/}
        {/*    {...{*/}
        {/*      icon: '/images/dashboard/projectIcon.svg',*/}
        {/*      number: 80,*/}
        {/*      numberType: 'percent',*/}
        {/*      label: 'Compliance',*/}
        {/*      backgroundColor: backGroundColors[0],*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Grid>*/}
        <Grid item md={4} xs={12}>
          <DashboardCard
            {...{
              icon: <WarningAmber style={{ fontSize: 50 }} />,
              number: 2000,
              label: 'Risks',
              backgroundColor: backGroundColors[1],
            }}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            {...{
              icon: '/images/dashboard/tasksIcon.svg',
              number: 1200,
              label: 'Incidents',
              backgroundColor: backGroundColors[2],
            }}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            {...{
              number: 10000,
              numberType: 'currency',
              label: 'Total Loss Amount',
              backgroundColor: backGroundColors[3],
            }}
          />
        </Grid>
      </GridContainer>
    </>
  );
};

export const RiskDashboardHeader = ({ data }) => {
  return (
    <>
      <GridContainer>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: <WarningAmber sx={{ fontSize: 50 }} />,
              number: data?.totalRisks ?? 0,
              // numberType: 'percent',
              label: 'No. of Risks Identified',
              backgroundColor: backGroundColors[2],
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: <PlaylistAddCheck style={{ fontSize: 50 }} />,
              number: data?.overallRiskCategory ?? 0,
              // numberType: 'percent',
              label: 'Category with the highest Risk',
              backgroundColor: backGroundColors[3],
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: <Stars style={{ fontSize: 50 }} />,
              number: data?.riskRating ?? '-',
              // numberType: 'percent',
              label: 'Overall Risk Rating',
              backgroundColor: backGroundColors[0],
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: <TrendingUpIcon style={{ fontSize: 50 }} />,
              number: data?.riskScore ?? '-',
              // numberType: 'percent',
              label: 'Risk Score',
              backgroundColor: backGroundColors[1],
            }}
          />
        </Grid>
      </GridContainer>
    </>
  );
};
export const ComplianceDashboardHeader = ({ data }) => {
  return (
    <>
      <GridContainer sx={{ mt: 2 }}>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: '/images/dashboard/projectIcon.svg',
              number: data?.overallCompliance ?? 0,
              label: 'Overall Compliance',
              backgroundColor: backGroundColors[0],
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: <PlaylistAddCheck style={{ fontSize: 50 }} />,
              number: data?.statutoryCompliance ?? 0,
              label: 'Statutory Compliance',
              backgroundColor: backGroundColors[3],
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: <AssuredWorkload style={{ fontSize: 50 }} />,
              number: data?.enterpriseCompliance ?? 0,
              label: 'Enterprise Compliance',
              backgroundColor: backGroundColors[1],
            }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardCard
            {...{
              icon: <Gavel style={{ fontSize: 50 }} />,
              number: data?.legalCompliance ?? 0,
              label: 'Legal Compliance',
              backgroundColor: backGroundColors[2],
            }}
          />
        </Grid>
      </GridContainer>
    </>
  );
};
export const NavigationButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = 'Admin';
  const history = useHistory();
  const open = Boolean(anchorEl);
  const menuItems = navigationMenu(user);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuChange = url => {
    history.push(`../${url}`);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display={'flex'} justifyContent={'flex-end'}>
      <Button
        id={'basic-button'}
        variant={'contained'}
        color={'primary'}
        endIcon={<ArrowDropDown />}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        Navigate To
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {menuItems.length !== 0 &&
          menuItems.map(({ id, name, url }) => (
            <MenuItem key={id} onClick={e => handleMenuChange(url)}>
              {name}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default DashboardHeader;
