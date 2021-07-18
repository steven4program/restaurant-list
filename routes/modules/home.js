// 引用 Express 與 Express router
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
const rawInfo = require('../../models/seeds/restaurant')
// 定義 Home route
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error))
})
// 定義 Search route
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = rawInfo.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    )
  })
  res.render('index', { restaurant, keyword })
})
// 匯出route module
module.exports = router
