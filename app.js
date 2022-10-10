const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

//載入mongoose並連線到MONGODB
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI_R, { useNewUrlParser: true, useUnifiedTopology: true })

//取得資料庫連線狀態
const db = mongoose.connection

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

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results, hint: hint })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  let error = ''

  if (!req.query.keyword) {
    return res.redirect("/")
  }

  let keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })

  if (restaurants.length === 0) {
    keyword = ''
    hint = hintError
    error = 'error'
  }

  res.render('index', { restaurant: restaurants, keyword: keyword, hint: hint, error: error })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})