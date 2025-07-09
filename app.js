require('dotenv').config();

const express = require ('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs'); // Moteur de template EJS
app.set('views', path.join(__dirname, 'views')); // Dossier contenant les vues

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Fichiers statiques (CSS, images)
app.use(express.urlencoded({ extended: true })); // Pour parser les données du formulaire

const mainRoutes = require('./routes/index');
app.use('/', mainRoutes); // utilise le routeur principal

const port = 3000;

app.listen(port, () => {
    console.log(`Connecté sur le port ${port}.`)
});
