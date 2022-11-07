const express = require('express') /* importation d'express */
const mongoose = require('mongoose') /* importation de mongoose pour faire le lien avec la base de données MongoDB*/
const path = require('path') /* importation de path */
require('dotenv').config() /* importation du package dotenv */

const userRoutes = require('./routes/user') /* importation de nos routes express user */
const sauceRoutes = require('./routes/sauce') /* importation de nos routes express sauce */

mongoose.connect(process.env.MONGO_DB_SECRET, { useNewUrlParser: true, useUnifiedTopology: true }) /* initialisation de la connexion a MongoDB
  .then(() => console.log('Connexion à MongoDB réussie !'))                                           en rentrant la clé de la base de données*/
  .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
  })
  
app.use(express.json())

app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app