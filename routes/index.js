// 引入 home module code
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

// 將網址結構符合特定字串導向對應的module
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/users', users)

// 匯出 route module
module.exports = router
