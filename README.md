snagfiles
=========

### Sangfiles is an extremely basic tool for downloading files scraped from html pages.  

Give it a URL and jquery-style selector, and it will find all links matching that selector and attempt to download whatever is on the other side.

Optionally, you can provide a director in which the downloaded files will be placed.

### Aguments
1) URL - the url to scrape
2) Selector - the selector used to find link elements that we'll attempt to download, defaults to "[href*='.pdf']"
3) An optional sub-directory in which to download, defaults "downloads"

### Example Usage

```bash
node scrape.js http://ebooks.library.cornell.edu/k/kmoddl/toc_brown1.html "[href*='.pdf']" brown

```