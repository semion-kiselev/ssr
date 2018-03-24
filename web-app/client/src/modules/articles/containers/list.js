import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {loadArticles, getArticlesSelector} from '../services/reducer';

class ArticlesList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        if (!this.props.articles.length) {
            this.startLoading();
            this.loadArticles();
        }
    }

    startLoading() {
        this.setState({isLoading: true});
    }

    endLoading() {
        this.setState({isLoading: false});
    }

    loadArticles() {
        const {loadArticles, history} = this.props;

        loadArticles()
            .then(() => this.endLoading())
            .catch(err => {
                this.endLoading();
                if (err.response.status === 401) {
                    history.replace('/login');
                }
            });
    }

    render() {
        const {articles} = this.props;
        const {isLoading} = this.state;

        return (
            <div>
                {isLoading && <div>Loading...</div>}
                {
                    !!articles.length && articles.map(
                        ({title, content}) => (
                            <div key={title}>
                                <h2>{title}</h2>
                                <p>{content}</p>
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        articles: getArticlesSelector(state)
    }),
    {
        loadArticles
    }
)(ArticlesList);
