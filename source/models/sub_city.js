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
    },
    readSubcity: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT sub_city.*, city.name_city FROM sub_city INNER JOIN city ON sub_city.id_city = city.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateSubcity: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE sub_city SET ? WHERE id = ?`, [data, data.id])
            connection.query('SELECT sub_city.*, city.name_city FROM sub_city INNER JOIN city ON sub_city.id_city = city.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteSubcity: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM sub_city WHERE id = ?`, data)
            connection.query(`SELECT * FROM sub_city`, (error, result) => {
                if (error) reject(new Error(error))
                connection.query(`ALTER TABLE sub_city DROP id`)
                connection.query(`ALTER TABLE sub_city ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST`)
                resolve(result)
            })
        })
    }
}