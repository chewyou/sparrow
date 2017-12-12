const {mix} = require('laravel-mix');
let path = require('path');

mix.webpackConfig({
    externals: {
        '$': 'jQuery',
        'jquery': 'jQuery'
    }
});

mix.setPublicPath(
    path.resolve(__dirname, 'public')
);

mix.js("src/js/main.js", "js/main.js");

mix.sass("src/css/style.css", "css/style.css");