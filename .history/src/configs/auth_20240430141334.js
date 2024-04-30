export default {
  meEndpoint: 'https://c52b-102-89-23-77.ngrok-free.app/refresh',
  loginEndpoint: 'https://c52b-102-89-23-77.ngrok-free.app/auth',
  csrfEndpoint: 'https://146d-102-89-47-241.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
