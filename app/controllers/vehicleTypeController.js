"use strict";

const { log } = require("async");
const { isValidObjectId } = require("mongoose");
const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger");

class VehicleTypeController {
  // Add new vehicle
  static async addVehicleType(admin, query) {
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
      const checkVehicleType = await Services.DbOperations.findOne(
        Models.VehicleType,
        {
          vehicleType: query.vehicleType,
          isDeleted: false,
        },
        { name: 1 }
      );
      console.log(checkVehicleType, "==>");

      if (!checkVehicleType) {
        const data = await Services.DbOperations.create(Models.VehicleType, {
          // name: payloadData.name,
          vehicleType: query.vehicleType,
        });
        console.log("data : ", data);
        logger.logSuccess(
          "Add Vehicle Type",
          "Success",
          JSON.stringify({ data: data })
        );
        return data;
      } else {
        console.log("Vehicle Type Already Exist");
        return Promise.reject(
          responseMessages[language].ERROR.VEHICLE_ALREADY_EXISTS
        );
      }
      // } else {
      //   return Promise.reject(responseMessages[language].ERROR.NOT_AUTHORIZED);
      // }
    } catch (err) {
      logger.logError("Add Vehicle Type", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  
  // List Vehicle Type
  static async getVehicleType(payloadData) {
    let language = "en";

    try {
      let distance = payloadData.distance,
        region = payloadData.region,
        surgeType = "Fixed";
      const data = await Services.DbOperations.getData(
        Models.VehicleType,
        { isDeleted: false },
        {
          _id: 1,
          vehicleType: 1,
        }
      );

      let VehicleType_data = await Models.VehicleType.aggregate([
        {
          $lookup: {
            from: "basecharges",
            localField: "_id",
            foreignField: "vehicleId",
            as: "basechargesData",
          },
        },
        {
          $lookup: {
            from: "surgecharges",
            localField: "_id",
            foreignField: "vehicleId",
            as: "surgechargesData",
          },
        },
        {
          $lookup: {
            from: "ratetypes",
            localField: "_id",
            foreignField: "vehicleId",
            as: "ratetypesData",
          },
        },
        {
          $addFields: {
            data_dis: { $toDecimal: distance },
          },
        },
        {
          $project: {
            _id: 1,
            vehicleType: 1,
            basechargesData: 1,
            surgechargesData: 1,
            ratetypesData: 1,
            data_dis: 1,
            // TotalPrice: {
            //   $add: [
            //     {
            //       $multiply: [
            //         { $arrayElemAt: ["$basechargesData.price", 0] },
            //         {
            //           $arrayElemAt: ["$basechargesData.distance", 0],
            //         },
            //       ],
            //     },
            //     {
            //       $multiply: [
            //         {
            //           $subtract: [
            //             "$data_dis",
            //             { $arrayElemAt: ["$basechargesData.distance", 0] },
            //           ],
            //         },
            //         { $arrayElemAt: ["$ratetypesData.price", 0] },
            //       ],
            //     },
            //     { $arrayElemAt: ["$surgechargesData.price", 0] },
            //   ],
            // },
          },
        },
      ]);
      let totalPrice = 0;
      const map1 = VehicleType_data.map((element) => {
        totalPrice =
          element.basechargesData[0].price *
            element.basechargesData[0].distance +
          (distance - element.basechargesData[0].distance) *
            element.ratetypesData[1].price +
          element.surgechargesData[1].price;
        return {
          vehicleType: element.vehicleType,
          TotalFare: totalPrice.toFixed(2),
        };

      });
      // console.log("map1", map1);
      return map1;
    } catch (err) {
      logger.logError("Get Vehicle type", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get Single Vehicle Details
  static async getVehicleDetails(query) {
    let language = "en";
    try {
      // const dataExist = await Services.DbOperations.findOne(
      //   Models.VehicleType,
      //   {
      //     _id: ObjectId(query.vehicleId),
      //   },
      //   { vehicleType: 1 }
      // );
      // if (dataExist) {
      //   const data = await Services.DbOperations.findOne(
      //     Models.VehicleType,
      //     {
      //       _id: ObjectId(query.vehicleId),
      //       isDeleted: false,
      //     },
      //     { vehicleType: 1, name: 1 }
      //   );
      //   const baseCharge = await Services.DbOperations.getData(
      //     Models.BaseCharges,
      //     {
      //       vehicleId: ObjectId(query.vehicleId),
      //       isDeleted: false,
      //     },
      //     {
      //       price: 1,
      //       distance: 1,
      //       _id: 0,
      //     }
      //   );
      //   const SurgeCharges = await Services.DbOperations.getData(
      //     Models.SurgeCharges,
      //     {
      //       vehicleId: ObjectId(query.vehicleId),
      //       isDeleted: false,
      //     },
      //     {
      //       region: 1,
      //       price: 1,
      //       type: 1,
      //       _id: 0,
      //     }
      //   );
      //   const RateTypes = await Services.DbOperations.getData(
      //     Models.RatesType,
      //     {
      //       vehicleId: ObjectId(query.vehicleId),
      //       isDeleted: false,
      //     },
      //     {
      //       price: 1,
      //       type: 1,
      //       _id: 0,
      //     }
      //   );
      //   let dataToSend = {
      //     data,
      //     RateTypes,
      //     baseCharge,
      //     SurgeCharges,
      //   };

      //   logger.logSuccess(
      //     "Get Vehicle type",
      //     "Success"
      //     // JSON.stringify({ Data: data })
      //   );
      //   return dataToSend;
      // } else {
      //   return Promise.reject(
      //     responseMessages[language].ERROR.VEHICLE_DOES_NOT_EXIST
      //   );
      // }
      let VehicleType_data = await Models.VehicleType.aggregate([
        {
          $match: {
            _id: ObjectId(query.vehicleId),       
          },
        },
        {
          $lookup: {
            from: "basecharges",
            localField: "_id",
            foreignField: "vehicleId",
            as: "basechargesData",
          },
        },
        {
          $lookup: {
            from: "surgecharges",
            localField: "_id",
            foreignField: "vehicleId",
            as: "surgechargesData",
          },
        },
        {
          $lookup: {
            from: "ratetypes",
            localField: "_id",
            foreignField: "vehicleId",
            as: "ratetypesData",
          },
        },
        {
          $project: {
            _id: 1,
            vehicleType: 1,
            "basechargesData.price": 1,
            "basechargesData.distance": 1,
            "surgechargesData.region": 1,
            "surgechargesData.price": 1,
            "surgechargesData.type": 1,
            "ratetypesData.type": 1,
            "ratetypesData.price": 1,
          },
        },
      ]);

      return VehicleType_data;
    } catch (err) {
      logger.logError("Get Vehicle Details", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = VehicleTypeController;