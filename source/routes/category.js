const express = require('express')
const Route = express.Router()

const { authentication, authorization } = require("../helpers/auth");

const {
    createCategory,
    readCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category')

Route
    .post('/', authentication, authorization, createCategory)
    .get('/', authentication, authorization, readCategory)
    .get('/:categoryName', authentication, authorization, readCategory)
    .patch('/:categoryId', authentication, authorization, updateCategory)
    .delete('/:categoryId', authentication, authorization, deleteCategory)

module.exports = Route