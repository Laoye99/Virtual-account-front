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
      title: 'Approval Request',
      icon: 'tabler:mail',
      path: '/approval-request',
      action: 'user',
      subject: 'user'
    },
    {
      title: 'Loan Request',
      icon: 'tabler:messages',
      path: '/loan-request',
      action: 'user',
      subject: 'user'
    },

    {
      title: "Guarantor's Request",
      icon: 'tabler:credit-card',
      path: '/guarantor',
      action: 'user',
      subject: 'user'
    },

    {
      title: 'Loan Calculator',
      icon: 'tabler:calendar',
      path: '/loancalculator',
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
