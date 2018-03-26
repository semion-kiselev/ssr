import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {hasTokenSelector, logout, setHasToken} from '../../modules/auth';
import {tokenKey, tokenHeader} from '../constants';
import {getCookie} from '../utils/cookie';
import request from '../utils/request';

class AppRoot extends Component {
    constructor(props) {
        super(props);

        const token = getCookie(tokenKey);
        if (token) {
            props.setHasToken(true);
            request.defaults.headers.common[tokenHeader] = token;
        }
    }

    onLogout = (e) => {
        const {logout, history} = this.props;

        e.preventDefault();
        logout();
        history.push('/');

    };

    render() {
        const {route, hasToken} = this.props;

        return (
            <div>
                <h2>React Universal App</h2>
                <NavLink to="/">Home</NavLink>
                {hasToken && <NavLink to="/articles">Articles</NavLink>}
                {hasToken && <a href="" onClick={this.onLogout}>Logout</a>}
                {!hasToken && <NavLink to="/login">Login</NavLink>}

                <div>
                    {renderRoutes(route.routes)}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({hasToken: hasTokenSelector(state)}),
    {logout, setHasToken}
)(AppRoot);