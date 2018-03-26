import request from '../../../core/utils/request';

export const login = (data) => request.post('/api/passport/login', data);