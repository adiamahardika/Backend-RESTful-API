const connection = require('../configs/database')

module.exports = {
    createSubcity: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE sub_city AUTO_INCREMENT = 0')
            connection.query('INSERT INTO sub_city SET ?', data)
            connection.query('SELECT sub_city.*, city.name_city FROM sub_city INNER JOIN city ON sub_city.id_city = city.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}