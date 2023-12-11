const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://webfrontendassignment-isaraerospace.azurewebsites.net',
      changeOrigin: true,
      secure: false,
    })
  );
};