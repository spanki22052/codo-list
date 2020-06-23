import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComponentsHolder from './components';

ReactDOM.render(
  <React.StrictMode>
    <ComponentsHolder />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
