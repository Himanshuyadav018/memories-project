import React from 'react';
import reactDom from 'react-dom'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import reducers from './reducers'
import './index.css'

const Store = createStore(reducers, compose(applyMiddleware(thunk))) 

reactDom.render(
    <BrowserRouter>
    <Provider store={Store}>
        <App/>
    </Provider>
    </BrowserRouter>
, document.getElementById('root'))