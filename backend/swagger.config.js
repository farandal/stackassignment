module.exports = {
  info: {
    title: 'Stack Assignment API',
    version: '1.0.0',
    description: 'API to handle calndar events from a google user account'
  },
  apis: ['api/index.js', 'api/user/*', 'api/auth/*', 'api/items/*'],
  host: 'stackassignment-backend-local.farandal.com:8888',
  basePath: '/',
  swagger: '2.0'
};
