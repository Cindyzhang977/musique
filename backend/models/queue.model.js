const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const queueSchema = new Schema({
	 partyCode: {
	 	type: String,
	 	required: true,
	 	unique: true,
	 	trim: true,
	 	minlength: 5,
	 },
	 queue: {
	 	type: [String]
	 },
	 time: {
	 	type: Date,
	 	default: Date.now
	 }
},{
	timestamps: true,
});

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;