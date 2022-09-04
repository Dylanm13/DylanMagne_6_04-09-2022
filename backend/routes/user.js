const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')
const checkPassword = require('../middleware/check_password')
const checkEmail = require('../middleware/check_email')

router.post('/signup', checkEmail, checkPassword, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router