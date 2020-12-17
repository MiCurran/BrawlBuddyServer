const router = require('express').Router();
let Player = require('../models/player.model');

router.route('/').get((req, res) => { //users/ will run find in the db and display each user saved in the collection returned in JSON format
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Player.find({brawlID: req.params.id})
    .then(player => res.json(player))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;