"use strict";
const AllRoutes = require("./routes");
const customerRoutes = require("./CustomerRoutes").consumer;
const adminRoutes = require("./AdminRoutes").admin;
const driverRoutes = require("./DriverRoutes").driver;
const couponCodeRoutes = require("./couponCodeRoutes").CouponCode;

module.exports = [].concat(
  customerRoutes,
  adminRoutes,
  driverRoutes,
  AllRoutes,
  couponCodeRoutes
);
