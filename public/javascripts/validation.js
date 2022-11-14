const { bulkWrite } = require("../../models/user")

function checkRegisterPassword() {
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const passwordCondition = document.getElementById('passwordCondition')
  const registerSubmit = document.getElementById('registerSubmit')

  if (password === confirmPassword) {
    passwordCondition.innerHTML = `<p class="text-success font-weight-bold">*兩次密碼輸入相同</p>`
    registerSubmit.disabled = false
  } else {
    passwordCondition.innerHTML = `<p class="text-danger font-weight-bold">*兩次密碼輸入不同</p>`
    registerSubmit.disabled = true
  }
}