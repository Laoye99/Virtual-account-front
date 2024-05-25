export default {
  meEndpoint: 'http://localhost:9897/refresh',
  loginEndpoint: 'http://localhost:9897/auth',
  csrfEndpoint: 'http://localhost:9897/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
