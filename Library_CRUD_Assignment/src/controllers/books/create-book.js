module.exports = function makeCreateBookAction({
    InternalServerError,
    createBook
})
{
    return async function createBookAction(req,res)
    {
        try{
            const result =  await createBook({ book_name:req.body.book, book_author:req.body.author });
            res.status(201).send("Book created successfully with id :: "+result);
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}