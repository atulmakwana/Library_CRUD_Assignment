module.exports = function makeCreateBook({
    Joi, 
    ValidationError,
    ObjectAlreadyExistError,
    getDbBookByData,
    createDbBook
})
{
    return async function createBook({book_name,book_author})
    {
        try{
            const value  = await validateInputData({book_name,book_author});

            // checking if user is not rewriting the author and book name that is already existed
            const isBookAlreadyExist = await getDbBookByData({ book_name:value.book_name, book_author:value.book_author } );
            if( isBookAlreadyExist?.length )
            {
                throw new ObjectAlreadyExistError("ERROR :: There is already one book with same name and author, that you are trying to create!!!");
            }

            return await createDbBook({ book_name:value.book_name, book_author:value.book_author });
        }
        catch(error){
            throw error;
        }
    }
    function validateInputData(data)
    {
        const schema = Joi.object({
            book_name:Joi.string().min(5).required(),
            book_author:Joi.string().min(5).required(),
        });
        const {error,value} = schema.validate(data);
        if (error) {
            throw new ValidationError("Validation error at createBook "+error.message)
        }
        return value;
    }
}