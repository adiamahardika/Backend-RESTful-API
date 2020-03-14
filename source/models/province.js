const connection = require('../configs/database')
 
module.exports = {
    createProvince: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE province AUTO_INCREMENT=0')
            connection.query(`INSERT INTO province SET ?`, data)
            connection.query(`SELECT * FROM province`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
}