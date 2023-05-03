const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");

const blogsSchema = new Schema({
  blogTitle: { type: String },
  blogImage: { type: String },
  blogSubTitle: { type: String },
});
const saveImage = new Schema({
  ImageUrl: { type: String },
});

let PromotionBanners = new Schema({
  first_Banner_Image: { type: { saveImage } },
  second_Banner_Image: { type: { saveImage } },
  blogTitle: { type: String },
  blogs: { type: [blogsSchema] },
  isDeleted: { type: String, default: false },
  isBlocked: { type: String, default: false },
});

PromotionBanners.plugin(mongoosePanginate);
PromotionBanners.plugin(timestamp);

module.exports = mongoose.model("PromotionBanners", PromotionBanners);
