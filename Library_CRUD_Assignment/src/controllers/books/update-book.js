module.exports = function makeUpdateBookAction({
    InternalServerError,
    updateBook
})
{
    return async function updateBookAction(req,res)
    {
        try{
            const result =  await updateBook( req.body );
            res.status(201).send("Book Updated successfully...");
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}