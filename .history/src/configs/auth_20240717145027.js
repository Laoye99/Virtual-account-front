export default {
  meEndpoint: 'https://ec85-102-89-22-49.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://ec85-102-89-22-49.ngrok-free.app/auth/login',
  csrfEndpoint: 'https://ec85-102-89-22-49.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
