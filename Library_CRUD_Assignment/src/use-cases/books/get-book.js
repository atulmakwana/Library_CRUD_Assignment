module.exports = function makeGetBook({
    Joi, 
    ValidationError,
    ObjectNotFoundError,
    getDbBook,
})
{
    return async function getBook({ id })
    {
        try{
            const value  = await validateInputData({ id });

            const book = await getDbBook({ id:value.id } );
            if( !book?.length )
            {
                throw new ObjectNotFoundError("ERROR :: There is no book with given id you are trying to get!!!");
            }

            return book;
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