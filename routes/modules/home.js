// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 model
const Restaurant = require('../../models/restaurant')
const title = ['A to Z', 'Z to A', '類別', '地區']

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
  Restaurant.find(                     //關鍵字模糊搜尋
    { $or: [{ category: { $regex: reg } }, { name: { $regex: reg } }] } //$or $and 多種屬性查詢寫法
  ).lean()
    .then(restaurants => {
      if (!restaurants.length) {
        res.render('noMatchCase', { keyword })
      } else {
        res.render('index', { restaurants, keyword }  //大括弧內的陣列依序輸出
        )
      }
    })
})

router.get('/list/1', (req, res) => {  //把資料庫排序 然後渲染
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants, title: title[0] }))
    .catch(error => console.error(error))
})

router.get('/list/2', (req, res) => {  //把資料庫排序 然後渲染
  Restaurant.find()
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants, title: title[1] }))
    .catch(error => console.error(error))
})

router.get('/list/3', (req, res) => {  //把資料庫排序 然後渲染
  Restaurant.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants, title: title[2] }))
    .catch(error => console.error(error))
})


router.get('/list/4', (req, res) => {  //把資料庫排序 然後渲染
  Restaurant.find()
    .lean()
    .sort({ locatoin: 'asc' })
    .then(restaurants => res.render('index', { restaurants, title: title[3] }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router