const stories = require('../models/Story');

module.exports = {
	index: (req, res) => stories.all()
		.then(stories => res.render('story/index.html', { stories })),

	show: (req, res) => stories.find(req.params.title)
		.then(story => res.render('story/show.html', { story }))
};
