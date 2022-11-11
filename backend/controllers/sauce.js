const Sauce = require("../models/Sauce") /* importation du model Sauce */
const fs = require('fs')

exports.getAllSauces = (req, res, next) => { /* permet de récupérer toute les sauces stockées dans la base de données grâce à la méthode */
  Sauce.find()                               /* .find() qui renvoie un tableau */
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }))
}

exports.getOneSauce = (req, res, next) => { /* permet de récupérer une seule sauce grâce à la méthode .findOne() en trouvant la sauce unique */
  Sauce.findOne({ _id: req.params.id })     /* ayant pour id le même que le paramètre de la requête */
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
}

exports.createSauce = (req, res, next) => { /* permet de créer une sauce en créant une nouvelle instance de notre model Sauce qui va avoir */
  const sauceObject = JSON.parse(req.body.sauce) /* pour objet toutes les information dont on a besoin grâce à l'opérateur '...' spread */
  delete sauceObject._id                         /* qui va copier les champs présent dans le corps de la requête en supprimant en amont le faux */
  const sauce = new Sauce({                      /* id retourné par le fontend */
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersdisLiked: [' '],
  })
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }))
};

exports.updateSauce = (req, res, next) => { /* permet de modifier une sauce grâce à la méthode .updateOne() qui modifie la sauce passée en */
  const sauceObject = req.file ?            /* premier argument par les éléments de notre deuxième argument */
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body }  /* fs.unlink a verifier */

   Sauce.findOne({_id: req.params.id})
       .then((sauce) => {
           if (sauce.userId != req.auth.userId) {
               res.status(403).json({ message : 'Not authorized'});
           } else {
               Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
               .then(() => res.status(200).json({message : 'Objet modifié!'}))
               .catch(error => res.status(401).json({ error }));
           }
       })
       .catch((error) => {
           res.status(400).json({ error });
       });
}

exports.deleteSauce = (req, res, next) => { /* permet de supprimer une sauce en récupérant son id */
  Sauce.findOne({ _id : req.params.id })
  .then(sauce => {
    if (sauce.userId != req.auth.userId) {
      res.status(403).json({ message : 'Not authorized'});
    } else {
    const filename = sauce.imageUrl.split("/images/")[1]
    fs.unlink(`images/${filename}`, () => {
    Sauce.deleteOne({_id : req.params.id})
  .then(res.status(200).json({ message: "Sauce supprimée" }))
  .catch(error => res.status(400).json({ error }))
    })
    }
  })
  .catch(error => res.status(500).json({ error }))
}

exports.likeDislikeSauce = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id
  
  switch (like) {
    case 1 : /* permet de push un like sur la sauce (ce like sera attaché a un userId pour ne pas qu'un seul user puisse mettre plusieur likes) */
    Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
      if (!sauce.usersLiked.includes(userId)) {
        Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
        .then(() => res.status(200).json({ message: `J'aime` }))
        .catch((error) => res.status(400).json({ error }))
        console.log('LIKE +1')
      } else {
        res.status(400).json({ message: 'Vous ne pouvez plus' })
      }
           })
           .catch((error) => res.status(404).json({ error }))
      break

    case 0 : /* permet d'être ou de retourner a une situation neutre ou l'utilisateur ne like ou dislike pas le sauce */
        Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
           else if (sauce.usersDisliked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break

    case -1 : /* permet de push un dislike sur la sauce (ce like sera attaché a un userId pour ne pas qu'un seul user puisse mettre plusieur likes) */
    Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
            if (!sauce.usersDisliked.includes(userId)) {
        Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
          .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
          .catch((error) => res.status(400).json({ error }))
            }
           })
           .catch((error) => res.status(404).json({ error }))
      break
      
      default:
        res.status(400).json({ message: 'toto' })
  }
}