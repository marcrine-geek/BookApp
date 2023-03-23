const express = require('express');
const router = express.Router();

const {
	register,
	login,
	read,
	toread,
	getReadBooks,
	getToReadBooks,
} = require('../controllers/auth');

const authMiddleware = require('../middleware/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/read').post(authMiddleware, read);

router.route('/toread').post(authMiddleware, toread);

router.route('/getreadbooks').get(authMiddleware, getReadBooks);

router.route('/gettoreadbooks').get(authMiddleware, getToReadBooks);

module.exports = router;
