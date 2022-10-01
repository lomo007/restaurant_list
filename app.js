const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
let hint = "請輸入餐廳、分類"

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))



app.get('/', (req, res) => {
  console.log(hint)
  res.render('index', { restaurant: restaurantList.results, hint: hint })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    return res.redirect("/")
  }

  let keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  if (restaurants.length === 0) {
    keyword = ""
    hint = "查無餐廳, 請重新輸入"
  }

  console.log(hint)

  res.render('index', { restaurant: restaurants, keyword: keyword, hint: hint })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})