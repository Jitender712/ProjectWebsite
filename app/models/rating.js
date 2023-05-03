const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2");
//   objectId = Schema.objectId;

const Rating = mongoose.Schema(
  {
    // name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0,max:5 },
    comment: { type: String ,default :""},
    rideId: { type: Schema.Types.ObjectId, required: true, ref: "Ride" },
    to: {
      type: Schema.Types.ObjectId,
      default: null,
      refPath: "userType",
    },
    from: {
      type: Schema.Types.ObjectId,
      default: null,
      refPath: "userType",
    },
    userType: { type: String, default: null, enum: ["Driver", "Consumer"] },
  },
);

Rating.plugin(mongoosePanginate);
Rating.plugin(timestamp);

module.exports = mongoose.model("Rating", Rating);
