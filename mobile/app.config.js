const config = {
  env: 'prod',
  apiUrl: 'http://stackassignment-backend.farandal.com',
  google: {
    clientID:
      '341947537567-s92njnjoagh7r6aelfnmchf99vqoghbv.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    shouldFetchBasicProfile: true,
    language: 'en-EN',
    serverClientID:
      '341947537567-s6532eu6tkk44qkers2mkf8p7mglkt62.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true
  },
  colors: {
    text: {
      primary: '#ffffff',
      secondary: '#000000'
    },
    primary: '#0397d6',
    secondary: '#8dc147',
    secondaryDark: '#58861b'
  }
};

export default config;
