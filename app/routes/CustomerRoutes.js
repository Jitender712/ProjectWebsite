const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
const UniversalFunctions = require("../../utils/universalFunctions");
const Controllers = require("../controllers");
const constants = require("../../constants").APP_CONSTANTS;
const responseMessages = require("../../responseMessages");
const language = "en";
const config = require("config");

module.exports.consumer = [
  // Consumer Register
  {
    method: "POST",
    path: "/v1/consumer/register",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.createConsumer(
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
      description: "Register Consumer",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          name: Joi.string()
            .required()
            .regex(/^[a-zA-Z ]*$/),
          email: Joi.string().required().email(),
          phoneNo: Joi.string().required().length(10),
          // password: Joi.string()
          //   .required()
          //   .regex(
          //     /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}/
          //   ),
          // adminId: Joi.objectId().required(), //test
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

  // Consumer Login
  {
    method: "POST",
    path: "/v1/consumer/login",

    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.ConsumerController.login(
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
      description: "Login Consumer",
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

  // Consumer Login with Otp
  {
    method: "POST",
    path: "/v1/consumer/loginwithOtp",

    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.ConsumerController.loginWithOtp(
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
      description: "Consumer Login with Otp",
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

  // Forgot Password
  {
    method: "PUT",
    path: "/v1/consumer/forgotPassword",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.ConsumerController.forgotConsumerPassword(
            request.payload
          );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Forgot Password",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
    },
  },

  //Resend Otp
  {
    method: "POST",
    path: "/v1/consumer/resendOtp",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.ConsumerController.resendOtp(
          request.payload
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Resend Otp",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          phoneNo: Joi.string().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
    },
  },

  // Verify Otp
  {
    method: "PUT",
    path: "/v1/consumer/verifyOtp",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.verifyConsumerOtp(
          request.payload
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Verify Otp",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          otp: Joi.number().required(),
          type: Joi.number().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
    },
  },

  // Reset Password
  {
    method: "PUT",
    path: "/v1/consumer/reset-Password",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.resetPassword(
          request.payload
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Reset-Password",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),

        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
    },
  },

  // Change Password
  {
    method: "PUT",
    path: "/v1/consumer/change-Password",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.changePassword(
          request.payload,
          request.auth.credentials
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Change-Password",
      auth: "ConsumerAuth",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          password: Joi.string().required(),
        }),
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
    },
  },

  //Logout
  {
    method: "PUT",
    path: "/v1/consumer/logout",
    handler: async (request, reply) => {
      try {
        console.log(request.auth.credentials);
        let dataToSend = await Controllers.ConsumerController.logout(
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
      description: "Consumer Logout",
      tags: ["api"],
      auth: "ConsumerAuth",
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

  //Edit Profile
  {
    method: "PUT",
    path: "/v1/consumer/editProfile",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.payload);
        let dataToSend =
          await Controllers.ConsumerController.editConsumerProfile(
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
      description: "Edit Consumer Profile",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        payload: Joi.object({}),
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

  //Get Consumer Details
  {
    method: "GET",
    path: "/v1/consumer/details",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.ConsumerController.getConsumerDetails(
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
      description: "Get Consumer Details",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        query: Joi.object({
          consumerId: Joi.objectId().required(),
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

  // Cancel Ride by Consumer
  {
    method: "PUT",
    path: "/v1/consumer/cancelRideByConsumer",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend =
            await Controllers.ConsumerController.cancelRideByConsumer(
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
      auth: "ConsumerAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId().required(),
          reasonId: Joi.objectId().required(),
          userType: Joi.string().required().valid("Consumer"),
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

  //Book a Ride
  {
    method: "POST",
    path: "/v1/consumer/bookARide",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.bookARide(
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
      description: "Book A Ride",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        payload: Joi.object({
          vehicleType: Joi.string()
            .required()
            .default("Mini")
            .valid(
              "Bike",
              "Auto",
              "Mini",
              "Prime Sedan",
              "Prime Play",
              "Prime Suv",
              "Lux",
              "Shuttle"
            ),
          location: Joi["object"]({
            latitude: Joi["number"]().required(),
            longitude: Joi["number"]().required(),
          }).required(),
          source: Joi["object"]({
            latitude: Joi["number"]().required(),
            longitude: Joi["number"]().required(),
          }).required(),
          pickUpAddress: Joi["object"]({
            pickUpAddressDetails: Joi["string"]().required(),
          }).required(),
          destination: Joi["object"]({
            latitude: Joi["number"]().required(),
            longitude: Joi["number"]().required(),
          }).required(),
          destinationAddress: Joi["object"]({
            destinationAddressDetails: Joi["string"]().required(),
          }).required(),
          currentStatus: Joi.string().default("Initiated"),
          isSchedule: Joi.boolean().default(false),
          totalFare: Joi.number().required(),
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

  // On Going Ride for Consumer
  {
    method: "PUT",
    path: "/v1/consumer/onGoingRide",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.ConsumerController.onGoingRide(
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
      auth: "ConsumerAuth",
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

  // Ride History for Consumer
  {
    method: "Get",
    path: "/v1/consumer/rideHistoryForConsumer",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.ConsumerController.rideHistoryForConsumer(
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
      description: "Ride History For Consumer",
      tags: ["api"],
      auth: "ConsumerAuth",
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

  // Rating from Consumer
  {
    method: "POST",
    path: "/v1/consumer/ratingFromConsumer",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend =
            await Controllers.ConsumerController.ratingFromConsumer(
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
      description: "Rating From Consumer",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        query: Joi.object({
          rideId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          rating: Joi.number().required().default(0),
          comment: Joi.string(),
          tip: Joi.number().default(0),
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

  //Create Invoice
  {
    method: "Get",
    path: "/v1/consumer/createInvoice",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.ConsumerController.createInvoice(
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
      description: "createInvoice",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        query: Joi.object({
          rideId: Joi.objectId(),
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

  // Recent Ride for Consumer
  {
    method: "Get",
    path: "/v1/consumer/recentRide",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.ConsumerController.recentRide(
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
      description: "Recent Ride for Consumer",
      tags: ["api"],
      auth: "ConsumerAuth",
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

  // Cancel Ride By Consumer when No Driver Found
  {
    method: "PUT",
    path: "/v1/consumer/noDriverFound",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.ConsumerController.noDriverFound(
            // request.auth.credentials,
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
      description: "Driver not found",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        query: Joi.object({
          bookingId: Joi.objectId().required(),
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

  // Continue With Number
  {
    method: "POST",
    path: "/v1/consumer/continueWithNumber",

    options: {
      handler: async (request, h) => {
        try {
          let dataToSend =
            await Controllers.ConsumerController.continueWithNumber(
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
      description: "Consumer Login with Otp",
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

  // Consumer Register After verify
  {
    method: "POST",
    path: "/v1/consumer/registerAfterVerify",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.registerConsumer(
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
      description: "Register Consumer",
      tags: ["api"],
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.string().required().length(10),
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

  // Create Favourite Address For Consumer
  {
    method: "POST",
    path: "/v1/Favourite/createFavAddress",
    handler: async (request, reply) => {
      try {
        console.log("location", request.payload);
        let dataToSend =
          await Controllers.ConsumerController.createFavouriteAddress(
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
      description: "Create Favourite Address",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        payload: Joi.object({
          // consumerId: Joi.objectId().required(),
          location: Joi["object"]({
            latitude: Joi["number"]().required(),
            longitude: Joi["number"]().required(),
          }).required(),
          addressType: Joi.string()
            .required(),
            // .valid(["Home", "Work", "Others"]),
          Address: Joi.string().required(),
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

  // Show Favourite Address For Consumer
  {
    method: "GET",
    path: "/v1/Favourite/getFavouriteAddress",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.showFavAddress(
          request.auth.credentials
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    options: {
      description: "Get Favourite Addres",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
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

  // Delete Favourite Address for Consumer
  {
    method: "DELETE",
    path: "/v1/Favourite/deleteFavouriteAddress",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.ConsumerController.deleteFavAddress(
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
    options: {
      description: "Delete Favourite Address",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        query: Joi.object({
          addressId: Joi.objectId().required(),
        }),
        headers: UniversalFunctions.authorizationHeaderObj,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Delete Consumer Account
  {
    method: "DELETE",
    path: "/v1/consumer/deleteConsumerAccount",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.ConsumerController.deleteConsumerAccount(
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
    options: {
      description: "Delete Consumer Account",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        // query: Joi.object({
        //   addressId: Joi.objectId().required(),
        // }),
        headers: UniversalFunctions.authorizationHeaderObj,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Show Nearby Vehicles For Consumer
  {
    method: "POST",
    path: "/v1/consumer/nearByVehicle",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.ConsumerController.nearByVehicle(
          // request.auth.credentials
          request.payload
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    options: {
      description: "Get Nearby Vehicles For Consumer",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        payload: Joi.object({
          location: Joi["object"]({
            latitude: Joi["number"]().required(),
            longitude: Joi["number"]().required(),
          }).required(),
        }),
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

  // Edit Favourite Address for Consumer
  {
    method: "PUT",
    path: "/v1/Favourite/editFavouriteAddress",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.ConsumerController.editFavAddress(
            // request.auth.credentials,
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
    config: {
      description: "Edit Favourite Address for Consumer",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        query:Joi.object({
          addressId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          location: Joi["object"]({
            latitude: Joi["number"]().required(),
            longitude: Joi["number"]().required(),
          }).required(),
          // addressType: Joi.string()
          //   .required(),
            // .valid(["Home", "Work", "Others"]),
          Address: Joi.string().required(),
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
];
