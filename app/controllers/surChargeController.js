"use strict";

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger");

class SurgeChargesController {
  static async addSurgeCharges(admin, query, payloadData) {
    let language = "en";
    console.log(query, payloadData);
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
          const data = await Services.DbOperations.create(Models.SurgeCharges, {
            vehicleId: query.vehicleId,
            region: query.region,
            price: payloadData.price,
            type: payloadData.type,
          });
          logger.logSuccess(
            "Add Surge Charges",
            "Success"
            // JSON.stringify({ data: data })
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

  static async getSurgeCharges(payloadData) {
    let language = "en";

    try {
      const data = await Services.DbOperations.getData(Models.SurgeCharges, {
        // _id: ObjectId(payloadData.businessTypeId),
        isDeleted: false,
      });
      logger.logSuccess(
        "Get Surge Charges",
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
  // Edit Surge charges
  static async editSurgeCharges(admin, query, payload) {
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
        let dataToExist = await Services.DbOperations.findOne(
          Models.SurgeCharges,
          {
            _id: ObjectId(query.SurgeChargesId),
          }
        );
        if (dataToExist) {
          let data = await Services.DbOperations.findAndUpdate(
            Models.SurgeCharges,
            { _id: ObjectId(query.SurgeChargesId), isDeleted: false },
            { region: query.region, type: payload.type, price: payload.price },
            { new: true }
          );

          logger.logSuccess("Update Surge Charges", "Surge Charges updated");
          return data;
        } else {
          let dataToShow = {
            message: "Surge Charges Does not Exist",
            statusCode: 200,
          };
          return dataToShow;
        }
      // } else {
      //   return Promise.reject(responseMessages[language].ERROR.NOT_AUTHORIZED);
      // }
    } catch (err) {
      logger.logError("Update Surge Charges", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = SurgeChargesController;
