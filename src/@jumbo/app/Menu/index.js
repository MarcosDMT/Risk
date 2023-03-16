import { AccountTree, ApartmentSharp, DashboardOutlined, Domain, People } from '@material-ui/icons';
import React from 'react';
import {
  ApartmentRounded,
  AutoFixHigh,
  AutoStories,
  FactCheck,
  GppMaybe,
  Rule,
  Scale,
  SettingsApplicationsOutlined,
  Speed,
} from '@mui/icons-material';
import { HEADER } from '../../constants/HeaderMessages';
import { PERMISSIONS } from '../../constants/RolesConstants';

export const sidebarMenuItems = [
  {
    name: 'Dashboards',
    type: 'item',
    permission: PERMISSIONS.DASHBOARD.ACCESS,
    icon: <DashboardOutlined />,
    link: '/dashboard/dashboard-report',
    // children: [
    //   {
    //     name: 'Universe Dashboard',
    //     type: 'item',
    //     icon: <DashboardOutlined />,
    //     link: '/dashboard/risk-universe',
    //     permission: PERMISSIONS.DASHBOARD.ACCESS,
    //   },
    //   {
    //     name: 'Assessment Dashboard',
    //     type: 'item',
    //     icon: <DashboardOutlined />,
    //     link: '/dashboard/risk-assessment',
    //     permission: PERMISSIONS.DASHBOARD.ACCESS,
    //   },
    //   {
    //     name: 'Incidents Dashboard',
    //     type: 'item',
    //     icon: <DashboardOutlined />,
    //     link: '/dashboard/risk-incidents',
    //     permission: PERMISSIONS.DASHBOARD.ACCESS,
    //   },
    //   {
    //     name: 'Compliance Dashboard',
    //     type: 'item',
    //     icon: <DashboardOutlined />,
    //     link: '/dashboard/compliance',
    //     permission: PERMISSIONS.DASHBOARD.ACCESS,
    //   },
    // ],
  },
  {
    name: 'Risk Management',
    type: 'section',
    permission:
      PERMISSIONS.RISK_ASSESSMENT.ACCESS ||
      PERMISSIONS.RISK_UNIVERSE.ACCESS ||
      PERMISSIONS.RISK_INCIDENT ||
      PERMISSIONS.RISK_INDICATOR,
    children: [
      {
        name: 'Risk Universe',
        type: 'item',
        icon: <AutoStories />,
        link: '/risk-universe',
        permission: PERMISSIONS.RISK_UNIVERSE.ACCESS,
      },
      // {
      //   name: 'Risk Assessment',
      //   type: 'item',
      //   icon: <Scale />,
      //   link: '/risk-assessment',
      //   permission: PERMISSIONS.RISK_ASSESSMENT.ACCESS,
      // },
      {
        name: 'Incident Management',
        type: 'item',
        icon: <GppMaybe />,
        link: '/risk-incident',
        permission: PERMISSIONS.RISK_INCIDENT.ACCESS,
      },
      {
        name: 'Key Risk Indicators',
        type: 'item',
        icon: <Speed />,
        link: '/risk-indicators',
        permission: PERMISSIONS.RISK_ASSESSMENT.ACCESS,
      },
    ],
  },
  {
    name: 'Compliance',
    type: 'section',
    permission:
      PERMISSIONS.LEGAL_COMPLIANCE.ACCESS ||
      PERMISSIONS.ENTERPRISE_COMPLIANCE.ACCESS ||
      PERMISSIONS.STATUTORY_COMPLIANCE.ACCESS,
    children: [
      {
        name: 'Compliance',
        type: 'collapse',
        icon: <FactCheck />,
        permission:
          PERMISSIONS.LEGAL_COMPLIANCE.ACCESS ||
          PERMISSIONS.ENTERPRISE_COMPLIANCE.ACCESS ||
          PERMISSIONS.STATUTORY_COMPLIANCE.ACCESS,
        children: [
          {
            name: HEADER.LEGAL_COMPLIANCE.name,
            type: 'item',
            icon: <Rule />,
            link: `/compliance/${HEADER.LEGAL_COMPLIANCE.url}`,
            permission: PERMISSIONS.LEGAL_COMPLIANCE.ACCESS,
          },
          {
            name: HEADER.ENTERPRISE_COMPLIANCE.name,
            type: 'item',
            icon: <Rule />,
            link: `/compliance/${HEADER.ENTERPRISE_COMPLIANCE.url}`,
            permission: PERMISSIONS.ENTERPRISE_COMPLIANCE.ACCESS,
          },
          {
            name: HEADER.STATUTORY_COMPLIANCE.name,
            type: 'item',
            icon: <Rule />,
            link: `/compliance/${HEADER.STATUTORY_COMPLIANCE.url}`,
            permission: PERMISSIONS.STATUTORY_COMPLIANCE.ACCESS,
          },
        ],
      },
    ],
  },
  {
    name: 'Organization Structure',
    type: 'section',
    icon: <ApartmentRounded />,
    permission:
      PERMISSIONS.SUBSIDIARY.ACCESS ||
      PERMISSIONS.DEPARTMENT.ACCESS ||
      PERMISSIONS.SUB_SECTION.ACCESS ||
      PERMISSIONS.SECTION.ACCESS,
    children: [
      {
        name: 'Organization',
        type: 'collapse',
        icon: <ApartmentRounded />,
        permission:
          PERMISSIONS.SUBSIDIARY.ACCESS ||
          PERMISSIONS.DEPARTMENT.ACCESS ||
          PERMISSIONS.SUB_SECTION.ACCESS ||
          PERMISSIONS.SECTION.ACCESS,
        children: [
          {
            name: 'Subsidiaries',
            type: 'item',
            icon: <ApartmentSharp />,
            link: '/subsidiaries',
            permission: PERMISSIONS.SUBSIDIARY.ACCESS,
          },
          {
            name: 'Departments',
            type: 'item',
            icon: <AccountTree />,
            link: '/departments',
            permission: PERMISSIONS.DEPARTMENT.ACCESS,
          },
          {
            name: 'Sections',
            type: 'item',
            icon: <Domain />,
            link: '/sections',
            permission: PERMISSIONS.SECTION.ACCESS,
          },
          {
            name: 'Sub-Sections',
            type: 'item',
            icon: <Domain />,
            link: '/sub-sections',
            permission: PERMISSIONS.SUB_SECTION.ACCESS,
          },
        ],
      },
    ],
  },
  {
    name: 'User Management',
    type: 'section',
    permission: PERMISSIONS.USER.ACCESS || PERMISSIONS.ROLE.ACCESS,
    children: [
      {
        name: 'System Users',
        type: 'item',
        icon: <People />,
        link: '/users',
        permission: PERMISSIONS.USER.ACCESS,
      },
      {
        name: 'Roles & Privileges',
        type: 'item',
        icon: <AutoFixHigh />,
        link: '/roles',
        permission: PERMISSIONS.ROLE.ACCESS,
      },
    ],
  },
  {
    name: 'Risk Settings',
    type: 'section',
    permission: PERMISSIONS.RISK_PARAM.ACCESS,
    children: [
      {
        name: 'Risk Parameters',
        type: 'item',
        icon: <SettingsApplicationsOutlined />,
        link: '/risk-params',
        permission: PERMISSIONS.RISK_PARAM.ACCESS,
      },
    ],
  },
  {
    name: '',
    type: 'section',
    permission: PERMISSIONS.RISK_UNIVERSE.ACCESS,
    children: [],
  },
];
