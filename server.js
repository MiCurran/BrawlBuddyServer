const express = require('express');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const initializeUsers = require('./scripts/initializeUsers')
const updateUsers = require('./scripts/updateUsers')

const helmet = require("helmet");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const key = process.env.BrawlBuddyAPI
app.use(cors());
app.use(express.json());
app.use(helmet());
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully!");
})

//home route
app.get('/', (req, res) => { res.send('Welcome to the Brawl-Buddy-API: Try and GET /players or /players/:brawlhalla_id')})

//players routes
const playersRouter = require('./routes/players')
app.use('/players', playersRouter);
app.post(`/updateUsers/${key}`, (req, res) => { res.send('attempting to update users') && updateUsers()})
app.post(`/initializeUsers/${key}`, (req, res) => { res.send('attempting to initialize users') && initializeUsers()})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}... Ready to analyze stats!`);
});