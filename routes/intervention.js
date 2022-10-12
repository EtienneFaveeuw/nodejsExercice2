const express = require('express');
const routeur = express.Router();
const interventionCtrl = require('../controllers/intervention');
const auth = require('../middleware/auth');

//POST
/*Enregistrer une intervention*/
routeur.post("/", auth, interventionCtrl.addIntervention);

//GET
/*Récupérer les interventions d'un agent*/
routeur.get("/", auth, interventionCtrl.getAgentInterventions);

//GET
/*Récupérer toutes les interventions de la base*/
routeur.get("/all", interventionCtrl.getAllInterventions)

//DELETE
/*Supprimer une intervention d'un agent*/
routeur.delete("/:id", auth, interventionCtrl.deleteAgentIntervention)

module.exports = routeur;