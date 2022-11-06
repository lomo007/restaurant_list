const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT
const flash = require('connect-flash')
const routes = require('./routes')
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
app.use(methodOverride('_method'))
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg').toString()
  res.locals.warning_msg = req.flash('warning_msg').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
usePassport(app)
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on http://localhost:${PORT}`)
})