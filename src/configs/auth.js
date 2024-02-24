export default {
  meEndpoint: 'http://10.200.0.27:8001/api/helper/me',
  loginEndpoint: 'http://10.200.0.27:8001/api/login',
  csrfEndpoint: 'http://10.200.0.27:8001/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
