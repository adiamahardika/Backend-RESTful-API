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
                role: request.body.role || 'member',
                date_added: new Date(),
                date_updated: new Date()
            }
            const result = await accountModel.createAccount(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Create Account Failed!')
        }
    },
    readAccount: async (request, response) => {
        try {
            const result = await accountModel.readAccount()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.customErrorResponse(response, 404, 'Create Account Failed!')
        }
    },
    updateAccount: async (request, response) => {
        try {
            const salt = funcHelpers.generateSalt(18)
            const hashPassword = funcHelpers.setPassword(request.body.password, salt)
            if (!request.file || Object.keys(request.file).length === 0) {
                const id = request.params.accountId;
                const {
                    name,
                    no_telephone,
                    email,
                    role
                } = request.body;

                const data = {
                    id,
                    name,
                    no_telephone,
                    email,
                    password: hashPassword.passwordHash,
                    salt: hashPassword.salt,
                    role,
                    date_updated: new Date()
                };

                const result = await accountModel.updateAccount(data);
                return funcHelpers.response(response, 200, result);
            }

            const id = request.params.accountId;
            const {
                name,
                no_telephone,
                email,
                role
            } = request.body;

            const data = {
                id,
                name,
                no_telephone,
                image: `http://localhost:4111/upload/${request.file.filename}`,
                email,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
                role,
                date_updated: new Date()
            };

            const result = await accountModel.updateAccount(data);
            funcHelpers.response(response, 200, result);
        } catch (error) {
            console.log(error);
            funcHelpers.cumstomErrorResponse(response, 404, "Update Account Failed!");
        }
    }
}