// 引入 home module code
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
// 將網址結構符合 / 字串的 request 導向 home module
router.use('/', home)
// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants module
router.use('/restaurants', restaurants)
// 匯出 route module
module.exports = router
