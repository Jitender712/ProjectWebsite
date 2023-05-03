"use strict";

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger");

class BaseChargesController {
  // Create Base Charges
  static async addBaseCharges(admin, query, payloadData) {
    let language = "en";
    console.log(admin, query);
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
        const data = await Services.DbOperations.create(Models.BaseCharges, {
          vehicleId: query.vehicleId,
          price: payloadData.price,
          distance: payloadData.distance,
        });
        console.log("data : ", data);
        logger.logSuccess(
          "Add Base Charges",
          "Success",
          JSON.stringify({ data: data })
        );
        return data;
      } else {
        return Promise.reject(responseMessages[language].ERROR.VEHICLE_DOES_NOT_EXIST);
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
  // Get Base Charges
  static async getBaseCharges(payloadData) {
    let language = "en";

    try {
      const data = await Services.DbOperations.getData(Models.BaseCharges, {
        // _id: ObjectId(payloadData.businessTypeId),
        isDeleted: false,
      });
      logger.logSuccess(
        "Get Base Charges",
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
  // Base Charges Update
  static async editBaseCharges(admin, query, payload) {
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
        let dataExist = await Services.DbOperations.findOne(
          Models.BaseCharges,
          {
            _id: ObjectId(query.BaseChargesId),
          }
        );
        if (dataExist) {
          let data = await Services.DbOperations.findAndUpdate(
            Models.BaseCharges,
            { _id: ObjectId(query.BaseChargesId), isDeleted: false },
            { price: payload.price, distance: payload.distance },
            { new: true }
          );

          logger.logSuccess("Update Base Charges", "Base Charges updated");
          return data;
        } else {
          let dataToShow = {
            statusCode: 200,
            message: "Base Charges Does not Exist",
          };
          return dataToShow;
        }
      // } else {
      //   return Promise.reject(responseMessages[language].ERROR.NOT_AUTHORIZED);
      // }
    } catch (err) {
      logger.logError("Update Base Charges", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = BaseChargesController;
