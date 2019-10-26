const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partySchema = new Schema({
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
	 size: {
	 	type: Number,
	 },
	 time: {
	 	type: Date,
	 	default: Date.now
	 }
},{
	timestamps: true,
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
