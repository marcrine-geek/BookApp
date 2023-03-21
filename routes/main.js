const express = require('express');
const router = express.Router();

const { register, login, read, toread } = require('../controllers/auth');

// const authMiddleware = require('../middleware/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/read').post(read);

router.route('/toread').post(toread);

module.exports = router;
