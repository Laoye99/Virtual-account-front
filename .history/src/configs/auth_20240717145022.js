export default {
  meEndpoint: 'https://ec85-102-89-22-49.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://ec85-102-89-22-49.ngrok-free.app/auth/login',
  csrfEndpoint: 'https://b3c0-102-88-83-39.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
