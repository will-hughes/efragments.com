const marked = require('marked');
const fs = require('fs');

const load = filename => new Promise((resolve, reject) => {
	fs.readFile(`stories/${filename}`, `utf-8`, (err, data) => {
		if (err) return reject(err);
		return resolve(data);
	});
});

let splitLines = content => content.split(/\r?\n/).filter(Boolean);

let getList = () => load(`stories.txt`).then(splitLines);

let getStory = story => load(`stories/${story}.md`);

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
