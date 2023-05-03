"use strict";

const { ValidationOfPromoCode } = require("../lib/validation");

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger");

class CouponCodesController {
  // create Coupon Codes
  static async createCouponCodes(payload) {
    let language = "en";
    try {
      let array = payload.vehicleType;
      let vehicleList = [];
      for (let i = 0; i < array.length; i++) {
        console.log("looping", i, array[i]);
        vehicleList.push(ObjectId(array[i]._id));
      }
      let consumerArray = payload.consumerArray;
      let consumerList = [];
      for (let i = 0; i < consumerArray.length; i++) {
        console.log("looping", i, consumerArray[i]);
        consumerList.push(ObjectId(consumerArray[i]._id));
      }
      let vehicles = await Models.VehicleType.aggregate([
        {
          $match: {
            _id: {
              $in: vehicleList,
            },
          },
        },
        {
          $project: {
            _id: 1,
            vehicleType: 1,
          },
        },
      ]);
      let consumers = await Models.Consumer.aggregate([
        {
          $match: {
            _id: {
              $in: consumerList,
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            phoneNo: 1,
          },
        },
      ]);
      payload.consumerArray = consumers;
      payload.vehicleType = vehicles;
      let CouponCode = await Services.DbOperations.create(
        Models.CouponCodes,
        payload
      );
      return CouponCode;
    } catch (err) {
      logger.logError("Create Coupon Codes", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // listing of CouponCodes
  static async CouponCodeList() {
    let language = "en";
    try {
      let CouponCodes = await Services.DbOperations.getData(
        Models.CouponCodes,
        {
          isDeleted: false,
          // isBlocked:false
          // discountStatus: true,
        },
        {},
        {
          lean: true,
        }
      );
      return CouponCodes;
    } catch (err) {
      logger.logError("Couponcode List", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Coupon Code
  static async deleteCouponCode(query) {
    let language = "en";
    try {
      let CouponCode = await Services.DbOperations.findAndRemove(
        Models.CouponCodes,
        {
          _id: ObjectId(query.CouponCodeId),
          isDeleted: false,
        }
      );
      if (CouponCode) {
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.DATA_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Delete Couponcode", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Promo Code Retrieval API
  static async getCouponlistForConsumer(user) {
    let language = "en";
    try {
      console.log("User", user);
      let Allcouponlist = await Services.DbOperations.getData(
        Models.CouponCodes,
        {
          isBlocked: false,
          coupon_Code_Accessibility: "Public",
          promoCodeStatus: "Active",
        },
        {
          name_of_Coupon: 1,
          code_of_coupon: 1,
          discount: 1,
          discountType: 1,
          service_Type: 1,
          description_of_Coupon: 1,
          minimum_transaction_amount: 1,
          code_category: 1,
          validity: 1,
          coupon_Icon: 1,
          coupon_Code_Accessibility: 1,
          terms_and_condition: 1,
        }
      );
      let privateCoupon = await Models.CouponCodes.aggregate([
        {
          $match: {
            isBlocked: false,
            coupon_Code_Accessibility: "Private",
            promoCodeStatus: "Active",
            consumerArray: { $elemMatch: { _id: ObjectId(user.id) } },
          },
        },
        {
          $project: {
            name_of_Coupon: 1,
            code_of_coupon: 1,
            discount: 1,
            discountType: 1,
            service_Type: 1,
            description_of_Coupon: 1,
            minimum_transaction_amount: 1,
            code_category: 1,
            validity: 1,
            coupon_Icon: 1,
            coupon_Code_Accessibility: 1,
            terms_and_condition: 1,
          },
        },
      ]);

      return { Allcouponlist, privateCoupon };
    } catch (err) {
      logger.logError(
        "Show coupon code to consumer public as well as private",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Promo Code Redemption API by consumer
  static async validateCouponbyConsumer(user, payload) {
    let language = "en";
    try {
      let data = await ValidationOfPromoCode(user, payload);
      return data;
    } catch (err) {
      logger.logError(
        "Promo Code Redemption API by consumer",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = CouponCodesController;
