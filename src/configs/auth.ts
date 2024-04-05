export default {
  meEndpoint: `/dev/users/profile`,
  loginEndpoint: `/dev/auth/login`,
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
