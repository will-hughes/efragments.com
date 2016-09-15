let lipsum = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>';

let stories = [
	{ title: 'Lorem', content: lipsum },
	{ title: 'Ipsum', content: lipsum },
	{ title: 'Dolor', content: lipsum },
	{ title: 'Sit', content: lipsum },
	{ title: 'Amet', content: lipsum },
	{ title: 'Consectetur', content: lipsum },
	{ title: 'Adipiscing', content: lipsum },
	{ title: 'Elit', content: lipsum },
	{ title: 'Sed', content: lipsum },
	{ title: 'Do', content: lipsum },
	{ title: 'Eiusmod', content: lipsum },
	{ title: 'Tempor', content: lipsum },
	{ title: 'Incididunt', content: lipsum }
].map(s => {
	s.key = s.title.toLowerCase();
	s.content = `<h3>${s.title}</h3>` + '\n\n' + s.content;
	return s;
});

module.exports = {
	all: () => stories,

	find: (key) => stories.find(story => story.key === key),

	where: (prop, val) => stories.filter(story => story[prop] === val)
};
