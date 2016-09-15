const stories = require('../models/Story');

module.exports = {
	index: (req, res) => {
		return res.render('story/index.html', {
			stories: stories.all()
		});
	},

	show: (req, res) => {
		let story = stories.find(req.params.title);
		return res.render('story/show.html', {
			content: story.content
		});
	}
};
