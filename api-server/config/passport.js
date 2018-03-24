const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {ExtractJwt, Strategy: JwtStrategy} = require('passport-jwt');
const {find, propEq} = require('ramda');
const usersData = require('../stubs/users');

const jwtSecret = 'jwtSecret';

const createLocalStrategy = () => {
    return new LocalStrategy({
        usernameField: 'email'
    }, (email, password, cb) => {
        if (!email || !password) {
            return cb(null, false);
        }

        const user = find(propEq('email', email), usersData);

        if (!user || user.password !== password) {
            return cb(null, false);
        }

        return cb(null, user);
    });
};

const createJwtStrategy = () => {
    return new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
        secretOrKey: jwtSecret
    }, (jwtPayload, cb) => {
        const user = find(propEq('id', jwtPayload.id), usersData);

        if (!user) {
            return cb(null, false);
        }

        return cb(null, user);
    })
};

passport.use(createLocalStrategy());
passport.use(createJwtStrategy());

exports.jwtSecret = jwtSecret;
