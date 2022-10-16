const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')

// 引用路由器
const routes = require('./routes')

// 引用mongoose
require('./config/mongoose')

let hint = "請輸入餐廳、分類"
let hintError = "查無餐廳, 請重新輸入"

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