import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './Redux/store'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 4000,
  offset: '30px',
  containerStyle: { fontSize: '12px' },
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
