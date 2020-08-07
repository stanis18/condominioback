const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');

router.get('/:userId', (req, res) => {
    const id = req.params.userId;
    User.findById(id).then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'No valid entry found for provided ID' });
        }
      }).catch(err => {
        res.status(500).json({ error: err });
      });
  });

  router.post('/', (req, res) => {
    const user = new User(req.body);
    console.log('user ->', user)
    user.save().then(( result ) => {
        res.status(201).json({
          createdUser: result
        });
      }).catch(( err ) => {
          console.log('err', err)
        res.status(500).json({
          error: err
        });
      });
  });

  router.delete('/:userId', (req, res) => {
    const id = req.params.userId;
    User.deleteOne({ _id: id })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  router.put('/:userId', (req, res) => {
    const id = req.params.userId;
    User.findOneAndUpdate({ _id: id }, req.body, {upsert: true})
      .then(result => {
        res.status(200).json({message: "User Succesfully updated."});
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  module.exports = router;