$(function() {
	page('/', function(ctx, next) {
		$.get('/stories.txt', function(data) {

			links = data.split('\n').map(function(l) { return l.trim(); });

			if (!links[links.length-1]) {
				// The last link might be a blank line, if so ignore it
				links.pop();
			}

			var template = '<a href="{{link}}"><h3>{{title}}</h3>{{#date}}<em>{{date}}</em>{{/date}}</a>';

			var storyRequests = links.map(function(link) {
				return $.get('/stories/' + link + '.md');
			});

			$.when.apply(this, storyRequests).done(function() {
				var results = Array.prototype.slice.call(arguments);
				var stories = results.map(function(result, index) {
					var rendered = $('<div>' + markdown.toHTML(result[0]) + '</div>');
					return {
						title: rendered.find('h1').text(),
						date: rendered.find('em').text(),
						link: '/story/' + links[index]
					};
				});

				$('#container').html(stories.map(function(story) {
					return Mustache.render(template, story);
				}).join("\n")).addClass('nav-list');
			});
		});
	});

	page('/story/:title', function(ctx, next) {
		$.get('/stories/' + ctx.params.title + '.md', function(data) {
			$('#container').html(markdown.toHTML(data));
		});
	});

	page();
});
