const passport = require('passport');

exports.jwtBarier = passport.authenticate('jwt', {session: false});