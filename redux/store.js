import { createStore } from 'redux';

import rootReducer from './reducers/index';

export default function configureStore(intiialState) {
    const store = createStore(rootReducer, intiialState);
    return store;
}