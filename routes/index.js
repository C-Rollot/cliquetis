const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// GET - Afficher les récits
router.get('/', (req, res) => {
    Post.findAll({ order: [['created_at', 'DESC']] })
      .then(posts => {
        res.render('index', { posts });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Erreur lors du chargement des récits.');
      });
  });

// POST - Publier un récit
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
