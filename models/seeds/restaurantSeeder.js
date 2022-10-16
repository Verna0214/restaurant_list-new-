const Restaurant = require('../restaurant')
const restaurantData = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  Restaurant.create(restaurantData)
    .then(() => {
      console.log('done!')
    })
    .catch(error => console.log('error!'))
})
