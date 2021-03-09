/**
 * First we will load all of this project's JavaScript dependencies.
 */

 window.axios = require('axios');
 window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
 // for authenticated request
 if( document.querySelector('meta[name="token"]') ) {
     window.axios.defaults.headers.common['Authorization'] = `Bearer ${document.querySelector('meta[name="token"]').content}`;
 }

 window.Swal = require('sweetalert2');

require('./utils');
