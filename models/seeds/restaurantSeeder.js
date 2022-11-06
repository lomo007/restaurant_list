const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json')
//載入種子資料的路徑
const restaurantListResults = restaurantList.results
const User = require('../user')

const db = require('../../config/mongoose')

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

// 連線成功
db.once('open', () => {
  SEED_USER.forEach(seedUser => {
    bcrypt.genSalt(10).then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        // 盼端使用者
        let ownLists = []
        if (user.name === 'user1') {   // 加上objectId
          ownLists = restaurantListResults.slice(0, 3)
        }
        if (user.name === 'user2') {   // 加上objectId
          ownLists = restaurantListResults.slice(3, 6)
        }
        ownLists.forEach((lists, userId) => {
          lists.userId = user._id
        })
        return Restaurant.insertMany(ownLists)  // 寫入資料庫
      })
      .then(() => {
        console.log('done.')
        process.exit()
      })
  })

})




