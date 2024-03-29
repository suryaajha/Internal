const jwt = require('jsonwebtoken');
const constants = require('../constants.js')


module.exports = function (req, res, next) {

	if (req.url == '/login' || req.url == '/signup') {
		return next();
	}

	const user_jwt_token = req.cookies.jwt_token;

	if (user_jwt_token) {
		try {
			let payload = jwt.verify(user_jwt_token, process.env.SESSION_SECRET);
			return next();
		} catch (e) {
			return res.redirect('/account/login')
		}
	} else {
		return res.redirect('/account/login')
	}

}