// 引用 Express 與 Express router
const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 定義 Home route
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.error(error))
})
// 定義 Search route
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  return Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      if (keyword) {
        restaurants = restaurants.filter((restaurant) => {
          return (
            restaurant.name.toLowerCase().includes(keyword) ||
            restaurant.category.toLowerCase().includes(keyword)
          )
        })
      }
      let message = ''
      if (restaurants.length === 0) {
        message = `Your search "${keyword}" did not match any restaurants`
        return res.render('index', { message, keyword })
      }
      return res.render('index', { restaurant: restaurants, keyword })
    })
    .catch((error) => console.error(error))
})
// 匯出route module
module.exports = router
