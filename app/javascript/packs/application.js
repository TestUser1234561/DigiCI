//Load react and redux
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

//import base app
import App from '../src/App';

render(
    <App />,
    document.getElementById('root')
);