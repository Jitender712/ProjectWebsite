"use strict";

const constants = require("../../constants");
const TokenManager = require("../lib/tokenManager");

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  UniversalFunctions = require("../../utils/universalFunctions"),
  responseMessages = require("../../responseMessages"),
  axios = require("axios"),
  logger = require("../../logger"),
  NotificationManager = require("../lib/NotificationManager"),
  config = require("config"),
  otpLength = config.get("otpLength");
const endOfDay = require("date-fns/endOfDay");
const sendNotification = require("../lib/sendNotification");

class AdminController {
  // Create Driver
  static async createDriver(admin, payloadData) {
    let language = "en";

    try {
      const dataExist = await Services.DbOperations.findOne(
        Models.Driver,
        {
          $or: [
            {
              email: payloadData.email,
            },
            {
              phoneNo: payloadData.phoneNo,
            },
          ],
          isDeleted: false,
          // isActive: true,
        },
        {
          email: 1,
          phoneNo: 1,
        }
      );
      console.log("dataExist", dataExist);
      if (dataExist) {
        if (dataExist.email === payloadData.email) {
          return Promise.reject(
            responseMessages[language].ERROR.DRIVER_ALREADY_EXISTS_WITH_EMAIL
          );
        } else if (dataExist.phoneNo === payloadData.phoneNo) {
          return Promise.reject(
            responseMessages[language].ERROR.DRIVER_ALREADY_EXISTS_WITH_PHONE
          );
        }
      } else {
        payloadData.location.type = "Point";
        payloadData.location.coordinates = [
          parseFloat(payloadData.location.latitude),
          parseFloat(payloadData.location.longitude),
        ];
        let chars =
          "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = "";
        for (let i = 0; i <= passwordLength; i++) {
          let randomNumber = Math.floor(Math.random() * chars.length);
          password += chars.substring(randomNumber, randomNumber + 1);
        }
        payloadData.password = password;
        const user = await Services.DbOperations.create(
          Models.Driver,
          payloadData
        );
        logger.logSuccess(
          "Create Driver",
          "Success",
          JSON.stringify({
            user,
          })
        );
        await Services.DbOperations.create(Models.Location, {
          location: {
            type: "Point",
            coordinates: [
              parseFloat(payloadData.location.latitude),
              parseFloat(payloadData.location.longitude),
            ],
          },
          driverId: user._id,
        });
        return user;
      }
      // } else {
      //   let dataToSend = {
      //     message: "You are not Authorised",
      //   };
      //   return dataToSend;
      // }
    } catch (err) {
      logger.logError("Create Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // get Consumer list
  static async listConsumers(admin) {
    let language = "en";

    try {
      let consumerList = await Models.Consumer.aggregate([
        {
          $lookup: {
            from: "rides",
            let: { cusomer: "$_id", status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$consumerId", "$$cusomer"] },
                    ],
                  },
                },
              },
            ],
            as: "ridesArray",
          },
        },
        {
          $addFields: { totalRide: { $size: "$ridesArray" } },
        },
        { $sort: { createdAt: -1 } },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            phoneNo: 1,
            createdAt: 1,
            updatedAt: 1,
            currentStatus: 1,
            isBlocked: 1,
            ridesArray: { $arrayElemAt: ["$ridesArray", -1] },
            totalRide: 1,
          },
        },
      ]);
      logger.logSuccess(
        "list Consumers",
        "Success"
        // JSON.stringify(JSON.stringify(data))
      );
      return consumerList;
    } catch (err) {
      logger.logError("List items", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  //List Driver
  static async listDriver(admin) {
    let language = "en";

    try {
      let driverList = await Models.Driver.aggregate([
        {
          $match: { isDeleted: false },
        },
        {
          $lookup: {
            from: "rides",
            let: { driver: "$_id", status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$driverId", "$$driver"] },
                    ],
                  },
                },
              },
            ],
            as: "ridesArray",
          },
        },
        {
          $addFields: { totalRide: { $size: "$ridesArray" } },
        },
        { $sort: { createdAt: -1 } },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            phoneNo: 1,
            createdAt: 1,
            updatedAt: 1,
            currentStatus: 1,
            isBlocked: 1,
            // ridesArray: { $arrayElemAt: ["$ridesArray", -1] },
            totalRide: 1,
            vehicleType: 1,
            vehicleNo: 1,
            token: 1,
            licenceNo: 1,
            licenceValidity: 1,
            rcValidity: 1,
            vehicleName: 1,
            driverImage: 1,
            uploadedDocument: 1,
            location: 1,
          },
        },
      ]);
      logger.logSuccess(
        "List Drivers",
        "Success"
        // JSON.stringify(JSON.stringify(driverList))
      );
      return driverList;
      // } else {
      //   const dataToSend = {
      //     message: "Only Admin can Access",
      //   };
      //   return dataToSend;
      // }
    } catch (err) {
      logger.logError("List items", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // edit Consumer
  static async editConsumers(admin, query, payloadData) {
    let language = "en";

    try {
      // const onlyAdmin = await Services.DbOperations.findOne(
      //   Models.Admin,
      //   {
      //     role: admin.role,
      //   },
      //   {
      //     name: 1,
      //     role: 1,
      //   },
      //   {
      //     lean: true,
      //   }
      // );
      // if (onlyAdmin) {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Consumer,
        {
          _id: ObjectId(query.ConsumerId),
          isDeleted: false,
        },
        payloadData,
        {}
      );

      logger.logSuccess("Edit Consumer", "Consumer updated");
      return Promise.resolve(responseMessages[language].SUCCESS.UPDATED[1]);
      // } else {
      //   const dataToSend = {
      //     message: "Only Admin can Access",
      //   };
      //   return dataToSend;
      // }
    } catch (err) {
      logger.logError("Update Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // edit Driver
  static async editDrivers(admin, query, payloadData) {
    let language = "en";

    try {
      // const onlyAdmin = await Services.DbOperations.findOne(
      //   Models.Admin,
      //   {
      //     role: admin.role,
      //   },
      //   {
      //     name: 1,
      //     role: 1,
      //   },
      //   {
      //     lean: true,
      //   }
      // );
      // if (onlyAdmin) {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Driver,
        {
          _id: ObjectId(query.DriverId),
          isDeleted: false,
        },
        payloadData,
        {
          lean: true,
        }
      );

      logger.logSuccess("Edit Driver", "Driver updated");
      return Promise.resolve(responseMessages[language].SUCCESS.UPDATED[1]);
      // } else {
      //   const dataToSend = {
      //     message: "Only Admin can Access",
      //   };
      //   return dataToSend;
      // }
    } catch (err) {
      logger.logError("Update Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Consumer
  static async deleteConsumer(admin, query) {
    let language = "en";

    try {
      let data = await Services.DbOperations.findAndRemove(Models.Consumer, {
        _id: ObjectId(query.ConsumerId),
        isDeleted: false,
      });
      if (data) {
        logger.logSuccess("Delete Consumer", "Consumer Deleted");
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        let dataToSend = {
          statusCode: 200,
          message: "Consumer Does not Exist",
        };
        return dataToSend;
      }
    } catch (err) {
      logger.logError("Delete Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Driver
  static async deleteDriver(admin, query) {
    let language = "en";

    try {
      let data = await Services.DbOperations.findAndRemove(
        Models.Driver,
        {
          _id: ObjectId(query.driverId),
          isDeleted: false,
        },
        {}
      );
      if (data) {
        logger.logSuccess("Delete Driver", "Driver Deleted");

        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        let dataToSend = {
          statusCode: 200,
          message: "Driver Does not Exist",
        };
        return dataToSend;
      }
    } catch (err) {
      logger.logError("Delete Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Ride Details
  static async RideList(admin) {
    let language = "en";
    try {
      let Ride_List = await Models.Ride.aggregate([
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
        {
          $unwind: {
            path: "$ConsumerDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$driverDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $project: {
            source: 1,
            destination: 1,
            vehicleType: 1,
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
            "ConsumerDetails.name": 1,
            "driverDetails.name": 1,
          },
        },
      ]);
      logger.logSuccess(
        "Find Rides",
        "Success",
        JSON.stringify(JSON.stringify(Ride_List))
      );

      return Ride_List;
    } catch (err) {
      logger.logError("List Rides", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get Cancel ReasonsList
  static async getCancelReasonList(admin, query) {
    let language = "en";
    try {
      let condition = { isDeleted: false };
      const options = {
        page: query.page,
        limit: 20,
        collation: {
          locale: "en",
        },
      };
      const data = await Models.CancelReasonBy.paginate(condition, options);
      // let data = await Services.DbOperations.find(Models.CancelReasonBy, {});
      logger.logSuccess(
        "Get Cancel Reason list",
        "successfully Listed",
        JSON.stringify(data)
      );
      return data;
    } catch (err) {
      logger.logError("get Cancel Reason List", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create CancelReason
  static async createCancelReason(admin, query, payload) {
    let language = "en";

    try {
      let dataToSend = await Services.DbOperations.create(
        Models.ReasonForCancelling,
        {
          reasonDrivedBy: query.reasonDrivedBy,
          reason: payload.reason,
        }
      );
      return dataToSend;
    } catch (err) {
      logger.logError("Create Cancel Reasons", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  //
  static async deleteRide(admin, query) {
    let language = "en";
    try {
      // let onlyAdmin = await Services.DbOperations.findOne(
      //   Models.Admin,
      //   {
      //     _id: admin.id,
      //   },
      //   { name: 1 },
      //   {}
      // );
      // if (onlyAdmin) {
      let Ride = await Services.DbOperations.findAndRemove(Models.Ride, {
        _id: ObjectId(query.rideId),
        isDeleted: false,
      });
      if (Ride) {
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        let dataToSend = {
          statusCode: 200,
          message: "No Ride Exist",
        };
        return dataToSend;
      }
      // } else {
      //   let dataToSend = {
      //     message: "Only Admin Delete Reasons for Cancellation",
      //   };
      //   return dataToSend;
      // }
    } catch (error) {
      logger.logError("Delete Ride", "Internal Server Error", error);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete CancelReasons
  static async deleteCancelReason(admin, query) {
    let language = "en";
    try {
      // let onlyAdmin = await Services.DbOperations.findOne(
      //   Models.Admin,
      //   {
      //     _id: admin.id,
      //   },
      //   { name: 1 },
      //   {}
      // );
      // if (onlyAdmin) {
      let cancelReasons = await Services.DbOperations.findAndRemove(
        Models.CancelReasonBy,
        { _id: ObjectId(query.cancelReasonsId), isDeleted: false }
      );
      if (cancelReasons) {
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        let dataToSend = {
          message: "Cancellation not Found",
        };
        return dataToSend;
      }
      // } else {
      //   let dataToSend = {
      //     message: "Only Admin can delete Cancel Reasons",
      //   };
      //   return dataToSend;
      // }
    } catch (error) {
      logger.logError("Delete Cancel Reason", "Internal Server Error", error);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete one Cancel Reason from List
  static async deleteCancelReasonFromList(admin, query) {
    let language = "en";
    try {
      // let onlyAdmin = await Services.DbOperations.findOne(
      //   Models.Admin,
      //   {
      //     _id: admin.id,
      //   },
      //   { name: 1 },
      //   {}
      // );
      // if (onlyAdmin) {
      let cancelReasons = await Services.DbOperations.findAndRemove(
        Models.ReasonForCancelling,
        { _id: ObjectId(query.cancelReasonsId), isDeleted: false }
      );
      if (cancelReasons) {
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        let dataToSend = {
          statusCode: 200,
          message: "No Reason Exist",
        };
        return dataToSend;
      }
      // } else {
      //   let dataToSend = {
      //     message: "Only Admin can delete Cancel Reasons",
      //   };
      //   return dataToSend;
      // }
    } catch (error) {
      logger.logError("Delete Cancel Reason", "Internal Server Error", error);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Login
  static async login(admin) {
    let language = "en";

    try {
      const { email, password } = admin;
      // checking if Admin in db

      let user = await Services.DbOperations.findOne(
        Models.Admin,
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
        let comparePassword = await UniversalFunctions.compareHashPassword(
          password,
          user.password
        );
        if (comparePassword) {
          let tokenData = {
            id: user._id,
            loginTime: +new Date(),
            random: Math.floor(Math.random() * 10000 + 10000),
            type: constants.APP_CONSTANTS.DATABASE.USER_ROLES.ADMIN,
          };
          const token = await TokenManager.setToken(tokenData);
          await Services.DbOperations.update(
            Models.Admin,
            {
              _id: user._id,
            },
            {
              token: token.accessToken,
              adminStatus: "Online",
            },
            {
              new: true,
            }
          );

          user = await Services.DbOperations.findOne(
            Models.Admin,
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
            "Admin Login",
            "Incorrect Password",
            JSON.stringify(user)
          );
          return Promise.reject(
            responseMessages[language].ERROR.INVALID_PASSWORD
          );
        }
      } else {
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Admin Login", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create Admins
  static async createSubAdmin(admin, payloadData) {
    let language = "en";

    try {
      const dataExist = await Services.DbOperations.findOne(
        Models.Admin,
        {
          email: payloadData.email,
          phoneNo: payloadData.phoneNo,
          isDeleted: false,
          isActive: false,
        },
        {
          email: 1,
        }
      );
      if (dataExist) {
        return Promise.reject(
          responseMessages[language].ERROR.ADMIN_ALREADY_EXISTS
        );
      } else {
        const randomOtp = await UniversalFunctions.generateOTPCode(otpLength);

        payloadData.password = await UniversalFunctions.createHash(
          payloadData.password
        );

        payloadData.emailOtp = randomOtp;

        const otpStartTime = Date.now();

        payloadData.emailOtpStart = otpStartTime;

        const user = await Services.DbOperations.create(
          Models.Admin,
          payloadData
        ); // we now have a user with payload data as schema

        logger.logSuccess(
          "Create Admin",
          "Success",
          JSON.stringify({
            user,
          })
        );

        //call function to send otp on email for email verification
        let emailSent = await NotificationManager.sendEmailToUser(
          "REGISTRATION_EMAIL",
          {
            name: user.name,
            otp: randomOtp,
          },
          user.email
        );

        console.log("emailSent : ", emailSent);
        console.log("Checking");

        return user;
      }
      // } else {
      //   const dataToSend = {
      //     statusCode: 404,
      //     message:
      //       "You are not Authorized to create Sub-Admins. Only Admin can Create.",
      //   };
      //   return dataToSend;
      // }
    } catch (err) {
      logger.logError("Create Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Verify Admin Otp
  static async verifyAdminOtp(payloadData) {
    let language = "en";
    try {
      let { email, otp, type } = payloadData;

      const adminData = await Services.DbOperations.findOne(
        Models.Admin,
        { email, isDeleted: false },
        {},
        { lean: true }
      );
      if (adminData) {
        let verifyTime = Date.now();

        let checkOtp;
        let otpExpiry;

        if (type == 1) {
          checkOtp = adminData.emailOtp;
          otpExpiry = adminData.emailOtpStart;
        } else if (type == 2) {
          checkOtp = adminData.forgotEmailOtp;
          otpExpiry = adminData.forgotEmailOtpStart;
        } else if (type == 3) {
          checkOtp = adminData.resendOtp;
          otpExpiry = adminData.resendOtpStart;
        } else {
          logger.logError(
            "Invalid type",
            "Invalid type",
            JSON.stringify({ email })
          );
          return Promise.reject(responseMessages[language].ERROR.INVALID_TYPE);
        }
        let otpEndTime = otpExpiry + 120000; // 2mins

        if (checkOtp != otp) {
          logger.logError(
            "Invalid otp",
            "Invalid otp",
            JSON.stringify({ email })
          );
          return Promise.reject(responseMessages[language].ERROR.INVALID_OTP);
        }

        if (verifyTime > otpEndTime) {
          logger.logError(
            "Verify otp",
            "Verification Failed",
            JSON.stringify({ email })
          );
          return Promise.reject(responseMessages[language].ERROR.OTP_EXPIRED);
        }

        // if (type === 1) {
        //   // emailOtp
        //   let data = await Services.DbOperations.update(
        //     Models.Admin,
        //     {
        //       _id: ObjectId(adminData._id),
        //       isActive: false,
        //       isDeleted: false,
        //     },
        //     {
        //       isActive: true,
        //     }
        //   );
        // } else if (type === 1) {
        //   let tokenData = {
        //     id: adminData._id,
        //     loginTime: +new Date(),
        //     random: Math.floor(Math.random() * 10000 + 10000),
        //     name: adminData.name,
        //   };

        //   const url = config.get("authBaseUrl") + "/v1/token/create";
        //   const tokenToSave = await axios.post(url, tokenData);
        // }

        logger.logSuccess(
          "Otp verified",
          "Otp verified successfully",
          JSON.stringify({ email })
        );
        return Promise.resolve(responseMessages[language].SUCCESS.OTP_VERIFIED);
      } else {
        logger.logError(
          "Verify OTP",
          "adminData Does Not Exist",
          JSON.stringify({ email })
        );
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Verify adminData email", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Logout

  static async logout(data) {
    let language = "en";
    try {
      const userData = await Services.DbOperations.update(
        Models.Admin,
        {
          _id: ObjectId(data.id),
          adminStatus: "Online",
        },
        {
          $unset: {
            token: 1,
          },
          adminStatus: "Offline",
        },
        {
          new: true,
        }
      );
      logger.logSuccess(
        "Admin Logout",
        "Successfully Logged Out",
        JSON.stringify(userData)
      );
      let dataToSend = {
        statusCode: 200,
        message: "Logout Successfully",
      };
      return dataToSend;
      //  }
      // else {
      //   let dataToSend = {
      //     statusCode: 200,
      //     message: "Admin already Logout",
      //   };
      //   return dataToSend;
      // }
    } catch (err) {
      logger.logError("Admin Logout", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // List SubAdmin
  static async listsubadmin() {
    let language = "en";
    try {
      let adminlist = await Services.DbOperations.getData(
        Models.Admin,
        {
          isDeleted: false,
          role: "SubAdmin",
        },
        {}
      );
      logger.logSuccess("List Admins", "Success");
      return adminlist;
    } catch (err) {
      logger.logError("List Admins", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // edit SubAdmin
  static async editSubAdmin(admin, query, payloadData) {
    let language = "en";

    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Admin,
        {
          _id: ObjectId(query.subAdminId),
          isDeleted: false,
        },
        payloadData,
        {}
      );

      logger.logSuccess("Edit SubAdmin", "SubAdmin updated");
      return Promise.resolve(responseMessages[language].SUCCESS.UPDATED[1]);
    } catch (err) {
      logger.logError("Update Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Subadmins
  static async deleteSubAdmin(admin, query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndRemove(Models.Admin, {
        _id: ObjectId(query.adminId),
        isDeleted: false,
        role: "SubAdmin",
      });
      if (data) {
        logger.logSuccess("Delete Admin", "Admin Deleted");
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.ADMIN_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Delete Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create Region
  static async createRegion(admin, payload) {
    let language = "en";

    try {
      let regionExist = await Services.DbOperations.findOne(Models.Region, {
        name: payload.name,
        // coordinates:payload.region.coordinates
      });
      if (regionExist) {
        return Promise.resolve(
          responseMessages[language].ERROR.REGION_ALREADY_EXISTS
        );
      } else {
        let dataToSend = await Services.DbOperations.create(
          Models.Region,
          payload
        );
        return dataToSend;
      }
    } catch (err) {
      logger.logError("Create Regions", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // List Regions
  static async regionList(admin, query) {
    let language = "en";
    try {
      let condition = { isDeleted: false };
      const options = {
        page: query.page,
        limit: 20,
        collation: {
          locale: "en",
        },
      };
      const data = await Models.Region.paginate(condition, options);
      logger.logSuccess("List Regions", "Success");
      return data;
    } catch (err) {
      logger.logError("List Regions", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // edit Region
  static async editRegion(admin, query, payloadData) {
    let language = "en";

    try {
      await Services.DbOperations.findAndUpdate(
        Models.Region,
        {
          _id: ObjectId(query.regionId),
          isDeleted: false,
        },
        payloadData,
        {}
      );

      logger.logSuccess("Edit Region", "Region updated");
      return Promise.resolve(responseMessages[language].SUCCESS.UPDATED[1]);
    } catch (err) {
      logger.logError("Update Region", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Regions
  static async deleteRegions(admin, query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndRemove(Models.Region, {
        _id: ObjectId(query.regionId),
        isDeleted: false,
      });
      if (data) {
        logger.logSuccess("Delete Region", "Region Deleted");
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.REGION_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Delete Region", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Overview Of Taxi
  static async overviewOfTaxi() {
    let language = "en";
    try {
      let totalConsumer = await Services.DbOperations.getData(
        Models.Consumer,
        {
          isDeleted: false,
          isActive: true,
        },
        {
          name: 1,
        }
      );
      let totalRide = await Services.DbOperations.getData(
        Models.Ride,
        {
          isDeleted: false,
          currentStatus: "Completed",
          payment: "Successfull",
        },
        {
          totalFare: 1,
        }
      );
      let totalDriver = await Services.DbOperations.getData(
        Models.Driver,
        {
          isDeleted: false,
          isActive: true,
        },
        {
          name: 1,
        }
      );
      let totalAmount = totalRide.reduce(
        (n, { totalFare }) => n + totalFare,
        0
      );
      let dataToSend = {
        activeConsumer: totalConsumer.length,
        activeDriver: totalDriver.length,
        totalRide: totalRide.length,
        sales: totalAmount,
      };
      return dataToSend;
    } catch (err) {
      logger.logError("Taxi Overview", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // get Individual Consumer Details
  static async getIndividualConsumerDetails(query) {
    let language = "en";
    try {
      let consumerDetails = await Models.Consumer.aggregate([
        {
          $match: {
            _id: ObjectId(query.consumerId),
          },
        },
        {
          $lookup: {
            from: "rides",
            localField: "_id",
            foreignField: "consumerId",
            as: "allRides",
          },
        },
        {
          $lookup: {
            from: "rides",
            let: { cusomer: "$_id", status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$consumerId", "$$cusomer"] },
                    ],
                  },
                },
              },
            ],
            as: "ridesArray",
          },
        },
        {
          $lookup: {
            from: "rides",
            let: { consumers: "$_id", isSchedule: true, status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$isSchedule", "$$isSchedule"],
                      },
                      { $eq: ["$consumerId", "$$consumers"] },
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "totalScheduleRides",
          },
        },
        {
          $lookup: {
            from: "rides",
            let: { consumer: "$_id", status: "Cancelled" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$consumerId", "$$consumer"] },
                    ],
                  },
                },
              },
            ],
            as: "totalCancelledRides",
          },
        },
        {
          $lookup: {
            from: "drivers",
            let: {
              driver: {
                $arrayElemAt: ["$ridesArray.driverId", -1],
              },
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$driver"] },
                },
              },
            ],
            as: "driverData",
          },
        },
        {
          $addFields: { allTotalRides: { $size: "$allRides" } },
        },
        {
          $addFields: { totalCompletedRide: { $size: "$ridesArray" } },
        },
        { $addFields: { totalCancelRide: { $size: "$totalCancelledRides" } } },
        {
          $addFields: {
            totalOngoingRide: {
              $subtract: [
                "$allTotalRides",
                { $add: ["$totalCompletedRide", "$totalCancelRide"] },
              ],
            },
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            phoneNo: 1,
            createdAt: 1,
            updatedAt: 1,
            currentStatus: 1,
            isBlocked: 1,
            consumerImage: 1,
            allTotalRides: 1,
            totalCompletedRide: 1,
            totalCancelRide: 1,
            totalOngoingRide: 1,
            totalScheduleRides: { $size: "$totalScheduleRides" },
            ridesArray: { $arrayElemAt: ["$ridesArray", -1] },
            driverData: 1,
          },
        },
      ]);
      return consumerDetails;
    } catch (err) {
      logger.logError(
        "Get Individual Consumer details",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Consumer status Blocked Or Unblocked

  static async changeStatusToBlockedOrUnblocked(admin, query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Consumer,
        {
          _id: ObjectId(query.consumerId),
          isDeleted: false,
        },
        {
          $set: { isBlocked: query.isBlocked },
        },
        {
          new: true,
        }
      );
      if (data) {
        let dataTosend = {
          message: {
            name: data.name,
            Blocked: data.isBlocked,
          },
        };
        logger.logSuccess(
          "Change Status To Blocked Or Unblocked",
          "Blocked or Unblocked"
        );
        return dataTosend;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError(
        "Change Status To Blocked Or Unblocked",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get All Rides For Consumer
  static async allRideForConsumer(query) {
    let language = "en";
    try {
      let allRides = await Services.DbOperations.getData(
        Models.Ride,
        {
          consumerId: ObjectId(query.consumerId),
        },
        {},
        {}
      );
      if (allRides.length > 0) {
        return allRides;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("All Ride For Consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get Individual Driver Deatils
  static async getIndividualsDriverDetails(query) {
    let language = "en";
    try {
      let driverDetails = await Models.Driver.aggregate([
        {
          $match: {
            _id: ObjectId(query.driverId),
          },
        },
        {
          $lookup: {
            from: "rides",
            localField: "_id",
            foreignField: "driverId",
            as: "allRides",
          },
        },
        {
          $lookup: {
            from: "rides",
            let: { driver: "$_id", status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$driverId", "$$driver"] },
                    ],
                  },
                },
              },
            ],
            as: "ridesArray",
          },
        },
        {
          $lookup: {
            from: "ridehistories",
            let: { driver: "$_id", newstatus: "Rejected" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$New_Status", "$$newstatus"],
                      },
                      { $eq: ["$userId", "$$driver"] },
                    ],
                  },
                },
              },
            ],
            as: "totalRejectedRides",
          },
        },
        {
          $lookup: {
            from: "rides",
            let: { driver: "$_id", status: "Cancelled" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$driverId", "$$driver"] },
                    ],
                  },
                },
              },
            ],
            as: "totalCancelledRides",
          },
        },
        {
          $lookup: {
            from: "consumers",
            let: {
              consumer: {
                $arrayElemAt: ["$ridesArray.consumerId", -1],
              },
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$consumer"] },
                },
              },
            ],
            as: "consumerData",
          },
        },

        {
          $addFields: { allTotalRides: { $size: "$allRides" } },
        },
        {
          $addFields: { totalCompletedRide: { $size: "$ridesArray" } },
        },
        { $addFields: { totalCancelRide: { $size: "$totalCancelledRides" } } },
        {
          $addFields: {
            totalOngoingRide: {
              $subtract: [
                "$allTotalRides",
                { $add: ["$totalCompletedRide", "$totalCancelRide"] },
              ],
            },
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            phoneNo: 1,
            createdAt: 1,
            updatedAt: 1,
            currentStatus: 1,
            uploadedDocument: 1,
            currentStatus: 1,
            vehicleNo: 1,
            licenceNo: 1,
            licenceValidity: 1,
            rcValidity: 1,
            vehicleType: 1,
            location: 1,
            vehicleName: 1,
            vehicleColor: 1,
            driverImage: 1,
            allTotalRides: 1,
            totalCompletedRide: 1,
            totalCancelRide: 1,
            totalOngoingRide: 1,
            totalRejectedRides: { $size: "$totalRejectedRides" },
            lastRideDetails: { $arrayElemAt: ["$ridesArray", -1] },
            "consumerData.name": 1,
            "consumerData.phoneNo": 1,
          },
        },
      ]);
      return driverDetails;
    } catch (err) {
      logger.logError(
        "Get Individual Driver Details",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Get All Rides For Driver
  static async allRideForDriver(query) {
    let language = "en";
    try {
      let allRides = await Services.DbOperations.getData(
        Models.Ride,
        {
          driverId: ObjectId(query.driverId),
        },
        {},
        {}
      );
      console.log("Length", allRides.length);
      if (allRides.length > 0) {
        return allRides;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("All Ride For Driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Complete ,Cancel and Incomplete Ride
  static async pieChartForrides() {
    let language = "en";
    try {
      let rideData = await Services.DbOperations.getData(
        Models.Ride,
        {
          isDeleted: false,
        },
        {
          currentStatus: 1,
        }
      );

      let totalCompletedRides = rideData.filter(
        (status) => status.currentStatus === "Completed"
      ).length;

      let totalCancelledRides = rideData.filter(
        (status) => status.currentStatus === "Cancelled"
      ).length;

      let totalInCompletedRides =
        rideData.length - (totalCompletedRides + totalCancelledRides);
      let dataToSend = {
        totalCompletedRides,
        totalCancelledRides,
        totalInCompletedRides,
        totalRides: rideData.length,
      };
      return dataToSend;
    } catch (err) {
      logger.logError(
        "Complete ,Cancel and Incomplete Ride",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Total Revenue Monthly Weekly Daily
  static async totalRevenue(query) {
    let language = "en";
    try {
      let timezone;
      if (query.revenueType === "Daily") {
        timezone = {
          date: "$day",
          Month: "$month",
          Year: "$year",
        };
      } else if (query.revenueType === "Monthly") {
        timezone = {
          Month: "$month",
          Year: "$year",
        };
      } else if (query.revenueType === "Weekly") {
        timezone = {
          Week: "$week",
          Month: "$month",
          Year: "$year",
        };
      } else {
        timezone = {
          Year: "$year",
        };
      }

      let NewDetails = await Models.Ride.aggregate([
        {
          $match: {
            isDeleted: false,
            currentStatus: "Completed",
            payment: "Successfull",
          },
        },
        {
          $project: {
            _id: 1,
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            week: { $week: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            totalFare: 1,
            createdAt: 1,
          },
        },
        {
          $group: {
            _id: timezone,
            CreatedAt: { $first: "$createdAt" },
            Totalfare: {
              $sum: "$totalFare",
            },
          },
        },
        {
          $sort: { CreatedAt: 1 },
        },
      ]);
      return NewDetails;
    } catch (err) {
      logger.logError(
        "Total Revenue Monthly Weekly Daily",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Active Time by driver
  static async activeTimeByDriver() {
    let language = "en";
    try {
    } catch (err) {
      logger.logError("Active Time by driver", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Active Consumer
  static async activeConsumer() {
    let language = "en";
    try {
    } catch (err) {
      logger.logError("Active Consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Top Drivers List
  static async topDriverList() {
    let language = "en";
    try {
      let driverList = await Models.Driver.aggregate([
        {
          $match: { isDeleted: false },
        },
        {
          $lookup: {
            from: "rides",
            let: { driver: "$_id", status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$driverId", "$$driver"] },
                    ],
                  },
                },
              },
            ],
            as: "ridesArray",
          },
        },
        {
          $addFields: { totalRide: { $size: "$ridesArray" } },
        },
        { $sort: { totalRide: -1 } },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            // phoneNo: 1,
            // createdAt: 1,
            // updatedAt: 1,
            currentStatus: 1,
            // isBlocked: 1,
            // // ridesArray: { $arrayElemAt: ["$ridesArray", -1] },
            totalRide: 1,
            // vehicleType: 1,
            // vehicleNo: 1,
            // token: 1,
            // licenceNo: 1,
            // licenceValidity: 1,
            // rcValidity: 1,
            vehicleName: 1,
            // driverImage: 1,
            // uploadedDocument: 1,
            // location: 1,
          },
        },
      ]);
      logger.logSuccess(
        "List Drivers",
        "Success"
        // JSON.stringify(JSON.stringify(driverList))
      );
      return driverList;
    } catch (err) {
      logger.logError(" Top Drivers", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
  // Top Consumer List
  static async topConsumerList() {
    let language = "en";
    try {
      let consumerList = await Models.Consumer.aggregate([
        {
          $lookup: {
            from: "rides",
            let: { cusomer: "$_id", status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$consumerId", "$$cusomer"] },
                    ],
                  },
                },
              },
            ],
            as: "ridesArray",
          },
        },
        {
          $addFields: { totalRide: { $size: "$ridesArray" } },
        },
        { $sort: { totalRide: -1 } },
        {
          $project: {
            _id: 1,
            name: 1,
            totalRide: 1,
          },
        },
      ]);
      logger.logSuccess(
        "list Consumers",
        "Success"
        // JSON.stringify(JSON.stringify(data))
      );
      return consumerList;
    } catch (err) {
      logger.logError("Top Consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  //  Driver status Blocked Or Unblocked
  static async changeStatusToBlockedOrUnblockedDriver(query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Driver,
        {
          _id: ObjectId(query.driverId),
          isDeleted: false,
        },
        {
          $set: { isBlocked: query.isBlocked },
        },
        {
          new: true,
        }
      );
      if (data) {
        let dataTosend = {
          message: {
            name: data.name,
            Blocked: data.isBlocked,
          },
        };
        logger.logSuccess(
          "Change Status To Blocked Or Unblocked",
          "Blocked or Unblocked"
        );
        return dataTosend;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError(
        "Change Status To Blocked Or Unblocked",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Search Record with Register Date Driver
  static async recordWithRegisterDate(query) {
    let language = "en";
    try {
      var startDate = new Date(query.registerDate);
      startDate.setSeconds(0);
      startDate.setHours(0);
      startDate.setMinutes(0);
      var dateMidnight = new Date(startDate);
      dateMidnight.setHours(23);
      dateMidnight.setMinutes(59);
      dateMidnight.setSeconds(59);
      let driverList = await Models.Driver.aggregate([
        {
          $match: {
            isDeleted: false,
            createdAt: {
              $gte: startDate,
              $lte: dateMidnight,
            },
          },
        },
        {
          $lookup: {
            from: "rides",
            let: { driver: "$_id", status: "Completed" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$driverId", "$$driver"] },
                    ],
                  },
                },
              },
            ],
            as: "ridesArray",
          },
        },
        {
          $addFields: { totalRide: { $size: "$ridesArray" } },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            phoneNo: 1,
            createdAt: 1,
            updatedAt: 1,
            currentStatus: 1,
            isBlocked: 1,
            totalRide: 1,
            vehicleType: 1,
            vehicleNo: 1,
            token: 1,
            licenceNo: 1,
            licenceValidity: 1,
            rcValidity: 1,
            vehicleName: 1,
            driverImage: 1,
            uploadedDocument: 1,
            location: 1,
          },
        },
      ]);
      logger.logSuccess(
        "Search Record with Register Date",
        "Success"
        // JSON.stringify(JSON.stringify(driverList))
      );
      return driverList;
    } catch (err) {
      logger.logError(
        "Search Record with Register Date",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Sent multiple  notification
  static async sendMultipleNotification(query, payload) {
    let language = "en";
    console.log("payload", payload.userArray);
    try {
      let array = payload.userArray;
      console.log("array", array);
      let allUser = [];
      for (let i = 0; i < array.length; i++) {
        console.log("looping", i, array[i]);
        allUser.push(ObjectId(array[i]._id));
      }
      let tableName =
        query.userType === "Driver" ? Models.Driver : Models.Consumer;
      let userList = await tableName.aggregate([
        {
          $match: {
            _id: {
              $in: allUser,
            },
          },
        },
        {
          $project: {
            _id: 1,
            deviceToken: 1,
            name: 1,
            phoneNo: 1,
          },
        },
      ]);
      console.log("driverList", userList);
      let sendNoti = {
        title: payload.messageTitle,
        content: payload.messageContent,
      };
      await sendNotification.sendMulitpleNotification(sendNoti, userList);
      let response = {
        statusCode: 200,
        customMessage: "Notification sent successfully",
      };
      await Services.DbOperations.create(Models.MultiNotification, {
        messageType: payload.messageType,
        messageTitle: payload.messageTitle,
        userType: query.userType,
        userArray: userList,
        messageContent: payload.messageContent,
      });
      return response;
    } catch (err) {
      logger.logError(
        "Sent multiple  notification ",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // list of mulitNotification
  static async listMultipleNotification() {
    let language = "en";
    try {
      let getNotification = await Services.DbOperations.getData(
        Models.MultiNotification,
        {
          isDeleted: false,
        }
      );
      return getNotification;
    } catch (err) {
      logger.logError(
        "List multiple  notification ",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  //  Driver status Blocked Or Unblocked Subadmins
  static async changeStatusToBlockedOrUnblockedSubadmin(query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.Admin,
        {
          _id: ObjectId(query.adminId),
          isDeleted: false,
        },
        {
          $set: { isBlocked: query.isBlocked },
        },
        {
          new: true,
        }
      );
      if (data) {
        let dataTosend = {
          message: {
            name: data.name,
            Blocked: data.isBlocked,
          },
        };
        logger.logSuccess(
          "Change Status To Blocked Or Unblocked",
          "Blocked or Unblocked"
        );
        return dataTosend;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError(
        "Change Status To Blocked Or Unblocked",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Block Reasons
  static async blockedReasons(query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.ReasonForCancelling,
        {
          _id: ObjectId(query.reasonId),
          isDeleted: false,
        },
        {
          $set: { isBlocked: query.isBlocked },
        },
        {
          new: true,
        }
      );
      if (data) {
        let dataTosend = {
          message: {
            Blocked: data.isBlocked,
          },
        };
        logger.logSuccess("Block Reasons", "Blocked or Unblocked");
        return dataTosend;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.DATA_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Block Reasons", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create Ride Type
  static async createRideType(payload) {
    let language = "en";
    try {
      let check = await Services.DbOperations.findOne(
        Models.RideType,
        {
          RideType: payload.RideType,
          isDeleted: false,
        },
        {
          RideType: 1,
        },
        {
          lean: true,
        }
      );
      if (check) {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_TYPE_ALREADY_EXISTS
        );
      } else {
        let rideType = await Services.DbOperations.create(Models.RideType, {
          RideType: payload.RideType,
          rideIcon: payload.rideIcon,
        });
        return rideType;
      }
    } catch (err) {
      logger.logError("Create Ride Type", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // List Ride Type
  static async listRideType() {
    let language = "en";
    try {
      let listRide = await Services.DbOperations.getData(Models.RideType, {
        isDeleted: false,
      });
      return listRide;
    } catch (err) {
      logger.logError("List Ride Type ", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Ride Type
  static async deleteRideType(query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndRemove(Models.RideType, {
        _id: ObjectId(query.rideTypeId),
        isDeleted: false,
      });
      if (data) {
        logger.logSuccess("Delete Ride Type", "Ride Type Deleted");
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_TYPE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError(" Delete Ride Type ", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Blocked/Unblock Ride Type
  static async blockOrUnblockRideType(query) {
    let language = "en";
    try {
      let data = await Services.DbOperations.findAndUpdate(
        Models.RideType,
        {
          _id: ObjectId(query.rideTypeId),
          isDeleted: false,
        },
        {
          $set: { isBlocked: query.isBlocked },
        },
        {
          new: true,
        }
      );
      if (data) {
        let dataTosend = {
          message: {
            Blocked: data.isBlocked,
          },
        };
        logger.logSuccess("Blocked/Unblock Ride Type", "Blocked or Unblocked");
        return dataTosend;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_TYPE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError(
        "Blocked/Unblock Ride Type ",
        "Internal Server Error",
        err
      );
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Forgot password for Admin
  static async forgotPassword(payloadData) {
    let language = "en";

    try {
      let { email } = payloadData;
      let admin = await Services.DbOperations.findOne(
        Models.Admin,
        { email, isDeleted: false, isActive: true },
        {},
        { lean: true }
      );

      if (admin) {
        //generating otp

        let randomOtp = await UniversalFunctions.generateOTPCode(otpLength);

        // otp timing function
        const otpTimeStart = Date.now();

        //saving verify otp in db
        await Services.DbOperations.update(
          Models.Admin,
          { _id: ObjectId(admin._id) },
          { forgotEmailOtp: randomOtp, forgotEmailOtpStart: otpTimeStart },
          { new: true }
        );

        //sending verify otp email
        await NotificationManager.sendEmailToUser(
          "RESET_PASSWORD",
          {
            name: admin.name,
            otp: randomOtp,
          },
          admin.email
        );
        let data = {
          statusCode: 200,
          customMessage: "OTP sent successfully.",
          type: "OTP SENT",
          email: email,
        };
        return data;
      } else {
        logger.logError(
          "Verify OTP",
          "Admin Does Not Exist",
          JSON.stringify({ email })
        );
        return Promise.reject(
          responseMessages[language].ERROR.ADMIN_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Admin forgot password", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Reset Password for Admin
  static async resetPassword(payloadData) {
    let language = "en";
    try {
      let { email, password } = payloadData;
      let admin = await Services.DbOperations.findOne(
        Models.Admin,
        {
          email,
          isDeleted: false,
          isActive: true,
        },
        {},
        { lean: true }
      );
      if (admin) {
        password = await UniversalFunctions.createHash(password);
        await Services.DbOperations.update(
          Models.Admin,
          { _id: ObjectId(admin._id), isDeleted: false },
          { password },
          { new: true }
        );
        logger.logSuccess(
          "reset password",
          "Password reset done",
          JSON.stringify({ email })
        );
        return Promise.resolve(
          responseMessages[language].SUCCESS.PASSWORD_UPDATE_SUCCESS
        );
      } else {
        logger.logError(
          "reset password",
          "Admin Does Not Exist",
          JSON.stringify({ email })
        );
        return Promise.reject(
          responseMessages[language].ERROR.ADMIN_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Admin forgot password", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  //resend Otp
  static async resendOtp(payloadData) {
    let language = "en";

    try {
      let randomOtp = await UniversalFunctions.generateOTPCode(otpLength);

      let startTime = Date.now();

      let admin = await Services.DbOperations.findAndUpdate(
        Models.Admin,
        { email: payloadData.email },
        { resendOtp: randomOtp, resendOtpStart: startTime },
        { new: true }
      );

      await NotificationManager.sendEmailToUser(
        "RESET_PASSWORD",
        {
          name: admin.name,
          otp: randomOtp,
        },
        admin.email
      );

      logger.logSuccess("Verify Otp", "Success", JSON.stringify({ admin }));
      return Promise.resolve(responseMessages[language].SUCCESS.OTP_SENT);
    } catch (err) {
      logger.logError("Verify otp", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // list vehicle
  static async getAllVehicleList() {
    let language = "en";

    try {
      let AllVehicles = await Services.DbOperations.getData(Models.VehicleType, {
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
}

module.exports = AdminController;
