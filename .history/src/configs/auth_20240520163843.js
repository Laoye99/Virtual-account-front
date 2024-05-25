export default {
  meEndpoint: 'https://9d51-102-217-205-1.ngrok-free.app/refresh',
  loginEndpoint: 'http://localhost:9897/auth',
  csrfEndpoint: 'http://localhost:9897/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
