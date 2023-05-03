const jwt = require("jsonwebtoken");
const UniversalFunctions = require('../../utils/universalFunctions');
const responseMessages = require('../../responseMessages');
const config = require('config');
const Boom = require('boom')


//new
function authToken(request, h, next) {
  language = "en";
  const token = request.headers.authtoken;
  if (!token) throw Boom.unauthorized('unauthorized')
  try {
    const verified = jwt.verify(token, config.jwtSecretKey); //returns tokenData
    return verified;
    // console.log(verified);
    // return responseMessages[language].SUCCESS.DEFAULT
    next()

  } catch (err) {
    return Boom.badRequest('Invalid Token')
  }
}

module.exports = {
  authToken
}
