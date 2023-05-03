const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
const UniversalFunctions = require("../../utils/universalFunctions");
const Controllers = require("../controllers");
const constants = require("../../constants").APP_CONSTANTS;
const responseMessages = require("../../responseMessages");
const language = "en";
const config = require("config");

module.exports.driver = [
  // Edit Driver
  {
    method: "PUT",
    path: "/v1/driver/editDriver",
    handler: async (request, h) => {
      try {
        console.log("request : ", request.query);
        let dataToSend = await Controllers.DriverController.editDriver(
          request.auth.credentials,
          request.payload
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    options: {
      description: "Edit Driver",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        payload: Joi.object({}),
        options: {
          allowUnknown: true,
        },
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Get Driver Details
  {
    method: "GET",
    path: "/v1/driver/details",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.getDriverDetails(
          request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Get Driver Details",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          driverId: Joi.objectId(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Driver Login
  {
    method: "POST",
    path: "/v1/driver/login",

    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.DriverController.login(
            request.payload
          );

          return UniversalFunctions.sendSuccess(
            responseMessages[language].SUCCESS.DEFAULT,
            dataToSend,
            language
          );
        } catch (err) {
          return UniversalFunctions.sendError(err);
        }
      },
      description: "Driver Login",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
          deviceToken: Joi.string().required(),
          deviceType: Joi.string().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // Driver Login with Otp
  {
    method: "POST",
    path: "/v1/driver/loginwithOtp",

    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.DriverController.loginWithOtp(
            request.payload
          );

          return UniversalFunctions.sendSuccess(
            responseMessages[language].SUCCESS.DEFAULT,
            dataToSend,
            language
          );
        } catch (err) {
          return UniversalFunctions.sendError(err);
        }
      },
      description: "Login with Otp Driver",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          phoneNo: Joi.string().required(),
          loginOtp: Joi.string().required(),
          deviceToken: Joi.string().required(),
          deviceType: Joi.string().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // Update Driver location
  {
    method: "PUT",
    path: "/v1/driver/updateLocation",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.payload);
        let dataToSend = await Controllers.DriverController.updateLatLongDriver(
          // request.auth.credentials,
          request.payload
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Update Driver Location",
      tags: ["api"],
      // auth:"DriverAuth",
      validate: {
        payload: Joi.object({
          driverId: Joi.string().required(),
          location: Joi["object"]({
            latitude: Joi["number"]().required(),
            longitude: Joi["number"]().required(),
          }).required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        // headers: UniversalFunctions.authorizationHeaderObj,
        options: {
          allowUnknown: true,
        },
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // Ride Accepted by Driver
  {
    method: "PUT",
    path: "/v1/driver/rideAcceptByDriver",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.rideAcceptByDriver(
          request.auth.credentials,
          request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Accept Ride",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Ride Rejected by Driver
  {
    method: "PUT",
    path: "/v1/driver/rideRejectedByDriver",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.DriverController.rideRejectedByDriver(
            request.auth.credentials,
            request.query
          );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Reject Ride",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // LogOut
  {
    method: "PUT",
    path: "/v1/driver/logoutDriver",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.logoutDriver(
          request.auth.credentials
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Log Out",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        // query: Joi.object({
        //   driverId: Joi.objectId(),
        // }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // Updating Status of Ride
  {
    method: "PUT",
    path: "/v1/driver/rideStatus",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.rideStatus(
          request.auth.credentials,
          request.query,

        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Driver Arrive",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId().required(),
          currentStatus: Joi.string()
            .required()
            .valid("Arrived", "Started", "End"),
          rideOtp: Joi.string(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Cancel Ride By Driver
  {
    method: "PUT",
    path: "/v1/driver/cancelRideByDriver",

    options: {
      handler: async (request, h) => {
        try {
          let dataToSend =
            await Controllers.DriverController.cancelRideByDriver(
              request.auth.credentials,
              request.query,
              request.payload
            );
          return UniversalFunctions.sendSuccess(
            responseMessages[language].SUCCESS.DEFAULT,
            dataToSend,
            language
          );
        } catch (err) {
          return UniversalFunctions.sendError(err);
        }
      },
      description: "Ride Cancel by Driver",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId().required(),
          reasonId: Joi.objectId().required(),
          userType: Joi.string().required().valid("Driver"),
          consumerId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          reason: Joi.string().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
        options: {
          allowUnknown: true,
        },
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Driver status
  {
    method: "PUT",
    path: "/v1/driver/statusChange",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.payload);
        let dataToSend = await Controllers.DriverController.statusChange(
          request.auth.credentials,
          request.payload
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Change Status",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        payload: Joi.object({
          currentStatus: Joi.string().required().valid("Online", "Offline"),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
        options: {
          allowUnknown: true,
        },
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // On Going Ride for Driver
  {
    method: "PUT",
    path: "/v1/driver/onGoingRide",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.onGoingRide(
          request.auth.credentials
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "On Going Ride",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Fare Showed to Driver
  {
    method: "GET",
    path: "/v1/driver/faredShowedtoDriver",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.faredShowedtoDriver(
          request.auth.credentials,
          request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "On Going Ride",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Rating from Driver
  {
    method: "POST",
    path: "/v1/driver/ratingFromDriver",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.DriverController.ratingFromDriver(
            request.auth.credentials,
            request.query,
            request.payload
          );

          return UniversalFunctions.sendSuccess(
            responseMessages[language].SUCCESS.DEFAULT,
            dataToSend,
            language
          );
        } catch (err) {
          return UniversalFunctions.sendError(err);
        }
      },
      description: "Rating From Driver",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          rating: Joi.number().required().default(0),
          comment: Joi.string(),
        }),
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Ride History for Driver
  {
    method: "Get",
    path: "/v1/driver/rideHistoryForDriver",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.DriverController.rideHistoryForDriver(
            request.auth.credentials,
            request.query
          );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Ride History For Driver",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          page: Joi.number().default(1),
        }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Total Rides for Current Day
  {
    method: "Get",
    path: "/v1/driver/currentDayRide",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.presentRides(
          request.auth.credentials
          // request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Total Rides for Current Day",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Total Rides for Weekly
  {
    method: "Get",
    path: "/v1/driver/weeklyRide",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.weeklyRides(
          request.auth.credentials
          // request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Total Rides for Weekly",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Notifications for driver
  {
    method: "Get",
    path: "/v1/driver/notifications",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.notification(
          request.auth.credentials,
          request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Notifications for driver",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Total Rides for Weekly
  {
    method: "Get",
    path: "/v1/driver/newWeeklyRide",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.newWeeklyRides(
          request.auth.credentials
          // request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Total Rides for Weekly",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Check Driver is registered or not
  {
    method: "POST",
    path: "/v1/driver/checkDriverExist",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.DriverController.checkDriverExist(
            request.payload
          );

          return UniversalFunctions.sendSuccess(
            responseMessages[language].SUCCESS.DEFAULT,
            dataToSend,
            language
          );
        } catch (err) {
          return UniversalFunctions.sendError(err);
        }
      },
      description: "Check Driver Exist",
      tags: ["api"],
      // auth: "DriverAuth",
      validate: {
        payload: Joi.object({
          phoneNo: Joi.string().required(),
        }),
        // headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Get Driver Documents
  {
    method: "GET",
    path: "/v1/driver/showDocumentOfDriver",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.DriverController.showDocumentOfDriver(
          request.auth.credentials,
          // request.query
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Get Driver Documents",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        // query: Joi.object({
        //   driverId: Joi.objectId(),
        // }),
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
];
