const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostSchema = new Schema({
	 username: {
	 	type: String,
	 	required: true,
	 	unqiue: true,
	 	trim: true,
	 	minlength: 3
	 },
	 code: {
	 	type: String,
	 	required: true,
	 	unique: true,
	 	trim: true,
	 	minlength: 5
	 },
	 date: {
	 	type: Date,
	 	default: Date.now
	 }
},{
	timestamps: true,
});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;