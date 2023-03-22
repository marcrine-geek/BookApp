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
	const read = await Read.create({ ...req.body });
	console.log(read);
	res.status(StatusCodes.CREATED).json({ title: read.title });
};

const toread = async (req, res) => {
	const toread = await Toread.create({ ...req.body });
	console.log(toread);
	res.status(StatusCodes.CREATED).json({ title: toread.title });
};

const getReadBooks = async (req, res) => {
	const books = await Read.find({ createdBy: req.user.userId });
	console.log(books);
	res.status(StatusCodes.OK).json({ books, count: books.length });
};

module.exports = {
	register,
	login,
	read,
	toread,
	getReadBooks,
};
