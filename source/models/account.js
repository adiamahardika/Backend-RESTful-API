const connection = require('../configs/database')

module.exports = {
    createAccount: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE account AUTO_INCREMENT=0')
            connection.query('INSERT INTO account SET ?', data)
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    readAccount: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    updateAccount: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE account SET ? WHERE id = ?', [data, data.id])
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteAccount: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM account WHERE id = ?`, data)
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city', (error, result) => {
                if (error) reject(new Error(error))
                connection.query('ALTER TABLE account DROP id')
                connection.query('ALTER TABLE account ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
                resolve(result)
            })
        })
    },
    checkId: (Id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city WHERE account.id = ?', Id, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    checkEmail: (email) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city WHERE account.email = ?', email, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    checkPassword: (password) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city WHERE account.password = ?', password, (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    changePassword: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE account SET password = ? WHERE id = ?', [data.password, data.id])
            connection.query('UPDATE account SET salt = ? WHERE id = ?', [data.salt, data.id])
            connection.query('SELECT account.*, province.name_province, city.name_city, sub_city.name_sub_city FROM account INNER JOIN province ON province.id = account.id_province INNER JOIN city ON city.id = account.id_city INNER JOIN sub_city ON sub_city.id = account.id_sub_city', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}