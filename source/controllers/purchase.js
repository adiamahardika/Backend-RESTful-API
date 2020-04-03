const purchaseModel = require("../models/purchase");
const funcHelpers = require("../helpers");
const { performance } = require('perf_hooks');
const uuidv4 = require('uuid/v4')

module.exports = {
    purchase: async (request, response) => {
        try {
            const purchaseING = request.body
            var loop = 0

            function trackingUUID() {
                var d = new Date().getTime();
                var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
                return 'mak-yur-xxxxxxxxxx'.replace(/[x]/g, function (c) {
                    var r = Math.random() * 16;
                    if (d > 0) {
                        r = (d + r) % 16 | 0;
                        d = Math.floor(d / 16);
                    } else {
                        r = (d2 + r) % 16 | 0;
                        d2 = Math.floor(d2 / 16);
                    }
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            }

            const id_purchase = uuidv4()
            await purchaseING.product.map(event => {
                const tracking = trackingUUID()
                const data = {
                    /* purchase */
                    id_account: purchaseING.id_account,
                    name_reciver: purchaseING.name_reciver,
                    email: purchaseING.email,
                    no_telephone: purchaseING.no_telephone,
                    id_province: purchaseING.id_province,
                    id_city: purchaseING.id_city,
                    id_sub_city: purchaseING.id_sub_city,
                    address: purchaseING.address,
                    codepos: purchaseING.codepos,
                    fax: purchaseING.fax,
                    tax: purchaseING.tax,
                    arrived: purchaseING.arrived,
                    total: purchaseING.total,
                    tracking,
                    date: new Date(),
                    /* purchase detail */
                    id_product: event.id,
                    quantity: event.qty
                }
                purchaseModel.purchase(id_purchase, data, loop)
                loop++
            })
            const result = await purchaseModel.readPurchase()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Purchase Failed!')
        }
    },
    readPurchase: async (request, response) => {
        try {
            const purchaseId = request.params.purchaseId
            const result = await purchaseModel.readPurchase(purchaseId)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Read Purchase Failed!')
        }
    }
}