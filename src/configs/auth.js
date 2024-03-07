export default {
  meEndpoint: 'https://96b3-102-88-36-19.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://96b3-102-88-36-19.ngrok-free.app/auth',
  csrfEndpoint: 'http://10.200.0.27:8001/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
