const User = require('../models/User');
const Read = require('../models/Read');
const Toread = require('../models/Toread');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();

	res
		.status(StatusCodes.CREATED)
		.json({ user: { firstname: user.firstname }, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password');
	}

	const user = await User.findOne({ email });

	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	const isPasswordCorrect = await user.comparePassword(password);

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	const token = user.createJWT();
	res
		.status(StatusCodes.OK)
		.json({ user: { firstname: user.firstname }, token });
};

const read = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const read = await Read.create(req.body);
	res.status(StatusCodes.CREATED).json({ read });
};

const toread = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const toread = await Toread.create(req.body);
	res.status(StatusCodes.CREATED).json({ toread });
};

const getReadBooks = async (req, res) => {
	const book = await Read.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ book, count: book.length });
};

const getToReadBooks = async (req, res) => {
	const data = await Toread.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ data, count: data.length });
};

module.exports = {
	register,
	login,
	read,
	toread,
	getReadBooks,
	getToReadBooks,
};
