module.exports = function makeDeleteBookAction({
    InternalServerError,
    deleteBook
})
{
    return async function deleteBookAction(req,res)
    {
        try{
            const result =  await deleteBook({ id:req.params.id });
            res.status(201).send("Book deleted successfully...");
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}