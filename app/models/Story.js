const {
	throughCache
} = require('../controllers/Cache');

const request = require('request-promise');
const marked = require('marked');

const prefix = process.env.STORY_PREFIX;

let splitLines = content => content.split(/\r?\n/).filter(Boolean);

let getList = () => throughCache('list', () => request(`${prefix}/stories.txt`)).then(splitLines);

let getStory = story => throughCache(story, () => request(`${prefix}/stories/${story}.md`));

let toMarkdown = content => marked(content);

let extractMeta = content => /<h1 id="(.+)">(.+)</.exec(content).slice(1, 3);

let serialize = content => ({
	id: extractMeta(content)[0],
	title: extractMeta(content)[1],
	content
});

module.exports = {
	all: () => getList()
		.then(links => links.map(getStory))
		.then(Promise.all.bind(Promise))
		.then(stories => stories.map(toMarkdown))
		.then(stories => stories.map(serialize)),

	find: (id) => getStory(id)
		.then(toMarkdown)
		.then(serialize),
};
