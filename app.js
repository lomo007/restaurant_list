const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

//載入mongoose並連線到MONGODB
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI_R, { useNewUrlParser: true, useUnifiedTopology: true })

//取得資料庫連線狀態
const db = mongoose.connection

const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')

// 引用路由器
const routes = require('./routes')

let hint = "請輸入餐廳、分類"
let hintError = "查無餐廳, 請重新輸入"

//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})