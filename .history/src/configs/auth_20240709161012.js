export default {
  meEndpoint: 'https://3a74-102-88-71-150.ngrok-free.app/auth/refresh',
  loginEndpoint: 'https://3a74-102-88-71-150.ngrok-free.app/auth/login',
  csrfEndpoint: 'https://3a74-102-88-71-150.ngrok-free.app/sanctum/csrf-cookie',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}