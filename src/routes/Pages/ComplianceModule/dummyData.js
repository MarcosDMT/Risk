export const complianceData = [
  {
    id: 1,
    complianceTitle: 'Value Added Tax',
    complianceDesc:
      '<p>Imposition of value added tax on supplies made in, or imported into Kenya, and for connected purposes. </p> <p>Value added tax should be filed on every 20th of the month.</p> <p>A person who fails to submit a return as required under this section shall be liable to a penalty of ten thousand shillings or five per cent of the amount of tax payable under the return, whichever is higher.</p>',
    authority: 'Kenya Revenue Authority (KRA)',
    department: 'Finance & Administration',
    penaltyCurrency: 'KES',
    section: 'Section One',
    subSection: 'Sub-Section One',
    penalty: 10000,
    primaryOwner: 'Dennis Njoroge',
    secondaryOwner: 'David Muchiri',
    escalationPerson: 'Cynthia Wambui',
    priority: 'High',
    frequency: 'Monthly',
    submissionStatus: 'Active',
    submissionDeadline: '5/20/2022',
    complianceType: 'Statutory Compliance',
    sourceDoc: 'https://www.kra.go.ke/images/publications/ValueAddedTax_ActNo35of2013.pdf',
  },
  {
    id: 2,
    complianceTitle: 'Renewal of staff cards',
    complianceDesc:
      '<p>Staff cards to be renewed after every 4 years to deter impersonation techniques from fraudsters </p>',
    authority: 'Human Resources',
    department: 'Human Resource',
    penaltyCurrency: 'KES',
    section: 'Section One',
    subSection: 'Sub-Section One',
    penalty: 10000,
    primaryOwner: 'David Muchiri',
    secondaryOwner: 'Cynthia Wambui',
    escalationPerson: 'Dennis Njoroge',
    priority: 'Moderate',
    frequency: 'One Off',
    submissionStatus: 'Active',
    submissionDeadline: '8/8/2022',
    complianceType: 'Enterprise Compliance',
    sourceDoc: 'HR Manual.pdf',
  },
  {
    id: 2,
    complianceTitle: 'Case Test',
    complianceDesc: 'Write a little bit about the case',
    judgement: 'No judgement :)',
    authority: '',
    caseType: 'Internal',
    managerComments: 'Not much to say <@@>',
    department: 'Human Resource',
    section: 'Section One',
    subSection: 'Sub-Section One',
    fines: 0,
    penaltyCurrency: 'KES',
    fees: 2000,
    totalFees: 2000,
    penalty: 1000,
    primaryOwner: 'David Muchiri',
    secondaryOwner: 'Cynthia Wambui',
    escalationPerson: 'Dennis Njoroge',
    priority: 'Moderate',
    frequency: 'One Off',
    submissionStatus: 'Active',
    submissionDeadline: '8/8/2022',
    complianceType: 'Legal Compliance',
    sourceDoc: 'HR Manual.pdf',
  },
];
export const complianceTypes = [
  {
    id: 1,
    name: 'Legal Compliance',
  },
  {
    id: 2,
    name: 'Statutory Compliance',
  },
  {
    id: 3,
    name: 'Enterprise Compliance',
  },
];
export const frequencies = [
  {
    id: 1,
    name: 'One Off',
  },
  {
    id: 2,
    name: 'Monthly',
  },
  {
    id: 3,
    name: 'Quarterly',
  },
  {
    id: 4,
    name: 'Semi-Annually',
  },
  {
    id: 5,
    name: 'Annually',
  },
  {
    id: 6,
    name: 'Bi-Annually',
  },
];
export const priority = [
  {
    id: 1,
    name: 'High',
  },
  {
    id: 2,
    name: 'Moderate',
  },
  {
    id: 3,
    name: 'Low',
  },
];
