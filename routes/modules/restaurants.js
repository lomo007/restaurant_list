// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

//設定新增頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//* 一筆資料 Create 即可
//* Create 內分項送入可以表單檢查
//* req..body 和 restaurant schema屬性依樣 , req.body可以當作參數直接塞給 model.create (這種方法 會有不適宜的資料或形式傳入的風險)
router.post('/', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image ? req.body.image : "https://omofood.com/wp-content/uploads/20200711133955_50-900x600.jpg",  //* 沒有圖片就預設吐司
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating ? req.body.rating : 5,
    description: req.body.description,
    userId: req.user._id   //* 新表單加入userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

//* Object.assign 將 req.body 和 restaurant 合併指派 (這種方法 會有不適宜的資料或形式傳入的風險)
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => {
      // restaurant = Object.assign(restaurant, req.body)  //*  
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image ? req.body.image : "https://omofood.com/wp-content/uploads/20200711133955_50-900x600.jpg"  //* 沒有圖片就預設吐司
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating ? req.body.rating : 5
      restaurant.description = req.body.description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => {
      return restaurant.remove()  // 預防找不到資料Mongo API回傳null,避免繼續呼叫
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router