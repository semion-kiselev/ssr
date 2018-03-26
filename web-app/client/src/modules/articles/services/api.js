import request from '../../../core/utils/request';
import {tokenHeader, apiServerHost, apiServerPort} from '../../../core/constants';

// token param is for ssr only
export const loadArticles = (token) => {
    let url = '/api/articles';

    // ssr
    if (global) {
        url = `${apiServerHost}:${apiServerPort}${url}`;
    }

    if (token) {
        request.defaults.headers.common[tokenHeader] = token;
    } else if (global) {
        request.defaults.headers.common[tokenHeader] = '';
    }

    return request.get(url).then(res => res.data);
};