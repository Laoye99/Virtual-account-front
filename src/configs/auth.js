export default {
  meEndpoint: '/auth/me',
  loginEndpoint: 'http://10.200.0.27:8001/api/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
