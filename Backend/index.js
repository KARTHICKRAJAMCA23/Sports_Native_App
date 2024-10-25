var dotenv = require('dotenv').config();
const { URL } = require('url');
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;
const bodyparser = require("body-parser");
var data = require('./config/database');
data;
const cors = require('cors');
app.use(cors());

var userrouter = require('./router/sportsrouter');
var playerrouter = require('./router/playerrouter');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

// Add a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Sports Event Management API!');
});

// Use your routers
app.use('/', userrouter);
app.use('/', playerrouter);

app.listen(PORT, function () {
    console.log(`Server is running on the port ${PORT}`);
});
