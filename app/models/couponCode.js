const { number } = require("joi");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let usageLimit = new Schema({
  daily: {
    type: {
      byAmount: Number,
      byCount: Number,
    },
  },
  weekly: {
    type: {
      byAmount: Number,
      byCount: Number,
    },
  },
  monthly: {
    type: {
      byAmount: Number,
      byCount: Number,
    },
  },
  yearly: {
    type: {
      byAmount: Number,
      byCount: Number,
    },
  },
});

let CouponCodes = new Schema({
  name_of_Coupon: {
    type: String,
  },
  code_of_coupon: {
    type: String,
    min: 6,
    max: 20,
    trim: true,
    required: true,
    index: true,
  },
  discount: { type: Number },
  discountType: {
    type: String,
    enum: ["Flat", "Percentage", "Free Ride", "Payment Mode"],
  },
  promoCodeRestriction: { type: { usageLimit } },
  vehicleType: {
    type: [
      {
        _id: Schema.Types.ObjectId,
        vehicleType: String,
      },
    ],
  },
  // rideType: {
  //   type: [
  //     {
  //       _id: Schema.Types.ObjectId,
  //       vehicleType: String,
  //     },
  //   ],
  // },
  coupon_Code_Accessibility: { type: String, enum: ["Public", "Private"] },
  consumerArray: {
    type: [{ _id: Schema.Types.ObjectId, name: String, phoneNo: String }],
  },
  description_of_Coupon: { type: String },
  minimum_transaction_amount: { type: Number },
  person_count_limit: {
    type: {
      total: Number,
      remains: Number,
      used: Number,
    },
  },
  code_category: { type: String, enum: ["Promo Code", "Welcome Offer"] },
  validity: {
    type: {
      Start_date: String,
      End_date: String,
      Days: Array,
      Time: { start_time: String, end_time: String },
    },
  },
  isBlocked: { type: Boolean, default: false },
  promoCodeStatus: { type: String, enum: ["Active", "Upcoming", "Expired"] },
  coupon_Icon: { type: String },
  terms_and_condition: { type: String },
  geofence: { type: Array },
  isDeleted: { type: String, default: false },
});

CouponCodes.plugin(mongoosePanginate);
CouponCodes.plugin(timestamp);

module.exports = mongoose.model("CouponCodes", CouponCodes);
