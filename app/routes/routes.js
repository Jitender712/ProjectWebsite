const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
const UniversalFunctions = require("../../utils/universalFunctions");
const Controllers = require("../controllers");
const constants = require("../../constants").APP_CONSTANTS;
const responseMessages = require("../../responseMessages");
const language = "en";
const config = require("config");
const { flatMapSeries } = require("async");

const healthCheck = [
  {
    method: "GET",
    path: "/healthcheck",
    handler: async (request, reply) => {
      return UniversalFunctions.sendSuccess(
        responseMessages[language].SUCCESS.DEFAULT,
        { message: "Success" },
        language
      );
    },
    options: {
      description: "Health Check",
      tags: ["api"],

      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
];

// RIDE
const ride = [
  // Get Listing of Cancel Reasons
  {
    method: "GET",
    path: "/v1/ride/getCancelReason",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.RideController.getCancelReason();
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
      description: "Driver Reason for Cancelling",
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
  // Get Booking Details
  {
    method: "GET",
    path: "/v1/ride/getBookingRideDetails",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.RideController.getBookingRideDetails(
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
      description: "Get booking ride Details",
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

  // Average Rating for Consumer
  {
    method: "GET",
    path: "/v1/ride/averageRating",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.RideController.averageRating(
            // request.auth.credentials,
            request.query
            // request.payload
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
          userId: Joi.objectId().required(),
        }),
        // payload: Joi.object({
        //   rating: Joi.number().required().default(0),
        //   comment: Joi.string(),
        // }),
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

  // Average Rating for Consumer
  {
    method: "GET",
    path: "/v1/LinktoWebPages/termsCondition",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.RideController.termsCondition();

          return UniversalFunctions.sendSuccess(
            responseMessages[language].SUCCESS.DEFAULT,
            dataToSend,
            language
          );
        } catch (err) {
          return UniversalFunctions.sendError(err);
        }
      },
      description: "Terms and Condition",
      tags: ["api"],
      // auth: "ConsumerAuth",
      validate: {
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

  // Contact US
  {
    method: "POST",
    path: "/v1/ride/contactUs",
    options: {
      handler: async (request, h) => {
        try {
          let dataToSend = await Controllers.RideController.contactUs(
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
      description: " Contact US",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          userType: Joi.string().valid(["Consumer", "Driver"]),
          userId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          title: Joi.string().required(),
          content: Joi.string(),
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

  // Get Listing of Contact US
  {
    method: "GET",
    path: "/v1/ride/getRaisedIssue",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.RideController.getRaisedIssue();
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
      description: "Get Listing of Contact Us",
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
];

//BASE CHARGES
const BaseCharges = [
  // Create Base Charges
  {
    method: "POST",
    path: "/v1/Charges/addBaseCharges",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.BaseChargesController.addBaseCharges(
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
      description: "Add Base Charges",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          vehicleId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          price: Joi.number().required().default(10),
          distance: Joi.number().required().default(2),
          //   type : Joi.string(),
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
  // Get Base Charges List
  {
    method: "GET",
    path: "/v1/Charges/getBaseCharges",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.query);
        let dataToSend = await Controllers.BaseChargesController.getBaseCharges(
          request.query
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
      description: "Get BaseCharges",
      tags: ["api"],
      validate: {
        // query: Joi.object({
        //   BaseChargesId: Joi.objectId(),
        // }),
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // Update Bases Charges
  {
    method: "PUT",
    path: "/v1/Charges/updateBasesCharges",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.BaseChargesController.editBaseCharges(
            request.auth.credentials,
            request.query,
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
      description: "Edit Base Type",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          BaseChargesId: Joi.required(),
        }),
        payload: Joi.object({
          price: Joi.number().required().default(10),
          distance: Joi.number().required().default(2),
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
];

// RATE TYPES
const RatesType = [
  // Create Rate Type
  {
    method: "POST",
    path: "/v1/Charges/RateType",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.RatesTypeController.addRatesType(
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
      description: "Add Rate Type",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          vehicleId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          price: Joi.number().default(5),
          type: Joi.string().valid(["Kilometer", "Miles"]),
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
  // Get Rate Type List
  {
    method: "GET",
    path: "/v1/Charges/getRatesType",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.query);
        let dataToSend = await Controllers.RatesTypeController.getRatesType(
          request.query
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
      description: "Get Rates Type",
      tags: ["api"],
      validate: {
        // query: Joi.object({
        //   RatesTypeId: Joi.objectId(),
        // }),
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // update Rate type
  {
    method: "PUT",
    path: "/v1/Charges/updateRateType",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.RatesTypeController.updateRateType(
          request.auth.credentials,
          request.query,
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
      description: "Edit Rate Type",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          rateTypeId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          price: Joi.number().default(5),
          type: Joi.string().valid(["Kilometer", "Miles"]),
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
];

// SURGE CHARGES
const SurgeCharges = [
  // Create Surges Charges
  {
    method: "POST",
    path: "/v1/Charges/addSurgeCharges",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.SurgeChargesController.addSurgeCharges(
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
      description: "Add Surge Charge",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          vehicleId: Joi.objectId().required(),
          region: Joi.string().valid([
            "Delhi",
            "Mumbai",
            "Chandigarh",
            "Bengaluru",
          ]),
        }),
        payload: Joi.object({
          price: Joi.number().default(10),
          type: Joi.string().valid(["Fixed", "Percentage"]),
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
  // Get Surge Charges
  {
    method: "GET",
    path: "/v1/Charges/getSurgeCharges",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.query);
        let dataToSend =
          await Controllers.SurgeChargesController.getSurgeCharges(
            request.query
          );
        console.log(dataToSend);
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    options: {
      description: "Get SurgeCharges",
      tags: ["api"],
      validate: {
        // query: Joi.object({
        //   SurgeChargesId: Joi.objectId(),
        // }),
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // Update Surges Charges
  {
    method: "PUT",
    path: "/v1/Charges/updateSurgesCharges",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.SurgeChargesController.editSurgeCharges(
            request.auth.credentials,
            request.query,
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
      description: "Edit Surge Type",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          SurgeChargesId: Joi.objectId().required(),
          region: Joi.string().valid([
            "Delhi",
            "Mumbai",
            "Chandigarh",
            "Bengaluru",
          ]),
        }),
        payload: Joi.object({
          price: Joi.number().default(10),
          type: Joi.string().valid(["Fixed", "Percentage"]),
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
];

// VEHICLE TYPE
const vehicleType = [
  // Create Vehicle
  {
    method: "POST",
    path: "/v1/Charges/addVehicle",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.VehicleTypeController.addVehicleType(
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
      description: "Add Vehicle Type",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          vehicleType: Joi.string()
            .required()
            .valid([
              "Bike",
              "Auto",
              "Mini",
              "Prime Sedan",
              "Prime Play",
              "Prime Suv",
              "Lux",
              "Shuttle",
            ]),
        }),
        // payload: Joi.object({
        //   name: Joi.string(),
        // }),
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

  // Get Vehicle
  {
    method: "GET",
    path: "/v1/Charges/getVehicle",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.VehicleTypeController.getVehicleType(
          request.query
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
      description: "Get Vehicle Type",
      tags: ["api"],
      validate: {
        query: Joi.object({
          distance: Joi.number().required(),
          region: Joi.string()
            .required()
            .valid(["Delhi", "Mumbai", "Chandigarh", "Bengaluru"]),
        }),
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
  // Vehicle Details
  {
    method: "GET",
    path: "/v1/Charges/getVehicleDetails",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.query);
        let dataToSend =
          await Controllers.VehicleTypeController.getVehicleDetails(
            request.query
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
      description: "Get Vehicle Type",
      tags: ["api"],
      validate: {
        query: Joi.object({
          vehicleId: Joi.objectId(),
        }),
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
];

const uploadImage = [
  // Upload Images
  {
    method: "PUT",
    path: "/v1/Image/Settings/uploadImage",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.RideController.uploadImage(
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
      description: "Upload Image",
      tags: ["api"],
      auth: "AdminAuth",
      payload: {
        output: "file",
        parse: true,
        allow: "multipart/form-data",
        maxBytes: 1024 * 1024 * 1024 * 10,
        timeout: false,
        multipart: true,
      },
      validate: {
        payload: Joi.object({
          image: Joi.any().optional(),
          // imageType: Joi.string().required(),
        }),

        failAction: UniversalFunctions.failActionFunction,
        headers: UniversalFunctions.authorizationHeaderObj,
      },

      plugins: {
        "hapi-swagger": {
          payloadType: "form",
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
];

// VEHICLES

const Vehicles = [
  // Create Vehicle
  {
    method: "POST",
    path: "/v1/Vehicles/createVehicle",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.VehicleController.addVehicleType(
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
      description: "Create Vehicle",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        payload: Joi.object({
          vehicleName: Joi.string().required(),
          vehicleImage: Joi.string().required(),
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

  // Get Vehicle
  {
    method: "GET",
    path: "/v1/Vehicles/getVehicleList",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.VehicleController.getAllVehicleList();
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

  // Update Vehicles
  {
    method: "PUT",
    path: "/v1/Vehicles/updateVehicles",
    handler: async (request, reply) => {
      try {
        console.log("request : ", request.payload);
        let dataToSend = await Controllers.VehicleController.updateVehicles(
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
      description: "Edit Vehicles Name and Images",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          vehicleId: Joi.objectId().required(),
        }),
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

  //Delete Vehicles
  {
    method: "DELETE",
    path: "/v1/Vehicles/deleteVehicles",
    handler: async (request, h) => {
      try {
        let dataToSend = await Controllers.VehicleController.deleteVehicles(
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
      description: "Delete Vehicles",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          vehicleId: Joi.objectId().required(),
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
];

// PromotionalBanner
const PromotionalBanner = [
  // Create Promotional Banner
  {
    method: "POST",
    path: "/v1/Banner/createBanner",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.PromotionalBannerController.createBanner(
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
      description: "Create Banner",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        payload: Joi.object({
          first_Banner_Image: Joi.array()
            .items({
              ImageUrl: Joi.string().required(),
            })
            .required(),
          second_Banner_Image: Joi.array()
            .items({
              ImageUrl: Joi.string().required(),
            })
            .required(),
          blogTitle: Joi.string().required(),
          blogs: Joi.array()
            .items({
              blogTitle: Joi.string().required(),
              blogImage: Joi.string().required(),
              blogSubTitle: Joi.string().required(),
            })
            .required(),
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

  // List Promotional Banner
  {
    method: "GET",
    path: "/v1/Banner/listBanner",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.PromotionalBannerController.listBanner();
        return UniversalFunctions.sendSuccess(
          responseMessages[language].SUCCESS.DEFAULT,
          dataToSend
        );
      } catch (err) {
        return UniversalFunctions.sendError(err);
      }
    },
    options: {
      description: "List Promotional Banner",
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
];

const AddContactForSOS = [
  // Create Contact list
  {
    method: "POST",
    path: "/v1/contact/addContactTolist",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.RideController.addContacttolist(
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
      description: "Create Contact list",
      tags: ["api"],
      auth: "DriverAuth",
      validate: {
        query: Joi.object({
          userType: Joi.string().required().valid(["Driver", "Consumer"]),
          userId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          contactArray: Joi.object({
            name: Joi.string().required(),
            phoneNo: Joi.number().required(),
          }),
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

  // Get Contact list for SOS
  {
    method: "GET",
    path: "/v1/contact/getContactList",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.RideController.getContactList(
          request.query
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
      description: "Get Contact list for SOS",
      tags: ["api"],
      // auth: "DriverAuth",
      validate: {
        query: Joi.object({
          userType: Joi.string().required().valid(["Driver", "Consumer"]),
          userId: Joi.objectId().required(),
        }),
        // headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },

  // Remove Contact from list
  {
    method: "PUT",
    path: "/v1/contact/removeContactFromList",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.RideController.removeContactFromList(
          request.query,
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
      description: "Remove Contact from list",
      tags: ["api"],
      // auth: "DriverAuth",
      validate: {
        query: Joi.object({
          userType: Joi.string().required().valid(["Driver", "Consumer"]),
          userId: Joi.objectId().required(),
        }),
        payload: Joi.object({
          phoneNo: Joi.number().required(),
          name: Joi.string().required(),
        }),
        // headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages: constants.swaggerDefaultResponseMessages,
        },
      },
    },
  },
];

module.exports = [
  ...healthCheck,
  ...ride,
  ...BaseCharges,
  ...SurgeCharges,
  ...RatesType,
  ...vehicleType,
  ...uploadImage,
  ...Vehicles,
  ...PromotionalBanner,
  ...AddContactForSOS,
];
