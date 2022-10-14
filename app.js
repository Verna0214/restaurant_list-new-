const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const restaurantData = require('./restaurant.json').results
const app = express()
// 設定連線mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得mongoDB連線狀態
const db = mongoose.connection
// 連線異常警示
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantData })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantData.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword))
  res.render('index', { restaurants, keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantData.find(item => item.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})