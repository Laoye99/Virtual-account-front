const navigation = () => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      path: '/dashboards',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Account Configuration',
      icon: 'tabler:layout-grid',
      path: '/account',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Service provider',
      icon: 'tabler:table',
      path: '/service',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'API Registry',
      icon: 'tabler:list',
      path: '/api-reg',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Switch Registry',
      icon: 'tabler:switch-2',
      path: '/switch-reg',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Third Party Address',
      icon: 'tabler:address-book',
      path: '/address',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Crypto Configuration',
      icon: 'tabler:currency-bitcoin',
      path: '/crypto',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Third Party Api',
      icon: 'tabler:file-settings',
      path: '/crypto',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Settings',
      icon: 'tabler:settings',
      children: [

        // {
        //   title: 'Permissions',
        //   path: '/settings/permissions',
        //   action: 'ADMIN',
        //   subject: 'ADMIN'
        // },
        // {
        //   title: 'Permission Group',
        //   path: '/settings/roles',
        //   action: 'ADMIN',
        //   subject: 'ADMIN'
        // },

        {
          title: 'Manage Users',
          path: '/settings/user/list',
          action: 'ADMIN',
          subject: 'ADMIN'
        }
      ],

      action: 'ADMIN',
      subject: 'ADMIN'
    }
  ]
}

export default navigation
