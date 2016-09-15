const nunjucks = require('nunjucks');

module.exports.attachTo = app => {

	const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('app/views'), {
		autoescape: true,
		trimBlocks: true,
		lstripBlocks: true,
		throwOnUndefined: true
	});

	env.express(app);

	return app;
};
