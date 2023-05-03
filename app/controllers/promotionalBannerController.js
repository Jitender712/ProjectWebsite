"use strict";

const Services = require("../services"),
  Models = require("../models"),
  ObjectId = require("mongodb").ObjectID,
  responseMessages = require("../../responseMessages"),
  logger = require("../../logger");

class PromotionalBanners {
  // Create Promotional Banners
  static async createBanner(payload) {
    let language = "en";
    try {
      let banner = await Services.DbOperations.create(
        Models.PromotionalBanners,
        {
          first_Banner_Image: payload.first_Banner_Image,
          second_Banner_Image: payload.second_Banner_Image,
          blogTitle: payload.blogTitle,
          blogs: payload.blogs,
        }
      );
      return banner;
    } catch (err) {
      logger.logError("Delete Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }

  // List Promotional Banners
  static async listBanner() {
    let language = "en";
    try {
      let bannerList = await Services.DbOperations.getData(
        Models.PromotionalBanners,
        {
          isDeleted: false,
          isBlocked: false,
        },
        {},
        {
          lean: true,
        }
      );
      return bannerList;
    } catch (err) {
      logger.logError("Delete Admin", "Internal Server Error", err);
      return Promise.reject(
        responseMessages[language].ERROR.INTERNAL_SERVER_ERROR
      );
    }
  }
}
module.exports = PromotionalBanners;
