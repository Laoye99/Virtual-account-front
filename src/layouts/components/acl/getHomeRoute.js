/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  // if (role === 'client') return '/acl'
  return '/dashboards'
}

export default getHomeRoute
