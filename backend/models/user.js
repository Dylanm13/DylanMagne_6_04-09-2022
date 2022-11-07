/* importation des packages mongoose et mongoose-unique-validator */
const mongoose = require('mongoose')
const UniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, /* adresse email sous forme de string, requise et unique */
    password: { type: String, required: true } /* mot de passe sous forme de string et requis */
})

userSchema.plugin(UniqueValidator)

module.exports = mongoose.model('User', userSchema) /* exportation du model en lui donnant le nom User */