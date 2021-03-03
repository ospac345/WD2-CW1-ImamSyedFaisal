const express = require('express');
const app = express();
const path = require('path');
const mustache = require('mustache-express');

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const public = path.join(__dirname, 'public');
app.use(express.static(public));


const router = require('./routes/fitnessAppRoutes');
app.use('/', router);


app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
})