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
            await funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, "Create Sub-City Failed!");
        }
    }
}