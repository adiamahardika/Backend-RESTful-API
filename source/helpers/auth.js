const JWT = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../configs/mysql')

module.exports = {
    authentication: (request, response, next) => {
        const headerToken = request.headers.token
        const accountId = request.headers['id']
        if (headerToken === undefined) {
            response.json({
                message: 'Please provide Token!'
            })
        } else {
            request.token = headerToken
            request.accountId = accountId
            next()
        }
    },
    authorization: (request, response, next) => {
        const token = request.token
        const accountId = request.accountId
        JWT.verify(token, JWT_KEY, (error, decoded) => {
            if (error && error.name === 'TokenExpiredError') response.json({
                message: 'Token Expired!'
            })
            if (error && error.name === 'JsonWebTokenError') response.json({
                message: 'Token Error!'
            })
            if (error && error.name === 'SyntaxError') response.json({
                message: 'Token Wrong!'
            })
            if (parseInt(accountId) !== parseInt(decoded.id)) response.json({
                message: 'You\'re Unauthorized!'
            })
            next()
        })
    }
}