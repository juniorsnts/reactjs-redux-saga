import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import reducers from './data/reducers';

const confStore = (sagaMiddleware) => {
    return createStore(
        reducers,
        applyMiddleware(sagaMiddleware)
    )
}

export default confStore;