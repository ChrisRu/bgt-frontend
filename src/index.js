import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'normalize.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/master.css';

// eslint-disable-next-line
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
