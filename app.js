require('dotenv').config();

const express = require ('express');
const path = require('path');
const app = express();
const db = require('./models');

app.set('view engine', 'ejs'); // EJS Template Engine
app.set('views', path.join(__dirname, 'views')); // File containing the views

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Static files (CSS)
app.use(express.urlencoded({ extended: true })); // To parse form data

const mainRoutes = require('./routes/index');
app.use('/', mainRoutes); // Use the main router

const port = 3000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connecté à la base de données.');

    await db.sequelize.sync({ alter: true });  // Create / update tables without losing data

    app.listen(port, () => {
      console.log(`Connecté sur le port ${port}.`);
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
};

startServer();
