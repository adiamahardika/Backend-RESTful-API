const cityModel = require("../models/city");
const funcHelpers = require("../helpers");

module.exports = {
    createCity: async (request, response) => {
        try {
            const data = {
                //id: request.body.id,
                name_city: request.body.name_city,
                id_province: request.body.id_province
            }
            const result = await cityModel.createCity(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Create City Failed!')
        }
    },
    readCity: async (request, response) => {
        try {
            const result = await cityModel.readCity()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Create City Failed!')
        }
    }
}