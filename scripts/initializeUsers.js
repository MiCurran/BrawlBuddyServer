const mongoose = require('mongoose');
const ms = require('ms')
const bh = require('brawlhalla-api')(process.env.API_KEY);
let Player = require('../models/player.model');
const initSEA = require('./regions/initSEA')
const initUSE = require('./regions/initUSE')
const initUSW = require('./regions/initUSW')
const initEU = require('./regions/initEU')
const initBRZ = require('./regions/initBRZ')
const initAUS = require('./regions/initAUS')
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
 
 function initializeUsers (){

    //start of initial server set up to add users
setTimeout(
    initUSE,ms('10s'))
    setTimeout(
      initUSW,ms('15m'))
      setTimeout(
        initBRZ,ms('30m'))
        setTimeout(
          initEU,ms('45m'))
          setTimeout(
            initSEA,ms('60m'))
            setTimeout(
              initAUS,ms('75m'))
  //end initial server set up
}

module.exports = initializeUsers