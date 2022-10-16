const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const sorting = require('../../utilities/sort')


router.get('/', (req, res) => {
  Restaurant.find() // 取出Restaurant model裡的資料
    .lean()
    .sort({ _id: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sortingType = req.query.sort
  const typeObject = {
    isOne: sortingType === '1',
    isTwo: sortingType === '2',
    isThree: sortingType === '3',
    isFour: sortingType === '4'
  }
  Restaurant.find({})
    .lean()
    .sort(sorting(sortingType))
    .then(restaurantsData => {
      const filterRestaurants = restaurantsData.filter(restaurant => {
        return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) || restaurant.category.includes(keyword)
      })
      res.render('index', { restaurants: filterRestaurants, keyword, typeObject })
    })
    .catch(err => console.log(err))
})

module.exports = router