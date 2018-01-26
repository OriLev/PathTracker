const React = require('react');
const ReactDOM = require('react-dom');
require('./style.css');
const App = require('./components/App/App');

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
