const mongoose = require('mongoose');

const ReadSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please provide title'],
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide user'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Read', ReadSchema);
