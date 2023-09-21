module.exports = function makeUpdateBook({
    ObjectNotFoundError,
    ObjectAlreadyExistError,
    getDbBook,
    getDbBookByData,
    updateDbBook,
})
{
    return async function deleteBook( data )
    {
        try
        {
            const [isBookExist] = await getDbBook({ id:data.id } );
            if( !isBookExist.id )
            {
                throw new ObjectNotFoundError("ERROR :: There is no book with id you are trying to update!!!");
            }
            // to check that is 
            let check_book = isBookExist.book_name;
            let check_author = isBookExist.book_author

            //created a dynamic query for updating only author or only book name or both
            let query = "";
            let updatedData = [];

            if( data?.book && data?.author ){
                query = `update books set book_author=?, book_name=? where id=?`,
                updatedData.push(data.author);
                updatedData.push(data.book);
                check_author=data.author;
                check_book=data.book;
            }
            else if(data?.book){
                query = `update books set book_name=? where id=?`,
                updatedData.push(data.book);
                check_book=data.book;
            }
            else if(data?.author){
                query = `update books set book_author=? where id=?`,
                updatedData.push(data.author);
                check_author=data.author;
            }
            updatedData.push(data.id);

            // checking if user is not rewriting the author and book name that is already existed
            const [isDuplicateBook] = await getDbBookByData({ book_name:check_book,book_author:check_author });
            if( isDuplicateBook?.id )
            {
                throw new ObjectAlreadyExistError("ERROR :: There is book with same name and author existed already, you are trying to update!!!");
            }            

            return await updateDbBook(query,updatedData);
        }
        catch(error){
            throw error;
        }
    }
}