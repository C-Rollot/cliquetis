const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// POST - Send a publication
router.post('/submit', (req, res) => {
    const { pseudo, histoire, allowVideo } = req.body;
  
    Post.create({
      pseudo,
      histoire,
      allowVideo
    })
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Erreur lors de la publication du récit.');
      });
  });

module.exports = router;
