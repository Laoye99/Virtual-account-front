export default {
  meEndpoint: 'https://146d-102-89-47-241.ngrok-free.app/refresh',
  loginEndpoint: 'https://146d-102-89-47-241.ngrok-free.app/auth',
  csrfEndpoint: 'https://146d-102-89-47-241.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
