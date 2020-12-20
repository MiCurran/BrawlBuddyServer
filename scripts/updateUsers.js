const mongoose = require('mongoose');
const ms = require('ms')
const bh = require('brawlhalla-api')(process.env.API_KEY);
let Player = require('../models/player.model');
const  updateSEA = require('./updateRegions/updateSEA')
const  updateUSE = require('./updateRegions/updateUSE')
const  updateUSW = require('./updateRegions/updateUSW')
const  updateEU = require('./updateRegions/updateEU')
const  updateBRZ = require('./updateRegions/updateBRZ')
const  updateAUS = require('./updateRegions/updateAUS')
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
 
 function updateUsers (){

    //start of update user routine
setTimeout(
    updateUSE,ms('10s'))
    setTimeout(
      updateUSW,ms('15m'))
      setTimeout(
        updateBRZ,ms('30m'))
        setTimeout(
          updateEU,ms('45m'))
          setTimeout(
            updateSEA,ms('60m'))
            setTimeout(
              updateAUS,ms('75m'))
  //end update user routine
}

module.exports = updateUsers