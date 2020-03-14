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
            if (!request.file || Object.keys(request.file).length === 0) {
                const {
                    email,
                    first_name,
                    last_name,
                    city,
                    country,
                    address,
                    no_telephone,
                } = request.body

                const data = {
                    email,
                    first_name,
                    last_name,
                    password: hashPassword.passwordHash,
                    city,
                    country,
                    address,
                    no_telephone,
                    salt: hashPassword.salt,
                    role: request.body.role || 'member',
                    date_added: new Date(),
                    date_updated: new Date()
                }
                const result = await accountModel.createAccount(data)
                return funcHelpers.response(response, 200, result)
            }

            const {
                email,
                first_name,
                last_name,
                city,
                country,
                address,
                no_telephone,
            } = request.body

            const data = {
                email,
                first_name,
                last_name,
                password: hashPassword.passwordHash,
                city,
                country,
                address,
                no_telephone,
                image: `http://localhost:4111/upload/${request.file.filename}`,
                salt: hashPassword.salt,
                role: request.body.role || 'member',
                date_added: new Date(),
                date_updated: new Date()
            }
            const result = await accountModel.createAccount(data)
            return funcHelpers.response(response, 200, result)
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
                    email,
                    first_name,
                    last_name,
                    city,
                    country,
                    address,
                    no_telephone,
                } = request.body;

                const data = {
                    id,
                    email,
                    first_name,
                    last_name,
                    password: hashPassword.passwordHash,
                    city,
                    country,
                    address,
                    no_telephone,
                    salt: hashPassword.salt,
                    role: request.body.role || 'member',
                    date_updated: new Date()
                };

                const result = await accountModel.updateAccount(data);
                return funcHelpers.response(response, 200, result);
            }

            const id = request.params.accountId;
            const {
                email,
                first_name,
                last_name,
                city,
                country,
                address,
                no_telephone,
            } = request.body;

            const data = {
                id,
                email,
                first_name,
                last_name,
                password: hashPassword.passwordHash,
                city,
                country,
                address,
                no_telephone,
                image: `http://localhost:4111/upload/${request.file.filename}`,
                salt: hashPassword.salt,
                role: request.body.role || 'member',
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
    login: async (request, response, next) => {
        try {
            const data = {
                email: request.body.email,
                password: request.body.password
            }

            const result = await accountModel.readAccount()
            const dataAccount = result[0]
            const hashPassword = funcHelpers.setPassword(data.password, dataAccount.salt)

            if (hashPassword.passwordHash === dataAccount.password && data.email === dataAccount.email) {
                const token = JWT.sign({
                    email: dataAccount.email,
                    id: dataAccount.id
                }, JWT_KEY, {
                    expiresIn: '30m'
                })

                delete dataAccount.salt
                delete dataAccount.password

                dataAccount.token = token

                return funcHelpers.response(response, 200, dataAccount)
            } else {
                return funcHelpers.accountErrorResponse(response, 404, 'Email or Password is Wrong!')
            }
        } catch (error) {
            console.log(error)
            funcHelpers.accountErrorResponse(response, 404, 'Login Account Failed!')
        }
    }
}