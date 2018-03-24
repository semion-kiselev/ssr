import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {login} from '../services/reducer';

class Login extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorStatus: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {email, password} = this.state;
        const {login, history} = this.props;

        login({email, password})
            .then(() => history.goBack())
            .catch(err => this.setState({errorStatus: err.response.status}));
    };

    render() {
        const {email, password, errorStatus} = this.state;

        return (
            <div>
                <h2>Login</h2>
                {
                    errorStatus && errorStatus === 401 &&
                    <p>Email or password is not correct. Try again)</p>
                }
                <form onSubmit={this.onSubmit}>
                    <p>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={e => this.setState({email: e.target.value})}
                            value={email}
                        />
                    </p>
                    <p>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            onChange={e => this.setState({password: e.target.value})}
                            value={password}
                        />
                    </p>
                    <p>
                        <button type="submit">Login</button>
                    </p>
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    {login}
)(Login);