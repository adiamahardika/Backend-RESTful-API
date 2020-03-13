const connection = require('../configs/database')

module.exports = {
    createAccount: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE account AUTO_INCREMENT=0') // dri 0
            connection.query('INSERT INTO account SET ?', data)
            connection.query('SELECT * FROM account', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}