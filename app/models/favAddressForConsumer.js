const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  timestamp = require("mongoose-timestamp"),
  mongoosePanginate = require("mongoose-paginate-v2"),
  objectId = Schema.objectId;

let FavouriteAddressForConsumer = new Schema({
  consumerId: { type: Schema.Types.ObjectId, ref: "Consumer" },
  location: { type: { type: String }, coordinates: [] },
  addressType: {
    type: String,
    required: true,
    // enum: ["Home", "Work", "Others"],
  },
  isDeleted: { type: Boolean, default: false },
  Address: {
    type: String,
    required: true,
    default: null,
  },
});

FavouriteAddressForConsumer.plugin(mongoosePanginate);
FavouriteAddressForConsumer.plugin(timestamp);
FavouriteAddressForConsumer.index(
  { location: "2dsphere" },
  { source: "2dsphere" },
  { destination: "2dsphere" }
);

module.exports = mongoose.model(
  "FavouriteAddressForConsumer",
  FavouriteAddressForConsumer
);
