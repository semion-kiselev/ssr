const {forEachObjIndexed} = require('ramda');

const make404 = () => {
    const err = new Error('Not Found');
    err.status = 404;
    return err;
};

const make401 = () => {
    const err = new Error('Not Found');
    err.status = 401;
    return err;
};

exports.make404 = make404;
exports.make401 = make401;

exports.catchErrors = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(next);
    };
};

exports.notFound = (req, res, next) => {
    next(make404());
};

exports.validationErrors = (err, req, res, next) => {
    if (!err.errors) {
        return next(err);
    }

    const validatorErrors = {};
    forEachObjIndexed(
        (val, key) => validatorErrors[key === 'hash' ? 'password' : key] = val.message,
        err.errors
    );

    res.status(422).json(validatorErrors);
};

exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || '';

    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack.replace(/[a-z0-9_-]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    };

    res.status(err.status || 500).json(errorDetails);
};

exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).end();
};

