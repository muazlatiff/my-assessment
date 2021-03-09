const mix = require('laravel-mix');
const fs = require('fs');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        require('tailwindcss'),
    ]);

let customJsDir = 'resources/js/pages';
[
    'register.js',
    'login.js',
    'users.js',

].forEach(js => {
    mix.js(`${customJsDir}/${js}`, 'public/js/pages/');
    mix.copyDirectory(`public/js/pages/${js}`, `${customJsDir}/min/${js}`)
        .then(function() {
            // comment this when npm run watch
            fs.unlinkSync(`public/js/pages/${js}`);
        });
});
