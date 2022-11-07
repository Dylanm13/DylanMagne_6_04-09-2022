const express = require('express') /* importation d'express */

const multer = require('../middleware/multer-config') /* importation du middleware multrer */
const auth = require('../middleware/auth') /* importation du middleware auth */

const sauceCtrl = require('../controllers/sauce') /* importation du controller sauce */

const router = express.Router() /* création d'un routeur express */

router.get("/", auth, sauceCtrl.getAllSauces) 
router.get('/:id', auth, sauceCtrl.getOneSauce)
router.post("/", auth, multer, sauceCtrl.createSauce)
router.put("/:id", auth, multer, sauceCtrl.updateSauce)
router.delete("/:id", auth, sauceCtrl.deleteSauce)
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce)



module.exports = router /* exportation de nos routes express */