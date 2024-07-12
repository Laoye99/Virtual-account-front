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
      title: 'Service provider ',
      icon: 'tabler:table',
      path: '/service',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'API Registry ',
      icon: 'tabler:list',
      path: '/user',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Switch Registry ',
      icon: 'tabler:switch-2',
      path: '/switch-reg',
      action: 'user',
      subject: 'user'
    },
    {
      title: '3rd Party A ',
      icon: 'tabler:switch-2',
      path: '/switch-reg',
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
