$(function() {
	page('/', function(ctx, next) {
		console.log('fetch text file here');
	});

	page('/story/:title', function(ctx, next) {
		console.log(ctx.params.title);
	});

	page();
	// if (window.location.hash) {
	// 	var hash = window.location.hash.substring(1);
	// 	$.ajax({
	// 		url: '/stories/'+ hash + '.md',
	// 		success: function(data) {
	// 			$('#container').html(markdown.toHTML(data));
	// 		},
	// 		error: function() {
	// 			$('#container').html('Unable to load story. <a href="/">Back</a>');
	// 		}
	// 	});
	// }
});
