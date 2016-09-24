const entities = new (require('html-entities').AllHtmlEntities)();

const client = require('redis').createClient({
	url: process.env.REDIS_URL || null
});

const cacheTime = process.env.CACHE_TIME;

module.exports = {
	index: (req, res) => {
		let response = {};
		client.keys('*', (err, keys) => {
			if (err) return res.send(err);
			if (keys.length) {
				keys.forEach((key) => {
					client.get(key, (err, value) => {
						if (err) return res.send(err);
						client.ttl(key, (err, ttl) => {
							if (err) return res.send(err);
							response[`${key}-${ttl}`] = value;
							if (Object.keys(response).length === keys.length) {
								res.send(`<code><pre>${entities.encode(JSON.stringify(response, null, '\t'))}</pre></code>`);
							}
						});
					});
				});
			} else {
				res.send(response);
			}
		});
	},

	throughCache: (key, ttl, create) => new Promise((resolve, reject) => {

		if (typeof create === 'undefined') {
			create = ttl;
			ttl = cacheTime;
		}

		client.get(key, (err, result) => {
			if (err) return reject(err);
			if (result) return resolve(JSON.parse(result));

			create().then(value => {
				resolve(value);
				client.set(key, JSON.stringify(value));
				client.expire(key, ttl);
			});
		});
	})
};
