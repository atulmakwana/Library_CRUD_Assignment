const DatabaseError = require('./database.error');
const ObjectAlreadyExistError = require('./object-already-exist.error');
const ObjectNotFoundError = require('./object-not-found.error');
const ValidationError = require('./validation.error');
const InternalServerError = require('./internal-server.error')

const exceptions = {
    ObjectAlreadyExistError,
    ObjectNotFoundError,
    ValidationError,
    DatabaseError,
    InternalServerError,
};

module.exports = exceptions