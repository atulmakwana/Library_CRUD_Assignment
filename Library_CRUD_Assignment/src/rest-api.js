const express= require('express');
const router=express.Router();

const controllers = require('./controllers');

router.get('/book/:id', controllers.bookAction.getBookAction);
router.get('/book', controllers.bookAction.getAllBookAction);
router.post('/book',controllers.bookAction.createBookAction);
router.put('/book',controllers.bookAction.updateBookAction);
router.delete('/book/:id',controllers.bookAction.deleteBookAction);

module.exports = { router };