const connection = require('../configs/database')

module.exports = {
    createCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE category AUTO_INCREMENT=0')
            connection.query(`INSERT INTO category SET ?`, data)
            connection.query(`SELECT * FROM category`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}