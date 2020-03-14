const productModel = require("../models/product");
const funcHelpers = require("../helpers");
const { url } = require("../configs/mysql");

module.exports = {
    createProduct: async (request, response) => {
        try {
            const {
                name_product,
                cartDesc,
                shortDesc,
                longDesc,
                ingredients,
                quantity,
                price,
                id_category
            } = request.body;

            const data = {
                name_product,
                image: `${url}upload/${request.file.filename}`,
                cartDesc,
                shortDesc,
                longDesc,
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
            const totalData = await productModel.countProduct(product, category)
            const amount = Math.ceil(totalData / limit)
            const paginateTab = { amount }

            funcHelpers.responsePaginate(response, 200, result, parseInt(paginateId), paginateTab)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Read Product Failed!')
        }
    },
    updateProduct: async (request, response) => {
        try {
            if (!request.file || Object.keys(request.file).length === 0) {
                const id = request.params.productId;
                const {
                    name_product,
                    cartDesc,
                    shortDesc,
                    longDesc,
                    ingredients,
                    quantity,
                    price,
                    id_category
                } = request.body;

                const data = {
                    id,
                    name_product,
                    cartDesc,
                    shortDesc,
                    longDesc,
                    ingredients,
                    quantity,
                    price,
                    id_category,
                    date_updated: new Date()
                };

                const result = await productModel.updateProduct(data);
                return funcHelpers.response(response, 200, result);
            }

            const id = request.params.productId;
            const {
                name_product,
                cartDesc,
                shortDesc,
                longDesc,
                ingredients,
                quantity,
                price,
                id_category
            } = request.body;

            const data = {
                id,
                name_product,
                image: `${url}upload/${request.file.filename}`,
                cartDesc,
                shortDesc,
                longDesc,
                ingredients,
                quantity,
                price,
                id_category,
                date_updated: new Date()
            };

            const result = await productModel.updateProduct(data);
            funcHelpers.response(response, 200, result);
        } catch (error) {
            console.log(error);
            funcHelpers.cumstomErrorResponse(response, 404, "Update Product Failed!");
        }
    },
    deleteProduct: async (request, response) => {
        try {
            const productId = request.params.productId

            const data = {
                productId
            }
            const result = await productModel.deleteProduct(data);
            funcHelpers.response(response, 200, result);
        } catch (error) {
            console.log(error);
            funcHelpers.cumstomErrorResponse(response, 404, "Delete Product Failed!");
        }
    },
}