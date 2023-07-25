const { constants } = require('../constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    const object = {
        title: null,
        message: err.message,
        stackTrace: err.stack,
    };

    switch (statusCode) {
        case constants.VALIDATION_ERROR : object.title = 'Validation Failed' ; break;
        case constants.NOT_FOUND        : object.title = 'Not Found'         ; break;
        case constants.UNAUTHORIZED     : object.title = 'Unauthorized'      ; break;
        case constants.FORBIDDEN        : object.title = 'Forbidden'         ; break;
        case constants.SERVER_ERROR     : object.title = 'Server Error'      ; break;
    }

    if (object.title) {
        res.json(object);
    }
};

module.exports = errorHandler;
