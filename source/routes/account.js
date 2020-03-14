const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    createAccount,
    readAccount,
    updateAccount,
    deleteAccount,
    login
} = require('../controllers/account')

const { uploadImages } = require("../controllers/upload");

Route
    .post('/', uploadImages, createAccount)
    .get('/', authentication, authorization, readAccount)
    .patch('/:accountId', authentication, authorization, uploadImages, updateAccount)
    .delete('/:accountId', authentication, authorization, deleteAccount)
    .post('/login', login)

module.exports = Route