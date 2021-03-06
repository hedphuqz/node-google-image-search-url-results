// Based off https://tonicdev.com/tolmasky/google-image-search
// which was based of https://github.com/Filirom1/node-google-image-search

var rp = require('request-promise');
var cheerio = require('cheerio');

function imageSearch(query) {
    var URL = 'http://images.google.com/search?tbm=isch&q='+encodeURIComponent(query);

    return rp(URL)
    .then(function(html) {
        var $ = cheerio.load(html);
        var imgNodes = $('#ires td a img');
        // imgNodes is merely an array-like object, sigh.
        // This is purposedly old-school JS because newer stuff doesn't work:
        var urls = [];
        imgNodes.map(function(imgNodeIdx) {
            var imgNode = imgNodes[imgNodeIdx];
            urls.push(imgNode.attribs['src']);
        });
        return urls;
    });
}

module.exports = imageSearch;