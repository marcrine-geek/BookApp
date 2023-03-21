const mongoose = require('mongoose');

const ReadSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide title'],
	},
	// description: {
	// 	type: String,
	// 	required: [true, 'Please provide description'],
	// },
	// subjects: {
	// 	type: String,
	// 	required: [true, 'Please provide subjects'],
	// },
});

module.exports = mongoose.model('Read', ReadSchema);
