const mysql = require('mysql2');
const { v4:uuidv4 } = require('uuid');

const exceptions = require('../exceptions');

const connection = createmysqlConnection({
    mysql
});


const makeBooksDbMethods = require('./books.db');
const bookDb = makeBooksDbMethods({
    connection,
    uuidv4,
    DatabaseError:exceptions.DatabaseError,
});

module.exports = { bookDb };



function createmysqlConnection({
    mysql
}) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: "library_db",
        waitForConnections: true,
        connectionLimit : 10,
        queueLimit : 0
    });
    connection.connect(function(err){
        if(err){
            console.log("MySQL connection error occureddd: ",err);
        }
    });
    return connection.promise()
}