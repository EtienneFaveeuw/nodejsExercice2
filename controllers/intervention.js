const Intervention = require("../models/Intervention");

exports.addIntervention = (req, res, next) => {
    req.body.numAgent = req.auth.numAgent;
    const intervention = new Intervention({
        ...req.body
    });

    intervention.save()
        .then( () => res.status(201).json({ message : "Intervention créés dans la base MongoDB"})) 
        .catch( error => res.status(400).json({ error }));
};

exports.getAgentInterventions = (req, res, next) => {
    Intervention.find({numAgent: req.auth.numAgent})
        .then( interventions => res.status(200).json(interventions))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllInterventions = (req, res, next) => {
    Intervention.find()
        .then( interventions => res.status(200).json(interventions))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteAgentIntervention = (req, res, next) => {
    Intervention.deleteOne({_id: req.params.id, numAgent: req.auth.numAgent})
        .then( intervention => res.status(200).json({message: 'Intervention supprimés'}))
        .catch(error => res.status(400).json({ error })); 
};