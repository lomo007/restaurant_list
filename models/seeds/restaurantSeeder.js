
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json')
//載入種子資料的路徑
const restaurant_list = restaurantList.results

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  restaurant_list.forEach(restaurant => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })
  })
  console.log('done')
})