export default {
  meEndpoint: 'https://4837-102-88-81-173.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://4837-102-88-81-173.ngrok-free.app/auth',
  csrfEndpoint: 'http://10.200.0.27:8001/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
