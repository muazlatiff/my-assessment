// Template : https://material-ui.com/components/

window.React = require('react');
window.ReactDOM = require('react-dom');

import View from '../react-components/View-Pages/gorestPage';

ReactDOM.render(
    React.createElement(View),
    document.querySelector('#react-container')
);
