const express = require('express');
const router = express.Router();
const Condominium = require('../models/CondominiumModel');

router.get('/', (req, res) =>{
    Condominium.find({}, function(err, condominiuns) {
        var condominiunsMap = {};
    
        condominiuns.forEach(function(condominium) {
            condominiunsMap[condominium._id] = condominium;
        });
        
        res.send(condominiunsMap);  
      });
    });

router.get('/:condominiumId', (req, res) =>{
    const id = req.params.condominiumId;
    Condominium.findById(id).then(condominium => {
        if(condominium){
            res.status(200).json(condominium);
        } else{
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    }).catch(err => {
        res.status(500).json({ error : err})
    });
});

router.get('/:condominiumId', (req, res) =>{
    const id = req.params.condominiumId;
    Condominium.findById(id).then(condominium => {
        if(condominium){
            res.status(200).json(condominium);
        } else{
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    }).catch(err => {
        res.status(500).json({ error : err})
    });
});

router.post('/',(req, res) => {
    const condominium = new Condominium(req.body);
    console.log('condominium ->', condominium)
    condominium.save().then((result) => {
        res.status(201).json({
            createdCondominium: result
        });
    }).catch((err) => {
        console.log('err',err)
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:condominiumId', (req, res) =>{
    const id = req.params.condominiumId;
    Condominium.deleteOne({_id : id})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
});

router.put('/:condominiumId', (req, res) => {
    const id = req.params.condominiumId;
    Condominium.findOneAndUpdate({_id: id}, req.body, {upsert: true})
    .then(result => {
        res.status(200).json({message: "Condominium Succesfully updated"});  
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;