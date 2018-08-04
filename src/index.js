import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import App from './App';
import rootReducer from './reducers/root';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();