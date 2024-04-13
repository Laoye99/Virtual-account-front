export default {
  meEndpoint: 'https://a67c-102-88-69-85.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://b9fc-102-88-84-120.ngrok-free.app/auth',
  csrfEndpoint: 'http://10.200.0.27:8001/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
