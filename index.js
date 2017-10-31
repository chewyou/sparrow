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

app.get('/cameras/:volcanoId', function (req, res) {

    var volcanoId = req.params.volcanoId;

    console.log(volcanoId);

    var apiCall = syncrequest('GET', 'http://images.geonet.org.nz/volcano/cameras/'+volcanoId+'.json');

    var apiResult = JSON.parse(apiCall.getBody('utf8'));

    var volcanoTitle = apiResult.features;

    console.log(volcanoTitle);

    res.render('cameras', {
        'headerTitle': 'Cameras'
    });

});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Falcon is watching on http://%s:%s", host, port)

});
