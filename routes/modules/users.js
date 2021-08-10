const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // Get parameters from req.body
  const { name, email, password, confirmPassword } = req.body
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

module.exports = router
