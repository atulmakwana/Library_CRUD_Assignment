const Joi  = require('joi');

const { bookDb } = require('../../data-access');
const exceptions = require('../../exceptions')



const makeCreateBook = require('./create-book');
const createBook = makeCreateBook({
    Joi, 
    ValidationError:exceptions.ValidationError,
    ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
    getDbBookByData:bookDb.getDbBookByData,
    createDbBook:bookDb.createDbBook
});

const makeUpdateBook = require('./update-book');
const updateBook = makeUpdateBook({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    ObjectAlreadyExistError:exceptions.ObjectAlreadyExistError,
    getDbBook:bookDb.getDbBook,
    getDbBookByData:bookDb.getDbBookByData,
    updateDbBook:bookDb.updateDbBook,
});

const makeGetBook = require('./get-book');
const getBook = makeGetBook({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbBook:bookDb.getDbBook,
});

const makeGetAllBook = require('./get-all-book');
const getAllBook = makeGetAllBook({
    getDbAllBook:bookDb.getDbAllBook
});

const makeDeleteBook = require('./delete-book');
const deleteBook = makeDeleteBook({
    Joi,
    ValidationError:exceptions.ValidationError,
    ObjectNotFoundError:exceptions.ObjectNotFoundError,
    getDbBook:bookDb.getDbBook,
    deleteDbBook:bookDb.deleteDbBook,
})




module.exports = Object.freeze({
    createBook,
    updateBook,
    getBook,
    getAllBook,
    deleteBook
})