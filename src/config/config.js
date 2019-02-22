const config = {
  default: {
    sample: 'sample',
  },
  development: {
    target: 'development',
    api_url: 'https://us-central1-dummy-api-d358c.cloudfunctions.net/app/',
  },
  production: {
    target: 'production',
    api_url: 'https://us-central1-dummy-api-d358c.cloudfunctions.net/app/',
  },
};

export default {
  ...config.default,
  ...config[process.env.NODE_ENV || 'development'],
};
