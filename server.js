const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const mongoose = require('mongoose');

mongoose
.connect('mongodb://localhost/frienddb')
.then(mongo => {
  console.log('Successfully connected to database');
})
.catch(error => { 
  console.log('error connecting to the database', error)
});

const friendController = require('./Controllers/friendController')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
