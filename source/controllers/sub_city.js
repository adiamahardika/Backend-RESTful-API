const subcityModel = require("../models/sub_city");
const funcHelpers = require("../helpers");

module.exports = {
    createSubcity: async (request, response) => {
        try {
            const {
                name_sub_city,
                id_city
            } = request.body

            const data = {
                name_sub_city,
                id_city
            }

            const result = await subcityModel.createSubcity(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, "Create Sub-City Failed!");
        }
    },
    readSubcity: async (request, response) => {
        try {
            const result = await subcityModel.readSubcity()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, "Read Sub-City Failed!");
        }
    },
    updateSubcity: async (request, response) => {
        try {
            const id = request.params.subcityId
            const {
                name_sub_city,
                id_city
            } = request.body
            const data = {
                id,
                name_sub_city,
                id_city
            }
            const result = await subcityModel.updateSubcity(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            funcHelpers.customErrorResponse(response, 404, 'Update SubCity Failed!')
        }
    },
}