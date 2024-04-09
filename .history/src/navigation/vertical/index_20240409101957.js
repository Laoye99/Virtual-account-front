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
      title: 'NIP and UPSL transactions',
      icon: 'tabler:mail',
      path: '/transaction',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Switch provider configuration',
      icon: 'tabler:messages',
      path: '/switch-service',
      action: 'user',
      subject: 'user'
    },

    {
      title: "Financial institution profile",
      icon: 'tabler:credit-card',
      path: '/institutions',
      action: 'user',
      subject: 'user'
    },

    {
      title: 'Transaction router',
      icon: 'tabler:calendar',
      path: '/router',
      action: 'user',
      subject: 'user'
    },

    {
      title: 'Response Code Configuration',
      path: '/response',
      icon: 'tabler:checkbox',
      action: 'user',
      subject: 'user'
    }, 
    {
      title: 'NIP and UPSL statistics',
      icon: 'tabler:table',
      path: '/statistics',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Fee configuration',
      icon: 'tabler:layout-grid',
      path: '/fee-configuration',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Account information',
      icon: 'tabler:typography',
      path: '/information',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Settings',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Permissions',
          path: '/settings/permissions',
          action: 'ADMIN',
          subject: 'ADMIN'
        },
        {
          title: 'Permission Group',
          path: '/settings/roles',
          action: 'ADMIN',
          subject: 'ADMIN'
        },
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
