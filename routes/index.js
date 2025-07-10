const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// GET - Display all publications
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
  
module.exports = router;
