const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
const UniversalFunctions = require("../../utils/universalFunctions");
const Controllers = require("../controllers");
const constants = require("../../constants").APP_CONSTANTS;
const responseMessages = require("../../responseMessages");
const language = "en";
const config = require("config");

module.exports.admin = [
  // Driver Register
  {
    method: "POST",
    path: "/v1/admin/createDriver",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.createDriver(
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
      description: "Register Driver",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          phoneNo: Joi.string().required().length(10),
          email: Joi.string().required().email(),
          vehicleType: Joi.string().required(),
          vehicleNo: Joi.string().required(),
          licenceNo: Joi.string().required(),
          licenceValidity: Joi.string().required(),
          rcValidity: Joi.string().required(),
          uploadedDocument: Joi.object({
            rc: Joi.string().required(),
            licence: Joi.string().required(),
            idProof: Joi.string().required(),
            addressProof: Joi.string().required(),
          }).required(),
          driverImage: Joi.string().required(),
          location: Joi["object"]({
            longitude: Joi["number"]().required(),
            latitude: Joi["number"]().required(),
          }).required(),
          vehicleName: Joi.string().required(),
          // vehicleColor: Joi.string().required(),
          // currentStatus: Joi["string"]().default("Offline"),
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

  // Get Consumer List
  {
    method: "GET",
    path: "/v1/admin/listConsumers",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.listConsumers(
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
      description: "Get Consumers list",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        // query: Joi.object({
        //   // name: Joi.string().default("Admin"),
        //   page: Joi.number().default(1),
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

  // Driver List
  {
    method: "GET",
    path: "/v1/admin/listDrivers",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.listDriver(
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
      description: "Get drivers list",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        // query: Joi.object({
        //   page: Joi.number().default(1),
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

  // Edit Consumers
  {
    method: "PUT",
    path: "/v1/admin/editConsumers",
    handler: async (request, h) => {
      try {
        console.log("request : ", request.query);
        let dataToSend = await Controllers.AdminController.editConsumers(
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
    options: {
      description: "Edit Consumer",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          ConsumerId: Joi.objectId(),
        }),
        payload: Joi.object({}),
        options: {
          allowUnknown: true,
        },
        headers: UniversalFunctions.authorizationHeaderObj,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Edit Drivers
  {
    method: "PUT",
    path: "/v1/admin/editDrivers",
    handler: async (request, h) => {
      try {
        console.log("request : ", request.query);
        let dataToSend = await Controllers.AdminController.editDrivers(
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
    options: {
      description: "Edit Driver",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          DriverId: Joi.objectId(),
        }),
        payload: Joi.object({}),
        options: {
          allowUnknown: true,
        },
        headers: UniversalFunctions.authorizationHeaderObj,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Delete Consumer
  {
    method: "DELETE",
    path: "/v1/admin/deleteConsumers",
    handler: async (request, h) => {
      try {
        console.log("request:", request.query);
        let dataToSend = await Controllers.AdminController.deleteConsumer(
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
      description: "Delete Consumer",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          ConsumerId: Joi.objectId(),
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

  //Driver Delete
  {
    method: "DELETE",
    path: "/v1/admin/deleteDriver",
    handler: async (request, h) => {
      try {
        console.log("request:", request.query);
        let dataToSend = await Controllers.AdminController.deleteDriver(
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
      description: "Delete driver",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          driverId: Joi.objectId(),
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

  // Get Ride List
  {
    method: "Get",
    path: "/v1/admin/listRides",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.RideList(
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
    options: {
      description: "Get Ride list",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        // query: Joi.object({
        //   page: Joi.number().default(1),
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

  // Create Listing Of Cancel Reasons
  {
    method: "POST",
    path: "/v1/admin/createCancelReason",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.createCancelReason(
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
    options: {
      description: "CancelReason",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          reasonDrivedBy: Joi.string().required().valid("Driver", "Consumer"),
        }),
        payload: Joi.object({
          reason: Joi.string().required(),
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

  // Delete Ride
  {
    method: "DELETE",
    path: "/v1/admin/deleteRide",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.deleteRide(
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
      description: "Delete Cancel Reasons",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          rideId: Joi.objectId().required(),
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

  // Delete one Cancel Reason from List
  {
    method: "DELETE",
    path: "/v1/admin/deleteCancelReasonFromList",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.AdminController.deleteCancelReasonFromList(
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
      description: "Delete Cancel Reasons",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          cancelReasonsId: Joi.objectId().required(),
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

  // Admin Login
  {
    method: "POST",
    path: "/v1/admin/login",

    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.AdminController.login(
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
      description: "Admin Login",
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
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Admin Logout
  {
    method: "PUT",
    path: "/v1/admin/logout",
    handler: async (request, reply) => {
      try {
        console.log("===>", request.auth.credentials);
        let dataToSend = await Controllers.AdminController.logout(
          request.auth.credentials
        );
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend,
          language
        );
      } catch (err) {
        console.log(err);
        return UniversalFunctions.sendError(err);
      }
    },
    config: {
      description: "Admin Logout",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
        basicAuth: {},
      },
    },
  },

  // Create Admins
  {
    method: "POST",
    path: "/v1/admin/createSubAdmin",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.createSubAdmin(
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
      description: "Register Admins",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          phoneNo: Joi.number()
            .integer()
            .min(10 ** 9)
            .max(10 ** 10 - 1)
            .required(),
          password: Joi.string().required(),
          roleManagement: Joi.array(),
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

  // Get Admin List
  {
    method: "GET",
    path: "/v1/admin/listSubAdmins",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController
          .listsubadmin
          // request.auth.credentials,
          // request.query
          ();
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
      description: "Get Admin list",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        // query: Joi.object({
        //   page: Joi.number().default(1),
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

  // Delete Admin
  {
    method: "DELETE",
    path: "/v1/admin/deleteSubAdmin",
    handler: async (request, h) => {
      try {
        console.log("request:", request.query);
        let dataToSend = await Controllers.AdminController.deleteSubAdmin(
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
      description: "Delete Admin",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          adminId: Joi.objectId(),
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

  // Edit SubAdmin
  {
    method: "PUT",
    path: "/v1/admin/editSubAdmin",
    handler: async (request, h) => {
      try {
        console.log("request : ", request.query);
        let dataToSend = await Controllers.AdminController.editSubAdmin(
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
    options: {
      description: "Edit SubAdmin",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          subAdminId: Joi.objectId().required(),
        }),
        payload: Joi.object({}),
        options: {
          allowUnknown: true,
        },
        headers: UniversalFunctions.authorizationHeaderObj,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Verify Otp Admin
  {
    method: "PUT",
    path: "/v1/admin/verifyOtp",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.verifyAdminOtp(
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

  // Create GeoFencing Region
  {
    method: "POST",
    path: "/v1/admin/createRegion",
    handler: async (request, reply) => {
      try {
        console.log("location", request.payload);
        let dataToSend = await Controllers.AdminController.createRegion(
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
      description: "Create Region",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          region: {
            type: Joi.string().required(),
            coordinates: Joi.array().required(),
          },
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

  // Get Region List
  {
    method: "GET",
    path: "/v1/admin/listRegion",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.regionList(
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
      description: "Get Admin list",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          page: Joi.number().default(1),
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

  // Edit Region List
  {
    method: "PUT",
    path: "/v1/admin/editRegion",
    handler: async (request, h) => {
      try {
        console.log("request : ", request.query);
        let dataToSend = await Controllers.AdminController.editRegion(
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
    options: {
      description: "Edit Region",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          regionId: Joi.objectId().required(),
        }),
        payload: Joi.object({}),
        options: {
          allowUnknown: true,
        },
        headers: UniversalFunctions.authorizationHeaderObj,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Delete Regions
  {
    method: "DELETE",
    path: "/v1/admin/deleteRegion",
    handler: async (request, h) => {
      try {
        console.log("request:", request.query);
        let dataToSend = await Controllers.AdminController.deleteRegions(
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
      description: "Delete Region",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          regionId: Joi.objectId(),
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

  // Get Taxi Details
  {
    method: "GET",
    path: "/v1/admin/taxiOverview",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.overviewOfTaxi(
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
      description: "Get Taxi Overview",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Get Individual Consumer Details
  {
    method: "GET",
    path: "/v1/admin/getIndividualConsumerDetails",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.AdminController.getIndividualConsumerDetails(
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
    options: {
      description: "Get Individual Consumer Details",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          consumerId: Joi.objectId().required(),
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

  // Blocked or unblocked
  {
    method: "PUT",
    path: "/v1/admin/changeStatusToBlockedOrUnblocked",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.AdminController.changeStatusToBlockedOrUnblocked(
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
      description: "Change Status to Blocked or Unblocked",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          consumerId: Joi.objectId().required(),
          isBlocked: Joi.boolean().required(),
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

  // Get all rides for Consumer
  {
    method: "GET",
    path: "/v1/admin/allRideForConsumer",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.allRideForConsumer(
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
    config: {
      description: "All Ride For Consumer",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          consumerId: Joi.objectId().required(),
          // isBlocked: Joi.boolean().required(),
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

  // Get Individual Driver Details
  {
    method: "GET",
    path: "/v1/admin/getIndividualDriverDetails",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.AdminController.getIndividualsDriverDetails(
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
    options: {
      description: "Get Individual Driver Details",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          driverId: Joi.objectId().required(),
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

  // Get all rides for Driver
  {
    method: "GET",
    path: "/v1/admin/allRideForDriver",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.allRideForDriver(
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
    config: {
      description: "All Ride For Driver",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          driverId: Joi.objectId().required(),
          // isBlocked: Joi.boolean().required(),
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

  // Blocked or unblocked
  {
    method: "PUT",
    path: "/v1/admin/changeStatusToBlockedOrUnblockedDriver",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.AdminController.changeStatusToBlockedOrUnblockedDriver(
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
    config: {
      description: "Change Status to Blocked or Unblocked",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          driverId: Joi.objectId().required(),
          isBlocked: Joi.boolean().required(),
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

  // Complete ,Cancel and Incomplete Ride
  {
    method: "GET",
    path: "/v1/dashBoard/pieChartForRides",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController
          .pieChartForrides
          // request.auth.credentials,
          // request.query
          ();
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
      description: "Complete ,Cancel and Incomplete Ride",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
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

  // Total Revenue Monthly Weekly Daily
  {
    method: "GET",
    path: "/v1/dashBoard/totalRevenue",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.totalRevenue(
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
    config: {
      description: "Total Revenue Monthly Weekly Daily",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          revenueType: Joi.string()
            .required()
            .valid(["Daily", "Weekly", "Monthly", "Yearly"]),
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

  // Send Multiple Notification
  {
    method: "POST",
    path: "/v1/admin/sendMultipleNotification",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.AdminController.sendMultipleNotification(
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
    options: {
      description: "Create Region",
      tags: ["api"],
      // auth: "AdminAuth",
      validate: {
        query: Joi.object({
          userType: Joi.string().valid(["Consumer", "Driver"]).required(),
        }),
        payload: Joi.object({
          messageType: Joi.string()
            .valid(["Push", "SMS", "Push and SMS"])
            .required()
            .default("Push"),
          userArray: Joi.array().required().items({
            _id: Joi.objectId().required(),
          }),
          messageContent: Joi.string(),
          messageTitle: Joi.string().required(),
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

  // Top Consumer List
  {
    method: "GET",
    path: "/v1/dashBoard/topConsumerList",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController
          .topConsumerList
          // request.auth.credentials,
          // request.query
          ();
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
      description: "Top Consumer List",
      tags: ["api"],
      // auth: "AdminAuth",
      validate: {
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

  //  Top Drivers List
  {
    method: "GET",
    path: "/v1/dashBoard/topDriverList",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController
          .topDriverList
          // request.auth.credentials,
          // request.query
          ();
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
      description: " Top Drivers List",
      tags: ["api"],
      // auth: "AdminAuth",
      validate: {
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

  // List of Multiple Notification
  {
    method: "GET",
    path: "/v1/admin/listMultipleNotification",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController
          .listMultipleNotification
          // request.auth.credentials,
          // request.query
          ();
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
      description: "List of Multiple Notification",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
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

  // Blocked or unblocked SubAdmin
  {
    method: "PUT",
    path: "/v1/admin/changeStatusToBlockedOrUnblockedSubadmin",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.AdminController.changeStatusToBlockedOrUnblockedSubadmin(
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
    config: {
      description: "Blocked or unblocked SubAdmin",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          adminId: Joi.objectId().required(),
          isBlocked: Joi.boolean().required(),
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

  // Block or Unblock Reasons
  {
    method: "PUT",
    path: "/v1/admin/blockOrUnblockReasons",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.blockedReasons(
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
    config: {
      description: "Block or Unblock Reasons",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          reasonId: Joi.objectId().required(),
          isBlocked: Joi.boolean().required(),
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

  // Create Ride Type
  {
    method: "POST",
    path: "/v1/admin/createRideType",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.createRideType(
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
      description: "Create Ride Type ",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        payload: Joi.object({
          RideType: Joi.string().required(),
          rideIcon: Joi.string().required(),
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

  // List Ride Type
  {
    method: "GET",
    path: "/v1/admin/listRideType",
    handler: async () => {
      try {
        let dataToSend = await Controllers.AdminController.listRideType();
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
      description: "All Ride For Driver",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
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

  // Blocked or unblocked Ride Type
  {
    method: "PUT",
    path: "/v1/admin/blockOrUnblockRideType",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.AdminController.blockOrUnblockRideType(
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
      description: "Blocked or Unblocked Ride Type",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          rideTypeId: Joi.objectId().required(),
          isBlocked: Joi.boolean().required(),
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

  // Delete Ride Type
  {
    method: "DELETE",
    path: "/v1/admin/deleteRideType",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.deleteRideType(
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
      description: "Delete Ride Type",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          rideTypeId: Joi.objectId().required(),
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

  // Forgot Password
  {
    method: "PUT",
    path: "/v1/admin/forgotPassword",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.forgotPassword(
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

  // Reset Password
  {
    method: "PUT",
    path: "/v1/admin/resetPassword",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.AdminController.resetPassword(
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

  //Resend Otp
  {
    method: "POST",
    path: "/v1/admin/resendOtp",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.AdminController.resendOtp(
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
          email: Joi.string().required(),
        }),
        failAction: UniversalFunctions.failActionFunction,
        options: {
          allowUnknown: true,
        },
      },
    },
  },

  // Get vehicle List
  {
    method: "GET",
    path: "/v1/admin/getVehicleList",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.AdminController.getAllVehicleList();
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    options: {
      description: "Get All Vehicle List",
      tags: ["api"],
      validate: {
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // // Active Time by driver
  // {
  //   method: "GET",
  //   path: "/v1/dashBoard/activeTimeByDriver",
  //   handler: async (request, reply) => {
  //     try {
  //       let dataToSend = await Controllers.AdminController
  //         .activeTimeByDriver
  //         // request.auth.credentials,
  //         // request.query
  //         ();
  //       return UniversalFunctions.sendSuccess(
  //         responseMessages[language].SUCCESS.DEFAULT,
  //         dataToSend,
  //         language
  //       );
  //     } catch (err) {
  //       return UniversalFunctions.sendError(err);
  //     }
  //   },
  //   config: {
  //     description: "Active Time by driver",
  //     tags: ["api"],
  //     auth: "AdminAuth",
  //     validate: {
  //       failAction: UniversalFunctions.failActionFunction,
  //       headers: UniversalFunctions.authorizationHeaderObj,
  //       options: {
  //         allowUnknown: true,
  //       },
  //     },
  //     plugins: {
  //       "hapi-swagger": {
  //         responseMessages: constants.swaggerDefaultResponseMessages,
  //       },
  //     },
  //   },
  // },

  // // Active Consumer
  // {
  //   method: "GET",
  //   path: "/v1/dashBoard/activeConsumer",
  //   handler: async (request, reply) => {
  //     try {
  //       let dataToSend = await Controllers.AdminController
  //         .activeConsumer
  //         // request.auth.credentials,
  //         // request.query
  //         ();
  //       return UniversalFunctions.sendSuccess(
  //         responseMessages[language].SUCCESS.DEFAULT,
  //         dataToSend,
  //         language
  //       );
  //     } catch (err) {
  //       return UniversalFunctions.sendError(err);
  //     }
  //   },
  //   config: {
  //     description: "Active Consumer",
  //     tags: ["api"],
  //     auth: "AdminAuth",
  //     validate: {
  //       failAction: UniversalFunctions.failActionFunction,
  //       headers: UniversalFunctions.authorizationHeaderObj,
  //       options: {
  //         allowUnknown: true,
  //       },
  //     },
  //     plugins: {
  //       "hapi-swagger": {
  //         responseMessages: constants.swaggerDefaultResponseMessages,
  //       },
  //     },
  //   },
  // },

  // Driver List with Registration Date
  {
    method: "GET",
    path: "/v1/admin/recordWithRegisterDate",
    handler: async (request, h) => {
      try {
        let dataToSend =
          await Controllers.AdminController.recordWithRegisterDate(
            // request.auth.credentials
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
      description: "Driver List with Register Date",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          registerDate: Joi.date(),
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

  // Get Cancel Reasons List
  // {
  //   method: "GET",
  //   path: "/v1/admin/getCancelReasonList",
  //   handler: async (request, h) => {
  //     try {
  //       let dataToSend = await Controllers.AdminController.getCancelReasonList(
  //         request.auth.credentials,
  //         request.query
  //       );
  //       return UniversalFunctions.sendSuccess(
  //         responseMessages[language].SUCCESS.DEFAULT,
  //         dataToSend,
  //         language
  //       );
  //     } catch (err) {
  //       return UniversalFunctions.sendError(err);
  //     }
  //   },
  //   config: {
  //     description: "Cancel Reasons List",
  //     tags: ["api"],
  //     auth: "AdminAuth",
  //     validate: {
  //       query: Joi.object({
  //         page: Joi.number().default(1),
  //       }),
  //       headers: UniversalFunctions.authorizationHeaderObj,
  //       failAction: UniversalFunctions.failActionFunction,
  //     },
  //     plugins: {
  //       "hapi-swagger": {
  //         responseMessages: constants.swaggerDefaultResponseMessages,
  //       },
  //     },
  //   },
  // },

  // Delete Cancel Reason
  // {
  //   method: "DELETE",
  //   path: "/v1/admin/deleteCancelReason",
  //   handler: async (request, h) => {
  //     try {
  //       let dataToSend = await Controllers.AdminController.deleteCancelReason(
  //         request.auth.credentials,
  //         request.query
  //       );
  //       return UniversalFunctions.sendSuccess(
  //         responseMessages[language].SUCCESS.DEFAULT,
  //         dataToSend,
  //         language
  //       );
  //     } catch (err) {
  //       return UniversalFunctions.sendError(err);
  //     }
  //   },
  //   options: {
  //     description: "Delete Cancel Reasons",
  //     tags: ["api"],
  //     auth: "AdminAuth",
  //     validate: {
  //       query: Joi.object({
  //         cancelReasonsId: Joi.objectId().required(),
  //       }),
  //       headers: UniversalFunctions.authorizationHeaderObj,
  //     },
  //     plugins: {
  //       "hapi-swagger": {
  //         responseMessages: constants.swaggerDefaultResponseMessages,
  //       },
  //     },
  //   },
  // },

  // Verify Otp Driver
  // {
  //   method: "PUT",
  //   path: "/v1/admin/driverVerifyOtp",
  //   handler: async (request, reply) => {
  //     try {
  //       let dataToSend = await Controllers.AdminController.verifyDriverOtp(
  //         request.payload
  //       );
  //       return UniversalFunctions.sendSuccess(
  //         responseMessages[language].SUCCESS.DEFAULT,
  //         dataToSend
  //       );
  //     } catch (err) {
  //       return UniversalFunctions.sendError(err);
  //     }
  //   },
  //   config: {
  //     description: "Verify Otp",
  //     tags: ["api"],
  //     validate: {
  //       payload: Joi.object({
  //         email: Joi.string().email().required(),
  //         otp: Joi.number().required(),
  //         type: Joi.number().required(),
  //       }),
  //       failAction: UniversalFunctions.failActionFunction,
  //       options: {
  //         allowUnknown: true,
  //       },
  //     },
  //   },
  // },
];
