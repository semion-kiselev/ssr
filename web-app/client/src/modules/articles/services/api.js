import request from 'core/utils/request';

export const loadArticles = () => request.get('/articles').then(res => res.data);