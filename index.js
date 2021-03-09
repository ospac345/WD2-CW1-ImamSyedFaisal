const express = require('express');
const app = express();
const path = require('path');
const mustache = require('mustache-express');
const bodyParser = require("body-parser");



app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const public = path.join(__dirname, 'public');
app.use(express.static(public));

app.use(bodyParser.urlencoded({extended: false}));

const router = require('./routes/fitnessAppRoutes');
app.use('/', router);


app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})