import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import confStore from './store';
import createSagaMiddleware from 'redux-saga';
import TodoSaga from './data/sagas/TodoSaga';

const sagaMiddleware = createSagaMiddleware();

const store = confStore(sagaMiddleware);

sagaMiddleware.run(TodoSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));