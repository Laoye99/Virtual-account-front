export default {
  meEndpoint: 'https://14f9-102-89-32-155.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://14f9-102-89-32-155.ngrok-free.app/auth/login',
  csrfEndpoint: 'https://14f9-102-89-32-155.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
