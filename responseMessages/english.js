const ERROR = {
    //General Errors
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        customMessage: 'Something went wrong',
        type: 'INTERNAL_SERVER_ERROR'
    },
    DB_ERROR: {
        statusCode: 400,
        customMessage: 'DB Error : ',
        type: 'DB_ERROR'
    },
    UNAUTHORIZED: {
        statusCode: 401,
        customMessage: 'You are not authorized to perform this action',
        type: 'UNAUTHORIZED'
    },
    INVALID_TOKEN: {
        statusCode: 400,
        customMessage: 'You are not authorized to perform this action',
        type: 'INVALID_TOKEN'
    },
    NOT_AUTHORIZED: {
        statusCode: 400,
        customMessage: 'You are not authorized to perform this action',
        type: 'NOT_AUTHORIZED'
    },
    
    USER_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such user exists.',
        type: 'USER_DOES_NOT_EXIST'
    },
    DATA_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such Data exists.',
        type: 'DATA_DOES_NOT_EXIST'
    },
    RIDE_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such ride exists.',
        type: 'RIDE_DOES_NOT_EXIST'
    },
    VEHICLE_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such Vehicle exists.',
        type: 'VEHICLE_DOES_NOT_EXIST'
    },
    REGION_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such Region exists.',
        type: 'REGION_DOES_NOT_EXIST'
    },
    REGION_ALREADY_EXISTS: {
        statusCode: 400,
        customMessage: 'Region with same name exists.',
        type: 'REGION_ALREADY_EXISTS'
    },
    CONSUMER_ALREADY_EXISTS: {
        statusCode: 400,
        customMessage: 'Consumer with same email or phone already exists.',
        type: 'CONSUMER_ALREADY_EXISTS'
    },
    CONSUMER_ALREADY_EXISTS_WITH_EMAIL: {
        statusCode: 400,
        customMessage: 'Consumer with same email already exists',
        type: 'CONSUMER_ALREADY_EXISTS_WITH_EMAIL'
    },
    CONSUMER_ALREADY_EXISTS_WITH_PHONE: {
        statusCode: 400,
        customMessage: 'Consumer with same phone already exists.',
        type: 'CONSUMER_ALREADY_EXISTS_WITH_PHONE'
    },
    VEHICLE_ALREADY_EXISTS: {
        statusCode: 400,
        customMessage: 'Vehicle already exists.',
        type: 'VEHICLE_ALREADY_EXISTS'
    },
    FAVOURITE_ADDRESS_ALREADY_EXISTS: {
        statusCode: 400,
        customMessage: 'Favourite Address already exists.',
        type: 'FAVOURITE_ADDRESS_ALREADY_EXISTS'
    },
    INVALID_OTP: {
        statusCode: 400,
        customMessage: "Please try again with correct OTP.",
        type: 'INVALID_OTP'
    },

    OTP_EXPIRED: {
        statusCode: 400,
        customMessage: 'Otp expired.',
        type: 'OTP_EXPIRED'
    },

    INVALID_TYPE: {
        statusCode: 400,
        customMessage: 'Invalid type. Enter type = 1 for email otp verification, type = 2 for forgot otp verification or type = 3 for resend otp verification.',
        type: 'INVALID_TYPE'
    },

    INVALID_PASSWORD: {
        statusCode: 400,
        customMessage: 'Incorrect password',
        type: 'INVALID_PASSWORD'
    },

    DRIVER_ALREADY_EXISTS: {
        statusCode: 400,
        customMessage: 'Driver with same email and phone already exists.',
        type: 'DRIVER_ALREADY_EXISTS'
    },
    DRIVER_NOT_FOUND: {
        statusCode: 400,
        customMessage: 'No Driver found in this location',
        type: 'DRIVER_NOT_FOUND'
    },
    DRIVER_ALREADY_EXISTS_WITH_EMAIL: {
        statusCode: 400,
        customMessage: 'Driver with same email already exists',
        type: 'DRIVER_ALREADY_EXISTS_WITH_EMAIL'
    },
    DRIVER_ALREADY_EXISTS_WITH_PHONE: {
        statusCode: 400,
        customMessage: 'Driver with same phone already exists.',
        type: 'DRIVER_ALREADY_EXISTS_WITH_PHONE'
    },
    ADMIN_ALREADY_EXISTS: {
        statusCode: 400,
        customMessage: 'Admin with same email and phone already exists.',
        type: 'ADMIN_ALREADY_EXISTS'
    },
    ADMIN_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such admin exists or verified.',
        type: 'ADMIN_DOES_NOT_EXIST'
    },
    RIDE_TYPE_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such Ride Type exists.',
        type: 'RIDE_TYPE_DOES_NOT_EXIST'
    },
    RIDE_TYPE_ALREADY_EXISTS: {
        statusCode: 400,
        customMessage: 'Ride type already exists.',
        type: 'RIDE_TYPE_ALREADY_EXISTS'
    },
    COUPON_CODE_DOES_NOT_EXIST: {
        statusCode: 400,
        customMessage: 'No such coupon code exists.',
        type: 'COUPON_CODE_DOES_NOT_EXIST'
    },
    COUPON_CODE_ALREADY_EXIST: {
        statusCode: 400,
        customMessage: 'coupon code already exists.',
        type: 'COUPON_CODE_ALREADY_EXIST'
    },
};

const SUCCESS = {

    // General Messages
    DEFAULT: {
        statusCode: 200,
        customMessage: 'Success',
        type: 'DEFAULT'
    },
    CREATED: {
        statusCode: 200,
        customMessage: 'Created Successfully',
        type: 'CREATED'
    },
    UPDATED: {
        1: {
            statusCode: 200,
            customMessage: 'Updated Successfully',
            type: 'UPDATED'
        },
        2: {
            statusCode: 200,
            customMessage: 'Updated Successfully',
            type: 'APPROVED'
        }
    },
    DELETED: {
        statusCode: 200,
        customMessage: 'Deleted Successfully',
        type: 'DELETED'
    },
    OTP_VERIFIED: {
        statusCode: 200,
        customMessage: 'Successfully Verified',
        type: 'VERIFIED'
    },
    OTP_SENT: {
        statusCode: 200,
        customMessage: 'OTP sent successfully.',
        type: 'OTP SENT'  
    },
    PASSWORD_UPDATE_SUCCESS: {
        statusCode: 200,
        customMessage: 'Password updated successfully',
        type: 'PASSWORD_UPDATE_SUCCESS'
    }

};


module.exports = { SUCCESS, ERROR };
