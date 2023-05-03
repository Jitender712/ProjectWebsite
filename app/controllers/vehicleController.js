"use strict";

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger");

class VehicleController {
  // Add new vehicle
  static async addVehicleType(admin, payload) {
    let language = "en";

    try {
      let vehicleExist = await Services.DbOperations.findOne(
        Models.Vehicles,
        {
          vehicle: payload.vehicleName,
          isDeleted: false,
        },
        {
          vehicles: 1,
        }
      );
      if (vehicleExist) {
        console.log("Vehicle Already Exist");
        return Promise.reject(
          responseMessages[language].ERROR.VEHICLE_ALREADY_EXISTS
        );
      } else {
        let vehicle = await Services.DbOperations.create(Models.Vehicles, {
          vehicle: payload.vehicleName,
          vehicleImage: payload.vehicleImage,
        });
        logger.logSuccess(
          "Create Vehicles",
          "Success"
          // JSON.stringify(JSON.stringify(data))
        );
        return vehicle;
      }
    } catch (err) {
      logger.logError("Add Vehicle Type", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // List Vehicle Type
  static async getAllVehicleList() {
    let language = "en";

    try {
      let AllVehicles = await Services.DbOperations.getData(Models.Vehicles, {
        isDeleted: false,
      });
      logger.logSuccess(
        "List Vehicles",
        "Show Vehicles"
        // JSON.stringify(JSON.stringify(data))
      );
      return AllVehicles;
    } catch (err) {
      logger.logError("Get All Vehicle List", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Changes in vehicle Name or Images
  static async updateVehicles(query, payload) {
    let language = "en";
    try {
      let updateVehicles = await Services.DbOperations.findAndUpdate(
        Models.Vehicles,
        {
          _id: ObjectId(query.vehicleId),
          isDeleted: false,
        },
        {
          $set: payload,
        },
        {
          new: true,
        }
      );
      if (updateVehicles) {
        logger.logSuccess(
          "Update Vehicles",
          "Vehicle Updated"
          // JSON.stringify(JSON.stringify(data))
        );
        return updateVehicles;
      } else {
        logger.logError("Update Vehicles", "Vehicle Not Found");
        return Promise.reject(
          responseMessages[language].ERROR.VEHICLE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Update Vehicle", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Vehicles
  static async deleteVehicles(admin, query) {
    let language = "en";

    try {
      let data = await Services.DbOperations.findAndRemove(Models.Vehicles, {
        _id: ObjectId(query.vehicleId),
        isDeleted: false,
      });
      if (data) {
        logger.logSuccess("Delete Vehicles", "Vehicle Deleted");
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        return Promise.reject(
          responseMessages[language].ERROR.VEHICLE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Delete Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = VehicleController;
