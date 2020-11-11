import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import Routes from './routes';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';

import reducers from './store/reducers/index';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)




ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
