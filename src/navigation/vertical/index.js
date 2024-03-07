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
      path: '/approval-request',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Switch provider configuration',
      icon: 'tabler:messages',
      path: '/loan-request',
      action: 'user',
      subject: 'user'
    },

    {
      title: "Financial institution profile",
      icon: 'tabler:credit-card',
      path: '/guarantor',
      action: 'user',
      subject: 'user'
    },

    {
      title: 'Transaction router',
      icon: 'tabler:calendar',
      path: '/loancalculator',
      action: 'user',
      subject: 'user'
    },

    {
      title: 'Response Code Configuration',
      path: '/forms/form-validation',
      icon: 'tabler:checkbox',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Balance Inquiry',
      path: '/forms/form-wizard',
      icon: 'tabler:text-wrap-disabled',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'NIP and UPSL statistics',
      icon: 'tabler:table',
      path: '/tables/mui',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Fee configuration',
      icon: 'tabler:layout-grid',
      path: '/tables/data-grid',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Account information',
      icon: 'tabler:typography',
      path: '/ui/typography',
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
          action: 'sla:sla-settings-permissions:view',
          subject: 'sla:sla-settings-permissions:view'
        },
        {
          title: 'Permission Group',
          path: '/settings/roles',
          action: 'sla:sla-settings-permissions-group:view',
          subject: 'sla:sla-settings-permissions-group:view'
        },
        {
          title: 'Manage Users',
          path: '/settings/user/list',
          action: 'sla:sla-settings-manage-users:view',
          subject: 'sla:sla-settings-manage-users:view'
        }
      ],

      action: 'sla:sla-settings:view',
      subject: 'sla:sla-settings:view'
    }
  ]
}

export default navigation
