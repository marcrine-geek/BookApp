const mongoose = require('mongoose');

const ToreadSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Please provide title'],
	},
});

module.exports = mongoose.model('Toread', ToreadSchema);
