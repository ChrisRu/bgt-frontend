import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

import 'normalize.css';
import 'react-table/react-table.css';
import 'react-select/dist/react-select.css';
import './styles/master.css';
import 'leaflet/dist/leaflet.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
