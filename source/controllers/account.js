const accountModel = require("../models/account");
const funcHelpers = require("../helpers");
const JWT = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../configs/mysql')


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
    },
    deleteAccount: async (request, response) => {
        try {
            const data = request.params.accountId
            const result = await accountModel.deleteAccount(data)
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.cumstomErrorResponse(response, 404, 'Delete Account Failed!')
        }
    },
    login: async (request, response) => {
        const data = {
            password: request.body.password,
            email: request.body.email
        }

        const emailValid = await accountModel.checkEmail(data.email)
        const dataUser = emailValid[0]
        const hashPassword = funcHelpers.setPassword(data.password, dataUser.salt)

        if (hashPassword.passwordHash === dataUser.password) {
            const token = JWT.sign({
                email: dataUser.email,
                id: dataUser.id
            }, JWT_KEY, {
                expiresIn: '1d'
            })

            delete dataUser.salt
            delete dataUser.password

            dataUser.token = token

            funcHelpers.response(response, 200, dataUser)
        } else {
            funcHelpers.cumstomErrorResponse(response, 404, 'Login Account Failed!')
        }
    }
}