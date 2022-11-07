const jwt = require('jsonwebtoken') /* importation de jwt */
require('dotenv').config() /* importation de dotenv */

module.exports = (req, res, next) => { 
    try {
        const token = req.headers.authorization.split(' ')[1] /* récupération du token dans l'authorisation du header avec la fonction split */
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN) /* décodage du token grâce a la méthode verify de jwt en passant en argument le token aisni que la clé secrete */
        const userId = decodedToken.userId /* récupération du userId du token décodé */
        req.auth = {
            userId: userId /* ajout du userId à notre requête */
        }
        next()
    } catch(error) {
        res.status(401).json({ error })
    }
}