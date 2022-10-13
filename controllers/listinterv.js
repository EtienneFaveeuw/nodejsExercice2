const Intervention = require("../models/Intervention");

exports.getAllIntervs = (req, res, next) => {
    Intervention.find()
        .then( interventions => {
            res.render('pages/index', { interventions: interventions});
        })
        .catch(error => res.status(400).json({ error }));
};