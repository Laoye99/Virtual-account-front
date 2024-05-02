export default {
  meEndpoint: 'https://9d51-102-217-205-1.ngrok-free.app/refresh',
  loginEndpoint: 'https://9d51-102-217-205-1.ngrok-free.app/auth',
  csrfEndpoint: 'https://9d51-102-217-205-1.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
