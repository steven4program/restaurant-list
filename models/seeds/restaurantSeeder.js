const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')

const SEED_RESTAURANT = require('./restaurant.json')
const SEED_USER = require('./user.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(
    SEED_USER.map((user) =>
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(user.password, salt))
        .then((hash) =>
          User.create({
            name: user.name,
            email: user.email,
            password: hash
          })
        )
        .then((userInfo) => {
          const restaurants = SEED_RESTAURANT.filter((restaurant) =>
            user.ownRestaurantId.includes(restaurant.id)
          )
          restaurants.forEach((restaurant) => {
            restaurant.userId = userInfo._id
          })
          return Restaurant.create(restaurants)
        })
    )
  )
    .then(() => {
      console.log('done!')
      process.exit()
    })
    .catch((error) => console.log(error))
})
