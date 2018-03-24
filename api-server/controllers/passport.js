const passport = require('passport');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/passport');
const {make401} = require('../utils/errors');

const authCb = (req, res, next) => (err, user) => {
    if (err) {
        return next(err);
    }

    if (!user) {
        return next(make401());
    }

    const token = jwt.sign({id: user.id}, jwtSecret, {expiresIn: '24h'});
    return res.json({token});
};

exports.login = (req, res, next) => {
    passport.authenticate('local', authCb(req, res, next))(req, res, next);
};