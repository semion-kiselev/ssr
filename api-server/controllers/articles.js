const articlesData = require('../stubs/articles');
const {catchErrors} = require('../utils/errors');

exports.getArticles = catchErrors(
    async (req, res) => {
        const articles = await Promise.resolve(articlesData);
        res.json(articles);
    }
);