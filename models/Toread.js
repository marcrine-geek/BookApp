const mongoose = require('mongoose');

const ToreadSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Toread', ToreadSchema);
