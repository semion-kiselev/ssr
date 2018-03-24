import {createAction, handleActions} from 'redux-actions';
import * as Api from './api';

const defaultState = {
    list: []
};

const SET_ARTICLES = 'SET_ARTICLES';

const setArticles = createAction(SET_ARTICLES);

export const loadArticles = () => (dispatch) =>
    Api.loadArticles().then(articles => dispatch(setArticles(articles)));

export default handleActions({
    SET_ARTICLES: (state, {payload}) => ({
        ...state,
        list: payload
    })
}, defaultState);

export const getArticlesSelector = state => state.articles.list;
