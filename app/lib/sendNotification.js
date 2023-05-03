"use strict";
const Services = require("../services"),
  FCM = require("fcm-node"),
  Models = require("../models");

var serverKey =
  "AAAADtP83A0:APA91bHUwYO32bxk3PaLqfrNRDhncB9RcSYB51VtUEfRNBLXpdPKrbRGsXSmz_BEv21NrMkuSxeyis-BxaFj9l1kzkGZJND0iGm0bPdhNCz5JpXaUWx2iMduVqAbernauYrwPmTBk3cK"; //put the generated private key path here
var fcm_node = new FCM(serverKey);
exports.sendFcmNotification = async (sendNoti, availableDriver) => {
  try {
    for (let i = 0; i < availableDriver.length; i++) {
      var tokenArray = availableDriver[i].deviceToken;
      var message = {
        to: tokenArray,
        // notification: {
        //   title: "You have a New Ride",
        // },
        data: {
          bookingId: sendNoti.body,
          sound: "notification_tone.mp3",
        },
      };

      fcm_node.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", err, response);
        } else {
          console.log("Successfully sent with response: ", response);
          return response;
        }
      });
    }
    // return emailSent;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};
exports.sendConsumerNotification = async (sendNoti, CustomerToken) => {
  try {
    console.log("sendNoti", sendNoti);
    let token = CustomerToken.deviceToken;
    var message = {
      to: token,
      priority: "high", //imp
      content_available: true,
      notification: {
        title: sendNoti.title,
      },
      data: {
        DriverId: sendNoti.body,
      },
    };

    fcm_node.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!", err, response);
      } else {
        console.log("Successfully sent with response: ", response);
        return response;
      }
    });

    // return emailSent;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

exports.sendDriverNotification = async (sendNoti, DriverToken) => {
  try {
    let tokenArray = DriverToken.deviceToken;
    var message = {
      to: tokenArray,
      notification: {
        title: sendNoti.title,
      },
      data: {
        bookingId: sendNoti.body,
      },
    };

    fcm_node.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!", err, response);
      } else {
        console.log("Successfully sent with response: ", response);
        return response;
      }
    });
    // return emailSent;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

exports.saveNotification = async (data) => {
  console.log("Notification", data);
  try {
    let notificaton = await Services.DbOperations.saveData(
      Models.Notification,
      data
    );
  } catch (e) {
    console.log(e);
  }
};

exports.sendMulitpleNotification = async (sendNoti, availableDriver) => {
  try {
    for (let i = 0; i < availableDriver.length; i++) {
      var tokenArray = availableDriver[i].deviceToken;
      var message = {
        to: tokenArray,
        notification: {
          title: sendNoti.title,
        },
        data: {
          message: sendNoti.content,
        },
      };
      fcm_node.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!", err, response);
        } else {
          console.log("Successfully sent with response: ", response);
          return response;
        }
      });
    }
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};
