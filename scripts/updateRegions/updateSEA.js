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
 
 function updateSEA (){
    for(i=1; i < 31; i++){
      const options = {
          "bracket": "1v1",
          "region": "sea",
          "page": i,
          "name": null
      };
     
      bh.getRankings(options).then(function(rankings){
        mongoose.set('useFindAndModify', false);
       
       
        rankings.forEach(element => {
        const filter = { brawlID: element.brawlhalla_id };
        const update = {player1dayRating: element.rating, playerName: element.name}
        const playerName = element.name
          Player.findOneAndUpdate(filter, update).then(() => console.log( `user ${playerName} updated`)).catch(error=> 
      {logger.log({
        level: 'error', 
        message: error.message
      })})        
        })}).catch(function(error){
       console.log(error)
      })
      }//end for loop
  }
  module.exports = updateSEA