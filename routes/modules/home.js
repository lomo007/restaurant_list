// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')


// 渲染現有資料到首頁  //*1 根據 _id 升冪排序
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })    //*1
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//*1 不區分大小寫  //*2 關鍵字模糊搜尋  //*3 $or $and 多種屬性查詢寫法
//*4 大括弧內的陣列依序輸出
router.get('/search', (req, res) => {
  let error = ''
  if (!req.query.keyword) {
    return res.redirect("/")
  }
  const keyword = req.query.keyword.trim()
  const reg = new RegExp(keyword, 'i')  //*1
  Restaurant.find(                     //*2
    { $or: [{ category: { $regex: reg } }, { name: { $regex: reg } }] } //*3
  ).lean()
    .then(restaurants => {
      if (!restaurants.length) {
        res.render('noMatchCase', { keyword })
      } else {
        res.render('index', { restaurants, keyword }   //*4
        )
      }
    })
})

//* 用 query string 的方式帶入參數
router.get('/list', (req, res) => {
  const { sort, order, title } = req.query   //* 
  Restaurant.find()
    .lean()
    .sort({ [sort]: order })
    .then(restaurants => res.render('index', { restaurants, title }))
    .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router