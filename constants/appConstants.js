'use strict';

const STATUS_MSG = require('../responseMessages');

const DATABASE = {

    USER_ROLES: {
        ADMIN: 'ADMIN',
        USER: 'USER',
        DRIVER:'DRIVER',
        TEMPUSER: 'TEMPUSER'
    },

    TOKEN_FIELDS: {
        ACCESS_TOKEN: 'accessToken',
        EMAIL_VERIFICATION: 'emailVerificationToken',
        PASSWORD_RESET: 'passwordResetToken'
    },
}

const swaggerDefaultResponseMessages = [
    { code: 200, message: 'Success' },
    { code: 204, message: 'Data not available' },
    { code: 400, message: 'Bad Request' },
    { code: 401, message: 'Unauthorized' },
    { code: 403, message: 'Forbidden' },
    { code: 404, message: 'Not Found' },
    { code: 500, message: 'Internal Server Error' }
];

const emailConstants = {
    'REGISTRATION_EMAIL': {
        emailSubject: 'Welcome to the portal',
        emailTemplate: 'Hi {{name}}, <br>Please use this OTP {{otp}} to verify your email.<br><br>Thanks,<br>Micro Demand'
    },
    'RESET_PASSWORD' : {
        emailSubject: 'Welcome to the portal',
        emailTemplate: 'Hi {{name}}, <br>Please use this OTP {{otp}} to reset your password.<br><br>Thanks,<br>Micro Demand'
    }
}


const APP_CONSTANTS = {
    DATABASE: DATABASE,
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
    emailConstants: emailConstants,
    STATUS_MSG: STATUS_MSG
};

module.exports = APP_CONSTANTS;
