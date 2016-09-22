const express = require('express');
const StoryController = require('./controllers/Stories');
const CacheController = require('./controllers/Cache');

module.exports = express.Router()
	.get('/', StoryController.index)
	.get('/cache', CacheController.index)
	.get('/favicon.ico', (req, res) => res.sendStatus(404))
	.get('/:title', StoryController.show);
