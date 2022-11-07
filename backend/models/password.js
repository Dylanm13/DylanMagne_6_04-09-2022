/* importation du package password-validator qui va nous permettre de créer un schema de mot de passe plus sécurisé */
const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()

passwordSchema  
.is().min(10)   /* minimum 10 caractères */                                 
.is().max(64)   /* maximum 64 caractères */                                  
.has().uppercase()  /* majuscule(s) requise(s) */     
.has().lowercase()  /* minuscule(s) requise(s) */
.has().digits() /* numéro(s) requis */
.has().not().spaces() /* pas d'espaces */   

module.exports = passwordSchema /* exportation du model de mot de passe */