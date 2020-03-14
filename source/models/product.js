const connection = require('../configs/database')

module.exports = {
    countProduct: (group, product, category) => {
        return new Promise((resolve, reject) => {
            if (product != null || category != null) {
                connection.query('SELECT COUNT(*) AS totalData FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id WHERE product.id_product_group LIKE "%' + group + '%" AND product.name_product LIKE "%' + product + '%" AND product.id_category LIKE "%' + category + '%"', (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result[0].totalData)
                })
            } else {
                connection.query('SELECT product.*, category.name_category, product_group.name_group FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id', (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            }
        })
    },
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
                            connection.query('SELECT product.*, category.name_category, product_group.name_group FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id', (error, result) => {
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
    readProduct: (group, product, category, data) => {
        const productId = data.productId
        const paginateId = data.paginateId
        const limit = data.limit
        const sortBy = data.sortBy
        const orderBy = data.orderBy
        return new Promise((resolve, reject) => {
            if (productId != null) {
                connection.query('SELECT product.*, category.name_category, product_group.name_group FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id WHERE product.id = ?', productId, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else if (group != null || product != null || category != null || paginateId != null || limit != null || sortBy != null || orderBy != null) {
                let paginateStart = ((paginateId * limit) - limit)
                connection.query('SELECT product.*, category.name_category, product_group.name_group FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id WHERE product.id_product_group LIKE "%' + group + '%" AND product.name_product LIKE "%' + product + '%" AND product.id_category LIKE "%' + category + '%" ORDER BY ' + sortBy + ' ' + orderBy + ' LIMIT ' + paginateStart + ',' + limit, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else {
                connection.query('SELECT product.*, category.name_category, product_group.name_group FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id', (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            }
        })
    },
    updateProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE product SET ? WHERE id = ?`, [data, data.id])
            connection.query('SELECT product.*, category.name_category, product_group.name_group FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id', (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    },
    deleteProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM product WHERE id = ?`, data.productId)
            connection.query('SELECT product.*, category.name_category, product_group.name_group FROM product LEFT JOIN category ON product.id_category = category.id LEFT JOIN product_group ON product.id_product_group = product_group.id', (error, result) => {
                if (error) reject(new Error(error))
                connection.query('ALTER TABLE product DROP id')
                connection.query('ALTER TABLE product ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST')
                resolve(result)
            })
        })
    },
}