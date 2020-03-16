const accountModel = require("../models/account");
const funcHelpers = require("../helpers");
const JWT = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../configs/mysql')
const { url } = require("../configs/mysql");

module.exports = {
    createAccount: async (request, response) => {
        const checkEmail = await accountModel.checkEmail(request.body.email)
        const dataAccount = checkEmail[0]

        if (dataAccount == undefined) {
            const salt = funcHelpers.generateSalt(18)
            const hashPassword = funcHelpers.setPassword(request.body.password, salt)
            if (!request.file || Object.keys(request.file).length === 0) {
                const {
                    email,
                    first_name,
                    last_name,
                    id_province,
                    id_city,
                    id_sub_city,
                    address,
                    no_telephone,
                } = request.body

                const data = {
                    email,
                    first_name,
                    last_name,
                    password: hashPassword.passwordHash,
                    id_province,
                    id_city,
                    id_sub_city,
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
                id_province,
                id_city,
                id_sub_city,
                address,
                no_telephone,
            } = request.body

            const data = {
                email,
                first_name,
                last_name,
                password: hashPassword.passwordHash,
                id_province,
                id_city,
                id_sub_city,
                address,
                no_telephone,
                image: `${url}upload/${request.file.filename}`,
                salt: hashPassword.salt,
                role: request.body.role || 'member',
                date_added: new Date(),
                date_updated: new Date()
            }

            const result = await accountModel.createAccount(data)
            funcHelpers.response(response, 200, result)
        } else {
            return funcHelpers.accountErrorResponse(response, 404, 'Your Email is Already Registered!')
        }
    },
    readAccount: async (request, response) => {
        try {
            const result = await accountModel.readAccount()
            funcHelpers.response(response, 200, result)
        } catch (error) {
            console.log(error)
            funcHelpers.accountErrorResponse(response, 404, 'Create Account Failed!')
        }
    },
    updateAccount: async (request, response) => {
        try {
            if (!request.file || Object.keys(request.file).length === 0) {
                const id = request.params.accountId;
                const {
                    email,
                    first_name,
                    last_name,
                    id_province,
                    id_city,
                    id_sub_city,
                    address,
                    no_telephone,
                } = request.body;

                const data = {
                    id,
                    email,
                    first_name,
                    last_name,
                    id_province,
                    id_city,
                    id_sub_city,
                    address,
                    no_telephone,
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
                id_province,
                id_city,
                id_sub_city,
                address,
                no_telephone,
            } = request.body;

            const data = {
                id,
                email,
                first_name,
                last_name,
                id_province,
                id_city,
                id_sub_city,
                address,
                no_telephone,
                image: `http://localhost:4111/upload/${request.file.filename}`,
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
    login: async (request, response) => {
        const checkEmail = await accountModel.checkEmail(request.body.email)
        const dataAccount = checkEmail[0]

        if (dataAccount != undefined) {

            const data = {
                email: request.body.email,
                password: request.body.password
            }

            const hashPassword = funcHelpers.setPassword(data.password, dataAccount.salt)
            if (hashPassword.passwordHash === dataAccount.password) {
                const token = JWT.sign({
                    email: dataAccount.email,
                    id: dataAccount.id
                }, JWT_KEY, {
                    expiresIn: '30m'
                })

                delete dataAccount.id_province
                delete dataAccount.id_city
                delete dataAccount.id_sub_city
                delete dataAccount.salt
                delete dataAccount.password

                dataAccount.token = token

                funcHelpers.response(response, 200, dataAccount)
            } else {
                return funcHelpers.accountErrorResponse(response, 404, 'Password is Incorrect!')
            }
        } else {
            return funcHelpers.accountErrorResponse(response, 404, 'Email is Incorrect!')
        }
    },
    changePassword: async (request, response) => {
        try {
            const id = request.params.accountId
            const salt = funcHelpers.generateSalt(18)
            const hashPassword = funcHelpers.setPassword(request.body.password, salt)

            const data = {
                id,
                password: hashPassword.passwordHash,
                salt: hashPassword.salt,
            }

            const result = await accountModel.changePassword(data)
            funcHelpers.response(response, 200, 'Change Password Success!')
        } catch (error) {
            console.log(error)
            funcHelpers.accountErrorResponse(response, 404, 'Change Password Failed!')
        }
    }
}