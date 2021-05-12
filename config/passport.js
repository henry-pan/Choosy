const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Guest = mongoose.model('Guest');
const keys = require('../config/keys');


const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {

    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          Guest.findById(jwt_payload.id)
          .then(guest => {
            if (guest) {
              return done(null, guest);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }));
};
