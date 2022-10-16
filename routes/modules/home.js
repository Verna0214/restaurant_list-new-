const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find() // 取出Restaurant model裡的資料
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantsData = restaurants.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.includes(keyword))
      res.render('index', { restaurants: restaurantsData, keyword: keyword })
    })
})

module.exports = router