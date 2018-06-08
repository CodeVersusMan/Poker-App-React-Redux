import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import AppContainer from './containers/AppContainer.js';
import { reducer } from './reducers/reducer.js';

const store = createStore(reducer);

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);