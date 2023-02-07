let routes = [
  {
    path: '/login',
    page: 'Login',
    folder: '_core/screens',
    isPrivate: false,
    exact: true,
    grant: 'auth.login'
  },
  {
    path: '/404',
    page: 'NotFound',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'auth.notfound'
  },
  {
    path: '/',
    page: 'Home',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'auth.home'
  },
  {
    path: '/settings/userProfiles',
    page: 'UserProfiles',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUsers'
  },
  {
    path: '/settings/roles',
    page: 'Roles',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyRoles'
  },
  {
    path: '/settings/userRoles',
    page: 'UserRoles',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUserRoles'
  },
  {
    path: '/settings/rolePermissions',
    page: 'RolePermissions',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifyUserRoles'
  },
  {
    path: '/settings/systemParameters',
    page: 'SystemParameters',
    folder: '_core/screens',
    isPrivate: true,
    exact: true,
    grant: 'settings.modifySystemParameters'
  },
];

export default routes