const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
   Agent.findOne({numAgent: req.body.numAgent, grade: req.body.grade})
        .then( user => {
            //Si pas d'utilisateur avec cette adresse
            if (!user) {
               return res.status(401).json({message :  "numAgent/grade/mdp incorect"});
            }

            //Si je trouve le user
            bcrypt.compare(req.body.password, user.password)
            .then( passOK => {
                if (!passOK) {
                    return res.status(401).json({message :  "numAgent/grade/mdp incorect"});
                }

                res.status(200).json({
                    token: jwt.sign({numAgent: user.numAgent}, "RANDOM_TOKEN_SECRET", {expiresIn: '24h'})
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

exports.registerAgent = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then( hash => {
        //CREATION DU USER
        const agent = new Agent({
            numAgent: req.body.numAgent,
            grade: req.body.grade,
            password: hash
        })

        //SAUVEGARDE EN BD
        agent.save()
            .then( () => {
                res.status(201).json({numAgent: agent.numAgent})
            })
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updateAgent = (req, res, next) => {
    Agent.findOne({numAgent: req.auth.numAgent})
    .then( user => {
        if (!user) {
            return res.status(401).json({message :  "L'agent n'existe pas"});
        }

        Agent.updateOne({numAgent: req.auth.numAgent}, {grade: req.body.grade})
            .then( user => res.status(200).json({success: 'Update ok !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};