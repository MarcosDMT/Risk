import { COLORS } from '../Dashboard/dummyData';

export const probabilityList = [
  {
    id: 1,
    name: 'Low',
    orderIndex: 0,
    color: '#22bb33',
  },
  {
    id: 2,
    name: 'Possible',
    orderIndex: 1,
    color: '#e7bd17',
  },
  {
    id: 3,
    name: 'Almost Certain',
    orderIndex: 2,
    color: '#e78617',
  },
  {
    id: 4,
    name: 'Certain',
    orderIndex: 3,
    color: '#c40f0f',
  },
];
export const severityList = [
  {
    id: 1,
    name: 'Low',
    orderIndex: 0,
    color: '#22bb33',
  },
  {
    id: 2,
    name: 'Moderate',
    orderIndex: 1,
    color: '#e7bd17',
  },
  {
    id: 3,
    name: 'High',
    orderIndex: 2,
    color: '#e78617',
  },
  {
    id: 4,
    name: 'Intolerable',
    orderIndex: 3,
    color: '#c40f0f',
  },
];
export const riskCategoryList = [
  {
    id: 1,
    name: 'Credit Risk',
    orderIndex: 0,
  },
  {
    id: 2,
    name: 'Compliance Risk',
    orderIndex: 1,
  },
];
export const lossTypeList = [
  {
    id: 1,
    name: 'Direct Financial Loss',
    orderIndex: 0,
  },
  {
    id: 2,
    name: 'Indirect Financial Loss',
    orderIndex: 1,
  },
  {
    id: 3,
    name: 'Opportunity Cost',
    orderIndex: 1,
  },
  {
    id: 4,
    name: 'Near Miss',
    orderIndex: 1,
  },
];
export const controlCategory = [
  {
    id: 1,
    name: 'Accept',
    orderIndex: 0,
    color: '#22bb33',
  },
  {
    id: 2,
    name: 'Mitigate',
    orderIndex: 0,
    color: '#e7bd17',
  },
  {
    id: 3,
    name: 'Transfer',
    orderIndex: 0,
    color: '#e78617',
  },
  {
    id: 4,
    name: 'Avoid',
    orderIndex: 0,
    color: '#c40f0f',
  },
];
export const frequency = [
  {
    name: 'Monthly',
  },
  {
    name: 'Quarterly',
  },
  {
    name: 'Semi-Annually',
  },
  {
    name: 'Yearly',
  },
];
export const risksList = [
  {
    id: 'RSol1',
    riskTitle: 'Staff Defaults',
    riskEvent: 'Staff advances defaults',
    riskCategory: 'Credit Risk',
    subsidiary: '',
    department: 'Human Resource',
    section: '',
    subSection: '',
    rootCauses: ['Staff exits.', 'Advancing loans to staff who have exceeded the 1/3 rule.', 'Poor financial management'],
    riskImpact: ['Possible loss of funds', 'Fines & Penalties for exceeding 1/3 rule'],
    riskControlCat: 'Mitigate',
    controlActions: [
      'Conduct training on Personal Financial Management to Staff.',
      'Continuous follow up on staff who have exited with company advances.',
      'Ensure that the 1/3 rule is strictly adhered. Regular audit performance to ensure that this is strictly adhered to.',
    ],
    riskOwner: 'Head of Department',
    keyIndicator: 'Credit amount over 30 days in arrears.',
    keyIndicatorFrequency: 'Monthly',
    riskAppetite: '0',
    riskAppetiteType: '%age',
    status: 'Pending',
    lossType: 'Direct Financial Loss',
    probability: 'Low',
    severity: 'High',
    residualRisk: 'Low-No action',
  },
  {
    id: 'RSol2',
    riskTitle: 'Non compliance with Statutory Regulations',
    riskEvent: 'Non compliance with regulators arising from failures in filing KRA returns e.g. WHT, VAT etc.',
    riskCategory: 'Compliance Risk',
    subsidiary: '',
    department: 'Finance & Administration',
    section: 'Section One',
    subSection: '',
    rootCauses: ['Filing of returns past the due date.'],
    riskImpact: ['Fines & Penalties by regulators such as KRA'],
    riskControlCat: 'Mitigate',
    controlActions: [
      'Regular  monitoring, reviews and compliance health checks by the compliance team.',
      'Installation of the compliance system that will help in sending alerts to returning officers when the obligations are due.',
    ],
    riskOwner: 'Head of Section',
    keyIndicator: 'Fines & Penalties payable to the regulators.',
    keyIndicatorFrequency: 'Yearly',
    riskAppetite: '0',
    riskAppetiteType: 'Number',
    status: 'Approved',
    lossType: 'Opportunity Cost',
    probability: 'Low',
    severity: 'High',
    residualRisk: 'Low-No action',
  },
];
export const incidentsList = [
  {
    id: 1,
    riskId: 'RSol1',
    riskTitle: 'Staff Defaults',
    riskEvent: 'Staff advances defaults',
    incidentNarration: 'This is a test narration',
    incidentDate: '2022-5-19',
    lossType: 'Direct Financial Loss',
    lossTypeMeasure: '%age',
    lossTypeQty: '30',
    status: 'Pending',
    controlCategory: 'Mitigate',
    incidentAction: 'This is a test Action',
    actionDate: '2022-5-22',
    actionOwner: 'Dennis Njoroge',
  },
  {
    id: 2,
    riskId: 'RSol2',
    riskTitle: 'Non compliance with Statutory Regulations',
    riskEvent: 'Non compliance with regulators arising from failures in filing KRA returns e.g. WHT, VAT etc.',
    incidentNarration: 'This is a test narration',
    incidentDate: '2022-5-17',
    lossType: 'Opportunity Cost',
    lossTypeMeasure: 'Number',
    lossTypeQty: '300',
    status: 'Approved',
    controlCategory: 'Mitigate',
    incidentAction: 'This is a test Action',
    actionDate: '2022-5-22',
    actionOwner: 'Cynthia Wambui',
  },
];
export const probabilityMatrixList = [
  {
    id: 1,
    name: '3 by 3 Matrix',
  },
  {
    id: 2,
    name: '4 by 4 Matrix',
  },
  {
    id: 3,
    name: '5 by 5 Matrix',
  },
];
export const probabilityList3 = [
  {
    id: 1,
    name: 'Low',
    orderIndex: 0,
    color: '#22bb33',
  },
  {
    id: 2,
    name: 'Possible',
    orderIndex: 1,
    color: '#e7bd17',
  },
  {
    id: 3,
    name: 'Certain',
    orderIndex: 3,
    color: '#c40f0f',
  },
];
export const severityList3 = [
  {
    id: 1,
    name: 'Low',
    orderIndex: 0,
    color: '#22bb33',
  },
  {
    id: 2,
    name: 'Moderate',
    orderIndex: 1,
    color: '#e7bd17',
  },
  {
    id: 3,
    name: 'High',
    orderIndex: 2,
    color: '#c40f0f',
  },
];
export const probabilityList5 = [
  {
    id: 1,
    name: 'Very Low',
    orderIndex: 0,
    color: '#22bb33',
  },
  {
    id: 2,
    name: 'Low',
    orderIndex: 0,
    color: '#88bb22',
  },
  {
    id: 3,
    name: 'Possible',
    orderIndex: 1,
    color: '#e7bd17',
  },
  {
    id: 4,
    name: 'Almost Certain',
    orderIndex: 2,
    color: '#e78617',
  },
  {
    id: 5,
    name: 'Certain',
    orderIndex: 3,
    color: '#c40f0f',
  },
];
export const severityList5 = [
  {
    id: 1,
    name: 'Very Low',
    orderIndex: 0,
    color: '#22bb33',
  },
  {
    id: 2,
    name: 'Low',
    orderIndex: 0,
    color: '#88bb22',
  },
  {
    id: 3,
    name: 'Moderate',
    orderIndex: 1,
    color: '#e7bd17',
  },
  {
    id: 4,
    name: 'High',
    orderIndex: 2,
    color: '#e78617',
  },
  {
    id: 5,
    name: 'Intolerable',
    orderIndex: 3,
    color: '#c40f0f',
  },
];
export const residualList = [
  {
    id: 1,
    name: 'Low',
    value: 4,
    color: COLORS[0],
  },
  {
    id: 2,
    name: 'Tolerable',
    orderIndex: 1,
    value: 8,
    color: COLORS[1],
  },
  {
    id: 3,
    name: 'High',
    orderIndex: 2,
    value: 12,
    color: COLORS[2],
  },
  {
    id: 4,
    name: 'Intolerable',
    orderIndex: 3,
    value: 16,
    color: COLORS[3],
  },
];
// const keyRiskIndicator = [
//   {
//     riskId:'',
//     previousStatus:'',
//     currentStatus:'',
//     riskDirection:'',
//     riskOwner:'',
//   }
// ]
