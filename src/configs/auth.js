export default {
  meEndpoint: 'https://ddba-102-89-34-196.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://ddba-102-89-34-196.ngrok-free.app/auth',
  csrfEndpoint: 'http://10.200.0.27:8001/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
