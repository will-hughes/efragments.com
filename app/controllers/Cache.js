const client = require('redis').createClient({
	url: process.env.REDIS_URL || null
});

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
							response[`${key}-${ttl}`] = value;
							if (Object.keys(response).length === keys.length) {
								res.send(response);
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
