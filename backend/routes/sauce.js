const express = require('express')

const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

const sauceCtrl = require('../controllers/sauce')

const router = express.Router()

router.get("/", auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.updateSauce)
router.delete("/:id", auth, sauceCtrl.deleteSauce)



module.exports = router