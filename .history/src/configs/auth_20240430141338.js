export default {
  meEndpoint: 'https://c52b-102-89-23-77.ngrok-free.app/refresh',
  loginEndpoint: 'https://c52b-102-89-23-77.ngrok-free.app/auth',
  csrfEndpoint: 'https://c52b-102-89-23-77.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
