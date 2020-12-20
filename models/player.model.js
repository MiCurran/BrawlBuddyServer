const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  brawlID: {
    type: Number,
    required: true,
    unique: true,
  },
  playerName: {
    type: String, //asigns type
    required: true, //obviously
    //unique: true, //no users with the same name/
    trim: true, //trims whitespace from the end of usernames
    minlength: 1 //minimum length of 1 character
  },
  player1dayRating: {
    type: String,
    required: true,
    minLength: 2,
  },
  playerTrend: {
    type: Number,
  },
  timesSearched: {
    type: Number,
  },
  season18Rating: {
    type: Number,
  }
}, {
  timestamps: true, // adds a createdAt and updatedAt values
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;