/**
 * First we will load all of this project's JavaScript dependencies.
 */

 window._ = require('lodash');

 try {
    window.$ = window.jQuery = require('jquery');
} catch (e) {}

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// require('./bootstrap');
