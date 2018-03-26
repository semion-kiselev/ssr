import express from 'express';
import httpProxy from 'http-proxy';
import cookieParser from 'cookie-parser';
import noFavicon from 'no-favicon';
import React from 'react';
import {renderToString} from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import routes from '../client/src/core/routes';
import {reducers} from '../client/src/core/store';
import {tokenKey} from '../client/src/core/constants';
import {setHasToken} from '../client/src/modules/auth';

const app = express();
const apiProxy = httpProxy.createProxyServer();
const apiUrl = 'http://localhost:4000';

app.use(noFavicon());
app.use(cookieParser());
app.use(express.static('../client/build', {index: false}));


app.all('/api/*', (req, res) => {
    apiProxy.web(req, res, {target: apiUrl});
});

app.get('*', (req, res) => {
    const store = createStore(reducers, applyMiddleware(thunk));

    const token = req.cookies[tokenKey];
    if (token) {
        store.dispatch(setHasToken(true));
    }

    const branch = matchRoutes(routes, req.url);
    const promises = branch.map(({route}) => {
        const fetchData = route.component.fetchData;
        return fetchData instanceof Function ? fetchData(store, token) : Promise.resolve(null)
    });

    return Promise.all(promises)
        .then(() => {
            let context = {};
            const content = renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        {renderRoutes(routes)}
                    </StaticRouter>
                </Provider>
            );

            res.set('Cache-Control', 'no-cache,no-store');
            res.send(htmlTmp(content, store.getState()));
        })
        .catch((err) => {
            if (err.response.status === 401) {
                return res.redirect('/login');
            }

            return res.status(err.response.status).end();
        });
});

function htmlTmp(content, state) {
    return `<!doctype html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>React Universal App</title>
                <link rel="stylesheet" href="/app.css">
            </head>
            
            <body>
                <div id="root">${content}</div>
                <script>
                    window.stateData = ${JSON.stringify(state)}
                </script>
                <script async src="/app.js"></script>
            </body>
        </html>`
}

const PORT = 9999;

app.listen(PORT, function() {
    console.log('http://localhost:' + PORT);
});
