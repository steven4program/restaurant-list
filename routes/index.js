// 引入 home module code
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth') // apply middleware

// 將網址結構符合特定字串導向對應的module
router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/', authenticator, home)

// 匯出 route module
module.exports = router
