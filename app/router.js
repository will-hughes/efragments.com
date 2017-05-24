const express = require('express');
const StoryController = require('./controllers/Stories');

module.exports = express.Router()
	.get('/', StoryController.index)
	.get('/favicon.ico', (req, res) => res.sendStatus(404))
	.get('/:title', StoryController.show);
