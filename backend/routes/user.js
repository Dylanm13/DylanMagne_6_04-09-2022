const express = require('express') /* importation d'express */
const router = express.Router() /* création d'un routeur express */

const userCtrl = require('../controllers/user') /*importation du controller user */
const checkPassword = require('../middleware/check_password') /* importation du middleware check_password */
const checkEmail = require('../middleware/check_email') /* importation du middleware check_email */

router.post('/signup', checkEmail, checkPassword, userCtrl.signup) 
router.post('/login', userCtrl.login)

module.exports = router /* exportation de nos routes express */