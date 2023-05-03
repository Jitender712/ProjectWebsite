const { object } = require("joi");

const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

// let permissions = new Schema({
//   readAndWrite: { type: Boolean, default: false },
//   readOnly: { type: Boolean, default: false },
//   writeOnly: { type: Boolean, default: false },
// });

let Admin = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String },
  role: { type: String, default: "SubAdmin" },
  password: { type: String, default: null },
  emailOtp: { type: Number, default: null },
  emailOtpStart: { type: Number, default: null },
  forgotEmailOtp: { type: Number, default: null },
  forgotEmailOtpStart: { type: Number, default: null },
  resendOtp: { type: Number, default: null },
  resendOtpStart: { type: Number, default: null },
  token: { type: String, required: false, unique: true },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  adminId: { type: Schema.Types.ObjectId, ref: "Admin" },
  roleManagement:{type:Schema.Types.Mixed},
  // driverManagement: { type: { permissions }, required: true },
  // CustomerManagement: { type: { permissions }, required: true },
  // FareManagement: { type: { permissions }, required: true },
  adminStatus: {
    type: String,
    default: "Offline",
    enum: ["Online", "Offline"],
  },
  isBlocked: { type: Boolean, default: false },
});

Admin.plugin(mongoosePanginate);
Admin.plugin(timestamp);

module.exports = mongoose.model("Admin", Admin);
