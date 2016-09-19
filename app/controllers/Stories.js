const stories = require('../models/Story');

module.exports = {
	index: (req, res) => res.render('story/index.html', {
		stories: stories.all()
	}),

	show: (req, res) => res.render('story/show.html', stories.find(req.params.title))
};
