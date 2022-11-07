const User = require('../models/user') /* importation du model User */
const bcrypt = require('bcrypt') /* importation du package bcrypt qui permet le hachage / cryptage de mot de passe */
const jwt = require('jsonwebtoken') /* importation de jwt qui permet de générer un token qui sera attitré à un utilisateur qui se connecte */
require('dotenv').config() /* importation de dotenv */

exports.signup = (req, res, next) => { /* permet de créer un nouvel utilisateur en créeant une nouvel instant de notre model User et en */
    bcrypt.hash(req.body.password, 10) /* hachant le password */
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur crée !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res ,next) => { /* permet de se connecter après avoir créer un compte en faisant concorder après vérification les données */
    User.findOne({ email: req.body.email }) /* d'identification (email et password) grâce à la méthode .findOne() nous comparons l'email rentrée */
    .then(user => {                         /* à celle de la base de données et nous comparons le mot de passe également grâce à la méthode compare */
        if (!user) {                        /* de bcrypt si tout se passe bien, nous retournons le userId ainsi qu'un token qui lui sera attitré et le temps qui'il peut rester login */
           return res.status(401).json({ message: 'Paire login/mot de passe incorrecte, espace interdit dans le mot de passe' })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte, espace interdit dans le mot de passe' }),
                console.log('toto')
            }
            res.status(200).json({ 
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.SECRET_TOKEN,
                    { expiresIn: '24h'}
                )
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}