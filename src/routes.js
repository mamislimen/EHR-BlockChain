import React from 'react';



const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Consulatation = React.lazy(() => import('./views/Practitioner/Consultation'));
const Prescription = React.lazy(() => import('./views/Practitioner/Prescription'));
const Allergies = React.lazy(() => import('./views/Practitioner/Allergies'));
const Mri = React.lazy(() => import('./views/Practitioner/Mri'));
const LabResults = React.lazy(() => import('./views/Practitioner/LabResults'));
const ChronicDisease = React.lazy(() => import('./views/Practitioner/ChronicDisease'));
const Profile = React.lazy(() => import('./views/Profile/profile'));
const PhysicalActivity = React.lazy(() => import('./views/PhysicalActivity/physicalactivity'));
const Nutrition = React.lazy(() => import('./views/Nutrition/nutrition'));
const Pharmacy = React.lazy(() => import('./views/Pharmacy/Drugs'));
const AdminPharmacy = React.lazy(() => import('./views/Admin/Pharmacy/pharmacy'));
const AdminPatient = React.lazy(() => import('./views/Admin/Patient/patient'));
const AdminPractioner = React.lazy(() => import('./views/Admin/Practitioner/practitioner'));
 

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboards',exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/dashboards/profile', exact: true,  name: 'Profile', component: Profile },
  { path: '/dashboards/user/physicalactivity', exact: true,  name: 'PhysicalActivity', component: PhysicalActivity },
  { path: '/dashboards/user/nutrition', exact: true,  name: 'Nutrition', component: Nutrition },
  { path: '/dashboards/practitioner/consultation', exact: true, name: 'Consulatation', component: Consulatation },
  { path: '/dashboards/practitioner/prescription', exact: true, name: 'Prescription', component: Prescription },
  { path: '/dashboards/practitioner/allergies', exact: true, name: 'Allergies', component: Allergies },
  { path: '/dashboards/practitioner/mri', exact: true, name: 'MRI', component: Mri },
  { path: '/dashboards/practitioner/labresults', exact: true, name: 'Lab Results', component: LabResults },
  { path: '/dashboards/practitioner/chronicdisease', exact: true, name: 'chronic disease', component: ChronicDisease },
  { path: '/dashboards/pharmacy/addDrugs', exact: true, name: 'Pharmacy add Drug', component: Pharmacy },
  { path: '/dashboards/admin/pharmacy', exact: true,  name: 'Nutrition', component: AdminPharmacy },
  { path: '/dashboards/admin/practitioner', exact: true,  name: 'Nutrition', component: AdminPractioner },
  { path: '/dashboards/admin/patient', exact: true,  name: 'Nutrition', component: AdminPatient },
  
];

export default routes;
