const Joi              =        require('joi'),
      bcrypt           =        require('bcryptjs'),
      fs               =        require('fs'),
      Boom             =        require('boom'),
      randomstring     =        require('randomstring'),
      path             =        require('path'),
      responseMessage  =        require('../responseMessages');


exports.sendError = async (data, reply) => {
    console.log('sending error',data);
    if (typeof data == 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {

        let msg = data.customMessage;
        msg = msg.replace(msg.charAt(0), msg.charAt(0).toUpperCase());

        let errorToSend = new Boom(msg, {statusCode: data.statusCode});
        errorToSend.output.payload.responseType = data.type;

        return errorToSend;

    } else {

        let errorToSend = '';
        if (typeof data == 'object') {

            if (data.name == 'MongoError') {

                errorToSend += responseMessage[language].ERROR.DB_ERROR.customMessage;

            } else if (data.name == 'ApplicationError') {

                errorToSend += responseMessage[language].ERROR.APP_ERROR.customMessage + ':'

            } else if (data.name == 'ValidationError') {

                errorToSend += responseMessage[language].ERROR.APP_ERROR.customMessage + data.message;

            } else if (data.name == 'CastError') {

                errorToSend += responseMessage[language].ERROR.DB_ERROR.customMessage + responseMessage[language].ERROR.INVALID_ID.customMessage + data.value;
            }
        } else {

            errorToSend = data;
        }

        let customErrorMessage = errorToSend;

        if (typeof customErrorMessage == 'string') {

            if (errorToSend.indexOf("[") > -1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
            }
            customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace("[", '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace("]", '');
            customErrorMessage = customErrorMessage.replace(customErrorMessage.charAt(0), customErrorMessage.charAt(0).toUpperCase());

        }

        return new Boom(customErrorMessage, {statusCode: 400});
    }
};

exports.sendSuccess= async (successMsg, data, language) => {

    successMsg = successMsg || responseMessage[language].SUCCESS.DEFAULT.customMessage;

    if(typeof successMsg=='object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')){

        return {statusCode: successMsg.statusCode, message: successMsg.customMessage, data: data || null }

    }else{
        return { statusCode: 200, message: successMsg, data: data || null }
    }

}

exports.createHash = async (plainText) => {
    return await bcrypt.hashSync(plainText,10)
}

exports.compareHashPassword=async (plainTextPassword, hash) => {
    return await bcrypt.compareSync(plainTextPassword, hash)
 };

 exports.authorizationHeaderObj = Joi.object({ authorization: Joi.string().required() }).unknown();

exports.generateOTPCode = async (length) => {
    return randomstring.generate({
        length: length,
        charset: 'numeric'
    });
};

exports.failActionFunction=async (request, reply, error) => {
    error.output.payload.type = "Joi Error";
    if (error.isBoom) {
        delete error.output.payload.validation;
        if (error.output.payload.message.indexOf("authorization") !== -1) {
            error.output.statusCode = responseMessage['en'].ERROR.UNAUTHORIZED.statusCode;
            console.log(error)
            return error;
        }
        let details = error.details[0];
        if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
            error.output.payload.message = "Invalid " + details.path;
            console.log(error)
            return error
        }
    }
    let customErrorMessage = '';
    if (error.output.payload.message.indexOf("[") > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage.replace(/\b./g, (a) => a.toUpperCase());

    delete error.output.payload.validation;
    return error;
};
