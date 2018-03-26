import {createAction, handleActions} from 'redux-actions';
import request from '../../../core/utils/request';
import {tokenKey, tokenHeader} from '../../../core/constants';
import {setCookie, unsetCookie} from '../../../core/utils/cookie';
import * as Api from './api';

const defaultState = {
    hasToken: false
};

const SET_HAS_TOKEN = 'SET_HAS_TOKEN';

export const setHasToken = createAction(SET_HAS_TOKEN);

export const login = (data) => (dispatch) =>
    Api.login(data).then(res => res.data).then(({token}) => {
        dispatch(setHasToken(true));
        request.defaults.headers.common[tokenHeader] = token;
        setCookie(tokenKey, token);
    });

export const logout = () => (dispatch) => {
    dispatch(setHasToken(false));
    delete request.defaults.headers.common[tokenHeader];
    unsetCookie(tokenKey);
};

export default handleActions({
    SET_HAS_TOKEN: (state, {payload}) => ({
        ...state,
        hasToken: payload
    })
}, defaultState);

export const hasTokenSelector = state => state.auth.hasToken;