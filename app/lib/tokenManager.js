const Jwt = require('jsonwebtoken');
const constants = require('../../constants').APP_CONSTANTS;
const config = require('config');
const axios = require('axios');
const Models = require('../models');



// const verifyToken = async function (token, language) {
//     try {
//         if (token) {
//             const url = config.get('authBaseUrl')  + '/v1/token/validate';
//             const tokenData =  axios.post(url, token);
//             return {isValid: true, data: tokenData};
//         } else return constants.STATUS_MSG['en'].ERROR.UNAUTHORIZED;
//     } catch (err) {
//         return constants.STATUS_MSG['en'].ERROR.UNAUTHORIZED;
//     }
// };


const getTokenFromDB = async (userId, userType, random, logintime) => {
    let criteria = {
        _id: userId
    };

    let data;

    if (userType === constants.DATABASE.USER_ROLES.ADMIN) {
        data = await Models.Admin.findOne(criteria, {}, { lean: true });
    }else if( userType === constants.DATABASE.USER_ROLES.USER){
        data = await Models.Consumer.findOne(criteria, {}, {lean: true});
    }else{
        data = await Models.Driver.findOne(criteria, {}, {lean: true});
    }

    data.userType = userType;
    return data;
};

const verifyToken = async function (token) {
    try {
        if (token.id && token.type && token.random) {
            let data = await getTokenFromDB(token.id, token.type);
            if(data.isBlocked){
                return { isValid: false }
            }else return {isValid: true, data: data};
        } else return (constants.STATUS_MSG['en'].ERROR.INVALID_TOKEN);
    } catch (err) {
        return {isValid: false};
    }
};

const setToken = async function (tokenData) {

    if (!tokenData.id || !tokenData.type) {
        return (constants.STATUS_MSG['en'].ERROR.INTERNAL_SERVER_ERROR);
    } else {
        let tokenToSend = await Jwt.sign(tokenData, config.get("jwtSecretKey"));
        return ({ accessToken: tokenToSend });
    }
};


module.exports = {
    verifyToken: verifyToken,
    setToken
};
