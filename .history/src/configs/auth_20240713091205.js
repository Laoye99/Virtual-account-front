export default {
  meEndpoint: 'https://b3c0-102-88-83-39.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://b3c0-102-88-83-39.ngrok-free.app/auth/login',
  csrfEndpoint: 'https://b3c0-102-88-83-39.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
