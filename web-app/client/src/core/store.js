import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {articlesReducer} from 'modules/articles';
import {authReducer} from 'modules/auth';

const store = createStore(
    combineReducers({
        articles: articlesReducer,
        auth: authReducer
    }),
    window.__INITIAL_STATE__,
    applyMiddleware(thunkMiddleware)
);

window.store = store;

export default store;