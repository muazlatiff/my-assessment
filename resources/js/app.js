/**
 * First we will load all of this project's JavaScript dependencies.
 */

 window._ = require('lodash');

 window.axios = require('axios');
 window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

 window.Swal = require('sweetalert2');

//  try {
//     window.$ = window.jQuery = require('jquery');
// } catch (e) {}

// require('./bootstrap');

require('./utils');
