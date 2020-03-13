const connection = require('../configs/database')

module.exports = {
    createProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('ALTER TABLE product AUTO_INCREMENT = 0')
            connection.query("SELECT * FROM product WHERE name_product = ?", data.name_product, (error, result) => {
                if (result.length > 0) {
                    connection.query("UPDATE product SET quantity = ? WHERE id = ?", [result[0].quantity + parseInt(data.quantity), result[0].id], (error, result) => {
                        if (error) reject(new Error(error))
                        resolve(result)
                    })
                } else {
                    connection.query("SELECT * FROM category WHERE id = ?", data.id_category, (error, result) => {
                        if (data.id_category == result[0].id) {
                            connection.query("INSERT INTO product SET ?", data)
                            connection.query('SELECT product.*, category.name_category FROM product INNER JOIN category ON product.id_category = category.id', (error, result) => {
                                if (error) reject(new Error(error))
                                resolve(result)
                            })
                        } else {
                            reject(new Error(error))
                        }
                    })
                }
                if (error) reject(new Error(error))
            })
        })
    },
}