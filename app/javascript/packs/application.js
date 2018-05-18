//Load react and redux
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//import base app
import App from '../src/App';
import { store } from "../src/reducers/reducers";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);