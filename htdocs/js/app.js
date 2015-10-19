$(function() {
	page('/', function(ctx, next) {
		$.get('/stories.txt', function(data) {

			links = data.split('\n').map(function(l) {return l.trim();});

			if (links[links.length-1] === '') {
				links.pop();
			}

			var count = 0;
			var assembled = '';

			links.forEach(function(link) {
				$.get('/stories/' + link + '.md', function(data) {

					var title = $(markdown.toHTML(data))[0].textContent;

					assembled += '<p><a href="/story/' + link + '">' + title + '</a></p>\n';

					if (++count === links.length) {
						$('#container').html(assembled);
					}
				});
			});
		});
	});

	page('/story/:title', function(ctx, next) {
		var title = ctx.params.title;
		console.log(title);
		$.get('/stories/' + title + '.md', function(data) {
			$('#container').html(markdown.toHTML(data));
		});
	});

	page();
});
