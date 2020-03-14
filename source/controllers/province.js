const provinceModel = require("../models/province");
const funcHelpers = require("../helpers");

module.exports = {
    createProvince: async (request, response) => {
        try { 
            const {
            name_province 
        } = request.body
            const data = {
                name_province
            }
            const result = await provinceModel.createProvince(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            funcHelpers.customErrorResponse(response, 404, 'Cannot Create Provice!')
        }
    },
    readProvince: async (request, response) => {
        try {
            const result = await provinceModel.readProvince()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            funcHelpers.customErrorResponse(response, 404, 'Cannot Read Province!')
        }
    }
}