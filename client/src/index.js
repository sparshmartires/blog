import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
// import store from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./services/store";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
<App />
</PersistGate>
  </Provider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
