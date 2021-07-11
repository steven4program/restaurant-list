const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const Restaurant = require('./models/restaurant');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error!');
});

db.once('open', () => {
  console.log('mongodb connected!');
});

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurant) => res.render('index', { restaurant }))
    .catch((error) => console.log(error));
});

app.get('/restaurants/new', (req, res) => {
  return res.render('new');
});

app.post('/restaurants', (req, res) => {
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.google_map;
  const rating = req.body.rating;
  const description = req.body.description;

  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error));
});

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const name_en = req.body.name_en;
  const category = req.body.category;
  const image = req.body.image;
  const location = req.body.location;
  const phone = req.body.phone;
  const google_map = req.body.google_map;
  const rating = req.body.rating;
  const description = req.body.description;
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();

  if (keyword === '') {
    return res.redirect('/');
  }

  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const results = restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(keyword) ||
          restaurant.category.toLowerCase().includes(keyword)
      );
      if (results.length) {
        res.render('index', { restaurant: results, keyword });
      } else {
        res.render('index', {
          noValidResults: '<h3>沒有符合的搜尋結果</h3>',
          keyword,
        });
      }
    });
});

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error));
});

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
