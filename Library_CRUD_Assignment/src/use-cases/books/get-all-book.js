module.exports = function makeGetAllBook({
    getDbAllBook,
})
{
    return async function getAllBook()
    {
        try
        {
            return await getDbAllBook();
        }
        catch(error){
            throw error;
        }
    }
}