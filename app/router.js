const express = require('express');
const StoryController = require('./controllers/Stories');

module.exports = express.Router()
.get('/', StoryController.index)
.get('/:title', StoryController.show);
