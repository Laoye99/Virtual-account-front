export default {
  meEndpoint: 'https://5d13-102-89-46-212.ngrok-free.app/refresh',
  loginEndpoint: 'https://5d13-102-89-46-212.ngrok-free.app/auth',
  csrfEndpoint: 'https://5d13-102-89-46-212.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
