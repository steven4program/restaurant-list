const express = require('express')
const router = express.Router()

const passport = require('passport')

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
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
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
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // if not registered, create data
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch((err) => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout Successfully!')
  res.redirect('/users/login')
})

module.exports = router
