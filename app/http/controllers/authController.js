
const User = require('../../models/user')
function authController() {

  return {
    login(req, res) {
      res.render('auth/login')
    },
    register(req, res) {
      res.render('auth/register')
    },
    postRegister(req, res) {
      const { name, email, password } = req.body
      // Validate request 
      if (!name || !email || !password) {
        req.flash('error', 'All fields are required')
        req.flash('name', name)
        req.flash('email', email)

        return res.redirect('/register')
      }
      console.log(req.body)
    }
  }
}

module.exports = authController