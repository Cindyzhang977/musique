const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser Middleware
app.use(bodyParser.json());
// Cors Middleware
app.use(cors());

// Database Config
const db = require('./config/key').mongoURI;

// Connect to Mongo
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('MongoDB Connected Successfully...'))
	.catch(err => console.log(err));

// Use Routes
const queues = require('./routes/queue');

app.use('/queue', queues)

// Ensure server is running
app.listen(port, () => {
	console.log(`Server is running on port: ${port}$`);
});