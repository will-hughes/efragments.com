$(function() {
	page('/', function() {
		$.get('/front.txt', function(data) {

			links = data.split('\n').map(function(l) { return l.trim(); });

			if (!links[links.length-1]) {
				// The last link might be a blank line, if so ignore it
				links.pop();
			}

			links = links.map(function(link) {
				var isSeries = /^series/.test(link);
				return {
					link: link,
					type: (isSeries ? 'series' : 'story'),
					req: (isSeries ? true : $.get('/stories/' + link + '.md'))
				};
			});

			// When all requests are done
			$.when.apply(this, links.map(function(l) { return l.req; })).then((function() {

				var results = Array.prototype.slice.call(this);

				// Create story objects by searching inside the rendered markdown for certain elements
				var stories = results.map(function(result) {
					var ret;
					var renderFunc = function() {
						return '<a href="' + this.link + '">' +
						'<h3>' + this.title + '</h3>' +
						(this.date ? '<em>' + this.date + '</em>' : '') +
						'</a>';
					};

					if (result.type === 'story') {
						var rendered = $('<div>' + markdown.toHTML(result.req.responseText) + '</div>');

						ret = {
							title: rendered.find('h1').text(),
							date: rendered.find('em').text(),
							link: '/story/' + result.link,
							render: renderFunc
						};
					} else {
						var number = result.link.split('series-')[1];
						ret = {
							number: number,
							title: 'Series ' + number,
							link: '/series/' + number,
							render: renderFunc
						};
					}

					return ret;
				});

				// Render out all the objects into HTML
				$('#container')
					.html(stories.map(function(story) {
						return story.render();
					}).join("\n"))
					.removeClass()
					.addClass('nav-list');

			}).bind(links));
		});
	});

	page('/story/:title', function(ctx) {
		$.get('/stories/' + ctx.params.title + '.md', function(data) {
			$('#container').html(markdown.toHTML(data)).removeClass();
		});
	});

	page('/series/:series', function(ctx) {
		var ids = [];
		for (var i = 1; i <= 32; i++) {
			var num = i;
			if (i < 10) {
				num = '0' + i;
			}
			ids[i] = '' + num;
		}

		var letter = 'abcdefghijklmnopqrstuvwxyz'[ctx.params.series-1];

		var srcs = ids.map(function(id) {
			return '<img src="/images/series-' + ctx.params.series + '/' + letter + id + '.gif">';
		}).join("\n");

		$('#container')
			.html(srcs)
			.removeClass()
			.addClass('series');
	});

	page();
});
