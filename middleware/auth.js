module.exports = {
  // 這個設定檔會匯出一個物件，物件裡是一個叫做 authenticator 的函式
  authenticator: (req, res, next) => {
    // Passport.js 提供的函式，會根據 request 的登入狀態回傳 true 或 false
    // 回傳 true，則我們執行下一個 middleware，通常就會進入路由的核心功能，如果是 false，就強制返回 login 頁面
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用!')
    res.redirect('/users/login')
  }
}
