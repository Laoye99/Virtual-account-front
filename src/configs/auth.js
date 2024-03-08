export default {
  meEndpoint: 'https://66ba-102-89-42-225.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://66ba-102-89-42-225.ngrok-free.app/auth',
  csrfEndpoint: 'http://10.200.0.27:8001/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
