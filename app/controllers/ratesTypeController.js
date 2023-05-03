"use strict";

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger");

class RatesTypeController {
  // Create Rate Type
  static async addRatesType(admin, query, payloadData) {
    let language = "en";
    try {
      // let onlyAdmin = await Services.DbOperations.findOne(
      //   Models.Admin,
      //   {
      //     _id: admin.id,
      //     role: admin.role,
      //   },
      //   { name: 1 },
      //   {}
      // );
      // if (onlyAdmin) {
        const vehicleType = await Services.DbOperations.findOne(
          Models.VehicleType,
          {
            _id: ObjectId(query.vehicleId),
          }
        );
        if (vehicleType) {
          const data = await Services.DbOperations.create(Models.RatesType, {
            vehicleId: query.vehicleId,
            price: payloadData.price,
            type: payloadData.type,
          });
          console.log("data : ", data);
          logger.logSuccess(
            "Add Rates",
            "Success",
            JSON.stringify({ data: data })
          );
          return data;
        } else {
          return Promise.reject(
            responseMessages[language].ERROR.VEHICLE_DOES_NOT_EXIST
          );
        }
      // } else {
      //   return Promise.reject(responseMessages[language].ERROR.NOT_AUTHORIZED);
      // }
    } catch (err) {
      logger.logError("Add Rates", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Get RateType List
  static async getRatesType(payloadData) {
    let language = "en";

    try {
      const data = await Services.DbOperations.getData(Models.RatesType, {
        // _id: ObjectId(payloadData.businessTypeId),
        isDeleted: false,
      });
      logger.logSuccess(
        "Get Routes",
        "Success",
        JSON.stringify({ Data: data })
      );
      return data;
    } catch (err) {
      logger.logError("Get Rates", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Update Rate Types

  static async updateRateType(admin,query, payloadData) {
    let language = "en";

    try {
      // let onlyAdmin = await Services.DbOperations.findOne(
      //   Models.Admin,
      //   {
      //     _id: admin.id,
      //     role: admin.role,
      //   },
      //   { name: 1 },
      //   {}
      // );
      // if (onlyAdmin) {
        const vehicleType = await Services.DbOperations.findOne(
          Models.RatesType,
          {
            _id: ObjectId(query.rateTypeId),
          }
        );
        if (vehicleType) {
          let data = await Services.DbOperations.findAndUpdate(
            Models.RatesType,
            { _id: ObjectId(query.rateTypeId), isDeleted: false },
            { price: payloadData.price, type: payloadData.type },
            { new: true }
          );
          console.log("data : ", data);
          logger.logSuccess(
            "Add Rates",
            "Success",
            JSON.stringify({ data: data })
          );
          return data;
        } else {
          let dataToShow = {
            message: "Rate Type Does not Exist",
            statusCode: 200,
          };
          return dataToShow;
        }
      // } else {
      //   return Promise.reject(responseMessages[language].ERROR.NOT_AUTHORIZED);
      // }
    } catch (err) {
      logger.logError("Edit Rates Types", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = RatesTypeController;
