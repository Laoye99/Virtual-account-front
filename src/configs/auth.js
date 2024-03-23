export default {
  meEndpoint: 'https://dfa1-129-205-124-177.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://dfa1-129-205-124-177.ngrok-free.app/auth',
  csrfEndpoint: 'http://10.200.0.27:8001/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
