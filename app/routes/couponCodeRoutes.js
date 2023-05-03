const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
const UniversalFunctions = require("../../utils/universalFunctions");
const Controllers = require("../controllers");
const constants = require("../../constants").APP_CONSTANTS;
const responseMessages = require("../../responseMessages");
const language = "en";
const config = require("config");

module.exports.CouponCode = [
  // Create CouponCode
  {
    method: "POST",
    path: "/v1/CouponCode/createCouponCode",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.CouponCodeController.createCouponCodes(
            //   request.auth.credentials,
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
      description: "Create CouponCode",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        payload: Joi.object({
          name_of_Coupon: Joi.string().required(),
          code_of_coupon: Joi.string()
            .required()
            .max(15)
            .regex(/^[A-Z0-9]*$/)
            .min(6),
          discount: Joi.number().required().default(10),
          discountType: Joi.string().required().default("Flat"),
          // promoCodeRestriction: Joi.object({
          //   daily: {
          //     byAmount: Joi.number().required(),
          //     byCount: Joi.number().required(),
          //   },
          //   weekly: {
          //     byAmount: Joi.number().required(),
          //     byCount: Joi.number().required(),
          //   },

          //   monthly: {
          //     byAmount: Joi.number().required(),
          //     byCount: Joi.number().required(),
          //   },

          //   yearly: {
          //     byAmount: Joi.number().required(),
          //     byCount: Joi.number().required(),
          //   },
          // }),
          vehicleType: Joi.array().required().items({ _id: Joi.objectId() }),
          coupon_Code_Accessibility: Joi.string()
            .required()
            .valid(["Public", "Private"]),
          consumerArray: Joi.array().items({ _id: Joi.objectId() }),
          description_of_Coupon: Joi.string().required(),
          minimum_transaction_amount: Joi.number().required().default(10),
          person_count_limit: Joi.object({
            total: Joi.number().required(),
          }),
          code_category: Joi.string()
            .required()
            .valid(["Promo Code", "Welcome Offer"]),
          validity: Joi.object({
            Start_date: Joi.string().required(),
            End_date: Joi.string().required(),
            Days: Joi.array(),
            Time: Joi.object({
              start_time: Joi.string(),
              end_time: Joi.string(),
            }),
          }),
          promoCodeStatus: Joi.string()
            .valid(["Active", "Upcoming", "Expired"])
            .default("Active"),
          coupon_Icon: Joi.string().required(),
          terms_and_condition: Joi.string().required(),
          geofence: Joi.array(),
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

  // Listing CouponCode
  {
    method: "GET",
    path: "/v1/CouponCode/getCouponCodeList",
    handler: async (request, reply) => {
      try {
        let dataToSend = await Controllers.CouponCodeController
          .CouponCodeList
          //   request.auth.credentials,
          // request.payload
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
      description: "CouponCode List",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
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

  // Delete CouponCode
  {
    method: "DELETE",
    path: "/v1/CouponCode/deleteCouponCode",
    handler: async (request, h) => {
      try {
        console.log("request:", request.query);
        let dataToSend =
          await Controllers.CouponCodeController.deleteCouponCode(
            //   request.auth.credentials,
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
      description: "Delete Coupon Code",
      tags: ["api"],
      auth: "AdminAuth",
      validate: {
        query: Joi.object({
          CouponCodeId: Joi.objectId().required(),
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

  // Promo Code Retrieval API For Consumer
  {
    method: "GET",
    path: "/v1/consumer/getCouponCodeList",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.CouponCodeController.getCouponlistForConsumer(
            // request.payload
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
      description: "Promo Code Retrieval API For Consumer",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
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

  // Promo Code Redemption API
  {
    method: "POST",
    path: "/v1/consumer/validateCouponbyConsumer",
    handler: async (request, reply) => {
      try {
        let dataToSend =
          await Controllers.CouponCodeController.validateCouponbyConsumer(
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
      description: "Promo Code Redemption API",
      tags: ["api"],
      auth: "ConsumerAuth",
      validate: {
        payload: Joi.object({
          code_of_coupon: Joi.string()
            .required()
            .max(15)
            .regex(/^[A-Z0-9]*$/)
            .min(6),
          totalFare: Joi.number().required(),
          vehicleType: Joi.string()
          .required()
          .default("Mini")
          .valid(
            "Bike",
            "Mini",
            "Prime Suv",
          ),
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
];
