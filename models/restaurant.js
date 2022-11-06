const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: Number,
  name: { type: String, },
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
  userId: {
    type: Schema.Types.ObjectId, // 定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
    ref: 'User', // 參考對象是 User model
    index: true,
    required: true // 確保每一筆  紀錄都一定會對應到某個 user。
  }
})
module.exports = mongoose.model('Restaurant', restaurantSchema)