var request = require('request'),
	cheerio = require('cheerio'),
	url = require('url'),
	fs = require('fs'),
	urlToScrape,
	pattern,
	dirToSave;

// manage process args
urlToScrape = process.argv[2] || null;
pattern = process.argv[3] || 'a';
dirToSave = process.argv[4] || 'test';

//console.log(urlToScrape, pattern);

if (!urlToScrape) {
	console.log("No URL entered");
	exit;
}

request(urlToScrape, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		//console.log(body);
		fs.mkdirSync(dirToSave);
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