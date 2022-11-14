// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


const home = require('./modules/home') // 引入 home 模組程式碼
const restaurants = require('./modules/restaurants') // 引入 todos 模組程式碼
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth') // 引入 authenticator 掛載middleware


// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator, home)


// 匯出路由器
module.exports = router