const Intervention = require("../models/Intervention");

exports.addIntervention = (req, res, next) => {
    const interventionObject = req.file ? new Intervention({
        ...JSON.parse(req.body.intervention),
        numAgent: req.auth.numAgent,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }) : new Intervention({
        ...req.body,
        numAgent: req.auth.numAgent,
    });

    /*const interventionObject = JSON.parse(req.body.intervention);
    const intervention = new Intervention({
        ...interventionObject,
        numAgent: req.auth.numAgent,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });*/

    /*const intervention = new Intervention({
        ...req.body,
        numAgent: req.auth.numAgent
    });*/

    interventionObject.save()
        .then( () => res.status(201).json({ success : "Intervention créée dans la base MongoDB"})) 
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
        .then( intervention => res.status(200).json({success: 'Intervention supprimée'}))
        .catch(error => res.status(400).json({ error })); 
};