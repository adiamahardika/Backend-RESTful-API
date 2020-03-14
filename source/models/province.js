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
    readProvince: () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM province`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateProvince: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE province SET ? WHERE id = ?`, [data, data.id])
            connection.query(`SELECT * FROM province`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteProvince: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM province WHERE id = ?`, data)
            connection.query(`SELECT * FROM province`, (error, result) => {
                if (error) reject(new Error(error))
                connection.query(`ALTER TABLE province DROP id`)
                connection.query(`ALTER TABLE province ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST`)
                resolve(result)
            })
        })
    },
    updateProvince: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE province SET ? WHERE id = ?`, [data, data.id])
            connection.query(`SELECT * FROM province`, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteProvince: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM province WHERE id = ?`, data)
            connection.query(`SELECT * FROM province`, (error, result) => {
                if (error) reject(new Error(error))
                connection.query(`ALTER TABLE province DROP id`)
                connection.query(`ALTER TABLE province ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST`)
                resolve(result)
            })
        })
    }
}