import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './core/containers/app';
import registerServiceWorker from './register-service-worker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
