const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { postSchema } = require('../validators/postValidator');

// POST - Send a publication
router.post('/submit', (req, res) => {
  // Convertir la checkbox en booléen
  const data = {
    ...req.body,
    allowVideo: req.body.allowVideo === 'on'
  };

  postSchema.validateAsync(data)
    .then(validatedData => {
      return Post.create(validatedData);
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      if (err.isJoi) {
        // Récupérer les posts existants + afficher erreurs
        Post.findAll({ order: [['created_at', 'DESC']] })
          .then(posts => {
            const errorMessages = err.details.map(detail => detail.message);
            res.render('index', {
              posts,
              errors: errorMessages
            });
          })
          .catch(fetchError => {
            console.error(fetchError);
            res.status(500).send("Erreur serveur lors du chargement des récits.");
          });
      } else {
        console.error(err);
        res.status(500).send("Erreur serveur lors de la publication.");
      }
    });
});

module.exports = router;
