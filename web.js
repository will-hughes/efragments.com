const express = require('express');
const path = require('path');
const assert = require('assert');
const nunjucks = require('./app/nunjucks');
const port = process.env.PORT || 8000;
const router = require('./app/router');
const client = require('redis').createClient({
	url: process.env.REDIS_URL
});

assert(process.env.STORY_PREFIX, 'Missing environment variable: STORY_PREFIX');
assert(process.env.REDIS_URL, 'Missing environment variable: REDIS_URL');
assert(process.env.CACHE_TIME, 'Missing environment variable: CACHE_TIME');

var app = express();

nunjucks.attachTo(app);

app
.use(express.static(path.join(__dirname, '/public')))
.use(router)
.listen(port, () => console.log('Listening on ' + port));
