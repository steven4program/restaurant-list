// 引用 Express 與 Express router
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
//定義 Home route
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})
// 匯出route module
module.exports = router
