require('dotenv').config();

const express = require ('express');
const path = require('path');
const app = express();
const db = require('./models');

app.set('view engine', 'ejs'); // Moteur de template EJS
app.set('views', path.join(__dirname, 'views')); // Dossier contenant les vues

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Fichiers statiques (CSS, images)
app.use(express.urlencoded({ extended: true })); // Pour parser les données du formulaire

const mainRoutes = require('./routes/index');
app.use('/', mainRoutes); // utilise le routeur principal

const port = 3000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connexion à la base OK');

    await db.sequelize.sync({ alter: true });  // crée/maj tables sans perdre les données

    app.listen(port, () => {
      console.log(`Connecté sur le port ${port}, test de la modif depuis la nouvelle branche Dev! modif 2 lol`);
    });
  } catch (error) {
    console.error('Erreur lors de la connexion à la base:', error);
  }
};

startServer();
