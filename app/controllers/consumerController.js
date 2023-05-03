"use strict";
const sendNotification = require("../lib/sendNotification");
const DriverController = require("../controllers/driverController");
const Services = require("../services"),
  Models = require("../models"),
  UniversalFunctions = require("../../utils/universalFunctions"),
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger"),
  Jwt = require("jsonwebtoken"),
  config = require("config"),
  FileUpload = require("../lib/fileUpload"),
  axios = require("axios"),
  Boom = require("boom"),
  FCM = require("fcm-node"),
  // referralCodes = require("referral-codes"),
  NotificationManager = require("../lib/NotificationManager"),
  ObjectId = require("mongodb").ObjectID,
  otpLength = config.get("otpLength");
const constants = require("../../constants");
const TokenManager = require("../../app/lib/tokenManager");
var pdf = require("pdf-creator-node");
var fs = require("fs");
// const cron = require("node-cron");

class ConsumerController {
  // Create Consumer
  static async createConsumer(payloadData) {
    let language = "en";
    try {
      const dataExist = await Services.DbOperations.findOne(
        Models.Consumer,
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
        },
        {
          email: 1,
          phoneNo: 1,
        }
      );
      console.log(dataExist, "===>");
      if (dataExist) {
        if (dataExist.email === payloadData.email) {
          return Promise.reject(
            responseMessages[language].ERROR.CONSUMER_ALREADY_EXISTS_WITH_EMAIL
          );
        } else if (dataExist.phoneNo === payloadData.phoneNo) {
          return Promise.reject(
            responseMessages[language].ERROR.CONSUMER_ALREADY_EXISTS_WITH_PHONE
          );
        }
      } else {
        const randomOtp = await UniversalFunctions.generateOTPCode(otpLength);
        // const referralCode = referralCodes.generate({
        //   length: 6,
        //   count: 1,
        //   charset: referralCodes.charset('alphanumeric'),
        // });
        // payloadData.password = await UniversalFunctions.createHash(
        //   payloadData.password
        // );

        payloadData.emailOtp = randomOtp;

        const otpStartTime = Date.now();
        payloadData.emailOtpStart = otpStartTime;

        payloadData.isActive = true;
        // payloadData.referralCode = referralCode[0];
        console.log("EmailOTPEXp === ", payloadData.emailOtpStart);

        const user = await Services.DbOperations.create(
          Models.Consumer,
          payloadData
        ); // we now have a user with payload data as schema

        logger.logSuccess(
          "Create Consumer",
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
    } catch (err) {
      logger.logError("Create Consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Consumer Login
  static async login(payloadData) {
    let language = "en";

    try {
      const { deviceType, deviceToken, email, password } = payloadData;

      // checking if user exist in db

      let user = await Services.DbOperations.findOne(
        Models.Consumer,
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
            type: constants.APP_CONSTANTS.DATABASE.USER_ROLES.USER,
          };

          const token = await TokenManager.setToken(tokenData);
          await Services.DbOperations.update(
            Models.Consumer,
            { _id: user._id },
            {
              deviceType,
              deviceToken,
              token: token.accessToken,
              currentStatus: "Online",
            },
            { new: true }
          );

          user = await Services.DbOperations.findOne(
            Models.Consumer,
            { _id: user._id },
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
            { lean: true }
          );

          return user;
        } else {
          logger.logError(
            "Consumer Login",
            "Incorrect Password",
            JSON.stringify(payloadData)
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
      logger.logError("Consumer Login", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Consumer Login with Otp
  static async loginWithOtp(payloadData) {
    let language = "en";

    try {
      const { deviceType, deviceToken, phoneNo, loginOtp } = payloadData;

      // checking if user exist in db

      let user = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          phoneNo,
          isDeleted: false,
          isActive: true,
        },
        {},
        {
          lean: true,
        }
      );

      if (user) {
        if (loginOtp === "1234") {
          let tokenData = {
            id: user._id,
            loginTime: +new Date(),
            random: Math.floor(Math.random() * 10000 + 10000),
            type: constants.APP_CONSTANTS.DATABASE.USER_ROLES.USER,
          };

          const token = await TokenManager.setToken(tokenData);
          await Services.DbOperations.update(
            Models.Consumer,
            { _id: user._id },
            {
              deviceType,
              deviceToken,
              token: token.accessToken,
              currentStatus: "Online",
            },
            { new: true }
          );

          user = await Services.DbOperations.findOne(
            Models.Consumer,
            { _id: user._id },
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
            { lean: true }
          );

          return user;
        } else {
          logger.logError(
            "Consumer Login",
            "Incorrect Otp",
            JSON.stringify(payloadData)
          );
          return Promise.reject(responseMessages[language].ERROR.INVALID_OTP);
        }
      } else {
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Consumer Login with Otp", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Forgot password
  static async forgotConsumerPassword(payloadData) {
    let language = "en";

    try {
      let { email } = payloadData;
      let consumer = await Services.DbOperations.findOne(
        Models.Consumer,
        { email },
        {},
        { lean: true }
      );

      if (consumer) {
        //generating otp

        let randomOtp = await UniversalFunctions.generateOTPCode(otpLength);

        // otp timing function
        const otpTimeStart = Date.now();

        //saving verify otp in db
        let updatedData = await Services.DbOperations.update(
          Models.Consumer,
          { _id: ObjectId(consumer._id) },
          { forgotEmailOtp: randomOtp, forgotEmailOtpStart: otpTimeStart },
          { new: true }
        );

        //sending verify otp email
        let emailSent = await NotificationManager.sendEmailToUser(
          "RESET_PASSWORD",
          {
            name: consumer.name,
            otp: randomOtp,
          },
          consumer.email
        );

        return Promise.resolve(responseMessages[language].SUCCESS.OTP_SENT);
      } else {
        logger.logError(
          "Verify OTP",
          "Consumer Does Not Exist",
          JSON.stringify({ email })
        );
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Consumer forgot password", "Internal Server Error", err);
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

      // let consumer = await Services.DbOperations.findAndUpdate(
      //   Models.Consumer,
      //   { email: payloadData.email },
      //   { resendOtp: randomOtp, resendOtpStart: startTime },
      //   { new: true }
      // );

      // let emailSent = await NotificationManager.sendEmailToUser(
      //   "RESET_PASSWORD",
      //   {
      //     name: consumer.name,
      //     otp: randomOtp,
      //   },
      //   consumer.email
      // );

      // logger.logSuccess("Verify Otp", "Success", JSON.stringify({ consumer }));
      return Promise.resolve(responseMessages[language].SUCCESS.OTP_SENT);
    } catch (err) {
      logger.logError("Verify otp", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Verify Consumer otp
  static async verifyConsumerOtp(payloadData) {
    let language = "en";
    try {
      let { email, otp, type } = payloadData;

      const consumer = await Services.DbOperations.findOne(
        Models.Consumer,
        { email, isDeleted: false },
        {},
        { lean: true }
      );
      console.log("Consumer Found : ", consumer);

      if (consumer) {
        let verifyTime = Date.now();

        let checkOtp;
        let otpExpiry;

        if (type == 1) {
          checkOtp = consumer.emailOtp;
          otpExpiry = consumer.emailOtpStart;
        } else if (type == 2) {
          checkOtp = consumer.forgotEmailOtp;
          otpExpiry = consumer.forgotEmailOtpStart;
        } else if (type == 3) {
          checkOtp = consumer.resendOtp;
          otpExpiry = consumer.resendOtpStart;
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

        if (type === 1) {
          // emailOtp
          let data = await Services.DbOperations.update(
            Models.Consumer,
            {
              _id: ObjectId(consumer._id),
              isActive: false,
              isDeleted: false,
            },
            {
              isActive: true,
            }
          );
        } else if (type === 1 || type === 3) {
          let tokenData = {
            id: consumer._id,
            loginTime: +new Date(),
            random: Math.floor(Math.random() * 10000 + 10000),
            name: consumer.name,
            role: "Consumer",
          };

          const url = config.get("authBaseUrl") + "/v1/token/create";
          const tokenToSave = await axios.post(url, tokenData);
        }

        logger.logSuccess(
          "Otp verified",
          "Otp verified successfully",
          JSON.stringify({ email })
        );
        return Promise.resolve(responseMessages[language].SUCCESS.OTP_VERIFIED);
      } else {
        logger.logError(
          "Verify OTP",
          "Consumer Does Not Exist",
          JSON.stringify({ email })
        );
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Verify Consumer email", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // reset PAssword
  static async resetPassword(payloadData) {
    let language = "en";

    try {
      let { email, password } = payloadData;

      let consumer = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          email,
          isDeleted: false,
        },
        {},
        { lean: true }
      );

      if (consumer) {
        password = await UniversalFunctions.createHash(password);
        let data = await Services.DbOperations.update(
          Models.Consumer,
          { _id: ObjectId(consumer._id), isDeleted: false },
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
          "Consumer Does Not Exist",
          JSON.stringify({ email })
        );
        return Promise.reject(
          responseMessages[language].ERROR.USER_DOES_NOT_EXISTS
        );
      }
    } catch (err) {
      logger.logError("Consumer forgot password", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // change password in settings
  static async changePassword(payloadData, tokenData) {
    let language = "en";
    let { password } = payloadData;

    try {
      let consumer = await Services.DbOperations.findOne(
        Models.Consumer,
        { _id: ObjectId(tokenData.id), isDeleted: false },
        {},
        { lean: true }
      );

      if (consumer) {
        password = await UniversalFunctions.createHash(password);
        let data = await Services.DbOperations.update(
          Models.Consumer,
          { _id: ObjectId(consumer._id), isDeleted: false },
          { password },
          { new: true }
        );
        return Promise.resolve(
          responseMessages[language].SUCCESS.PASSWORD_UPDATE_SUCCESS
        );
      } else {
        logger.logError(
          "Change password",
          "Consumer Does Not Exist",
          JSON.stringify({ data })
        );
        return Promise.reject(
          responseMessages[language].ERROR.CONSUMER_DOES_NOT_EXISTS
        );
      }
    } catch (err) {
      logger.logError("Consumer change password", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Consumer Logout
  static async logout(data) {
    let language = "en";
    try {
      const userData = await Services.DbOperations.update(
        Models.Consumer,
        {
          _id: ObjectId(data.id),
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
        "Consumer Logout",
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
      //     message: "Consumer already Logout",
      //   };
      return dataToSend;
    } catch (err) {
      logger.logError("Consumer Logout", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  //Consumer details
  static async getConsumerDetails(tokenData, query) {
    let language = "en";
    try {
      let user = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          _id: ObjectId(query.consumerId),
        },
        {
          name: 1,
          email: 1,
          phoneNo: 1,
          consumerImage: 1,
        },
        {
          lean: true,
        }
      );
      if (user) {
        logger.logSuccess(
          "Get Consumer details",
          "Got Consumer details",
          JSON.stringify(user)
        );
        return user;
      } else {
        let dataToSend = {
          statusCode: 400,
          message: "Customer not Found",
        };
        return dataToSend;
      }
    } catch (err) {
      logger.logError("Get Consumer details", "Internal server error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Edit Consumer type
  static async editConsumerProfile(userData, payloadData) {
    let language = "en";

    try {
      let dataExist = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          _id: ObjectId(userData.id),
          isDeleted: false,
        },
        {
          name: 1,
          email: 1,
        },
        {
          lean: true,
        }
      );
      if (dataExist) {
        let data = await Services.DbOperations.findAndUpdate(
          Models.Consumer,
          {
            _id: ObjectId(userData.id),
            isDeleted: false,
          },
          {
            $set: payloadData,
          },
          {
            new: true,
          }
        );
        logger.logSuccess("Update profile", "Profile updated");
        return data;
      } else {
        let dataToSend = {
          statusCode: 400,
          message: "Customer not Found",
        };
        return dataToSend;
      }
    } catch (err) {
      logger.logError("Update profile", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Book A Ride
  static async bookARide(user, payload) {
    let language = "en";
    try {
      const dataExist = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          _id: ObjectId(user.id),
          isDeleted: false,
          isActive: true,
        },
        {
          name: 1,
        }
      );

      if (!dataExist) {
        return Promise.reject(
          responseMessages[language].ERROR.CONSUMER_DOES_NOT_EXISTS
        );
      } else {
        payload.location.type = "Point";
        payload.location.coordinates = [
          parseFloat(payload.location.latitude),
          parseFloat(payload.location.longitude),
        ];
        payload.source.type = "Source";
        payload.source.coordinates = [
          parseFloat(payload.source.latitude),
          parseFloat(payload.source.longitude),
        ];
        payload.destination.type = "Destination Point";
        payload.destination.coordinates = [
          parseFloat(payload.destination.latitude),
          parseFloat(payload.destination.longitude),
        ];
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        payload.bookingTime = timestamp;
        payload.consumerId = user.id;

        const ride = await Services.DbOperations.create(Models.Ride, payload);
        logger.logSuccess(
          "Send Booking Request",
          "Success",
          JSON.stringify({
            ride,
          })
        );

        const rideHistory = await Services.DbOperations.create(
          Models.RideHistory,
          {
            RideId: ObjectId(ride._id),
            Old_Status: "Initiated",
            New_Status: "Initiated",
            userType: "Consumer",
            userId: ObjectId(user.id),
          }
        );
        let availableDriver = await DriverController.availableDriver(
          payload.source.latitude,
          payload.source.longitude,
          payload.vehicleType
        );

        let sendNoti = {
          title: "Ride is Initiated",
          body: ride._id,
        };

        let data = await sendNotification.sendFcmNotification(
          // Need to Modify data acc to requirement
          sendNoti,
          availableDriver
        );
        await sendNotification.saveNotification({
          bookingId: ride._id,
          status: "Initiated",
          message: sendNoti.title,
          consumer_id: user.id,
        });
        let all_data = {
          ride: ride,
          availableDriver: availableDriver, // Need to Modify data acc to requirement
        };
        return all_data;
      }
    } catch (err) {
      logger.logError("Book A Ride", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Cancel Ride by Consumer
  static async cancelRideByConsumer(user, query, payload) {
    let language = "en";
    try {
      let ride_data = await Services.DbOperations.findAndUpdate(
        Models.Ride,
        {
          _id: ObjectId(query.bookingId),
          currentStatus: {
            $in: ["Initiated", "Assigned", "Arrived"],
          },
        },
        {
          $set: {
            currentStatus: "Cancelled",
            totalFare: 0,
          },
        },
        {}
      );
      if (ride_data) {
        await sendNotification.saveNotification({
          bookingId: ride_data._id,
          status: "Cancelled",
          message: "Ride is cancelled by Consumer",
        });
        if (ride_data.currentStatus === "Initiated") {
          await Services.DbOperations.create(Models.RideHistory, {
            RideId: ride_data.id,
            Old_Status: ride_data.currentStatus,
            New_Status: "Cancelled",
            userId: user.id,
            userType: "Consumer",
          });
        } else {
          await Services.DbOperations.create(Models.RideHistory, {
            RideId: ride_data.id,
            Old_Status: ride_data.currentStatus,
            New_Status: "Cancelled",
            userId: user.id,
            userType: "Consumer",
          });
          let sendNoti = {
            title: "Ride is Cancelled",
            body: ride_data.id,
          };
          let DriverData = await Services.DbOperations.findOne(
            Models.Driver,
            {
              _id: ObjectId(ride_data.driverId),
            },
            {
              deviceToken: 1,
            }
          );
          await sendNotification.sendDriverNotification(sendNoti, DriverData);
        }
        await Services.DbOperations.create(Models.CancelReasonBy, {
          reason: payload.reason,
          userType: query.userType,
          userId: ObjectId(user.id),
          reasonId: ObjectId(query.reasonId),
          isDeleted: false,
        });

        let sendData = {
          message: "Ride is cancelled by Consumer.",
          status: 200,
        };
        return sendData;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Cancelled by Consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // On Going Ride
  static async onGoingRide(user) {
    let language = "en";
    try {
      let userExist = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          _id: ObjectId(user.id),
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
      if (userExist) {
        console.log("Ride Details");
        let currentRide = await Services.DbOperations.findOne(
          Models.Ride,
          {
            consumerId: ObjectId(userExist._id),
            currentStatus: {
              $in: ["Initiated", "Assigned", "Arrived", "Started", "End"],
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
            driverId: 1,
          }
        );

        let dataToShow = {
          ConsumerDetails: userExist,
          rideDetails: currentRide,
        };
        logger.logSuccess("On Going Ride", "Updated On Going Ride");
        return dataToShow;
      } else {
        return Promise.resolve(responseMessages[language].ERROR.INVALID_TOKEN);
      }
    } catch (err) {
      logger.logError("onGoingRide", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Ride History For Consumer
  static async rideHistoryForConsumer(user, query) {
    let language = "en";
    try {
      let userExist = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          _id: ObjectId(user.id),
          isDeleted: false,
          currentStatus: "Online",
        },
        {
          name: 1,
        }
      );
      if (userExist) {
        console.log("Ride Details");

        let condition = {
          consumerId: ObjectId(userExist._id),
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
        let dataToShow = {
          ConsumerDetails: userExist,
          rideDetails: currentRide,
        };
        logger.logSuccess("On Going Ride", "Updated On Going Ride");
        return dataToShow;
      } else {
        return Promise.resolve(responseMessages[language].ERROR.INVALID_TOKEN);
      }
    } catch (err) {
      logger.logError("onGoingRide", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Rating By Consumer
  static async ratingFromConsumer(consumer, query, payload) {
    let language = "en";
    try {
      let consumerExist = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          _id: ObjectId(consumer.id),
          isDeleted: false,
          currentStatus: "Online",
        },
        {
          name: 1,
        }
      );
      if (consumerExist) {
        console.log(query.rideId);
        let ride = await Services.DbOperations.findAndUpdate(
          Models.Ride,
          {
            _id: ObjectId(query.rideId),
            consumerId: ObjectId(consumer.id),
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
            $set: {
              currentStatus: "Completed",
            },
            tip: payload.tip,
          }
        );
        if (ride) {
          let Rating = await Services.DbOperations.create(Models.Rating, {
            rating: payload.rating,
            comment: payload.comment,
            rideId: query.rideId,
            to: ride.driverId,
            from: consumer.id,
            userType: "Consumer",
          });
          let averageRating = await Services.DbOperations.getData(
            Models.Rating,
            {
              to: ObjectId(ride.driverId),
              rating: { $in: [1, 2, 3, 4, 5] },
            },
            {
              rating: 1,
            }
          );
          if (averageRating.length > 0) {
            let totalRating = averageRating.reduce(
              (n, { rating }) => n + rating,
              0
            );
            let avgRating = totalRating / averageRating.length;
            await Services.DbOperations.findAndUpdate(
              Models.Driver,
              {
                _id: ObjectId(ride.driverId),
                isDeleted: false,
              },
              {
                $set: {
                  averageRating: avgRating,
                },
              }
            );
          }
          return Rating;
        } else {
          return Promise.resolve(
            responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
          );
        }
      } else {
        Promise.resolve(responseMessages[language].ERROR.INVALID_TOKEN);
      }
    } catch (err) {
      logger.logError("rating From consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create Invoice
  static async createInvoice(consumer, query) {
    let language = "en";
    var html = fs.readFileSync("template.html", "utf8");
    console.log("query", query);
    try {
      let Ridedata = await Models.Ride.aggregate([
        {
          $match: {
            _id: ObjectId(query.rideId),
            consumerId: ObjectId(consumer.id),
          },
        },
        {
          $lookup: {
            from: "consumers",
            localField: "consumerId",
            foreignField: "_id",
            as: "consumerDetails",
          },
        },
        {
          $project: {
            _id: 1,
            vehicleType: 1,
            bookingTime: 1,
            totalFare: 1,
            currentStatus: 1,
            pickUpAddress: 1,
            destinationAddress: 1,
            // driverId: 1,
            "consumerDetails.name": 1,
            consumerId: 1,
          },
        },
      ]);
      console.log("Ride Details", Ridedata);
      var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
          height: "45mm",
          contents:
            '<div style="text-align: center;">Author: LDT Technologies</div>',
        },
        footer: {
          height: "28mm",
          contents: {
            first: "Cover page",
            2: "Second page", // Any page number is working. 1-based index
            default:
              '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: "Last Page",
          },
        },
      };
      var document = {
        html: html,
        data: {
          vehicleType: Ridedata[0].vehicleType,
          bookingTime: 1676956661568,
          totalFare: Ridedata[0].totalFare,
          currentStatus: Ridedata[0].currentStatus,
          pickUpAddress: Ridedata[0].pickUpAddress.pickUpAddressDetails,
          destinationAddress:
            Ridedata[0].destinationAddress.destinationAddressDetails,
          consumerId: Ridedata[0].consumerId,
          Consumer_Name: Ridedata[0].consumerDetails[0].name,
        },
        path: `./pdf/output_${query.rideId}.pdf`,
        type: "",
      };
      console.log("==>>>>>>", document.data);
      let data = await pdf
        .create(document, options)
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((error) => {
          console.error(error);
        });

      console.log("data", data);
      const pdfSend = {
        filename: `./pdf/output_${query.rideId}.pdf`,
        path: data.filename,
      };
      let downloadpdf = await FileUpload.uploadpdf(pdfSend);
      return downloadpdf.Location;
    } catch (err) {
      logger.logError("Download Pdf", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Recent Rides
  static async recentRide(consumer) {
    let language = "en";
    try {
      let userExist = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          _id: ObjectId(consumer.id),
          isDeleted: false,
          currentStatus: "Online",
        },
        {
          name: 1,
        }
      );
      if (userExist) {
        let currentRide = await Models.Ride.aggregate([
          {
            $match: {
              currentStatus: "Completed",
              consumerId: ObjectId(consumer.id),
            },
          },
          {
            $group: {
              _id: "$destinationAddress",
              destinationAddress: { $first: "$destinationAddress" },
              destination: { $first: "$destination" },
            },
          },
          {
            $project: {
              _id: 0,
              destinationAddress:
                "$destinationAddress.destinationAddressDetails",
              destination: 1,
            },
          },
        ]);
        logger.logSuccess("Recent Ride", "Recent Ride");
        return currentRide;
      } else {
        return Promise.resolve(responseMessages[language].ERROR.INVALID_TOKEN);
      }
    } catch (err) {
      logger.logError("onGoingRide", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // No Driver Found
  static async noDriverFound(query) {
    let language = "en";
    try {
      let ride_data = await Services.DbOperations.findAndUpdate(
        Models.Ride,
        {
          _id: ObjectId(query.bookingId),
          currentStatus: "Initiated",
        },
        {
          $set: {
            currentStatus: "Cancelled",
            totalFare: 0,
          },
        },
        {}
      );
      if (ride_data) {
        // let availableDriver = await DriverController.availableDriver(
        //   ride_data.source.coordinates[0],
        //   ride_data.source.coordinates[1],
        //   ride_data.vehicleType
        // );

        // let sendNoti = {
        //   title: "Ride is no more",
        //   body: ride_data._id,
        // };

        // let data = await sendNotification.sendFcmNotification(
        //   // Need to Modify data acc to requirement
        //   sendNoti,
        //   availableDriver
        // );
        // await sendNotification.saveNotification({
        //   bookingId: ride_data._id,
        //   status: "Cancelled",
        //   message: sendNoti.title,
        //   consumer_id: ride_data.consumerId,
        // });

        let dataToSend = {
          message: "Ride has been Cancelled",
        };
        return dataToSend;
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.RIDE_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Cancelled by Consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Check Consumer Exists
  static async continueWithNumber(payloadData) {
    let language = "en";
    const { deviceType, deviceToken, phoneNo, loginOtp } = payloadData;
    try {
      let user = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          phoneNo: phoneNo,
          isActive: true,
        },
        {
          phoneNo: 1,
        }
      );
      if (loginOtp === "1234") {
        if (user) {
          let tokenData = {
            id: user._id,
            loginTime: +new Date(),
            random: Math.floor(Math.random() * 10000 + 10000),
            type: constants.APP_CONSTANTS.DATABASE.USER_ROLES.USER,
          };

          const token = await TokenManager.setToken(tokenData);
          await Services.DbOperations.update(
            Models.Consumer,
            { _id: user._id },
            {
              deviceType,
              deviceToken,
              token: token.accessToken,
              currentStatus: "Online",
            },
            { new: true }
          );

          user = await Services.DbOperations.findOne(
            Models.Consumer,
            { _id: user._id },
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
            { lean: true }
          );
          let dataToSend = {
            type: 1,
            customerDetails: user,
          };
          return dataToSend;
        } else {
          let dataToSend = {
            statusCode: 200,
            type: 2,
          };
          return dataToSend;
        }
      } else {
        logger.logError(
          "Continue With Number",
          "Incorrect Otp",
          JSON.stringify(payloadData)
        );
        return Promise.reject(responseMessages[language].ERROR.INVALID_OTP);
      }
    } catch (err) {
      logger.logError("Continue with Number", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // After Verify otp Registration
  static async registerConsumer(payloadData) {
    let language = "en";
    try {
      const dataExist = await Services.DbOperations.findOne(
        Models.Consumer,
        {
          // $or: [
          //   {
          //     email: payloadData.email,
          //   },
          //   {
          phoneNo: payloadData.phoneNo,
          //   },
          // ],
          isDeleted: false,
        },
        {
          email: 1,
          phoneNo: 1,
        }
      );
      console.log(dataExist, "===>");
      if (dataExist) {
        if (dataExist.email === payloadData.email) {
          return Promise.reject(
            responseMessages[language].ERROR.CONSUMER_ALREADY_EXISTS_WITH_EMAIL
          );
        } else if (dataExist.phoneNo === payloadData.phoneNo) {
          return Promise.reject(
            responseMessages[language].ERROR.CONSUMER_ALREADY_EXISTS_WITH_PHONE
          );
        }
      } else {
        let data = {
          name: payloadData.name,
          email: payloadData.email,
          phoneNo: payloadData.phoneNo,
          isActive: true,
          currentStatus: "Online",
          deviceToken: payloadData.deviceToken,
          deviceType: payloadData.deviceType,
        };
        let user = await Services.DbOperations.create(Models.Consumer, data); // we now have a user with payload data as schema
        let tokenData = {
          id: user._id,
          loginTime: +new Date(),
          random: Math.floor(Math.random() * 10000 + 10000),
          type: constants.APP_CONSTANTS.DATABASE.USER_ROLES.USER,
        };

        const token = await TokenManager.setToken(tokenData);
        await Services.DbOperations.update(
          Models.Consumer,
          { _id: user._id },
          {
            token: token.accessToken,
          },
          { new: true }
        );
        user = await Services.DbOperations.findOne(
          Models.Consumer,
          { _id: user._id },
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
          { lean: true }
        );

        logger.logSuccess(
          "Create Consumer",
          "Success",
          JSON.stringify({
            user,
          })
        );
        return user;
      }
    } catch (err) {
      logger.logError("Create Consumer", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Create Favourite Address
  static async createFavouriteAddress(consumer, payloadData) {
    let language = "en";
    try {
      console.log("consumer ", consumer, "payloadData", payloadData);
      let dataExist = await Services.DbOperations.findOne(
        Models.FavouriteAddressForConsumer,
        {
          consumerId: consumer.id,
          addressType: payloadData.addressType,
          isDeleted: false,
        },
        {
          consumerId: 1,
          location: 1,
          addressType: 1,
          Address: 1,
        }
      );
      if (dataExist) {
        return Promise.reject(
          responseMessages[language].ERROR.FAVOURITE_ADDRESS_ALREADY_EXISTS
        );
        // if (dataExist.addressType !== "Home" || "Work") {
        //   if (dataExist.Address !== payloadData.Address) {
        //     payloadData.location.type = "Point";
        //     payloadData.location.coordinates = [
        //       parseFloat(payloadData.location.latitude),
        //       parseFloat(payloadData.location.longitude),
        //     ];
        //     let createFavAddress = await Services.DbOperations.create(
        //       Models.FavouriteAddressForConsumer,
        //       {
        //         consumerId: consumer.id,
        //         location: {
        //           type: "Point",
        //           coordinates: [
        //             parseFloat(payloadData.location.latitude),
        //             parseFloat(payloadData.location.longitude),
        //           ],
        //         },
        //         addressType: payloadData.addressType,
        //         Address: payloadData.Address,
        //       }
        //     );
        //     return createFavAddress;
        //   } else {
        //     console.log("Already Exist");
        //     return Promise.reject(
        //       responseMessages[language].ERROR.FAVOURITE_ADDRESS_ALREADY_EXISTS
        //     );
        //   }
        // } else {
        //   console.log("Already Exist");
        //   return Promise.reject(
        //     responseMessages[language].ERROR.FAVOURITE_ADDRESS_ALREADY_EXISTS
        //   );
        // }
      } else {
        payloadData.location.type = "Point";
        payloadData.location.coordinates = [
          parseFloat(payloadData.location.latitude),
          parseFloat(payloadData.location.longitude),
        ];
        let createFavAddress = await Services.DbOperations.create(
          Models.FavouriteAddressForConsumer,
          {
            consumerId: consumer.id,
            location: {
              type: "Point",
              coordinates: [
                parseFloat(payloadData.location.latitude),
                parseFloat(payloadData.location.longitude),
              ],
            },
            addressType: payloadData.addressType,
            Address: payloadData.Address,
          }
        );
        return createFavAddress;
      }
    } catch (err) {
      logger.logError("Create Favourite Address", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Show Favourite Addres
  static async showFavAddress(consumer) {
    let language = "en";
    try {
      let favAddressForConsumer = await Services.DbOperations.getData(
        Models.FavouriteAddressForConsumer,
        {
          consumerId: consumer.id,
          isDeleted: false,
        },
      ).sort({ createdAt: -1 });
      return favAddressForConsumer;
    } catch (err) {
      logger.logError("Show Favourite Address", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Favourite Address
  static async deleteFavAddress(consumer, query) {
    let language = "en";
    try {
      let favAddressForConsumer = await Services.DbOperations.findAndRemove(
        Models.FavouriteAddressForConsumer,
        {
          _id: ObjectId(query.addressId),
          isDeleted: false,
        }
      );
      if (favAddressForConsumer) {
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        return Promise.reject(
          responseMessages[language].ERROR.DATA_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Delete Favourite Address", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Edit Favourite Address
  static async editFavAddress(query, payloadData) {
    let language = "en";
    try {
      let updateFavAddres = await Services.DbOperations.findAndUpdate(
        Models.FavouriteAddressForConsumer,
        {
          _id: ObjectId(query.addressId),
          isDeleted: false,
          // addressType: payloadData.addressType,
        },
        {
          $set: {
            location: {
              type: "Point",
              coordinates: [
                parseFloat(payloadData.location.latitude),
                parseFloat(payloadData.location.longitude),
              ],
            },
            Address: payloadData.Address,
          },
        },
        {
          new: true,
        }
      );
      return updateFavAddres;
    } catch (err) {
      logger.logError("Edit Favourite Address ", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Delete Consumer Account
  static async deleteConsumerAccount(consumer) {
    let language = "en";
    try {
      let consumerExist = await Services.DbOperations.findAndRemove(
        Models.Consumer,
        {
          _id: ObjectId(consumer.id),
          isDeleted: false,
        }
      );
      if (consumerExist) {
        return Promise.resolve(responseMessages[language].SUCCESS.DELETED);
      } else {
        return Promise.resolve(
          responseMessages[language].ERROR.USER_DOES_NOT_EXIST
        );
      }
    } catch (err) {
      logger.logError("Delete Consumer Account", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Nearby Vehicles
  static async nearByVehicle(payload) {
    let language = "en";
    try {
      const DISTANCE_INTO_METER = 5000;
      let vehicleLIst = await Models.Location.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [
                payload.location.latitude,
                payload.location.longitude,
              ],
            },
            key: "location",
            maxDistance: DISTANCE_INTO_METER,
            distanceField: "dist.calculated",
          },
        },
        {
          $lookup: {
            from: "drivers",
            let: { driver: "$driverId", status: "Online" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: ["$currentStatus", "$$status"],
                      },
                      { $eq: ["$_id", "$$driver"] },
                    ],
                  },
                },
              },
            ],
            as: "driverArray",
          },
        },
        { $unwind: "$driverArray" },
        {
          $project: {
            location: 1,
            "driverArray.vehicleType": 1,
          },
        },
      ]);

      return vehicleLIst;
    } catch (err) {
      logger.logError("Nearby Vehicles", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ConsumerController;
