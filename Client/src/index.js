import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


ReactDOM.render(
  <>
    <ReactNotification />
    <App />
  </>,
  document.getElementById('root')
);
