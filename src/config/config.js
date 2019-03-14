const config = {
  default: {
    sample: 'sample',
  },
  development: {
    target: 'development',
    api_url: 'http://localhost:8083/',
    // api_url: 'http://localhost:5000/platform-demo-9e004/us-central1/app/',
  },
  production: {
    target: 'production',
    api_url: 'https://us-central1-platform-demo-9e004.cloudfunctions.net/app/',
  },
};

export default {
  ...config.default,
  ...config[process.env.NODE_ENV || 'development'],
};
