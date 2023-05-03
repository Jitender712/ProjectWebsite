"use strict";

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger"),
  FileUpload = require("../lib/fileUpload"),
  config = require("config");

class RideController {
  // Get Cancel Reasons
  static async getCancelReason() {
    let language = "en";
    try {
      let data = await Services.DbOperations.find(
        Models.ReasonForCancelling,
        {}
      );
      console.log("data : ", data);
      return data;
    } catch (err) {
      logger.logError("getCancelReason", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Get Booking Details
  static async getBookingRideDetails(query) {
    let language = "en";
    try {
      let Ride_List = await Models.Ride.aggregate([
        {
          $match: {
            _id: ObjectId(query.bookingId),
          },
        },
        {
          $lookup: {
            from: "consumers",
            localField: "consumerId",
            foreignField: "_id",
            as: "ConsumerDetails",
          },
        },
        {
          $lookup: {
            from: "drivers",
            localField: "driverId",
            foreignField: "_id",
            as: "driverDetails",
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $project: {
            source: 1,
            destination: 1,
            vehicleType: 1,
            rideOtp: 1,
            bookingTime: 1,
            "isSchedule ": 1,
            isDeleted: 1,
            currentStatus: 1,
            pickUpAddress: 1,
            destinationAddress: 1,
            "location ": 1,
            consumerId: 1,
            driverId: 1,
            updatedAt: 1,
            createdAt: 1,
            totalFare: 1,
            ConsumerDetails: 1,
            driverDetails: 1,
          },
        },
      ]);
      if (Ride_List.length > 0) {
        logger.logSuccess(
          "Get Ride details",
          "Got Ride details"
          // JSON.stringify(ride)
        );
        return Ride_List;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Get ride details", "Internal server error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Upload Images
  static async uploadImage(tokenData, payloadData) {
    let language = "en";

    try {
      console.log(tokenData.id);
      console.log(payloadData.image);

      let image = await FileUpload.uploadImage(payloadData.image);
      logger.logSuccess("Upload Media", "Success", JSON.stringify(image));
      return {
        location: image.Location,
      };
    } catch (err) {
      logger.logError("Upload Media", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Average Rating
  static async averageRating(query) {
    let language = "en";
    try {
      let rating = await Services.DbOperations.getData(
        Models.Rating,
        {
          to: ObjectId(query.userId),
        },
        {
          rating: 1,
        }
      );
      let totalRating = rating.reduce((n, { rating }) => n + rating, 0);
      let avgRating = totalRating / rating.length;
      console.log(avgRating);
      let dataToShow = {
        userId: query.userId,
        TotalRide: rating.length,
        AverageRating: avgRating,
        TotalRating: totalRating,
      };
      return dataToShow;
    } catch (err) {
      logger.logError("Average Rating", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Link to Terms and Condition ,Privacy & Policies
  static async termsCondition() {
    let language = "en";
    try {
      let Terms_and_Condition =
          "https://www.ldttechnology.com/terms-conditions",
        Privacy_and_Policies = "https://www.ldttechnology.com/privacy-policy";
      return {
        Terms_and_Condition,
        Privacy_and_Policies,
      };
    } catch (err) {
      logger.logError(
        "Link to Terms and Condition ,Privacy & Policies",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Contact US
  static async contactUs(query, payload) {
    let language = "en";
    try {
      let tableName =
        query.userType === "Driver" ? Models.Driver : Models.Consumer;
      let userData = await Services.DbOperations.findOne(
        tableName,
        {
          _id: ObjectId(query.userId),
        },
        {
          name: 1,
          email: 1,
          phoneNo: 1,
        }
      );
      console.log("userData", userData);

      let raiseTicket = await Services.DbOperations.create(Models.ContactUs, {
        title: payload.title,
        content: payload.content,
        userType: query.userType,
        userArray: userData,
      });
      return raiseTicket;
    } catch (err) {
      logger.logError("Contact US", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get Raised Issue
  static async getRaisedIssue() {
    let language = "en";
    try {
      let data = await Services.DbOperations.find(Models.ContactUs, {
        isDeleted: false,
      });
      return data;
    } catch (err) {
      logger.logError("Get Raised Issue", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Add Contacts data
  static async addContacttolist(query, payload) {
    let language = "en";
    try {
      let dataExist = await Services.DbOperations.findOne(Models.ContactInSOS, {
        userType: query.userType,
        userId: query.userId,
      });
      if (dataExist) {
        let contactAdded = dataExist.contactArray;
        // if (payload.contactArray) {
        contactAdded.push(payload.contactArray);
        let updateContactList = await Services.DbOperations.findAndUpdate(
          Models.ContactInSOS,
          {
            userType: query.userType,
            userId: query.userId,
          },
          {
            $set: {
              contactArray: contactAdded,
            },
          }
        );
        if (updateContactList) {
          let dataToSend = {
            statusCode: 200,
            customMessage: "Contact Added Successfully",
          };
          return dataToSend;
        }

        // }else
      } else {
        let addContact = await Services.DbOperations.create(
          Models.ContactInSOS,
          {
            userType: query.userType,
            userId: query.userId,
            contactArray: payload.contactArray,
          }
        );
        return addContact;
      }
    } catch (err) {
      logger.logError("Add Contacts data", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get Contact list for SOS
  static async getContactList(query) {
    let language = "en";
    try {
      let contactList = await Services.DbOperations.getData(
        Models.ContactInSOS,
        {
          userType: query.userType,
          userId: query.userId,
        }
      );
      return contactList;
    } catch (err) {
      logger.logError("Get Contact list For SOS", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Remove contact from List
  static async removeContactFromList(query, payload) {
    let language = "en";
    try {
      await Services.DbOperations.findAndUpdate(
        Models.ContactInSOS,
        {
          userType: query.userType,
          userId: query.userId,
        },
        {
          $pull: {
            contactArray: { phoneNo: payload.phoneNo, name: payload.name },
          },
        },
        {
          new: true,
        }
      );
      return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
    } catch (err) {
      logger.logError("Remove contact from List", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = RideController;
