// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

//設定新增頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//* req..body 和 restaurant schema屬性依樣 , req.body可以當作參數直接塞給 model.create
//* 新表單加入userId
router.post('/', (req, res) => {
  const newForm = []
  newForm.push(req.body)
  newForm.forEach((newFormlists, userId) => {
    newFormlists.userId = req.user._id
  })
  return Restaurant.create(newForm)   //* 
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

//* Object.assign 將 req.body 和restaurant 合併指派
router.put('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body)  //*  
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router