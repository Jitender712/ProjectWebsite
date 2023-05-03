const mongoose = require('mongoose'), Schema = mongoose.Schema, timestamp = require('mongoose-timestamp'),
	mongoosePanginate = require('mongoose-paginate-v2'), objectId = Schema.objectId;


let Location = new Schema({
	location:{
		type:{type:String},
		coordinates:[]
	},
	driverId:{type:Schema.Types.ObjectId, ref:'Driver'}
	// 'latitude': {type: Number}, 'longitude': {type: Number}, 'driverId': {type: Schema.Types.ObjectId, ref: 'Driver'}

});

Location.plugin(mongoosePanginate)
Location.plugin(timestamp);
Location.index({location:"2dsphere"})


module.exports = mongoose.model('Location', Location);
