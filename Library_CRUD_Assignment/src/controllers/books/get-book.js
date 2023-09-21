module.exports = function makeGetBookAction({
    InternalServerError,
    getBook
})
{
    return async function getBookAction(req,res)
    {
        try{
            const result =  await getBook({ id:req.params.id });
            res.status(201).send({"Response":result});
        }
        catch(error){
            if(!error.httpStatusCode){
                error = new InternalServerError(error.message)
            }
            res.status(error.httpStatusCode).send(error.message);
        }
    }
}