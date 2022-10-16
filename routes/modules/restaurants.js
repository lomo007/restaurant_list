// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

//設定新增頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Restaurant.create({ id, name, name_en, category, image, location, phone, google_map, rating, description })
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

router.post('/:id/edit', (req, res) => {
  router.put('/:id', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map = req.body.google_map
    const rating = req.body.rating
    const description = req.body.description
    return Restaurant.findById(id)
      .then((restaurant) => {
        restaurant.name = name
        restaurant.name_en = name_en
        restaurant.category = category
        restaurant.image = image
        restaurant.location = location
        restaurant.phone = phone
        restaurant.google_map = google_map
        restaurant.rating = rating
        restaurant.description = description
        return restaurant.save()
      })
      .then(() => res.redirect(`/${id}`))
      .catch(error => console.error(error))
  })
})

router.post('/:id/delete', (req, res) => {
  app.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then((restaurant) => restaurant.remove())
      .then(() => res.redirect('/'))
      .catch(error => console.error(error))
  })
})



// 匯出路由模組
module.exports = router