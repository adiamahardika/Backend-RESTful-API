const express = require('express')
const Route = express.Router()

// const { authentication, authorization } = require("../helpers/auth");

const {
    createAccount,
    readAccount,
    updateAccount,
    deleteAccount,
    // login
} = require('../controllers/account')

const { uploadImages } = require("../controllers/upload");

Route
    .post('/', uploadImages, createAccount)
    .get('/', readAccount)
    .patch('/:accountId', uploadImages, updateAccount)
    .delete('/:accountId', deleteAccount)
    .post('/login')

module.exports = Route