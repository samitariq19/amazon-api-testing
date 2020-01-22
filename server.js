const path = require('path');
const express = require('express');
const https = require('https');
const fs = require('fs');
// const dotenv = require('dotenv');
const cors = require('cors');
// const connectDB = require('./config/db');


// load env vars
// dotenv.config({ path: './config/config.env' });

//connect to database
// connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
// app.use('/api/v1/stores', require('./routes/stores'));
app.get('/return', (req,res) => {
    res.send("Callback Confirmed");
    console.log("return route accessed");
});


// const PORT = process.env.PORT || 5000;
const PORT = 5000;

// app.listen(PORT, () => {
//     console.log(`Server running on ${process.env.NODE_ENV} on port ${PORT}`);
// });


var key = fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'));
var cert = fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt'));
var options = {
  key: key,
  cert: cert
};

// app = express()
app.get('/', (req, res) => {
   res.send('Now using https..');
});

var server = https.createServer(options, app);

server.listen(PORT, () => {
  console.log("server starting on port : " + PORT)
});