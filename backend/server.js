const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// For spotify testing
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser Middleware
app.use(bodyParser.json());
// Cors Middleware
app.use(cors());
// Cookieparser Middleware
app.use(cookieParser());

// Database Config
const db = require('./config/key').mongoURI;

// Connect to Mongo
mongoose.connect(db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('MongoDB Connected Successfully...'))
	.catch(err => console.log(err));

// Use Routes
const parties = require('./routes/party');
const spotify = require('./routes/spotify');

app.use('/party', parties);
app.use('/spotify', spotify);

// Ensure server is running
app.listen(port, () => {
	console.log(`Server is running on port: ${port}$`);
});
