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

    var imagePrepend = 'http://images.geonet.org.nz/volcano/cameras/';

    var apiCall = syncrequest('GET', 'http://images.geonet.org.nz/volcano/cameras/all.json');
    var apiResult = JSON.parse(apiCall.getBody('utf8'));

    var volcanoResults = [];

    for (var i = 0; i < 10; i++) {
        try {

            var volcanoResult = {
                'title' : apiResult[i].features[0]['volcano-title'][0],
                'coordLong' : apiResult[i].features[0]['geometry'].coordinates[0],
                'coordLat' : apiResult[i].features[0]['geometry'].coordinates[1],
                'properties' : []
            };

            for (var j = 0; j < 5; j++) {
                try {
                    var volcanoProperty = {
                        'imageTitle' : apiResult[i].features[j].properties["title"],
                        'timestamp' : apiResult[i].features[j].properties["latest-timestamp"],
                        'imgFullUrl' : imagePrepend + apiResult[i].features[j].properties["latest-image-medium"]
                    };
                    volcanoResult.properties.push(volcanoProperty);
                }
                catch (err) { break; }
            }

            volcanoResults.push(volcanoResult);
        } catch (err) { break; }
    }

    res.render('index', {
        'headerTitle': 'Sparrow',
        'volcanoes' : volcanoResults
    });
});

app.get('/map', function (req, res) {

    var imagePrepend = 'http://images.geonet.org.nz/volcano/cameras/';

    var apiCall = syncrequest('GET', 'http://images.geonet.org.nz/volcano/cameras/all.json');
    var apiResult = JSON.parse(apiCall.getBody('utf8'));

    var volcanoResults = [];

    for (var i = 0; i < 10; i++) {
        try {

            var volcanoResult = {
                'title' : apiResult[i].features[0]['volcano-title'][0],
                'coordLong' : apiResult[i].features[0]['geometry'].coordinates[0],
                'coordLat' : apiResult[i].features[0]['geometry'].coordinates[1]
            };

            volcanoResults.push(volcanoResult);
        } catch (err) { break; }
    }

    res.render('map', {
        'headerTitle': 'Sparrow',
        'volcanoes' : volcanoResults
    });
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Falcon is watching on http://%s:%s", host, port)

});
