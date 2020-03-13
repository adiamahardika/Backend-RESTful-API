const {
    database
} = require('./mysql')
const mysql = require('mysql')

const connection = mysql.createConnection(database)

connection.connect((error) => {
    if (error) {
        console.log("Database Makyur Failed!")
    } else {
        console.log(`Database Makyur Connected!`)
    }
})

module.exports = connection