const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // Get parameters from req.body
  const { name, email, password, confirmPassword } = req.body
  // set error message
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Passwords do not match.' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // Check if registered
  User.findOne({ email }).then((user) => {
    // if registered, return to register page
    if (user) {
      console.log('User already exists.')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    // if not registered, create data
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout Successfully!')
  res.redirect('/users/login')
})

module.exports = router
