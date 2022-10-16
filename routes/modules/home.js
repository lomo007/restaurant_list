// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')

//渲染現有資料到首頁
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  let error = ''
  if (!req.query.keyword) {
    return res.redirect("/")
  }
  const keyword = req.query.keyword.trim()
  const reg = new RegExp(keyword, 'i')  //不區分大小寫
  return restaurants = Restaurant.find(    //關鍵字模糊搜尋
    { name: { $regex: reg } }, function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        console.log(doc)
      }
    }
  )
    .lean()
    .then((restaurants) => res.render('index', { restaurants, keyword }))  //大括弧內的陣列依序輸出
    .catch(error => console.error(error))

})

router.get('/list', (req, res) => {
  const { keyword, sort, order, title } = req.query
  return Restaurant.find()
    .sort({ [sort]: order })
    .lean()
    .then(restaurants => {
      // 先打包所有restaurants再過濾包含keyword的list
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))

      // render搜尋結果，若無符合結果render無符合頁面
      if (filterRestaurants.length) {
        res.render('index', { restaurants: filterRestaurants, keyword, title })
      } else {
        res.render('noMatchCase', { keyword })
      }
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router