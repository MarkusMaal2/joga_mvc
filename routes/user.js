const express = require('express')
const router = express.Router()

// define article ctrl
const userCtrl = require('../controllers/user')

// use ctrl functions acc to route
router.get('/register', userCtrl.showRegisterForm)
router.post('/register', userCtrl.verifyAndRegister)

// export router for use in def application file
module.exports = router