module.exports = function makeBooksMethods({
    connection,
    uuidv4,
    DatabaseError
})
{
    return Object.freeze({
        getDbBook,
        getDbAllBook,
        createDbBook,
        updateDbBook,
        deleteDbBook,
        getDbBookByData,
    });
    async function getDbBook({id})
    {
        try {
            const result=await connection.query( `select * from books where id=?`,[id]);
            return result[0];
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbBook":error})
        }
    }
    async function getDbBookByData({book_name,book_author})
    {
        try {
            const result = await connection.query( `select * from books where book_name = ? and book_author = ?`,[book_name,book_author]);
            return result[0];
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbBookByData":error})
        }
    }
    async function getDbAllBook()
    {
        try {
            const result=await connection.query( `select * from books`,[]);
            return result[0];
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at getDbAllBook":error})
        }
    }
    async function createDbBook({book_name,book_author})
    {
        try {
            const uuid=uuidv4();
            const result = await connection.query(`insert into books(id,book_name,book_author) values(?,?,?);`,[uuid,book_name,book_author]);
            return uuid;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at createDbBook":error})
        }
    }
    async function updateDbBook( query,updatedData )
    {
        try 
        {
            const result = await connection.query( query,updatedData );
            return result;
        } 
        catch (error) {
            console.log(error);
            throw new DatabaseError({"Error occured at updateDbBook":error})
        }
    }
    async function deleteDbBook({id})
    {
        try {
            const result = await connection.query( `delete from books where id=?;`,[id],);
            return result;
        } 
        catch (error) {
            throw new DatabaseError({"Error occured at deleteDbBook":error})
        }
    }
}