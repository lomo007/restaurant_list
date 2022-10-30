
const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json')
//載入種子資料的路徑
const restaurant_list = restaurantList.results

const db = require('../../config/mongoose')

//*1 model.create 是一筆一筆傳資料, 是非同步行為, 執行完後, 再印出完成
//*2 model.inserMany 是一口氣傳多筆資料
// 可以直接導入種子資料, 不用解構再重塑 model
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.insertMany(restaurant_list)  //*1
    .then(console.log('done'))     //*2
})