const express = require('express')
const router = express.Router()

// define article ctrl
const userCtrl = require('../controllers/user')

// use ctrl functions acc to route
router.get('/register', userCtrl.showRegisterForm)
router.post('/register', userCtrl.verifyAndRegister)
router.get('/login', userCtrl.showLoginForm)
router.post('/login', userCtrl.verifyAndLogin)
router.get('/session_test', userCtrl.showSessionTest)
router.get('/logout', userCtrl.sessionDestroy)

// export router for use in def application file
module.exports = router