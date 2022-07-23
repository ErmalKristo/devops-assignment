export default {
    env: 'prod',
    port: 5000,
    backend: process.env.BACKEND_URL || 'http://dummy-pdf-or-png:3000'
  };