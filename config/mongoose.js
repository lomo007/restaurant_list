//載入mongoose並連線到MONGODB
const mongoose = require('mongoose')

//僅在非正式環境, 使嗽dotenv
if (process.env.MONGODB_URI_R !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI_R, { useNewUrlParser: true, useUnifiedTopology: true })

//取得資料庫連線狀態
const db = mongoose.connection

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db