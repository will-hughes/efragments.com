const express = require('express');
const path = require('path');
const nunjucks = require('./app/nunjucks');
const port = process.env.PORT || 8080;
const router = require('./app/router');

var app = express();

nunjucks.attachTo(app);

app
.use(express.static(path.join(__dirname, '/public')))
.use(router)
.listen(port, () => console.log('Listening on ' + port));
