const mongoose = require('mongoose');
const bh = require('brawlhalla-api')(process.env.API_KEY);
require('dotenv').config();
let Player = require('../../models/player.model');
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      prettyPrint(),
      
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
function initEU(){

   
          for(i=1; i < 31; i++){
            const options = {
                "bracket": "1v1",
                "region": "eu",
                "page": i,
                "name": null
            };
           
            bh.getRankings(options).then(function(rankings){
              mongoose.set('useFindAndModify', false);
             
             
              rankings.forEach(element => {
               const filter = { brawlID: element.brawlhalla_id };
              const update = {player1dayRating: element.rating}
              const playerName = element.name
              const player1dayRating = element.rating
              const brawlID = element.brawlhalla_id
              const timesSearched = 0;
               //here we can do an if statement to check if the brawl id is in the database, if it is we update the 7dayRating if not we add the player to the database
              //  Player.findOneAndUpdate(filter, update).then(()=>{
              //    console.log('player updated')
                   //console.log(element)
                   const newPlayer = new Player({playerName,player1dayRating, timesSearched, brawlID})
                   newPlayer.save().then(() => console.log( `user ${playerName} added`)).catch(error=> 
            {logger.log({
              level: 'error', 
              message: error.message
            })})
                 
           
                 //if we find a matching brwalID in the database then we update the entry
               //})
              
              })
             //here we just want to add each user to the database
             //if we start with 5 pages of data for each region we shouldnt have too much
             //
            }).catch(function(error){
             console.log(error)
            })
            }
        }

module.exports = initEU