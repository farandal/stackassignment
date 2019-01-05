//uses a tunel, sudo npm install -g localtunnel,  lt --port 8888
//apiUrl = 'https://sour-bobcat-55.localtunnel.me';
//READ: https://stackoverflow.com/questions/30909492/mongoerror-topology-was-destroyed
const config = {
  env: 'dev',
  //apiUrl: 'http://stackassignment-backend-local.farandal.com:8888',
  //apiUrl: 'http://stackassignment-backend.farandal.com',
  apiUrl: 'https://tame-chipmunk-80.localtunnel.me',
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
