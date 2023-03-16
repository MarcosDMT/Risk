import { getNewDate } from '../../../@jumbo/utils/dateHelper';

export const COLORS = ['#22bb33', '#e7bd17', '#e78617', '#c40f0f', '#5AB9FE'];
export const GRADIENT_COLORS = [
  ['#22bb33', '#018c11'],
  ['#e78617', '#d97604'],
  ['#c40f0f', '#B72D23'],
  ['#5AB9FE', '#1372B7'],
  ['#e7bd17', '#e78617'],
];

export const riskTreeDataDepartments = [
  { id: 1, name: 'IT & Innovation', slug: 'IT', risks: 50 },
  { id: 2, name: 'Sales & Marketing', slug: 'SM', risks: 30 },
  { id: 3, name: 'Finance & Accounting', slug: 'FA', risks: 20 },
  { id: 4, name: 'Administration & Planning', slug: 'AP', risks: 10 },
  { id: 5, name: 'Procurement', slug: 'PM', risks: 5 },
];
export const riskTreeDataSections = [
  { id: 1, name: 'Section One', slug: 'S1', risks: 20 },
  { id: 2, name: 'Section Two', slug: 'S2', risks: 15 },
  { id: 3, name: 'Section Three', slug: 'S3', risks: 10 },
  { id: 4, name: 'Section Four', slug: 'S4', risks: 5 },
];
export const assessedTreeDataDepartments = [
  {
    id: 1,
    name: 'Low',
    color: COLORS[0],
    children: [
      { id: 1, name: 'IT & Innovation', slug: 'IT', risks: 10 },
      { id: 2, name: 'Sales & Marketing', slug: 'SM', risks: 3 },
      { id: 3, name: 'Finance & Accounting', slug: 'FA', risks: 34 },
      { id: 4, name: 'Administration & Planning', slug: 'AP', risks: 32 },
      { id: 5, name: 'Procurement', slug: 'PM', risks: 23 },
    ],
  },
  {
    id: 2,
    name: 'Medium',
    color: COLORS[1],
    children: [
      { id: 1, name: 'IT & Innovation', slug: 'IT', risks: 25 },
      { id: 2, name: 'Sales & Marketing', slug: 'SM', risks: 10 },
      { id: 3, name: 'Finance & Accounting', slug: 'FA', risks: 56 },
      { id: 4, name: 'Administration & Planning', slug: 'AP', risks: 20 },
      { id: 5, name: 'Procurement', slug: 'PM', risks: 40 },
    ],
  },
  {
    id: 3,
    name: 'High',
    color: COLORS[2],
    children: [
      { id: 1, name: 'IT & Innovation', slug: 'IT', risks: 34 },
      { id: 2, name: 'Sales & Marketing', slug: 'SM', risks: 60 },
      { id: 3, name: 'Finance & Accounting', slug: 'FA', risks: 34 },
      { id: 4, name: 'Administration & Planning', slug: 'AP', risks: 54 },
      { id: 5, name: 'Procurement', slug: 'PM', risks: 40 },
    ],
  },
  {
    id: 4,
    name: 'Very High',
    color: COLORS[3],
    children: [
      { id: 1, name: 'IT & Innovation', slug: 'IT', risks: 20 },
      { id: 2, name: 'Sales & Marketing', slug: 'SM', risks: 30 },
      { id: 3, name: 'Finance & Accounting', slug: 'FA', risks: 10 },
      { id: 4, name: 'Administration & Planning', slug: 'AP', risks: 18 },
      { id: 5, name: 'Procurement', slug: 'PM', risks: 23 },
    ],
  },
];
export const assessedTreeDataCat = [
  {
    id: 1,
    name: 'Low',
    color: COLORS[0],
    children: [
      { name: 'Compliance Risk', slug: 'CPR', risks: 20 },
      { name: 'Market Risk', slug: 'MTR', risks: 10 },
      { name: 'Legal Risk', slug: 'LGR', risks: 30 },
      { name: 'Liquidity Risk', slug: 'LDR', risks: 50 },
      { name: 'Strategic Risk', slug: 'SGR', risks: 15 },
      { name: 'Credit Risk', slug: 'CDR', risks: 55 },
      { name: 'Operational Risk', slug: 'OTR', risks: 25 },
    ],
  },
  {
    id: 2,
    name: 'Medium',
    color: COLORS[1],
    children: [
      { name: 'Compliance Risk', slug: 'CPR', risks: 20 },
      { name: 'Market Risk', slug: 'MTR', risks: 30 },
      { name: 'Legal Risk', slug: 'LGR', risks: 50 },
      { name: 'Liquidity Risk', slug: 'LDR', risks: 20 },
      { name: 'Strategic Risk', slug: 'SGR', risks: 15 },
      { name: 'Credit Risk', slug: 'CDR', risks: 25 },
      { name: 'Operational Risk', slug: 'OTR', risks: 34 },
    ],
  },
  {
    id: 3,
    name: 'High',
    color: COLORS[2],
    children: [
      { name: 'Compliance Risk', slug: 'CPR', risks: 25 },
      { name: 'Market Risk', slug: 'MTR', risks: 45 },
      { name: 'Legal Risk', slug: 'LGR', risks: 30 },
      { name: 'Liquidity Risk', slug: 'LDR', risks: 60 },
      { name: 'Strategic Risk', slug: 'SGR', risks: 55 },
      { name: 'Credit Risk', slug: 'CDR', risks: 35 },
      { name: 'Operational Risk', slug: 'OTR', risks: 15 },
    ],
  },
  {
    id: 4,
    name: 'Very High',
    color: COLORS[3],
    children: [
      { name: 'Compliance Risk', slug: 'CPR', risks: 26 },
      { name: 'Market Risk', slug: 'MTR', risks: 43 },
      { name: 'Legal Risk', slug: 'LGR', risks: 68 },
      { name: 'Liquidity Risk', slug: 'LDR', risks: 32 },
      { name: 'Strategic Risk', slug: 'SGR', risks: 17 },
      { name: 'Credit Risk', slug: 'CDR', risks: 25 },
      { name: 'Operational Risk', slug: 'OTR', risks: 50 },
    ],
  },
];
export const riskTreeDataControlCat = [
  { name: 'Compliance Risk', slug: 'CPR', risks: 30 },
  { name: 'Market Risk', slug: 'MTR', risks: 40 },
  { name: 'Legal Risk', slug: 'LGR', risks: 20 },
  { name: 'Liquidity Risk', slug: 'LDR', risks: 10 },
  { name: 'Strategic Risk', slug: 'SGR', risks: 55 },
  { name: 'Credit Risk', slug: 'CDR', risks: 34 },
  { name: 'Operational Risk', slug: 'OTR', risks: 45 },
];
export const riskProbabilityData = [
  {
    name: 'Human Resource',
    slug: 'HR',
    x: 1.0,
    y: 2.0,
    z: 40,
  },
  {
    name: 'Finance and Accounting',
    slug: 'FA',
    x: 2.0,
    y: 4.0,
    z: 400,
  },
  {
    name: 'IT & Innovation',
    slug: 'IT',
    x: 2.0,
    y: 1.0,
    z: 220,
  },
  {
    name: 'Administration & Planning',
    slug: 'AP',
    x: 3.0,
    y: 4.0,
    z: 250,
  },
  {
    name: 'Procurement',
    slug: 'PM',
    x: 4.0,
    y: 4.0,
    z: 210,
  },
  {
    name: 'Supply Chain',
    slug: 'SC',
    x: 3.0,
    y: 3.0,
    z: 260,
  },
];
export const riskProbabilityDataCat = [
  {
    name: 'Compliance Risk',
    slug: 'CPR',
    x: 2.0,
    y: 1.0,
    z: 20,
  },
  {
    name: 'Market Risk',
    slug: 'MTR',
    x: 1.0,
    y: 2.0,
    z: 50,
  },
  {
    name: 'Strategic Risk',
    slug: 'SGR',
    x: 2.0,
    y: 1.0,
    z: 100,
  },
  {
    name: 'Credit Risk',
    slug: 'CTR',
    x: 3.0,
    y: 4.0,
    z: 34,
  },
  {
    name: 'Operational Risk',
    slug: 'OTR',
    x: 4.0,
    y: 4.0,
    z: 55,
  },
  {
    name: 'Liquidity Risk',
    slug: 'LTR',
    x: 2.0,
    y: 3.0,
    z: 55,
  },
  {
    name: 'Legal Risk',
    slug: 'LGR',
    x: 2.0,
    y: 3.0,
    z: 55,
  },
];
export const riskLossTypeData = [
  {
    name: 'Loss Type',
    a: 350,
    b: 200,
    c: 150,
    d: 50,
  },
];
export const riskLossTypeDataCat = [
  {
    name: 'Loss Type',
    b: 370,
    a: 180,
    d: 120,
    c: 80,
  },
];
export const riskControlTypeData = [
  {
    name: 'Accept',
    color: COLORS[0],
    data: [
      { id: 1, name: 'IT & Innovation', slug: 'IT', value: 34 },
      { id: 2, name: 'Sales & Marketing', slug: 'SM', value: 60 },
      { id: 3, name: 'Finance & Accounting', slug: 'FA', value: 34 },
      { id: 4, name: 'Administration & Planning', slug: 'AP', value: 54 },
      { id: 5, name: 'Procurement', slug: 'PM', value: 40 },
    ],
  },
  {
    name: 'Mitigate',
    color: COLORS[1],
    data: [
      {
        name: 'IT & Innovation',
        slug: 'IT',
        value: 40,
      },
      {
        name: 'Human Resource',
        slug: 'HR',
        value: 30,
      },
      {
        name: 'Accounting & Finance',
        slug: 'AF',
        value: 10,
      },
      {
        name: 'Sales & Marketing',
        slug: 'SM',
        value: 30,
      },
    ],
  },
  {
    name: 'Transfer',
    color: COLORS[2],
    data: [
      {
        name: 'IT & Innovation',
        slug: 'IT',
        value: 20,
      },
      {
        name: 'Human Resource',
        slug: 'HR',
        value: 10,
      },
      {
        name: 'Accounting & Finance',
        slug: 'AF',
        value: 34,
      },
      {
        name: 'Sales & Marketing',
        slug: 'SM',
        value: 5,
      },
    ],
  },
  {
    name: 'Avoid',
    color: COLORS[3],
    data: [
      {
        name: 'IT & Innovation',
        slug: 'IT',
        value: 5,
      },
      {
        name: 'Human Resource',
        slug: 'HR',
        value: 15,
      },
      {
        name: 'Accounting & Finance',
        slug: 'AF',
        value: 30,
      },
      {
        name: 'Sales & Marketing',
        slug: 'SM',
        value: 20,
      },
    ],
  },
];
export const riskControlTypeDataCat = [
  {
    name: 'Accept',
    color: COLORS[0],
    data: [
      { name: 'Compliance Risk', slug: 'CPR', value: 30 },
      { name: 'Market Risk', slug: 'MTR', value: 40 },
      { name: 'Legal Risk', slug: 'LGR', value: 20 },
      { name: 'Liquidity Risk', slug: 'LDR', value: 10 },
      { name: 'Strategic Risk', slug: 'SGR', value: 55 },
      { name: 'Credit Risk', slug: 'CDR', value: 34 },
      { name: 'Operational Risk', slug: 'OTR', value: 45 },
    ],
  },
  {
    name: 'Mitigate',
    color: COLORS[1],
    data: [
      { name: 'Compliance Risk', slug: 'CPR', value: 20 },
      { name: 'Market Risk', slug: 'MTR', value: 10 },
      { name: 'Legal Risk', slug: 'LGR', value: 30 },
      { name: 'Liquidity Risk', slug: 'LDR', value: 50 },
      { name: 'Strategic Risk', slug: 'SGR', value: 15 },
      { name: 'Credit Risk', slug: 'CDR', value: 55 },
      { name: 'Operational Risk', slug: 'OTR', value: 25 },
    ],
  },
  {
    name: 'Transfer',
    color: COLORS[2],
    data: [
      { name: 'Compliance Risk', slug: 'CPR', value: 5 },
      { name: 'Market Risk', slug: 'MTR', value: 14 },
      { name: 'Legal Risk', slug: 'LGR', value: 35 },
      { name: 'Liquidity Risk', slug: 'LDR', value: 20 },
      { name: 'Strategic Risk', slug: 'SGR', value: 25 },
      { name: 'Credit Risk', slug: 'CDR', value: 10 },
      { name: 'Operational Risk', slug: 'OTR', value: 15 },
    ],
  },
  {
    name: 'Avoid',
    color: COLORS[3],
    data: [
      { name: 'Compliance Risk', slug: 'CPR', value: 40 },
      { name: 'Market Risk', slug: 'MTR', value: 25 },
      { name: 'Legal Risk', slug: 'LGR', value: 30 },
      { name: 'Liquidity Risk', slug: 'LDR', value: 20 },
      { name: 'Strategic Risk', slug: 'SGR', value: 15 },
      { name: 'Credit Risk', slug: 'CDR', value: 10 },
      { name: 'Operational Risk', slug: 'OTR', value: 20 },
    ],
  },
];
export const monthlyIncidentsData = [
  { name: 'Jan', incidents: 30 },
  { name: 'Feb', incidents: 54 },
  { name: 'Mar', incidents: 45 },
  { name: 'Apr', incidents: 76 },
  { name: 'May', incidents: 5 },
  { name: 'Jun', incidents: 60 },
  { name: 'Jul', incidents: 20 },
  { name: 'Aug', incidents: 67 },
  { name: 'Sep', incidents: 32 },
  { name: 'Oct', incidents: 30 },
  { name: 'Nov', incidents: 50 },
  { name: 'Dec', incidents: 0 },
];
export const lossTypeRisksDeptProgress = [
  { label: 'Direct Financial Loss', value: 40, color: COLORS[0] },
  { label: 'Indirect Financial Loss', value: 60, color: COLORS[1] },
  { label: 'Opportunity Costs', value: 70, color: COLORS[2] },
  { label: 'Near Misses', value: 50, color: COLORS[3] },
];
export const lossTypeRisksCatProgress = [
  { label: 'Direct Financial Loss', value: 50, color: COLORS[0] },
  { label: 'Indirect Financial Loss', value: 90, color: COLORS[1] },
  { label: 'Opportunity Costs', value: 70, color: COLORS[2] },
  { label: 'Near Misses', value: 60, color: COLORS[3] },
];

export const lossTypeIncidentsProgress = [
  { label: 'Direct Financial Loss', value: 89, color: COLORS[0] },
  { label: 'Indirect Financial Loss', value: 56, color: COLORS[1] },
  { label: 'Opportunity Costs', value: 90, color: COLORS[2] },
  { label: 'Near Misses', value: 56, color: COLORS[3] },
];
export const complianceMonthlyData = [
  {
    name: 'Overall Compliance',
    overallScore: '80%',
    badgeColor: COLORS[0],
    chartGradientColor: '#fef5f6',
    data: [
      { month: 'Jan', score: 10 },
      { month: 'Feb', score: 60 },
      { month: 'Mar', score: 50 },
      { month: 'Apr', score: 70 },
      { month: 'May', score: 50 },
      { month: 'Jun', score: 20 },
      { month: 'Jul', score: 45 },
      { month: 'Aug', score: 56 },
      { month: 'Sep', score: 74 },
      { month: 'Oct', score: 67 },
      { month: 'Nov', score: 89 },
      { month: 'Dec', score: 90 },
    ],
  },
  {
    name: 'Statutory Compliance',
    overallScore: '75%',
    badgeColor: COLORS[4],
    chartGradientColor: '#fef5f6',
    data: [
      { month: 'Jan', score: 20 },
      { month: 'Feb', score: 10 },
      { month: 'Mar', score: 40 },
      { month: 'Apr', score: 60 },
      { month: 'May', score: 50 },
      { month: 'Jun', score: 80 },
      { month: 'Jul', score: 65 },
      { month: 'Aug', score: 58 },
      { month: 'Sep', score: 70 },
      { month: 'Oct', score: 48 },
      { month: 'Nov', score: 78 },
      { month: 'Dec', score: 40 },
    ],
  },
  {
    name: 'Enterprise Compliance',
    overallScore: '80%',
    badgeColor: COLORS[2],
    chartGradientColor: '#fef5f6',
    data: [
      { month: 'Jan', score: 50 },
      { month: 'Feb', score: 70 },
      { month: 'Mar', score: 40 },
      { month: 'Apr', score: 80 },
      { month: 'May', score: 40 },
      { month: 'Jun', score: 80 },
      { month: 'Jul', score: 60 },
      { month: 'Aug', score: 55 },
      { month: 'Sep', score: 78 },
      { month: 'Oct', score: 64 },
      { month: 'Nov', score: 58 },
      { month: 'Dec', score: 75 },
    ],
  },
  {
    name: 'Legal Compliance',
    overallScore: '90%',
    badgeColor: COLORS[3],
    chartGradientColor: '#fef5f6',
    data: [
      { month: 'Jan', score: 70 },
      { month: 'Feb', score: 100 },
      { month: 'Mar', score: 80 },
      { month: 'Apr', score: 70 },
      { month: 'May', score: 55 },
      { month: 'Jun', score: 60 },
      { month: 'Jul', score: 78 },
      { month: 'Aug', score: 48 },
      { month: 'Sep', score: 75 },
      { month: 'Oct', score: 36 },
      { month: 'Nov', score: 79 },
      { month: 'Dec', score: 30 },
    ],
  },
];
export const overallComplianceYearly = [
  { name: '2017', overallScore: 55 },
  { name: '2018', overallScore: 80 },
  { name: '2019', overallScore: 77 },
  { name: '2020', overallScore: 65 },
  { name: '2021', overallScore: 90 },
];
export const calendarCompliance = [
  {
    id: 123,
    name: 'File KRA Returns',
    type: 'Compliance',
    color: COLORS[4],
    isAttended: false,
    status: 'Not Complied',
    actionBy: { id: 1, name: 'Dennis Njoroge' },
    date: getNewDate(2, 'DD MMM, YYYY, hh:mm a'),
  },
  {
    id: 124,
    name: 'HELB',
    type: 'Compliance',
    color: COLORS[3],
    status: 'Bridge',
    actionBy: { id: 3, name: 'Cynthia Wambui' },
    date: getNewDate(-1, 'DD MMM, YYYY, hh:mm a'),
  },
  {
    id: 125,
    name: 'Audit Returns',
    type: 'Enterprise',
    color: COLORS[0],
    status: 'Complied',
    isAttended: true,
    actionBy: { id: 3, name: 'David Muchiri' },
    date: getNewDate(1, 'DD MMM, YYYY, hh:mm a'),
  },
  {
    id: 126,
    name: 'NSSF',
    type: 'Compliance',
    color: COLORS[1],
    status: 'Not Complied',
    isAttended: false,
    actionBy: { id: 3, name: 'Cynthia Njoki' },
    date: getNewDate(0, 'DD MMM, YYYY, hh:mm a'),
  },
  {
    id: 125,
    name: 'NHIF',
    type: 'Compliance',
    color: COLORS[0],
    status: 'Complied',
    isAttended: true,
    actionBy: { id: 3, name: 'Cynthia Njoki' },
    date: getNewDate(0, 'DD MMM, YYYY, hh:mm a'),
  },
  {
    id: 125,
    name: 'Software Updates',
    type: 'Enterprise',
    color: COLORS[1],
    status: 'Not Complied',
    isAttended: false,
    actionBy: { id: 3, name: 'David Muchiri' },
    date: getNewDate(0, 'DD MMM, YYYY, hh:mm a'),
  },
];

export const complianceByDepartments = [
  {
    id: 10,
    compliance: 'Overall',
    color: COLORS[0],
    data: [
      { id: 1, name: 'IT & Innovation', slug: 'IT', rating: 70 },
      { id: 2, name: 'Sales & Marketing', slug: 'SM', rating: 85 },
      { id: 3, name: 'Finance & Accounting', slug: 'FA', rating: 90 },
      { id: 4, name: 'Administration & Planning', slug: 'AP', rating: 75 },
      { id: 5, name: 'Procurement', slug: 'PM', rating: 60 },
    ],
  },
  {
    id: 11,
    compliance: 'Enterprise',
    color: COLORS[2],
    data: [
      { id: 1, name: 'IT & Innovation', slug: 'IT', rating: 70 },
      { id: 2, name: 'Sales & Marketing', slug: 'SM', rating: 60 },
      { id: 3, name: 'Finance & Accounting', slug: 'FA', rating: 90 },
      { id: 4, name: 'Administration & Planning', slug: 'AP', rating: 40 },
      { id: 5, name: 'Procurement', slug: 'PM', rating: 55 },
    ],
  },
  {
    id: 12,
    compliance: 'Statutory',
    color: COLORS[4],
    data: [
      { id: 6, name: 'IT & Innovation', slug: 'IT', rating: 90 },
      { id: 7, name: 'Sales & Marketing', slug: 'SM', rating: 50 },
      { id: 8, name: 'Finance & Accounting', slug: 'FA', rating: 40 },
      { id: 9, name: 'Administration & Planning', slug: 'AP', rating: 95 },
      { id: 10, name: 'Procurement', slug: 'PM', rating: 80 },
    ],
  },
  {
    id: 13,
    compliance: 'Legal',
    color: COLORS[3],
    data: [
      { id: 6, name: 'IT & Innovation', slug: 'IT', rating: 40 },
      { id: 7, name: 'Sales & Marketing', slug: 'SM', rating: 70 },
      { id: 8, name: 'Finance & Accounting', slug: 'FA', rating: 80 },
      { id: 9, name: 'Administration & Planning', slug: 'AP', rating: 55 },
      { id: 10, name: 'Procurement', slug: 'PM', rating: 90 },
    ],
  },
];
export const complianceBySections = [
  {
    id: 10,
    compliance: 'Overall',
    color: COLORS[0],
    data: [
      { id: 1, name: 'Section One', slug: 'S1', rating: 70 },
      { id: 2, name: 'Section Two', slug: 'S2', rating: 85 },
      { id: 3, name: 'Section Three', slug: 'S3', rating: 90 },
    ],
  },
  {
    id: 11,
    compliance: 'Enterprise',
    color: COLORS[2],
    data: [
      { id: 1, name: 'Section One', slug: 'S1', rating: 70 },
      { id: 2, name: 'Section Two', slug: 'S2', rating: 75 },
      { id: 3, name: 'Section Three', slug: 'S3', rating: 30 },
    ],
  },
  {
    id: 12,
    compliance: 'Statutory',
    color: COLORS[4],
    data: [
      { id: 1, name: 'Section One', slug: 'S1', rating: 60 },
      { id: 2, name: 'Section Two', slug: 'S2', rating: 95 },
      { id: 3, name: 'Section Three', slug: 'S3', rating: 60 },
    ],
  },
  {
    id: 13,
    compliance: 'Legal',
    color: COLORS[3],
    data: [
      { id: 1, name: 'Section One', slug: 'S1', rating: 65 },
      { id: 2, name: 'Section Two', slug: 'S2', rating: 75 },
      { id: 3, name: 'Section Three', slug: 'S3', rating: 50 },
    ],
  },
];
export const complianceBySubSections = [
  {
    id: 10,
    compliance: 'Overall',
    color: COLORS[0],
    data: [
      { id: 1, name: 'Sub-Section One', slug: 'SS1', rating: 70 },
      { id: 2, name: 'Sub-Section Two', slug: 'SS2', rating: 85 },
    ],
  },
  {
    id: 11,
    compliance: 'Enterprise',
    color: COLORS[2],
    data: [
      { id: 1, name: 'Sub-Section One', slug: 'SS1', rating: 70 },
      { id: 2, name: 'Sub-Section Two', slug: 'SS2', rating: 75 },
    ],
  },
  {
    id: 12,
    compliance: 'Statutory',
    color: COLORS[4],
    data: [
      { id: 1, name: 'Sub-Section One', slug: 'SS1', rating: 60 },
      { id: 2, name: 'Sub-Section Two', slug: 'SS2', rating: 95 },
    ],
  },
  {
    id: 13,
    compliance: 'Legal',
    color: COLORS[3],
    data: [
      { id: 1, name: 'Sub-Section One', slug: 'SS1', rating: 65 },
      { id: 2, name: 'Sub-Section Two', slug: 'SS2', rating: 75 },
    ],
  },
];
