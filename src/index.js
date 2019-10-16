import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css'
import reducer from './reducer/index'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const STORE = createStore(reducer, composeEnhancers())

ReactDOM.render(<Provider store={STORE}><App /></Provider>, document.getElementById('root'));

