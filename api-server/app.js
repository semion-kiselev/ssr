const express = require('express');
const passport = require('passport');
require('./config/passport');
const passportRouter = require('./routes/passport');
const articlesRouter = require('./routes/articles');
const {jwtBarier} = require('./middlewares');
const {notFound, validationErrors, developmentErrors, productionErrors} = require('./utils/errors');

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/articles', jwtBarier, articlesRouter);
app.use('/passport', passportRouter);

app.use(notFound);
app.use(validationErrors);
app.use(app.get('env') === 'development' ? developmentErrors : productionErrors);

module.exports = app;
