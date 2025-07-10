const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { postSchema } = require('../validators/postValidator');

// POST - Send a publication
router.post('/submit', (req, res) => {
  console.log(req.body);

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
        const errorMessages = err.details.map(detail => detail.message).join('<br>');
        res.status(400).send(`Erreur de validation :<br>${errorMessages}`);
      } else {
        console.error(err);
        res.status(500).send("Erreur serveur lors de la publication.");
      }
    });
});

module.exports = router;
