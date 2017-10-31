var express = require('express');
var app = express();
var fs = require("fs");
var request = require('request');
var path = require('path');
var wait = require('wait.for');
var syncrequest = require('sync-request');

app.use(express.static(__dirname + '/public'));

app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        'headerTitle': 'Sparrow'
    });
});

app.get('/cameras', function (req, res) {
    var apiKey = 'bce54dd64423ffa964d74060c4957bd2';
    var search = req.query.searchinput;

    //get number of pages
    var pagesResult = syncrequest('GET', 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + search);

    var pages = JSON.parse(pagesResult.getBody('utf8'));
    var totalResults = pages.total_results;
    pages = pages.total_pages;

    var allResults = [];

    // for each page, make a request using the page number
    for (var pageNumber = 1; pageNumber <= pages; pageNumber++) {

        var movieResults = syncrequest('GET', 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + search + '&page=' + pageNumber);
        var movies = JSON.parse(movieResults.getBody('utf8'));

        for (var i = 0; i < 20; i++) {
            try {
                // add result to an object and push to array:
                var movie = {
                    'title' : movies.results[i]['title'],
                    'vote_average' : movies.results[i]['vote_average'],
                    'poster_path' : movies.results[i]['poster_path'],
                    'release_date' : movies.results[i]['release_date']
                };
                allResults.push(movie);
            } catch (err) {
                break;
            }
        }
    }

    //send allResults to the front end
    res.render('movie-search', {
        'headerTitle': 'Falcon Search',
        'searchTerm': search,
        'totalResults': totalResults,
        'movie': allResults
    });

});


var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Falcon is watching on http://%s:%s", host, port)

});
