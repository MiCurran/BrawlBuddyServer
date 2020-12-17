const express = require('express');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const ms = require('ms')
const initializeUsers = require('./scripts/initializeUsers')
const updateUsers = require('./scripts/updateUsers')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully!");
})

// - start of initial server set up to add users
setTimeout(
  initializeUsers,ms('1m'))
//end initial server set up

// - start update routine
// - interval for each region as we did above but to findAndUpdate rather than just add a new user
// - this way we can update the 1 day change and compare it to the current ratings provided by the brawlhalla api
// - for dev & debug interval will be set at 2h in production we will set it to 24 hours to compare trend with current ranking from api
setInterval(
  updateUsers,ms('24h'))
// - end update routine

//home route
app.get('/', (req, res) => { res.send('Welcome to the Brawl-Buddy-API: Try and GET /players or /players/:brawlhalla_id')})

//players routes
const playersRouter = require('./routes/players')
app.use('/players', playersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}... Ready to analyze stats!`);
});