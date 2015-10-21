$(function() {
	page('/', function(ctx, next) {
		$.get('/stories.txt', function(data) {

			links = data.split('\n').map(function(l) { return l.trim(); });

			if (!links[links.length-1]) {
				// The last link might be a blank line, if so ignore it
				links.pop();
			}

			var template = '<a href="{{link}}"><h3>{{title}}</h3>{{#date}}<em>{{date}}</em>{{/date}}</a>';

			// Array of AJAX requests
			var storyRequests = links.map(function(link) {
				return $.get('/stories/' + link + '.md');
			});

			// When all requests are done, create an array of story objects
			$.when.apply(this, storyRequests).done(function() {
				var results = Array.prototype.slice.call(arguments);
				var stories = results.map(function(result, index) {

					// Search inside the rendered markdown for certain elements
					var rendered = $('<div>' + markdown.toHTML(result[0]) + '</div>');
					return {
						title: rendered.find('h1').text(),
						date: rendered.find('em').text(),
						link: '/story/' + links[index]
					};
				});

				// Render out all the objects into HTML
				$('#container').html(stories.map(function(story) {
					return '<a href="' + story.link + '">' +
						'<h3>' + story.title + '</h3>' +
						(story.date ? '<em>' + story.date + '</em>' : '') +
						'</a>';
				}).join("\n")).addClass('nav-list');
			});
		});
	});

	page('/story/:title', function(ctx, next) {
		$.get('/stories/' + ctx.params.title + '.md', function(data) {
			$('#container').html(markdown.toHTML(data)).removeClass();
		});
	});

	page();
});
