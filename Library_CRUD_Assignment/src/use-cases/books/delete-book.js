module.exports = function makeDeleteBook({
    Joi, 
    ValidationError,
    ObjectNotFoundError,
    getDbBook,
    deleteDbBook,
})
{
    return async function deleteBook({id})
    {
        try{
            const value  = await validateInputData({ id });

            const isBookAlreadyExist = await getDbBook({ id:value.id } );

            // first checking if such book exist or not user trying to delete.
            if( !isBookAlreadyExist.length )
            {
                throw new ObjectNotFoundError("ERROR :: There is no book with id you are trying to delete!!!");
            }

            return await deleteDbBook({ id:value.id });
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            id:Joi.string().uuid().required(),
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at createBook "+error.message)
        }
        return value;
    }
}