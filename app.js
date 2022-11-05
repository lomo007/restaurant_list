const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

const bodyParser = require('body-parser')
// 載入 method-override
const methodOverride = require('method-override')
// 引入 session
const session = require('express-session')
// 載入設定檔
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000
const PORT = process.env.PORT
const flash = require('connect-flash') // 引用套件
// 引用路由器
const routes = require('./routes')

// 引用mongoose
require('./config/mongoose')

let hint = "請輸入餐廳、分類"
let hintError = "查無餐廳, 請重新輸入"

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 將 session 註冊套件   //req.flash() requires sessions
// session 要先 -> flash -> req.flash -> usePassport -> routes
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
usePassport(app)
// 將 request 導入路由器  (放到最後, 前面的套件才會吃到)
app.use(flash()) // 掛載套件   //req.flash is not a function
app.use((req, res, next) => {
  // 交接給 res，我們才能在前端樣板裡使用這些資訊
  res.locals.isAuthenticated = req.isAuthenticated() // 在 usePassport和路由之前, 順序會影像有沒有吃到
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定warning_msg 訊息
  next()
})
// 將 request 導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})