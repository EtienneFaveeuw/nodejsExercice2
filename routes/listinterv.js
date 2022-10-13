const express = require('express');
const routeur = express.Router();
const listintervCtrl = require('../controllers/listinterv');

routeur.get('/', listintervCtrl.getAllIntervs);

module.exports = routeur;