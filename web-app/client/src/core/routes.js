import AppRoot from './containers/root';
import Home from './components/home';
import {ArticlesList} from '../modules/articles';
import {Login} from '../modules/auth';

const routes = [
    {
        component: AppRoot,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/articles',
                component: ArticlesList
            },
            {
                path: '/login',
                component: Login
            }
        ]
    }
];

export default routes;