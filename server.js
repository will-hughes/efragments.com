const express = require('express');
const nunjucks = require('./app/nunjucks');
const path = require('path');
const port = process.env.PORT || 8000;
const router = require('./app/router');

var app = express();

nunjucks.attachTo(app);

app
.use(express.static(path.join(__dirname, '/public')))
.use(router)
.listen(port, () => console.log('Listening on ' + port));
