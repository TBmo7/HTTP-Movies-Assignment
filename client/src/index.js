import React from 'react';
import ReactDOM from 'react-dom';
import history from "./Movies/history"

import './index.css';
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router history = {history}>
    <App />
  </Router>,
  document.getElementById('root')
);
