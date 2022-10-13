const express = require('express');
const routeur = express.Router();
const agentCtrl = require('../controllers/agent');
const auth = require('../middleware/auth');

//POST
/*Enregistrer un agent*/
routeur.post("/register", agentCtrl.registerAgent);

//POST
/*Se connecter*/
routeur.post("/login", agentCtrl.login);

//POST
/*Mettre à jour un agent(grade)*/
routeur.post("/update", auth, agentCtrl.updateAgent)

module.exports = routeur;