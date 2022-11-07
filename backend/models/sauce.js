/* importation du package mongoose pour pouvoir faire le lien avec la base de donnnées MongoDB */
const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, /* l'utilisateur créant / modifiant / supprimant une sauce sera reconnu grâce à son userId */ 
  name: { type: String, required: true }, /* nom de la sauce */
  manufacturer: { type: String, required: true}, /* frabricant de la sauce */
  description: { type: String, required: true }, /* description de la sauce */
  mainPepper: { type: String, required: true}, /* piment principal de la sauce */
  imageUrl: { type: String, required: true }, /* image de la sauce */
  heat: { type: Number, required: true}, /* l'échelle d'épice de la sauce */
  likes: { type: Number, required: true }, /* likes de la sauce */
  dislikes: { type: Number, required: true}, /* dislikes de la sauce */
  usersLiked: { type: [String], required: true }, /* ce que l'utilisateur a liké reconnaissable par le userId */
  usersDisliked: { type: [String], required: true}, /* ce que l'utilisateur a disliké reconnaissable par le userId */
})

module.exports = mongoose.model('Sauce', sauceSchema) /* exportaion du model en lui donnant le nom 'Sauce' */