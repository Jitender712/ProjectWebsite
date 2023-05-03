"use strict";
const constants = require("../../constants");
const sendFcmNotification = require("../lib/sendNotification");
const tokenManager = require("../lib/tokenManager");
const Services = require("../services"),
  Models = require("../models"),
  responseMessages = require("../../responseMessages"),
  UniversalFunctions = require("../../utils/universalFunctions"),
  logger = require("../../logger"),
  config = require("config"),
  otpLength = config.get("otpLength"),
  ObjectId = require("mongodb").ObjectID;
const endOfDay = require("date-fns/endOfDay");
const startOfDay = require("date-fns/startOfDay");
const moment = require("moment");
class DriverController {
  // edit driver
  static async editDriver(user, payloadData) {
    let language = "en";
    try {
      let userData = await Services.DbOperations.findOne(
        Models.Driver,
        {
          _id: ObjectId(user.id),
          isDeleted: false,
          isActive: true,
        },
        {
          name: 1,
        },
        {
          lean: true,
        }
      );
      if (userData) {
        let data = await Services.DbOperations.findAndUpdate(
          Models.Driver,
          {
            _id: ObjectId(user.id),
            isDeleted: false,
          },
          {
            $set: payloadData,
          },
          {
            new: true,
          }
        );
        logger.logSuccess("Edit driver", "Driver updated");
        return Promise.resolve(responseMessages[language].SUCCESS.UPDATED[1]);
      } else {
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Update Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // changes
  static async availableDriver(latitude, longitude, vehicleType) {
    let language = "en";
    try {
      console.log("jkdfhkjsdhf", {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [latitude, longitude],
            },
            $maxDistance: 5000,
          },
        },
      });
      const DISTANCE_INTO_KM = 5000;
      const dataExist = await Services.DbOperations.find(
        Models.Location,
        {
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [latitude, longitude],
              },
              $maxDistance: DISTANCE_INTO_KM,
            },
          },
        },
        { driverId: 1 }
      );
      let drivers = [];
      console.log("dataExist", dataExist, "==>");
      if (dataExist.length > 0) {
        for (const driver1 of dataExist) {
          let driverDetail = await Services.DbOperations.findOne(
            Models.Driver,
            {
              _id: ObjectId(driver1.driverId),
              currentStatus: "Online",
              isActive: true,
              vehicleType: vehicleType,
            },
            {
              location: 1,
              deviceToken: 1,
              name: 1,
              token: 1,
              driverImage: 1,
              vehicleType: 1,
            }
          );
          if (driverDetail) {
            drivers.push(driverDetail);
          }
        }

        if (drivers.length > 0) {
          console.log(drivers);

          logger.logSuccess(
            "Fetching Drivers",
            "Success",
            JSON.stringify({
              drivers,
            })
          );
          return drivers;
        } else {
          let dataToSend = {
            statusCode: 400,
            message: "No Driver Found",
          };
          logger.logSuccess("Fetching Drivers", "Success", dataToSend.message);
          return dataToSend;
        }
      } else {
        let data = {
          message: "inside catch block",
          error: "some thing went wrong",
        };
        return data;
      }
    } catch (err) {
      logger.logError("Fetching Drivers", "Internal Server Error", err);
      let data = {
        message: "inside catch block",
        error: err,
      };
      return data;
    }
  }

  // Get Driver Deatils
  static async getDriverDetails(tokenData) {
    let language = "en";
    try {
      let user = await Services.DbOperations.findOne(
        Models.Driver,
        {
          _id: ObjectId(tokenData.driverId),
        },
        {
          vehicleType: 1,
          currentStatus: 1,
          name: 1,
          phoneNo: 1,
          email: 1,
          vehicleNo: 1,
          driverImage: 1,
          location: 1,
          createdAt: 1,
          vehicleName: 1,
          vehicleColor: 1,
          deviceType: 1,
          uploadedDocument: 1,
          licenceNo: 1,
          licenceValidity: 1,
          rcValidity: 1,
        },
        {
          lean: true,
        }
      );
      // console.log("user", user);
      logger.logSuccess(
        "Get Driver details",
        "Got Driver details",
        JSON.stringify(user)
      );
      return user;
    } catch (err) {
      logger.logError("Get Driver details", "Internal server error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Login Driver
  static async login(payloadData) {
    let language = "en";

    try {
      const { deviceType, deviceToken, email, password } = payloadData;

      // checking if user exist in db

      let user = await Services.DbOperations.findOne(
        Models.Driver,
        {
          email,
          isDeleted: false,
          isActive: true,
        },
        {},
        {
          lean: true,
        }
      );

      if (user) {
        let comparePassword = password;
        if (comparePassword) {
          let tokenData = {
            id: user._id,
            loginTime: +new Date(),
            random: Math.floor(Math.random() * 10000 + 10000),
            type: constants.APP_CONSTANTS.DATABASE.USER_ROLES.DRIVER,
          };

          const token = await tokenManager.setToken(tokenData);
          await Services.DbOperations.update(
            Models.Driver,
            {
              _id: user._id,
            },
            {
              deviceType,
              deviceToken,
              token: token.accessToken,
            },
            {
              new: true,
            }
          );

          user = await Services.DbOperations.findOne(
            Models.Driver,
            {
              _id: user._id,
            },
            {
              password: 0,
              __v: 0,
              emailOtp: 0,
              emailOtpStart: 0,
              forgotEmailOtp: 0,
              forgotEmailOtpStart: 0,
              resendOtp: 0,
              resendOtpStart: 0,
              loginOtp: 0,
              loginOtpStart: 0,
            },
            {
              lean: true,
            }
          );

          return user;
        } else {
          logger.logError(
            "Driver Login",
            "Incorrect Password",
            JSON.stringify(payloadData)
          );
          return Promise.reject(
            responseMessages[language].ERROR.INVALID_PASSWORD
          );
        }
      } else {
        logger.logError(
          "Driver Login",
          "Driver Does not exist",
          JSON.stringify(payloadData)
        );
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Driver Login", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Login Driver With Otp
  static async loginWithOtp(payloadData) {
    let language = "en";

    try {
      const { deviceType, deviceToken, phoneNo, loginOtp } = payloadData;

      // checking if user exist in db

      let user = await Services.DbOperations.findOne(
        Models.Driver,
        {
          phoneNo,
          isDeleted: false,
          // isActive: true,
        },
        {},
        {
          lean: true,
        }
      );

      if (user) {
        console.log("user", user);

        if (loginOtp === "1234") {
          let tokenData = {
            id: user._id,
            loginTime: +new Date(),
            random: Math.floor(Math.random() * 10000 + 10000),
            type: constants.APP_CONSTANTS.DATABASE.USER_ROLES.DRIVER,
          };

          const token = await tokenManager.setToken(tokenData);
          await Services.DbOperations.update(
            Models.Driver,
            {
              _id: user._id,
            },
            {
              isActive: true,
              deviceType,
              deviceToken,
              token: token.accessToken,
              // currentStatus: "Online",
            },
            {
              new: true,
            }
          );

          user = await Services.DbOperations.findOne(
            Models.Driver,
            {
              _id: user._id,
            },
            {
              password: 0,
              __v: 0,
              emailOtp: 0,
              emailOtpStart: 0,
              forgotEmailOtp: 0,
              forgotEmailOtpStart: 0,
              resendOtp: 0,
              resendOtpStart: 0,
              loginOtp: 0,
              loginOtpStart: 0,
            },
            {
              lean: true,
            }
          );

          let dataTosend = {
            statusCode: 200,
            customMessage: "Login Successfull",
            user,
          };

          return dataTosend;
        } else {
          logger.logError(
            "Driver Login with Otp",
            "Incorrect Otp",
            JSON.stringify(payloadData)
          );
          return Promise.resolve(responseMessages[language].ERROR.INVALID_OTP);
        }
      } else {
        logger.logError(
          "Driver Login with Otp",
          "Driver Does not exist",
          JSON.stringify(payloadData)
        );
        return Promise.resolve(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Driver Login with Otp", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Update Location of Drivers
  static async updateLatLongDriver(payloadData) {
    let language = "en";
    try {
      let coordinates = [
        parseFloat(payloadData.location.latitude),
        parseFloat(payloadData.location.longitude),
      ];
      let updatedLocations = {
        type: "Point",
        coordinates,
      };
      await Services.DbOperations.findAndUpdate(
        Models.Driver,
        {
          _id: ObjectId(payloadData.driverId),
          isDeleted: false,
        },
        {
          $set: { location: updatedLocations },
        },
        {
          new: true,
        }
      );
      let updatedLocation = await Services.DbOperations.findAndUpdate(
        Models.Location,
        {
          driverId: ObjectId(payloadData.driverId),
        },
        {
          $set: { location: updatedLocations },
        },
        {
          new: true,
        }
      );
      if (updatedLocation) {
        logger.logSuccess("Update lat long driver", "Driver updated");
        return updatedLocation;
      } else {
        let updatedLocation = await Services.DbOperations.create(
          Models.Location,
          {
            driverId: ObjectId(payloadData.driverId),
          },
          {
            $set: { location: updatedLocations },
          },
          {
            new: true,
          }
        );
        return updatedLocation;
      }
    } catch (err) {
      logger.logError("Update Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Log Out
  static async logoutDriver(data) {
    let language = "en";
    try {
      const userData = await Services.DbOperations.update(
        Models.Driver,
        {
          _id: ObjectId(data.id),
          currentStatus: "Online",
        },
        {
          $unset: {
            token: 1,
          },
          currentStatus: "Offline",
          deviceToken: null,
          deviceType: null,
        },
        {
          new: true,
        }
      );
      logger.logSuccess(
        "Driver Logout",
        "Successfully Logged Out",
        JSON.stringify(userData)
      );
      let dataToSend = {
        statusCode: 200,
        message: "Logout Successfully",
      };
      return dataToSend;
      // } else {
      //   let dataToSend = {
      //     statusCode: 200,
      //     message: "Driver already Logout",
      //   };
      //   return dataToSend;
      // }
    } catch (err) {
      logger.logError("Driver Logout", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Ride Accepted
  static async rideAcceptByDriver(driver, query) {
    console.log("query,query", driver, query);
    let language = "en";
    try {
      let dataExist = await Services.DbOperations.findOne(
        Models.Ride,
        {
          _id: ObjectId(query.bookingId),
        },
        {
          currentStatus: 1,
        }
      );
      console.log("==>", dataExist);
      if (dataExist.currentStatus === "Initiated") {
        const randomOtp = await UniversalFunctions.generateOTPCode(otpLength);

        let data = await Services.DbOperations.findAndUpdate(
          Models.Ride,
          {
            _id: ObjectId(query.bookingId),
            currentStatus: "Initiated",
          },
          {
            $set: {
              currentStatus: "Assigned",
              driverId: driver.id,
            },
            rideOtp: randomOtp,
          },
          {
            new: true,
          }
        );
        const rideHistory = await Services.DbOperations.create(
          Models.RideHistory,
          {
            RideId: ObjectId(data._id),
            Old_Status: "Initiated",
            New_Status: "Assigned",
            userType: "Driver",
            userId: ObjectId(data.driverId),
          }
        );
        if (data.driverId) {
          let sendNoti = {
            title: "Ride Accepted",
            body: data.driverId,
          };
          let customerData = await Services.DbOperations.findOne(
            Models.Consumer,
            {
              _id: ObjectId(data.consumerId),
            },
            {
              deviceToken: 1,
            }
          );
          let dataToSendNotification =
            await sendFcmNotification.sendConsumerNotification(
              sendNoti,
              customerData
            );
          await sendFcmNotification.saveNotification({
            bookingId: query.bookingId,
            status: "Assigned",
            message: sendNoti.title,
          });
          logger.logSuccess("Edit driver", "Driver updated");
        } else {
          console.log("Error");
        }
        logger.logSuccess("Accepted by Driver", "Driver updated");
        let sendData = {
          _id: query.bookingId,
          customMessage: "Accepted Successfully",
          statusCode: 200,
        };
        return sendData;
      } else {
        if (dataExist.currentStatus === "Assigned") {
          let dataToShow = {
            customMessage: "Another Driver Already Accepted",
            statusCode: 200,
          };
          return dataToShow;
        } else {
          return Promise.resolve(
            responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
          );
        }
      }
    } catch (err) {
      logger.logError("Accepted by Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Ride Rejected
  static async rideRejectedByDriver(driver, query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Ride,
        {
          _id: ObjectId(query.bookingId),
          currentStatus: "Initiated",
        },
        {},
        {
          new: true,
        }
      );
      if (data) {
        const rideHistory = await Services.DbOperations.create(
          Models.RideHistory,
          {
            RideId: ObjectId(data._id),
            Old_Status: "Initiated",
            New_Status: "Rejected",
            userType: "Driver",
            userId: ObjectId(driver.id),
          }
        );

        logger.logSuccess("Rejected by Driver", "Driver Rejected");
        let sendData = {
          message: "Rejected",
          statusCode: 200,
        };
        return sendData;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
        );
      }
    } catch (error) {
      logger.logError("Rejected by Driver", "Internal Server Error", error);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // update To Arrived
  static async rideStatus(driver, query) {
    let language = "en";
    try {
      let dataToSend = await Services.DbOperations.findOne(Models.Ride, {
        _id: ObjectId(query.bookingId),
      });
      if (dataToSend.currentStatus === "Assigned") {
        let sendNoti = {
          title: "Your Driver Has Arrived",
          body: dataToSend.driverId,
        };
        let customerData = await Services.DbOperations.findOne(
          Models.Consumer,
          {
            _id: ObjectId(dataToSend.consumerId),
          },
          {
            deviceToken: 1,
          }
        );
        await sendFcmNotification.sendConsumerNotification(
          sendNoti,
          customerData
        );
        // console.log("Data to send", dataToSend)
        await sendFcmNotification.saveNotification({
          bookingId: query.bookingId,
          status: "Arrived",
          message: sendNoti.title,
        });
      } else if (dataToSend.currentStatus === "Started") {
        let sendNoti = {
          title: "Ride is End",
          body: dataToSend.driverId,
        };
        let customerData = await Services.DbOperations.findOne(
          Models.Consumer,
          {
            _id: ObjectId(dataToSend.consumerId),
          },
          {
            deviceToken: 1,
          }
        );
        await sendFcmNotification.sendConsumerNotification(
          sendNoti,
          customerData
        );
        await sendFcmNotification.saveNotification({
          bookingId: query.bookingId,
          status: "End",
          message: sendNoti.title,
        });
      } else if (dataToSend.currentStatus === "Arrived") {
        if (query.rideOtp) {
          if (query.rideOtp === dataToSend.rideOtp) {
            let sendNoti = {
              title: "Ride is Started",
              body: dataToSend.driverId,
            };
            let customerData = await Services.DbOperations.findOne(
              Models.Consumer,
              {
                _id: ObjectId(dataToSend.consumerId),
              },
              {
                deviceToken: 1,
              }
            );
            await sendFcmNotification.sendConsumerNotification(
              sendNoti,
              customerData
            );
            await sendFcmNotification.saveNotification({
              bookingId: query.bookingId,
              status: "Started",
              message: sendNoti.title,
            });
            await Services.DbOperations.findAndUpdate(
              Models.Ride,
              {
                _id: ObjectId(query.bookingId),
              },
              {
                $set: {
                  currentStatus: query.currentStatus,
                },
              },
              {}
            );
            let dataToShow = {
              statusCode: 200,
              status: query.currentStatus,
            };
            return dataToShow;
          } else {
            return Promise.resolve(
              responseMessages[language].ERROR.INVALID_OTP
            );
          }
        } else {
          let messageToSend = {
            statusCode: 404,
            customMessage: "Please Enter Your Otp",
          };
          return messageToSend;
        }
      }
      let data = await Services.DbOperations.findAndUpdate(
        Models.Ride,
        {
          _id: ObjectId(query.bookingId),
        },
        {
          $set: {
            currentStatus: query.currentStatus,
          },
        },
        {}
      );
      await Services.DbOperations.create(Models.RideHistory, {
        RideId: ObjectId(query.bookingId),
        Old_Status: dataToSend.currentStatus,
        New_Status: query.currentStatus,
        userType: "Driver",
        userId: ObjectId(data.driverId),
      });
      logger.logSuccess("Update Driver Status ", "Update Driver Status");
      let sendData = {
        statusCode: 200,
        status: query.currentStatus,
      };
      return sendData;
    } catch (err) {
      logger.logError("Update Driver Status ", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Ride Cancel by Driver
  static async cancelRideByDriver(driver, query, payload) {
    let language = "en";
    try {
      let ride_data = await Services.DbOperations.findAndUpdate(
        Models.Ride,
        {
          _id: ObjectId(query.bookingId),
          currentStatus: "Assigned",
        },
        {
          $set: {
            currentStatus: "Cancelled",
            driverId: null,
          },
        },
        {
          lean: true,
        }
      );
      if (ride_data) {
        const rideHistory = await Services.DbOperations.create(
          Models.RideHistory,
          {
            RideId: ObjectId(query.bookingId),
            Old_Status: "Assigned",
            New_Status: "Cancelled",
            userType: "Driver",
            userId: ObjectId(driver.id),
          }
        );
        const cancelReason = await Services.DbOperations.create(
          Models.CancelReasonBy,
          {
            reason: payload.reason,
            userType: query.userType,
            userId: ObjectId(driver.id),
            reasonId: ObjectId(query.reasonId),
            isDeleted: false,
          }
        );
        let sendNoti = {
          title: "Ride Cancelled By Driver",
          body: query.bookingId,
        };

        let customerData = await Services.DbOperations.findOne(
          Models.Consumer,
          {
            _id: ObjectId(query.consumerId),
          },
          {
            deviceToken: 1,
          }
        );
        await sendFcmNotification.sendConsumerNotification(
          sendNoti,
          customerData
        );
        await sendFcmNotification.saveNotification({
          bookingId: query.bookingId,
          status: "Cancelled",
          message: sendNoti.title,
        });

        let dataToReturn = {
          message: "Ride Cancelled By Driver",
          statusCode: 200,
        };
        return dataToReturn;
      } else {
        let dataToShow = {
          message: "Ride is not Assigned to any driver",
        };
        return dataToShow;
      }
    } catch (error) {
      logger.logError(
        "Ride Cancelled By Driver",
        "Internal Server Error",
        error
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Update Status
  static async statusChange(driver, payloadData) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Driver,
        {
          _id: ObjectId(driver.id),
          isDeleted: false,
        },
        {
          $set: { currentStatus: payloadData.currentStatus },
        },
        {
          new: true,
        }
      );
      logger.logSuccess("change status", "status");
      if (data) {
        let dataTosend = {
          message: {
            name: data.name,
            currentStatus: data.currentStatus,
          },
        };
        return dataTosend;
      } else {
        let Error = "No Driver Found";
        return Error;
      }
    } catch (err) {
      logger.logError("Update Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // On Going Ride
  static async onGoingRide(driver) {
    let language = "en";
    try {
      let driverExist = await Services.DbOperations.findOne(
        Models.Driver,
        {
          _id: ObjectId(driver.id),
          isDeleted: false,
        },
        {
          password: 0,
          __v: 0,
          emailOtp: 0,
          emailOtpStart: 0,
          forgotEmailOtp: 0,
          forgotEmailOtpStart: 0,
          resendOtp: 0,
          resendOtpStart: 0,
          loginOtp: 0,
          loginOtpStart: 0,
        }
      );
      console.log("data", driverExist);
      if (driverExist && driverExist.currentStatus == "Online") {
        console.log("Ride Details");
        let currentRide = await Services.DbOperations.findOne(
          Models.Ride,
          {
            driverId: ObjectId(driverExist._id),
            currentStatus: {
              $in: ["Assigned", "Arrived", "Started", "End"],
            },
          },
          {
            source: 1,
            destination: 1,
            vehicleType: 1,
            bookingTime: 1,
            currentStatus: 1,
            pickUpAddress: 1,
            destinationAddress: 1,
          }
        );

        let dataToShow = {
          driverDetails: driverExist,
          rideDetails: currentRide,
        };
        console.log("datatoshow", dataToShow);
        return dataToShow;
      } else if (driverExist && driverExist.currentStatus == "Offline") {
        let dataToShow = {
          driverDetails: driverExist,
          rideDetails: null,
        };
        return dataToShow;
      } else {
        return Promise.resolve(responseMessages[language].ERROR.UNAUTHORIZED);
      }
    } catch (err) {
      logger.logError("onGoingRide", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Fared Showed To Driver
  static async faredShowedtoDriver(driver, query) {
    let language = "en";
    try {
      let driverExist = await Services.DbOperations.findOne(
        Models.Driver,
        {
          _id: ObjectId(driver.id),
          isDeleted: false,
          currentStatus: "Online",
        },
        {
          password: 0,
          __v: 0,
          emailOtp: 0,
          emailOtpStart: 0,
          forgotEmailOtp: 0,
          forgotEmailOtpStart: 0,
          resendOtp: 0,
          resendOtpStart: 0,
          loginOtp: 0,
          loginOtpStart: 0,
        }
      );
      if (driverExist) {
        console.log("Ride Details", driverExist._id);
        let currentRide = await Services.DbOperations.findOne(
          Models.Ride,
          {
            _id: ObjectId(query.bookingId),
            driverId: ObjectId(driverExist._id),
            currentStatus: "End",
          },
          {
            currentStatus: 1,
            pickUpAddress: 1,
            destinationAddress: 1,
            totalFare: 1,
          }
        );
        console.log(currentRide);
        if (currentRide) {
          logger.logSuccess("Fare Shown to driver", "Fare Showed");
          return currentRide;
        } else {
          return Promise.resolve(
            responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
          );
        }
      } else {
        return Promise.resolve(responseMessages[language].ERROR.UNAUTHORIZED);
      }
    } catch (err) {
      logger.logError("fared Showed to Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Rating From Driver
  static async ratingFromDriver(driver, query, payload) {
    let language = "en";
    try {
      let driverExist = await Services.DbOperations.findOne(
        Models.Driver,
        {
          _id: ObjectId(driver.id),
          isDeleted: false,
          currentStatus: "Online",
        },
        {
          name: 1,
        }
      );
      if (driverExist) {
        console.log();
        let ride = await Services.DbOperations.findAndUpdate(
          Models.Ride,
          {
            _id: ObjectId(query.bookingId),
            driverId: ObjectId(driver.id),
            $or: [
              {
                currentStatus: "End",
              },
              {
                currentStatus: "Completed",
              },
            ],
          },
          {
            $set: { payment: "Successfull" },
            currentStatus: "Completed",
          }
        );
        console.log("===>", ride, driverExist);
        if (ride) {
          let Rating = await Services.DbOperations.create(Models.Rating, {
            rating: payload.rating,
            comment: payload.comment,
            rideId: query.bookingId,
            to: ride.consumerId,
            from: driver.id,
            userType: "Driver",
          });

          let averageRating = await Services.DbOperations.getData(
            Models.Rating,
            {
              to: ObjectId(ride.consumerId),
              rating: { $in: [1, 2, 3, 4, 5] },
            },
            {
              rating: 1,
            }
          );
          let totalRating = averageRating.reduce(
            (n, { rating }) => n + rating,
            0
            );
            let avgRating = totalRating / averageRating.length;
          await Services.DbOperations.findAndUpdate(
            Models.Consumer,
            {
              _id: ObjectId(ride.consumerId),
              isDeleted: false,
            },
            {
              $set: {
                averageRating: avgRating,
              },
            }
          );
          return Rating;
        } else {
          console.log("Error");
          return Promise.resolve(
            responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
          );
        }
      } else {
        Promise.resolve(responseMessages[language].ERROR.INVALID_TOKEN);
      }
    } catch (err) {
      logger.logError("rating From Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Ride History For Driver
  static async rideHistoryForDriver(user, query) {
    let language = "en";
    try {
      let userExist = await Services.DbOperations.findOne(
        Models.Driver,
        {
          _id: ObjectId(user.id),
          isDeleted: false,
          // currentStatus: "Online",
        },
        {
          name: 1,
        }
      );
      if (userExist) {
        console.log("Ride Details");
        let condition = {
          driverId: ObjectId(userExist._id),
          currentStatus: {
            $in: ["Cancelled", "Completed"],
          },
        };
        let currentRide = await Services.DbOperations.getData(
          Models.Ride,
          condition
        ).sort({
          createdAt: -1,
        });
        console.log(currentRide.length);
        let dataToShow = {
          DriverExist: userExist,
          rideDetails: currentRide,
        };
        logger.logSuccess("Ride History", "Ride History");
        return dataToShow;
      } else {
        return Promise.resolve(responseMessages[language].ERROR.INVALID_TOKEN);
      }
    } catch (err) {
      logger.logError("Ride History", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Current Day Ride Data
  static async presentRides(driver) {
    let language = "en";
    try {
      let rideDetails = await Services.DbOperations.getData(
        Models.Ride,
        {
          driverId: driver.id,
          currentStatus: "Completed",
          createdAt: {
            $gte: startOfDay(new Date()),
            $lte: endOfDay(new Date()),
          },
        },
        {
          name: 1,
          driverId: 1,
          totalFare: 1,
        }
      );

      let totalAmount = rideDetails.reduce(
          (n, { totalFare }) => n + totalFare,
          0
        ),
        totalTrip = rideDetails.length;

      return { totalTrip, totalAmount };
    } catch {}
  }

  // Weekly Ride Data
  static async weeklyRides(driver) {
    let language = "en";
    try {
      let rideDetails = await Services.DbOperations.getData(
        Models.Ride,
        {
          driverId: driver.id,
          currentStatus: "Completed",
          createdAt: {
            $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            $lte: endOfDay(new Date()),
          },
        },
        {
          name: 1,
          driverId: 1,
          totalFare: 1,
        }
      );
      let totalAmount = rideDetails.reduce(
          (n, { totalFare }) => n + totalFare,
          0
        ),
        totalTrip = rideDetails.length;

      return { totalTrip, totalAmount };
    } catch (err) {
      logger.logError("Weekly Rides", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  //Notification To Driver
  static async notification(driver, query) {
    let language = "en";
    try {
      const data1 = await Models.Notification.find({
        createdAt: {
          $gte: moment().subtract(2, "days").toDate(),
        },
      })
        .sort({ createdAt: -1 })
        .limit(20);
      logger.logSuccess(
        "Find Notifications",
        "Success"
        // JSON.stringify(JSON.stringify(data))
      );
      return data1;
    } catch (err) {
      logger.logError("Notification List", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Weekly Rides
  static async newWeeklyRides(driver) {
    let language = "en";
    try {
      console.log(driver);
      let rideDetails = await Services.DbOperations.getData(
        Models.Ride,
        {
          driverId: driver.id,
          currentStatus: "Completed",
          createdAt: {
            $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
            $lte: endOfDay(new Date()),
          },
        },
        {
          name: 1,
          driverId: 1,
          totalFare: 1,
        }
      );

      let totalAmount = rideDetails.reduce(
          (n, { totalFare }) => n + totalFare,
          0
        ),
        totalTrip = rideDetails.length;
      let NewDetails = await Models.Ride.aggregate([
        {
          $match: {
            driverId: ObjectId(driver.id),
            currentStatus: "Completed",
            createdAt: {
              $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
              $lte: endOfDay(new Date()),
            },
          },
        },
        {
          $project: {
            _id: 1,
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            totalFare: 1,
            createdAt: 1,
          },
        },
        {
          $group: {
            _id: { Date: "$day", Month: "$month", Year: "$year" },
            Totalfare: {
              $sum: "$totalFare",
            },
            CreatedAt: { $first: "$createdAt" },
          },
        },
        {
          $sort: { CreatedAt: -1 },
        },
      ]);
      return { totalTrip, totalAmount, NewDetails };
    } catch (err) {
      logger.logError("Weekly Rides", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Check DriverExist or not
  static async checkDriverExist(payload) {
    let language = "en";
    try {
      let driverExist = await Services.DbOperations.findOne(
        Models.Driver,
        {
          phoneNo: payload.phoneNo,
          isDeleted: false,
        },
        {
          name: 1,
          phoneNo: 1,
        }
      );
      if (driverExist) {
        let dataToSend = {
          statusCode: 200,
          customMessage: "User Exist",
        };
        return dataToSend;
      } else {
        let dataToSend = {
          statusCode: 404,
          customMessage: "Number is not registered ",
        };
        return dataToSend;
      }
    } catch (err) {
      logger.logError("Check Driver Exist", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // show Uploaded documents
  static async showDocumentOfDriver(driver) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findOne(
        Models.Driver,
        {
          _id: ObjectId(driver.id),
          isDeleted: false,
        },
        { uploadedDocument: 1 },
        {
          lean: true,
        }
      );
      if (data) {
        let datatoShow = [
          {
            id: 1,
            title: "RC",
            image: data.uploadedDocument.rc,
          },
          {
            id: 2,
            title: "Licence",
            image: data.uploadedDocument.licence,
          },
          {
            id: 3,
            title: "Id Proof",
            image: data.uploadedDocument.idProof,
          },
          {
            id: 4,
            title: "Address Proof",
            image: data.uploadedDocument.addressProof,
          },
        ];
        return datatoShow;
      } else {
        return Promise.resolve(responseMessages.en.ERROR.INVALID_TOKEN);
      }
    } catch (err) {
      logger.logError("show Uploaded documents", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = DriverController;
