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
      icon: 'tabler:mail',
      path: '/transaction',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Service provider configuration',
      icon: 'tabler:messages',
      path: '/switch-service',
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
