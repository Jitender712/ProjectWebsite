const   TokenManager = require('../app/lib/tokenManager'),
        config = require('config'),
        constants = require('../constants').APP_CONSTANTS;

exports.plugin = {
  name: 'auth',
  register: async (server, options) => {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('ConsumerAuth', 'jwt',
      {
        key: config.get("jwtSecretKey"),
        validate: TokenManager.verifyToken,
        verifyOptions: { algorithms: ['HS256'] }
      });

    server.auth.strategy('AdminAuth', 'jwt',
      {
        key: config.get("jwtSecretKey"),
        validate: TokenManager.verifyToken,
        verifyOptions: { algorithms: ['HS256'] }
      });
      
      server.auth.strategy('DriverAuth', 'jwt',
      {
        key: config.get("jwtSecretKey"),
        validate: TokenManager.verifyToken,
        verifyOptions: { algorithms: ['HS256'] }
      });


  }
}
