const categoryModel = require("../models/category");
const funcHelpers = require("../helpers");

module.exports = {
    createCategory: async (request, response) => {
        try{
            const {
                name_category
            } = request.body

            const data = {
                name_category
            }
            const result = await categoryModel.createCategory(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            funcHelpers.customErrorResponse(response, 404, 'Cannot Create Category!')
        }
    }, 
    readCategory: async (request, response) => {
        try{
            const {
                categoryName
            } = request.params
            const data = {
                categoryName
            }
            const result = await categoryModel.readCategory(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            funcHelpers.customErrorResponse(response, 404, 'Cannot Read Category!')
        }
    }
}