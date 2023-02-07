import Dashboard from "../modules/Dashboard/dashboard";

const routes = [
  {
    path: '/',
    page: 'Home/home',
    folder: 'app/modules',
    isPrivate: true,
    exact: true,
    grant: 'site.index'
  },
  {
    path: 'devices',
    page: 'Device/device',
    folder: 'app/modules',
    isPrivate: true,
    exact: true,
    grant: 'site.index'
  },
  {
    path: 'basicData/sites',
    page: 'Site/site-overview',
    folder: 'app/modules',
    isPrivate: true,
    exact: true,
    grant: 'site.index'
  },
  {
    path: 'basicData/companies/:id',
    page: 'Company/company',
    folder: 'app/modules',
    isPrivate: true,
    exact: true,
    grant: 'company.index'
  },
  {
    path: 'basicData/companies',
    page: 'Company/company-overview',
    folder: 'app/modules',
    isPrivate: true,
    exact: true,
    grant: 'company.index'
  },
];


export default routes;