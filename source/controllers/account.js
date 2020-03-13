const accountModel = require("../models/account");
const funcHelpers = require("../helpers");

module.exports = {
    createAccount: async (request, response) => {
        try {
            const salt = funcHelpers.generateSalt(18)
            const hashPassword = funcHelpers.setPassword(request.body.password, salt)

            const data = {
                //id: request.body.id,
                name: request.body.name,
                image: `http://localhost:4111/upload/${request.file.filename}`,
                no_telephone: request.body.no_telephone,
                email: request.body.email,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
                role: request.body.role || 'cashier',
                date_added: new Date(),
                date_updated: new Date()
            }
            const result = await accountModel.createAccount(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Create Account Failed!')
        }
    }
}