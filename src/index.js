// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import * as serviceWorker from './serviceWorker';

import React from 'react';
import { render } from 'react-dom';

import About from './components/About.js';
import Home from './components/Home';
import Topics from './components/Topics';


import { Router, Route, Link } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'

const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        router: routerReducer,
    }),
    composeEnhancers(
        applyMiddleware(middleware, logger)
    )
);

const BasicExample = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
    </div>
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history} store={store}>
            <Router history={history}>
                <BasicExample />
            </Router>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
