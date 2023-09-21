const Joi  = require('joi');

const { book } = require('../../use-cases');
const exceptions = require('../../exceptions')



const makeCreateBookAction = require('./create-book');
const createBookAction = makeCreateBookAction({
    InternalServerError:exceptions.InternalServerError,
    createBook:book.createBook,
});

const makeUpdateBookAction = require('./update-book');
const updateBookAction = makeUpdateBookAction({
    InternalServerError:exceptions.InternalServerError,
    updateBook:book.updateBook,
});

const makeGetBookAction = require('./get-book');
const getBookAction = makeGetBookAction({
    InternalServerError:exceptions.InternalServerError,
    getBook:book.getBook,
});

const makeGetAllBookAction = require('./get-all-book');
const getAllBookAction = makeGetAllBookAction({
    InternalServerError:exceptions.InternalServerError,
    getAllBook:book.getAllBook,
});

const makeDeleteBookAction = require('./delete-book');
const deleteBookAction = makeDeleteBookAction({
    InternalServerError:exceptions.InternalServerError,
    deleteBook:book.deleteBook,
})




module.exports = Object.freeze({
    createBookAction,
    updateBookAction,
    getBookAction,
    getAllBookAction,
    deleteBookAction
})