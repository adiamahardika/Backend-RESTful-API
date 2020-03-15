const connection = require('../configs/database')

module.exports = {
    purchase: (data, loop) => {
        return new Promise((resolve, reject) => {
            /* purchase */
            const id_purchase = data.id_purchase
            const id_account = data.id_account
            const name_reciver = data.name_reciver
            const email = data.email
            const no_telephone = data.no_telephone
            const id_province = data.id_province
            const id_city = data.id_city
            const id_sub_city = data.id_sub_city
            const address = data.address
            const fax = data.fax
            const tax = data.tax
            const shipping = data.shipping
            const shipped = data.shipped
            const total = data.total
            const tracking = data.tracking
            const date = data.date
            /* purchase detail */
            const id_product = data.id_product
            const quantity = data.quantity
            connection.query("SELECT * FROM product WHERE id = ?", id_product, (error, result) => {
                if (error) reject(new Error(error))
                if (result.length > 0) {
                    // ==========================================
                    // GET QUANTITY, ID FROM PRODUCT
                    // ==========================================
                    let checkQuantity = result[0].quantity - quantity
                    let checkProductId = result[0].id
                    // ==========================================
                    if (checkQuantity >= 0) {
                        if (loop == 0) { connection.query("INSERT INTO purchase (id, id_account, name_reciver, email, no_telephone, id_province, id_city, id_sub_city, address, fax, tax, shipping, shipped, total, tracking, date) VALUES ('" + id_purchase + "', '" + id_account + "', '" + name_reciver + "', '" + email + "', '" + no_telephone + "', '" + id_province + "', '" + id_city + "', '" + id_sub_city + "', '" + address + "', '" + fax + "', '" + tax + "', '" + shipping + "', '" + shipped + "', '" + total + "', '" + tracking + "', '" + date + "')") }
                        connection.query("UPDATE product SET quantity = ? WHERE id = ?", [checkQuantity, checkProductId])
                        connection.query('ALTER TABLE purchase_detail AUTO_INCREMENT = 0')
                        connection.query("INSERT INTO purchase_detail (id_purchase, id_product, quantity) VALUES ('" + id_purchase + "', '" + id_product + "', '" + quantity + "')")
                    } else {
                        console.log('Cannot Reduce Quantity Product, Below  0 (-1, -2, -3)!')
                        reject(new Error(error))
                    }
                } else {
                    console.log('ID Product Not Found!')
                    reject(new Error(error))
                }
            })
        })
    },
    readPurchase: (purchaseId) => {
        return new Promise((resolve, reject) => {
            if (purchaseId != null) {
                connection.query("SELECT purchase.*, purchase_detail.id_product, account.first_name, province.name_province, city.name_city, sub_city.name_sub_city, product.name_product FROM purchase INNER JOIN purchase_detail ON purchase.id = purchase_detail.id_purchase LEFT JOIN product ON product.id = purchase_detail.id_product INNER JOIN account ON account.id = purchase.id_account INNER JOIN province ON province.id = purchase.id_province INNER JOIN city ON city.id = purchase.id_city INNER JOIN sub_city ON sub_city.id = purchase.id_sub_city WHERE purchase.id = ?", purchaseId, (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            } else {
                connection.query("SELECT purchase.*, purchase_detail.id_product, account.first_name, province.name_province, city.name_city, sub_city.name_sub_city, product.name_product FROM purchase INNER JOIN purchase_detail ON purchase.id = purchase_detail.id_purchase LEFT JOIN product ON product.id = purchase_detail.id_product INNER JOIN account ON account.id = purchase.id_account INNER JOIN province ON province.id = purchase.id_province INNER JOIN city ON city.id = purchase.id_city INNER JOIN sub_city ON sub_city.id = purchase.id_sub_city", (error, result) => {
                    if (error) reject(new Error(error))
                    resolve(result)
                })
            }
        })
    }
}