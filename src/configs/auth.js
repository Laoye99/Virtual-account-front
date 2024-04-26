export default {
  meEndpoint: 'https://5065-102-217-205-1.ngrok-free.app/refresh',
  loginEndpoint: 'https://5065-102-217-205-1.ngrok-free.app/auth',
  csrfEndpoint: 'https://5065-102-217-205-1.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
