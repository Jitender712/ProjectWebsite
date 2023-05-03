const Services = require("../services"),
  Models = require("./../models");
(ObjectId = require("mongodb").ObjectID),
  (responseMessages = require("../../responseMessages")),
  (logger = require("../../logger"));

exports.ValidationOfPromoCode = async (user, payload) => {
  let language = "en";
  try {
    let promoCodecheck = await Models.CouponCodes.aggregate([
      {
        $match: {
          code_of_coupon: payload.code_of_coupon,
          vehicleType: { $elemMatch: { vehicleType: payload.vehicleType } },
          consumerArray: { $elemMatch: { _id: ObjectId(user.id) } },
        },
      },
      {
        $project: {
          name_of_Coupon: 1,
          code_of_coupon: 1,
          discount: 1,
          discountType: 1,
          service_Type: 1,
          description_of_Coupon: 1,
          minimum_transaction_amount: 1,
          code_category: 1,
          validity: 1,
          coupon_Icon: 1,
          coupon_Code_Accessibility: 1,
          terms_and_condition: 1,
        },
      },
    ]);
    if (promoCodecheck.length > 0) {
      let flag = 0;
      let error = [];
      let checkDateValiditys = checkDateValidity(
        promoCodecheck[0].validity.Start_date,
        promoCodecheck[0].validity.End_date,
        flag,
        error
      );
      let checkDayValiditys = checkDayValidity(
        promoCodecheck[0].validity.Days,
        flag,
        error
      );
      let checkTimeValiditys = checkTimeValidity(
        promoCodecheck[0].validity.Time,
        flag,
        error
      );

      if (
        checkDateValiditys.flag +
          checkDayValiditys.flag +
          checkTimeValiditys.flag ===
        3
      ) {
        return "Success";
      } else {
        let dataToSend = {
          Error: error,
        };
        return dataToSend;
      }
    } else {
      return "Invalid Code";
    }
  } catch (err) {
    logger.logError(
      "Promo Code Redemption API by consumer",
      "Internal Server Error",
      err
    );
    return Promise.reject(
      responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
    );
  }
};

function checkDateValidity(Start_date, End_date, flag, error) {
  let dateofRedeem = new Date();
  const dateTimeInParts = dateofRedeem.toISOString().split("T");
  const startDate = new Date(Start_date);
  const endDate = new Date(End_date);
  const targetDate = new Date(dateTimeInParts[0]);
  if (targetDate >= startDate && targetDate <= endDate) {
    let dataToSend = {
      statusCode: 200,
      customMessage: "Success",
      flag: flag + 1,
    };
    return dataToSend;
  } else {
    let errorMessage =
      "Code can be redeem from " + Start_date + " to " + End_date;
    error.push(errorMessage);
    let dataToSend = {
      statusCode: 400,
      customMessage: errorMessage,
      flag: flag,
    };
    return dataToSend;
  }
}

function checkDayValidity(Day_Array, flag, error) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dateofRedeem = new Date();
  if (Day_Array.includes(weekday[dateofRedeem.getDay()])) {
    let dataToSend = {
      statusCode: 200,
      customMessage: "Success",
      flag: flag + 1,
    };
    return dataToSend;
  } else {
    let errorMessage = "Code can be redeem on " + Day_Array;
    error.push(errorMessage);
    let dataToSend = {
      statusCode: 400,
      customMessage: errorMessage,
      flag: flag,
    };
    return dataToSend;
  }
}

function checkTimeValidity(Time_range, flag, error) {
  const utcTimestamp = new Date();
  const istTimestamp = new Date(utcTimestamp.getTime() + 5.5 * 60 * 60 * 1000);
  const hours = istTimestamp.getUTCHours();
  const minutes = istTimestamp.getUTCMinutes();
  const givenTime = `${hours}:${minutes}`;
  const startRange = Time_range.start_time;
  const endRange = Time_range.end_time;
  const [givenHours, givenMinutes] = givenTime.split(":").map(Number);
  const [startHours, startMinutes] = startRange.split(":").map(Number);
  const [endHours, endMinutes] = endRange.split(":").map(Number);

  const givenTotalMinutes = givenHours * 60 + givenMinutes;
  const startRangeTotalMinutes = startHours * 60 + startMinutes;
  const endRangeTotalMinutes = endHours * 60 + endMinutes;

  if (
    givenTotalMinutes >= startRangeTotalMinutes &&
    givenTotalMinutes <= endRangeTotalMinutes
  ) {
    let dataToSend = {
      statusCode: 200,
      customMessage: "Success",
      flag: flag + 1,
    };
    return dataToSend;
  } else {
    let errorMessage = `${givenTime} does not lie within ${startRange} and ${endRange}`;
    error.push(errorMessage);
    let dataToSend = {
      statusCode: 400,
      customMessage: errorMessage,
      flag: flag,
    };
    return dataToSend;
  }
}
