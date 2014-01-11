var request = require('request'),
	cheerio = require('cheerio'),
	url = require('url'),
	fs = require('fs'),
	urlToScrape,
	pattern,
	dirToSave;

// manage process args
urlToScrape = process.argv[2] || null;
pattern = process.argv[3] || "[href*='.pdf']";
dirToSave = process.argv[4] ? 'downloads/' + process.argv[4] : 'downloads';

//console.log(urlToScrape, pattern);

if (!urlToScrape) {
	console.log("Please provide a URL as the first argument.");
	process.exit();
}

// create downloads folder if it doesn't exist
fs.existsSync('downloads', function(exists) {
	console.log('exists: ', exists);
	if (!exists) {
		console.log('exists: ', exists);
		fs.mkdirSync('downloads');
	}
});

request(urlToScrape, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		// check if downloads dir exists
		fs.existsSync('downloads/'+dirToSave, function(exists) {
			if (!exists) {
				fs.mkdirSync('downloads/'+dirToSave);
			}
		});
		$ = cheerio.load(body);
		var count = 0;
		$(pattern).each(function() {
			var href = $(this).attr('href');
			var newUrl = url.resolve(urlToScrape, href);
			// clean href for saving
			href = href.replace('/', '_');
			request(newUrl).pipe(fs.createWriteStream(dirToSave + "/" + href));
			count += 1;
		});
	}
});