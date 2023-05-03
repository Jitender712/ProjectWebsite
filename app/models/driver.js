const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

let uploadedDocuments = new Schema({
  rc: { type: String },
  licence: { type: String },
  idProof: { type: String },
  addressProof: { type: String },
});

let Driver = new Schema({
  name: { type: String },
  email: { type: String },
  role: { type: String, default: "Driver" },
  phoneNo: { type: String },
  password: { type: String, default: null },
  vehicleType: { type: String, default: null },
  vehicleNo: { type: String },
  licenceNo: { type: String },
  licenceValidity: { type: String },
  rcValidity: { type: String },
  emailOtp: { type: Number, default: null },
  emailOtpStart: { type: Number, default: null },
  forgotEmailOtp: { type: Number, default: null },
  forgotEmailOtpStart: { type: Number, default: null },
  resendOtp: { type: Number, default: null },
  resendOtpStart: { type: Number, default: null },
  loginOtp: { type: Number, default: null },
  loginOtpStart: { type: Number, default: null },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  deviceToken: { type: String, default: null },
  deviceType: { type: String, default: null },
  token: { type: String, required: false, unique: true },
  uploadedDocument: { type: { uploadedDocuments }, default: null },
  driverImage: { type: String , default:null},
  location: { type: { type: String }, coordinates: [] },
  currentStatus: {
    type: String,
    default: "Offline",
    enum: ["Offline", "Online"],
  },
  vehicleName:{type:String,default: null},
  vehicleColor:{type:String,default:"White"},
  isBlocked: { type: Boolean, default: false },
  averageRating: { type: Number, default: 0, max: 5 }
});

Driver.plugin(mongoosePanginate);
Driver.plugin(timestamp);
Driver.index({ location: "2dsphere" });

module.exports = mongoose.model("Driver", Driver);
