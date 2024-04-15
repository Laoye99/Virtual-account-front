export default {
  meEndpoint: 'https://a67c-102-88-69-85.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://a67c-102-88-69-85.ngrok-free.app/auth',
  csrfEndpoint: 'https://a67c-102-88-69-85.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
