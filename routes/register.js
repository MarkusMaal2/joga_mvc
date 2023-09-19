const express = require('express')
const router = express.Router()

// define article ctrl
const registerCtrl = require('../controllers/register')

// use ctrl functions acc to route
router.get('/register', registerCtrl.showRegisterForm)

// export router for use in def application file
module.exports = router