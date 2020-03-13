const productModel = require("../models/product");
const funcHelpers = require("../helpers");
const { url } = require("../configs/mysql");

module.exports = {
    createProduct: async (request, response) => {
        try {
            const {
                name_product,
                description,
                ingredients,
                quantity,
                price,
                id_category
            } = request.body;

            const data = {
                name_product,
                image: `${url}upload/${request.file.filename}`,
                description,
                ingredients,
                quantity,
                price,
                id_category,
                date_added: new Date(),
                date_updated: new Date()
            };

            const result = await productModel.createProduct(data);
            funcHelpers.response(response, 200, result);
        } catch (error) {
            console.log(error);
            funcHelpers.cumstomErrorResponse(response, 404, "Create Product Failed!");
        }
    },
    readProduct: async (request, response) => {
        try {
            const productId = request.params.productId

            const paginateId = request.query.paginateId || 1
            const limit = request.query.limit || 6

            const product = request.query.product || ''
            const category = request.query.category || ''

            const sortBy = request.query.sortBy || 'id'
            const orderBy = request.query.orderBy || 'ASC'

            const data = {
                productId,
                paginateId,
                limit,
                sortBy,
                orderBy,
            }

            const result = await productModel.readProduct(product, category, data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Read Product Failed!')
        }
    },
}