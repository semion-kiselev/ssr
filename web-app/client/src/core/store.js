import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {articlesReducer} from '../modules/articles';
import {authReducer} from '../modules/auth';

export const reducers = combineReducers({
    articles: articlesReducer,
    auth: authReducer
});

if (typeof window === 'undefined') {
    global.window = {}
}

const store = createStore(
    reducers,
    window.stateData,
    applyMiddleware(thunkMiddleware)
);

export default store;