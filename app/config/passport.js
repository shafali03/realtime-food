const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, passport, done) => {

    // Login
    // check if email exists
    const user = await User.findOne({ email: email })
    if (!user) {
      return done(null, false, { message: 'No user with this email' })
    }

    bcrypt.compare(passport, user.password).then(match => {
      if (match) {
        return done(null, user, { message: 'Logged in successfully' })
      }
      return done(null, false, { message: 'Wrong username or password' })
    }).catch(err => {
      return done(null, false, { message: 'something went wrong' })
    })

  }))

  //session 
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)

    })
  })

}


module.exports = init