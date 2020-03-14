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
    },
    updateProvince: async (request, response) => {
        try {
            const id = request.params.provinceId
            const {
                name_province
            } = request.body
            const data = {
                id, 
                name_province
            }
            const result = await provinceModel.updateProvince(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            funcHelpers.customErrorResponse(response, 404, 'Cannot Update Province')
        }
    },
    deleteProvince: async (request, response) => {
        try {
            const data = request.params.provinceId
            const result = await provinceModel.deleteProvince(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            funcHelpers.customErrorResponse(response, 404, 'Cannot Delete Province!')
        }
    }
}