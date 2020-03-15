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
    readPurchase: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM purchase", (error, result) => {
                if (error) reject(new Error(error))
                resolve(result)
            })
        })
    }
}